---
title: "Observability"
description: "What observability is, why it matters, and the three pillars: logs, metrics, and traces."
date: "Apr 6, 2026"
tags: ["Backend", "System Design"]
---
When a system breaks at 2am, you have two options: guess at the cause or know it. Observability is what makes the second option possible.

## What Is Observability?

Observability is the ability to understand what is happening inside your system by examining its outputs. A doctor orders blood tests and X-rays to understand what is going on inside a patient's body. Engineers use observability tools to do the same with software.

Without it, your system is a black box. You see inputs and outputs, but nothing in between. That works until something breaks, and then you have no idea where to start.

## Why It Matters

Good observability gives you three concrete advantages:

- You identify and fix bugs faster because you can trace the exact sequence of events that led to the failure.
- You find performance bottlenecks before they become user-facing problems.
- You understand the system as a whole, not just the part you wrote.

That last point matters more than it sounds. A developer who can read a production system is more useful than one who can only read their own code.

## The Three Pillars

### Logs

Logs are the first thing you should add to any system. They are a continuous stream of text entries that capture events as they happen, in the order they happened: a flight recorder for your software.

Every log entry should include:

| Field | Description |
|-------|-------------|
| Level | `INFO`, `WARN`, `ERROR`, `CRITICAL` — indicates severity |
| Timestamp | Exact datetime of when the event occurred |
| Message | Description of what happened, including relevant IDs and context |

One hard rule: never log secrets. API keys, tokens, passwords, cookies, and card numbers must never appear in logs. Anyone with log access can exploit them.

### Metrics

Metrics give you quantitative data about your system's behavior over time. Three are worth tracking from the start.

**Latency** measures how long a part of your system takes to respond. Track it at these percentiles:

| Percentile | What it tells you |
|------------|------------------|
| P50 | 50% of requests respond within X ms (your typical case) |
| P95 | 95% of requests respond within X ms |
| P99 | 99% of requests respond within X ms |

The remaining 1% are edge cases and are excluded to avoid skewing the data.

**Error rate** tracks the rate of 5xx HTTP responses (500, 502, 503, etc.). It answers concrete questions: are errors spiking at a specific time of day? Is one service failing more than others? Are certain users consistently triggering failures?

**Throughput** measures requests per second or per minute. It answers capacity questions: should you scale up and add replicas? Are you handling far fewer requests than your infrastructure was designed for?

### Traces

Traces follow the full journey of a single request across multiple services. Each step in the journey is a **span**, capturing the server, IP, latency, and errors for that step. A **trace** is the complete sequence of spans for one execution, stitched together by a shared Trace ID. Visualization tools render traces as a connected graph of boxes, each with its own timing and log data.

Traces are most useful in microservice architectures or flows that involve several external services. For a small application or a monolith with simple operations, logs and metrics are enough. Adding traces before you need them adds instrumentation complexity with little practical return.

## When to Add Each Pillar

| Pillar | What it answers | When to add it |
|--------|----------------|----------------|
| Logs | What happened? | Always, start here |
| Metrics | How is the system performing? | Early on |
| Traces | Where exactly did it fail or slow down? | Once you have logs and metrics |

Good observability turns debugging from guesswork into diagnosis. You do not need all three pillars on day one, but you do need a plan for getting there.
