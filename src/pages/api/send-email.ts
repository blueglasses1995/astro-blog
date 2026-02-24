import type { APIContext } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

export async function POST(context: APIContext) {
  try {
    const body = await context.request.json();
    const { name, email, message, subject } = body;

    // バリデーション
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: '名前、メールアドレス、メッセージは必須です。' 
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // メールアドレスの形式チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: '有効なメールアドレスを入力してください。' 
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Get env vars from Cloudflare runtime
    const runtime = (context.locals as any).runtime;
    const resendApiKey = runtime?.env?.RESEND_API_KEY || import.meta.env.RESEND_API_KEY;
    const toEmail = runtime?.env?.CONTACT_EMAIL || import.meta.env.CONTACT_EMAIL || 'contact@tosh-dot-sh.dev';

    if (!resendApiKey) {
      console.error('RESEND_API_KEY not configured');
      return new Response(
        JSON.stringify({ success: false, error: 'Email service not configured.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const resend = new Resend(resendApiKey);

    // メール送信
    const { data, error } = await resend.emails.send({
      from: 'tosh.sh Contact <contact@notification.tosh-dot-sh.dev>',
      to: [toEmail],
      replyTo: email,
      subject: subject || `お問い合わせ: ${name}様より`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4F46E5; padding-bottom: 10px;">
            新しいお問い合わせ
          </h2>
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>名前:</strong> ${name}</p>
            <p><strong>メールアドレス:</strong> ${email}</p>
            ${subject ? `<p><strong>件名:</strong> ${subject}</p>` : ''}
          </div>
          <div style="margin: 20px 0;">
            <h3 style="color: #333;">メッセージ:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
            <p>このメールはポートフォリオサイトのお問い合わせフォームから送信されました。</p>
          </div>
        </div>
      `,
      text: `
新しいお問い合わせ

名前: ${name}
メールアドレス: ${email}
${subject ? `件名: ${subject}` : ''}

メッセージ:
${message}
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'メールの送信に失敗しました。しばらくしてから再度お試しください。' 
        }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'メールを送信しました。ありがとうございます！' 
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Email sending error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'サーバーエラーが発生しました。' 
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}




