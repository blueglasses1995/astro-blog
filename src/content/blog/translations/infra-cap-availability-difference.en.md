---
title: The "A" in CAP Theorem Is Completely Different from Infrastructure "Availability"
description: While learning about CAP theorem in distributed systems, I was confused by the meaning of "Availability". I discovered that infrastructure "availability" and CAP theorem "availability", despite using the same word, are entirely different concepts.
pubDate: 2026-02-27
tags:
  - Database
  - Distributed Systems
  - System Design
  - CAP Theorem
  - Infrastructure
author: Toshiki Matsukuma
category: System Design
readTime: 5 min
metadataSlug: infra-cap-availability-difference
---

While learning about CAP theorem in distributed systems, I was confused by the term "Availability". Following [ACID and CAP "Consistency"](/blog/acid-cap-consistency-difference), now it's "Availability".

Having had many opportunities to work with infrastructure, when I heard "availability", I assumed it meant "making servers redundant so the system continues working even if one fails". However, in the context of CAP theorem, it meant something completely different: "during network partition, whether to return an error or return stale data".

I realized that despite using the same word "Availability", it referred to entirely different concepts.

## What I Noticed

While learning about CAP theorem, I noticed "Wait, doesn't availability have two different meanings?" After investigating, they were indeed different.

### Infrastructure Availability (What I Initially Thought)

This is about "whether servers are physically running".

For example:

```
User → LB → Server A (running)
            Server B (stopped) ← Even if B is down, A can handle it
```

The goal is to prevent situations where users see "cannot connect" or "timeout". This is about physical redundancy.

### CAP Availability (What CAP Theorem Refers To)

This is about "how to behave during network partition".

For example:

```
User → Server A (running)
       Server B (running) ← Both are running, but A-B communication is cut
```

Both servers are running. Users can connect to both. But communication between servers is cut.

In this situation:
- **Prioritize consistency**: Return an error ("I cannot guarantee data consistency right now, so I'm refusing the request")
- **Prioritize availability**: Return stale data ("It might be slightly outdated, but here you go")

CAP availability is about this choice.

## Key Differences

My biggest discovery was these two points:

| Aspect | Infrastructure Availability | CAP Availability |
|--------|----------------------------|-----------------|
| Premise | None (establishing physical survival) | Infrastructure is running |
| "Unavailable" state | Timeout, cannot connect | Error response (5xx) |

**CAP availability assumes "infrastructure is running"** - this was my biggest finding. Despite both using the word "availability", the premises are completely different.

## Summary

While learning about CAP theorem, I was confused by the meaning of "availability". I discovered that infrastructure availability and CAP availability, despite using the same word, are problems at entirely different layers.

Specifically, **CAP availability assumes "infrastructure is running"**, and the behavior when unavailable differs (timeout vs 5xx error). Being aware of these two differences makes learning distributed systems much smoother.
