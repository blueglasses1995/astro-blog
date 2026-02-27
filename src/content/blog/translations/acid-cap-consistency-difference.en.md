---
title: The "C" in ACID and CAP Theorem Are Completely Different Concepts
description: While learning about distributed systems, I was confused by the term "Consistency". I discovered that "Consistency" in ACID and CAP theorem, despite using the same word, refers to entirely different concepts.
pubDate: 2026-02-27
tags:
  - Database
  - Distributed Systems
  - System Design
  - ACID
  - CAP Theorem
author: Toshiki Matsukuma
category: System Design
readTime: 5 min
metadataSlug: acid-cap-consistency-difference
---

While learning about distributed systems, I was confused by the meaning of "Consistency".

Having extensive experience with single-database design, I assumed "consistency" meant "whether data is in a correct state after a transaction". However, in the context of CAP theorem, it meant something completely different: "whether data is synchronized across nodes".

I realized that despite using the same word "Consistency", it referred to entirely different concepts.

## What I Discovered

While learning about CAP theorem, I noticed "Wait, isn't the 'C' in ACID different from the 'C' in CAP?" After investigating, they were indeed completely different.

### ACID Consistency (What I Initially Thought)

This is about "whether data satisfies business rules after a transaction".

For example, in a bank transfer:

```typescript
// Begin transaction
BEGIN;

// Transfer 1000 from A to B
UPDATE accounts SET balance = balance - 1000 WHERE user = 'A';
UPDATE accounts SET balance = balance + 1000 WHERE user = 'B';

// Commit
COMMIT;
```

After this transaction completes, does it maintain these rules? That's ACID Consistency:

- Is A's balance not negative?
- Are foreign key constraints not violated?
- Are application-defined business rules satisfied?

This is exactly what I initially thought.

### CAP Consistency (What CAP Theorem Refers To)

This is about "whether all nodes see the same data".

Using the same transfer example:

```typescript
// Write to Tokyo server
await tokyo.update({ user: 'A', balance: 9000 });

// Immediately read from Osaka server
const balance = await osaka.select({ user: 'A' });
// → Might still return 10000 (old value)
```

Can you read the same value from Osaka server immediately after writing to Tokyo server? That's CAP Consistency.

This is a completely different dimension - it's about synchronization between replicas over a network, not about ACID.

## Key Differences

My biggest discovery was these two points:

| Aspect | ACID "C" | CAP "C" |
|--------|----------|---------|
| Premise | Single node | Multiple nodes (distributed) |
| Target of inconsistency | Violation of business rules | Lag between replicas |

**ACID assumes a single node, CAP assumes multiple nodes** - this was my biggest finding. Despite using the same word "consistency", the target is completely different.

## Summary

While learning about distributed systems, I was confused by the meaning of "consistency". I discovered that the "C" in ACID and CAP are the same word but entirely different concepts.

Specifically, **ACID assumes a single node, CAP assumes multiple nodes**, and the targets of inconsistency differ (business rule violations vs replica lag). Being aware of these two differences makes learning distributed systems much smoother.
