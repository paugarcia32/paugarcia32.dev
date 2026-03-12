---
title: "Vector Databases"
description: "How vector databases store and search unstructured data using embeddings and similarity search."
date: "Mar 12, 2026"
tags: ["AI", "System Design", "Databases"]
---

Relational databases handle structured data well. When the data is unstructured, images, audio, or text, they start to break down. A query like `WHERE tag = 'sunset'` cannot find images with similar color palettes. It finds images someone manually tagged as "sunset". This is the semantic gap: the distance between how computers store data and how humans understand it.

Vector databases close that gap.

## What Is a Vector Database?

A vector database stores, manages, and indexes **high-dimensional vector embeddings**: numerical representations of unstructured data. Similar items end up positioned close together in vector space. Dissimilar items sit far apart.

This enables **similarity search**: finding semantically related content through mathematical distance, not exact keyword matches.

| Feature | Relational DB | Vector DB |
|--------|---------------|-----------|
| Data type | Structured | Unstructured |
| Query type | Exact match | Similarity search |
| Typical data | Tables, records | Images, text, audio |
| Search example | `WHERE tag = 'sunset'` | "Find similar images" |

## Vector Embeddings

A vector embedding is an array of numbers where each position (dimension) represents a learned feature of the data.

Consider a mountain sunset image:

```
[0.91, 0.15, 0.83, ...]
  ↑      ↑      ↑
  |      |      └─ Strong warm colors (sunset)
  |      └──────── Few urban elements
  └─────────────── Significant elevation changes
```

A beach sunset would produce a different vector, but the warm-colors dimension stays similar because both images share that feature. In real systems, embeddings have hundreds to thousands of dimensions, and individual dimensions rarely map to such cleanly interpretable features.

### How Embeddings Are Created

Embedding models trained on large datasets produce these vectors. The model passes input through multiple neural network layers: early layers extract basic features (edges in images, words in text), and deeper layers extract abstract features (objects, context, meaning). The output from the deeper layers becomes the embedding.

| Data type | Example model |
|-----------|--------------|
| Images    | CLIP         |
| Text      | GloVe        |
| Audio     | Wav2Vec      |

## Vector Indexing

Comparing a query vector against millions of stored vectors one by one is too slow for production use. Vector databases solve this with **Approximate Nearest Neighbor (ANN)** algorithms, which trade a small amount of accuracy for large improvements in search speed.

**HNSW (Hierarchical Navigable Small World)** builds a multi-layered graph connecting similar vectors. Traversing the graph narrows the search to a small neighborhood quickly.

**IVF (Inverted File Index)** divides the vector space into clusters and searches only the most relevant ones for a given query, skipping the rest.

**LSH (Locality-Sensitive Hashing)** hashes similar vectors into the same buckets, enabling fast approximate lookups without scanning the full dataset.

**PQ (Product Quantization)** compresses each vector into a compact representation, reducing memory usage and speeding up distance calculations.

All four return approximate results. Applications requiring exact precision may need a different approach.

## Similarity Search

Once embeddings are indexed, a query vector is computed from the user's input. The database calculates distances between that query vector and the stored vectors and returns the closest matches.

Common distance metrics include **cosine similarity** (measures the angle between vectors, useful for text) and **Euclidean distance** (measures spatial distance). Searching for "smartphone" can return results for "phone" and "mobile device" because those terms live nearby in vector space, even if the exact word never appeared.

## RAG: The Core Use Case

Vector databases are a core component of **Retrieval-Augmented Generation (RAG)** pipelines, a pattern for grounding LLM responses in external knowledge:

1. A document corpus is chunked and stored as embeddings in the vector database.
2. When a user asks a question, the system computes a query embedding from the input.
3. The vector database returns the most semantically relevant chunks via similarity search.
4. Those chunks are passed to the LLM as context to generate a grounded response.

RAG reduces hallucinations, keeps responses anchored to real data, and reaches production faster than fine-tuning a model from scratch.

## Other Use Cases

- **Recommendation engines**: suggest products or content based on vector similarity between user preferences and items.
- **Semantic search**: search a knowledge base by meaning, not keywords.
- **Conversational AI**: back chatbots with efficient retrieval over large knowledge bases.
- **Anomaly detection**: flag items that fall far from all clusters in vector space.
- **Image and audio recognition**: find visually or acoustically similar media.

## Popular Options

| Type | Examples |
|------|---------|
| Proprietary | Pinecone |
| Open source | Weaviate, Milvus |
| DB extension | pgvector (PostgreSQL) |
| Data platform | IBM watsonx.data |

**LangChain** is the most common orchestration layer on top of these stores. It supports over 25 embedding methods and 50 vector stores, and handles the chunking, embedding, and retrieval pipeline in a few lines of code.

---

The semantic gap is a real constraint when building systems that work with unstructured data. Vector databases solve it with a different data model: store meaning as geometry, and search by proximity. Understanding how embeddings, indexing, and similarity search fit together is the foundation for building any modern AI retrieval system.
