# 🏗 Terraform基盤構築ロードマップ

### ゴール

最終的に「VPC → ECS → ALB → Hello World コンテナ」まで構築し、
**`https://yourdomain.com` で表示できること。**

---

## 🧩 ステップ1：Terraformセットアップ

### 手順

| タスク | 作業内容                           | コマンド・ファイル                            | DoD（確認方法）                                   |
| ---- | ------------------------------ | ------------------------------------ | ------------------------------------------- |
| 1️⃣  | Terraform CLIをインストール           | `terraform -version`                 | バージョンが表示される                                 |
| 2️⃣  | AWS認証設定（IAMユーザー or Role）       | `aws configure`                      | `aws sts get-caller-identity` でアカウントID取得できる |
| 3️⃣  | Terraform初期化用ディレクトリ作成          | `infra/main.tf` など                   | `tree infra/` で構造確認                         |
| 4️⃣  | `provider "aws"` 設定            | region: ap-northeast-1（またはus-east-1） | `terraform init` で初期化成功                     |
| 5️⃣  | `terraform plan` → `apply` テスト | 何もリソースを作らない空plan                     | 「No changes」表示を確認                           |

---

## 🌐 ステップ2：VPC構築

### 構成内容

* VPC（/16）
* パブリックサブネット ×2（AZごと）
* インターネットゲートウェイ
* ルートテーブル

### コード例

```hcl
# infra/vpc.tf
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true
  tags = { Name = "tech-blog-vpc" }
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
  tags = { Name = "tech-blog-igw" }
}

resource "aws_subnet" "public_a" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "ap-northeast-1a"
  map_public_ip_on_launch = true
  tags = { Name = "public-a" }
}

resource "aws_subnet" "public_c" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = "ap-northeast-1c"
  map_public_ip_on_launch = true
  tags = { Name = "public-c" }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }
  tags = { Name = "public-rt" }
}

resource "aws_route_table_association" "a" {
  subnet_id      = aws_subnet.public_a.id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "c" {
  subnet_id      = aws_subnet.public_c.id
  route_table_id = aws_route_table.public.id
}
```

### DoD（確認）

| 項目    | 方法                                                                   | 期待結果                             |
| ----- | -------------------------------------------------------------------- | -------------------------------- |
| VPC作成 | AWSコンソール → **VPC一覧**                                                 | `tech-blog-vpc` が表示されている         |
| IGW接続 | **VPC > インターネットゲートウェイ**                                              | アタッチ済み                           |
| サブネット | **VPC > サブネット**                                                      | `public-a`, `public-c` が /24 で存在 |
| ルート   | **ルートテーブル > public-rt**                                              | `0.0.0.0/0 → igw-xxxx` が登録済み     |
| CLI確認 | `aws ec2 describe-vpcs --filters Name=tag:Name,Values=tech-blog-vpc` | VPC IDが表示される                     |

---

## 🧱 ステップ3：ECS基盤（クラスター・タスク・ロール）

### 構成内容

* ECSクラスター
* タスク実行ロール（IAM）
* ECSタスク定義（後でDockerイメージ連携）

### コード例

```hcl
# infra/ecs.tf
resource "aws_ecs_cluster" "main" {
  name = "tech-blog-cluster"
}

resource "aws_iam_role" "ecs_task_execution_role" {
  name = "ecsTaskExecutionRole"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Action = "sts:AssumeRole",
      Principal = { Service = "ecs-tasks.amazonaws.com" },
      Effect = "Allow"
    }]
  })
}

resource "aws_iam_role_policy_attachment" "ecs_task_execution" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}
```

### DoD

| 項目       | 確認方法           | 期待結果                                                                |
| -------- | -------------- | ------------------------------------------------------------------- |
| ECSクラスター | AWSコンソール → ECS | `tech-blog-cluster` が存在                                             |
| IAMロール   | **IAM > ロール**  | `ecsTaskExecutionRole` が存在し、`AmazonECSTaskExecutionRolePolicy` 付与済み |

---

## 🧩 ステップ4：ECR（コンテナレジストリ）

### コード例

```hcl
resource "aws_ecr_repository" "frontend" {
  name = "tech-blog-frontend"
  image_scanning_configuration { scan_on_push = true }
  tags = { Name = "frontend-repo" }
}

resource "aws_ecr_repository" "backend" {
  name = "tech-blog-backend"
  image_scanning_configuration { scan_on_push = true }
  tags = { Name = "backend-repo" }
}
```

### DoD

| 項目  | 方法                              | 結果                                            |
| --- | ------------------------------- | --------------------------------------------- |
| ECR | AWSコンソール → ECR                  | `tech-blog-frontend`, `tech-blog-backend` が存在 |
| CLI | `aws ecr describe-repositories` | repositoryUriが返る                              |

---

## 🌉 ステップ5：ALB + Target Group + Service

### コード概要

* ALB
* Target Group
* ECS Service (Fargate)
* Listener (80番)

（この段階でHello Worldコンテナを登録）

### DoD

| 項目       | 方法                             | 結果                |
| -------- | ------------------------------ | ----------------- |
| ALB      | AWSコンソール → EC2 > Load Balancer | DNS名が発行されている      |
| Listener | **ALB設定**                      | ポート80のリスナーが存在     |
| Target   | **ターゲットグループ**                  | ヘルスチェックが`healthy` |

---

## 💾 ステップ6：RDS (PostgreSQL)

※ Hello World段階では不要。Terraform構成だけ定義。

```hcl
resource "aws_db_instance" "postgres" {
  identifier = "tech-blog-db"
  engine = "postgres"
  instance_class = "db.t3.micro"
  allocated_storage = 20
  username = "admin"
  password = "changeMe123!"
  skip_final_snapshot = true
  publicly_accessible = false
  vpc_security_group_ids = [aws_security_group.db.id]
  db_subnet_group_name = aws_db_subnet_group.main.name
}
```

### DoD

| 項目            | 方法                            | 結果                         |
| ------------- | ----------------------------- | -------------------------- |
| DB作成          | AWSコンソール → RDS                | `tech-blog-db` が Available |
| 接続            | `psql -h <endpoint> -U admin` | ログインできる                    |
| SecurityGroup | **VPC > セキュリティグループ**          | ECSからの通信許可済み               |

---

## ✅ ステップ7：DoD総まとめ

| 項目                           | チェック方法                              | 状態 |
| ---------------------------- | ----------------------------------- | -- |
| Terraformがplan/applyでエラーなく動作 | `terraform plan`, `terraform apply` | ✅  |
| VPCが正しく構成                    | VPC一覧で確認                            | ✅  |
| ECSクラスター・タスクロール              | ECS/IAM                             | ✅  |
| ECRリポジトリ                     | ECR                                 | ✅  |
| ALB経由でアクセス可能                 | ALB DNS → ブラウザで"Hello World"        | ✅  |
| GitHub ActionsでECR push自動化   | Actionsログ                           | ✅  |

---

## 📘 推奨ディレクトリ構造

```bash
infra/
├── main.tf
├── provider.tf
├── vpc.tf
├── ecs.tf
├── ecr.tf
├── alb.tf
├── rds.tf
├── variables.tf
├── outputs.tf
└── terraform.tfvars
```
