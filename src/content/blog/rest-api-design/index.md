---
title: "REST API Design Principles"
description: "A practical guide to designing REST APIs: endpoints, status codes, versioning, and security."
date: "Mar 6, 2026"
tags: ["Backend", "REST API", "System Design"]
---
REST APIs are everywhere, yet many are inconsistent, hard to consume, or break clients unexpectedly. This post covers the design decisions that lead to APIs that behave predictably and scale well.

## The Richardson Maturity Model

Richardson's model defines four levels of REST API maturity:

| Level | Description |
|-------|-------------|
| 0 | HTTP as a transport only |
| 1 | Resource-oriented URIs |
| 2 | Proper HTTP verbs and status codes |
| 3 | HATEOAS: hypermedia links in responses |

Most production APIs target **Level 2**. It covers resources, verbs, and status codes: enough for a well-behaved API. Level 3 adds discoverability but comes with tradeoffs (discussed at the end).

## Stateless Design

A REST API must be stateless: the server stores no session state between requests. Every request carries all the information needed to process it.

This matters because any server in the cluster can handle any request, which makes the system easier to scale horizontally and more fault-tolerant.

Statelessness does not mean the application stores no data. It means the server does not remember previous requests. For user-specific state like a shopping cart:

1. Store it externally, in a database or cache (e.g. Redis).
2. Identify the user on every request with a token (JWT).

The same request always produces the same response, which makes caching straightforward.

## Security

Two rules apply to any production API.

**Use HTTPS.** HTTP sends data in plain text. An attacker on the network can read and modify it. HTTPS prevents this. There is no excuse for an API that accepts plain HTTP.

**Use JWT for authentication.** A JSON Web Token is a signed, self-contained credential the client sends with every request. The server validates the signature without consulting a session store.

When using JWTs:

- Store tokens where they cannot be stolen (mind XSS and CSRF attack surfaces).
- Set expiration times and implement token refresh.
- Validate tokens rigorously on the server. Never trust client-supplied claims.

## Endpoint Design

The URL is the interface. A poorly named URL makes an API hard to use and harder to evolve. Five rules bring a URL from bad to correct:

```
# Start: a common mess
GET /api/order/GetActiveItems/?orderId=123/

# 1. No trailing slash
GET /api/order/GetActiveItems?orderId=123

# 2. Use path params for hierarchy, not query strings
GET /api/order/123/GetActiveItems

# 3. Hyphens, not camelCase or underscores
GET /api/order/123/get-active-items

# 4. Resources, not actions: remove verbs
GET /api/order/123/active-items

# 5. Plural nouns
GET /api/orders/123/active-items   ✓
```

Keep nesting shallow. Beyond two levels, URLs become hard to read and hard to maintain. `/api/customers/2/stores/32/orders/123/items` is too deep. Flatten it with a dedicated endpoint.

HTTP verbs map to CRUD operations. Encode the action in the verb, not the URL:

| Verb | Operation |
|------|-----------|
| GET | Read |
| POST | Create |
| PUT / PATCH | Update |
| DELETE | Delete |

## Response Format

Return structured data, not plain text. JSON is the standard: simple, widely supported, and lightweight. XML is verbose. YAML has poor compatibility across clients. Pick JSON and stick to it.

## Status Codes

Status codes communicate the outcome of a request. Using `500` for everything is not error handling. Use the right code:

| Code | When to use |
|------|-------------|
| 200 | OK |
| 201 | Created |
| 400 | Bad request (client error) |
| 401 | Unauthorized (no credentials) |
| 403 | Forbidden (authenticated but not allowed) |
| 404 | Resource not found |
| 500 | Internal server error |

The distinction between 401 and 403 matters. A 401 means the client has not authenticated. A 403 means the client is authenticated but lacks permission.

## Versioning

APIs change. New requirements come in, old behaviors become wrong, and breaking changes happen. Versioning prevents those changes from breaking existing clients.

Three approaches exist:

```
# URI versioning: most common, works well with caching
GET /api/v1/orders

# Query parameter
GET /api/orders?version=1

# Custom header: preferred by REST purists
Accept: application/vnd.myapi.v1+json
```

URI versioning is the most practical choice. It is explicit, visible in logs, and cache-friendly. Header versioning is cleaner from a REST perspective but harder to test and less visible.

## HATEOAS

HATEOAS (Hypermedia as the Engine of Application State) is Level 3 of the maturity model. Responses include links that describe available actions, so clients discover the API rather than hardcode URLs:

```json
{
  "order": { "id": "g21jho9", "total": "209.11" },
  "_links": {
    "self":    { "href": "/api/orders/g21jho9" },
    "items":   { "href": "/api/orders/g21jho9/items" },
    "details": { "href": "/api/orders/g21jho9/details" }
  }
}
```

The server can change its URL structure without breaking clients, since clients follow links rather than construct URLs themselves.

In practice, HATEOAS sees low adoption. The performance overhead is real, no widely accepted standard exists for the link format, and most client teams prefer explicit API documentation over self-discovery. Understand it, but do not assume you need it.

---

Level 2 REST covers what most production APIs need: resources, verbs, status codes, versioning, and HTTPS. Get those right before reaching for Level 3.
