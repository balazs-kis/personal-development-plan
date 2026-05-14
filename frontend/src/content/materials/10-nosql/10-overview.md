# Topic 10: NoSQL Databases

## Overview

This topic explores NoSQL databases, with a focus on MongoDB as the primary document database. We'll understand when NoSQL is appropriate, how to model data for document databases, and how to use these systems effectively from .NET applications.

**Prerequisites:** Understanding of relational databases, basic data modeling concepts

**Outcome:** Choose the right database type for different use cases and effectively use MongoDB for appropriate scenarios.

---

## Chapters

- 📁 **1. NoSQL Paradigms**
  - 📄 0. [Overview](./10.01-nosql-paradigms/10.01.00-overview.md)
  - 📄 1. [Document Databases (MongoDB, CouchDB)](./10.01-nosql-paradigms/10.01.01-document-databases.md)
  - 📄 2. [Key-Value Stores (Redis, etcd)](./10.01-nosql-paradigms/10.01.02-key-value-stores.md)
  - 📄 3. [Column-Family Stores (Cassandra, HBase)](./10.01-nosql-paradigms/10.01.03-column-family-stores.md)
  - 📄 4. [Graph Databases (Neo4j)](./10.01-nosql-paradigms/10.01.04-graph-databases.md)
  - 📄 5. [CAP Theorem and Choosing the Right Database](./10.01-nosql-paradigms/10.01.05-cap-theorem-choosing.md)

- 📁 **2. Document Database Concepts**
  - 📄 0. [Overview](./10.02-document-database-concepts/10.02.00-overview.md)
  - 📄 1. [Documents and Collections](./10.02-document-database-concepts/10.02.01-documents-collections.md)
  - 📄 2. [BSON and Data Types](./10.02-document-database-concepts/10.02.02-bson-data-types.md)
  - 📄 3. [Schema Flexibility and Validation](./10.02-document-database-concepts/10.02.03-schema-flexibility.md)
  - 📄 4. [Embedding vs Referencing](./10.02-document-database-concepts/10.02.04-embedding-vs-referencing.md)
  - 📄 5. [Document Size and Atomicity](./10.02-document-database-concepts/10.02.05-document-size-atomicity.md)

- 📁 **3. MongoDB Fundamentals**
  - 📄 0. [Overview](./10.03-mongodb-fundamentals/10.03.00-overview.md)
  - 📄 1. [CRUD Operations - Create and Read](./10.03-mongodb-fundamentals/10.03.01-crud-create-read.md)
  - 📄 2. [CRUD Operations - Update and Delete](./10.03-mongodb-fundamentals/10.03.02-crud-update-delete.md)
  - 📄 3. [Query Operators and Expressions](./10.03-mongodb-fundamentals/10.03.03-query-operators.md)
  - 📄 4. [Projections, Sort, Skip, and Limit](./10.03-mongodb-fundamentals/10.03.04-projections-sorting.md)
  - 📄 5. [MongoDB Shell and Compass](./10.03-mongodb-fundamentals/10.03.05-shell-compass.md)

- 📁 **4. Data Modeling for MongoDB**
  - 📄 0. [Overview](./10.04-data-modeling-mongodb/10.04.00-overview.md)
  - 📄 1. [One-to-One and One-to-Many Relationships](./10.04-data-modeling-mongodb/10.04.01-one-to-one-one-to-many.md)
  - 📄 2. [Many-to-Many Relationships](./10.04-data-modeling-mongodb/10.04.02-many-to-many.md)
  - 📄 3. [Embedding Patterns](./10.04-data-modeling-mongodb/10.04.03-embedding-patterns.md)
  - 📄 4. [Reference Patterns (Subset and Extended Reference)](./10.04-data-modeling-mongodb/10.04.04-reference-patterns.md)
  - 📄 5. [Schema Versioning and Evolution](./10.04-data-modeling-mongodb/10.04.05-schema-versioning.md)

- 📁 **5. MongoDB Aggregation Framework**
  - 📄 0. [Overview](./10.05-mongodb-aggregation/10.05.00-overview.md)
  - 📄 1. [Aggregation Pipeline Fundamentals](./10.05-mongodb-aggregation/10.05.01-pipeline-fundamentals.md)
  - 📄 2. [$match and $group Stages](./10.05-mongodb-aggregation/10.05.02-match-group.md)
  - 📄 3. [$project, $sort, $limit, and $skip](./10.05-mongodb-aggregation/10.05.03-project-sort-limit.md)
  - 📄 4. [$lookup for Joins and $unwind for Arrays](./10.05-mongodb-aggregation/10.05.04-lookup-unwind.md)
  - 📄 5. [Aggregation Operators and Performance](./10.05-mongodb-aggregation/10.05.05-operators-performance.md)

- 📁 **6. MongoDB Indexing and Performance**
  - 📄 0. [Overview](./10.06-mongodb-indexing/10.06.00-overview.md)
  - 📄 1. [Index Fundamentals and Types](./10.06-mongodb-indexing/10.06.01-index-fundamentals.md)
  - 📄 2. [Compound Indexes and the ESR Rule](./10.06-mongodb-indexing/10.06.02-compound-indexes-esr.md)
  - 📄 3. [Multikey, Text, and Specialized Indexes](./10.06-mongodb-indexing/10.06.03-multikey-text-indexes.md)
  - 📄 4. [Query Analysis with explain()](./10.06-mongodb-indexing/10.06.04-explain-query-analysis.md)
  - 📄 5. [Index Performance Optimization](./10.06-mongodb-indexing/10.06.05-index-optimization.md)

- 📁 **7. MongoDB with .NET**
  - 📄 0. [Overview](./10.07-mongodb-dotnet/10.07.00-overview.md)
  - 📄 1. [MongoDB Driver Setup and Basic CRUD](./10.07-mongodb-dotnet/10.07.01-driver-setup-crud.md)
  - 📄 2. [LINQ Provider and Queries](./10.07-mongodb-dotnet/10.07.02-linq-queries.md)
  - 📄 3. [BSON Serialization and Attributes](./10.07-mongodb-dotnet/10.07.03-bson-serialization.md)
  - 📄 4. [Connection Management and Configuration](./10.07-mongodb-dotnet/10.07.04-connection-management.md)
  - 📄 5. [ASP.NET Core Integration and Transactions](./10.07-mongodb-dotnet/10.07.05-aspnet-transactions.md)

- 📁 **8. Redis for Caching**
  - 📄 0. [Overview](./10.08-redis-caching/10.08.00-overview.md)
  - 📄 1. [Redis Fundamentals and Data Structures](./10.08-redis-caching/10.08.01-redis-fundamentals.md)
  - 📄 2. [Key Expiration and Eviction Policies](./10.08-redis-caching/10.08.02-expiration-eviction.md)
  - 📄 3. [Caching Patterns and Strategies](./10.08-redis-caching/10.08.03-caching-patterns.md)
  - 📄 4. [Redis with .NET using StackExchange.Redis](./10.08-redis-caching/10.08.04-redis-dotnet.md)
  - 📄 5. [Pub/Sub and Advanced Features](./10.08-redis-caching/10.08.05-pubsub-advanced.md)

- 📁 **9. Choosing Between SQL and NoSQL**
  - 📄 0. [Overview](./10.09-choosing-sql-nosql/10.09.00-overview.md)
  - 📄 1. [Data Model and Structure Considerations](./10.09-choosing-sql-nosql/10.09.01-data-model-considerations.md)
  - 📄 2. [Consistency Models and CAP Theorem](./10.09-choosing-sql-nosql/10.09.02-consistency-cap-theorem.md)
  - 📄 3. [Scalability and Performance Requirements](./10.09-choosing-sql-nosql/10.09.03-scalability-performance.md)
  - 📄 4. [Query Patterns and Workload Types](./10.09-choosing-sql-nosql/10.09.04-query-patterns-workloads.md)
  - 📄 5. [Polyglot Persistence and Decision Framework](./10.09-choosing-sql-nosql/10.09.05-polyglot-decision-framework.md)

---

## Practical Exercises

1. Design a MongoDB schema for a real-world domain (e.g., e-commerce, blog)
2. Implement a .NET application with MongoDB for CRUD operations
3. Write aggregation pipelines for reporting queries
4. Compare query performance with different indexing strategies
5. Implement a caching layer with Redis for an existing application

---

## Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [MongoDB University](https://university.mongodb.com/) (free courses)
- [Redis Documentation](https://redis.io/docs/)
- [MongoDB Applied Design Patterns](https://www.oreilly.com/library/view/mongodb-applied-design/9781449340056/)
- [MongoDB .NET Driver Documentation](https://mongodb.github.io/mongo-csharp-driver/)
