# Topic 9: Advanced SQL & PostgreSQL

## Overview

This topic transforms your SQL knowledge from basic queries to advanced database expertise. We'll cover complex SQL features, query optimization, PostgreSQL-specific capabilities, and database design patterns that enable you to build performant, scalable data layers.

**Prerequisites:** Basic SQL knowledge (SELECT, INSERT, UPDATE, DELETE, simple JOINs)

**Outcome:** Write complex, optimized queries and leverage PostgreSQL's advanced features for real-world applications.

---

## Chapters

- 📁 **1. Advanced Query Techniques**
  - 📄 0. [Overview](./09.01-advanced-query-techniques/09.01.00-overview.md)
  - 📄 1. [Subqueries and Subquery Expressions](./09.01-advanced-query-techniques/09.01.01-subqueries.md)
  - 📄 2. [Common Table Expressions (CTEs)](./09.01-advanced-query-techniques/09.01.02-ctes.md)
  - 📄 3. [Recursive Queries](./09.01-advanced-query-techniques/09.01.03-recursive-queries.md)
  - 📄 4. [Set Operations](./09.01-advanced-query-techniques/09.01.04-set-operations.md)

- 📁 **2. Window Functions**
  - 📄 0. [Overview](./09.02-window-functions/09.02.00-overview.md)
  - 📄 1. [Window Functions Fundamentals](./09.02-window-functions/09.02.01-window-functions-fundamentals.md)
  - 📄 2. [Ranking Functions](./09.02-window-functions/09.02.02-ranking-functions.md)
  - 📄 3. [Aggregate Window Functions](./09.02-window-functions/09.02.03-aggregate-window-functions.md)
  - 📄 4. [Navigation Functions](./09.02-window-functions/09.02.04-navigation-functions.md)
  - 📄 5. [Window Frames and Advanced Patterns](./09.02-window-functions/09.02.05-window-frames.md)

- 📁 **3. Indexing Strategies**
  - 📄 0. [Overview](./09.03-indexing-strategies/09.03.00-overview.md)
  - 📄 1. [B-tree Indexes and Index Fundamentals](./09.03-indexing-strategies/09.03.01-btree-fundamentals.md)
  - 📄 2. [Composite Indexes and Column Order](./09.03-indexing-strategies/09.03.02-composite-indexes.md)
  - 📄 3. [Specialized Index Types](./09.03-indexing-strategies/09.03.03-specialized-index-types.md)
  - 📄 4. [Partial and Covering Indexes](./09.03-indexing-strategies/09.03.04-partial-covering-indexes.md)
  - 📄 5. [Index Maintenance and Performance](./09.03-indexing-strategies/09.03.05-index-maintenance.md)

- 📁 **4. Query Optimization and EXPLAIN**
  - 📄 0. [Overview](./09.04-query-optimization/09.04.00-overview.md)
  - 📄 1. [Understanding EXPLAIN and Query Plans](./09.04-query-optimization/09.04.01-explain-query-plans.md)
  - 📄 2. [Scan Types and Index Usage](./09.04-query-optimization/09.04.02-scan-types-index-usage.md)
  - 📄 3. [Join Algorithms and Strategies](./09.04-query-optimization/09.04.03-join-algorithms.md)
  - 📄 4. [Query Planner Statistics](./09.04-query-optimization/09.04.04-planner-statistics.md)
  - 📄 5. [Query Optimization Techniques](./09.04-query-optimization/09.04.05-optimization-techniques.md)

- 📁 **5. Transactions and Concurrency**
  - 📄 0. [Overview](./09.05-transactions-concurrency/09.05.00-overview.md)
  - 📄 1. [ACID Properties and Transaction Fundamentals](./09.05-transactions-concurrency/09.05.01-acid-transaction-fundamentals.md)
  - 📄 2. [Transaction Isolation Levels](./09.05-transactions-concurrency/09.05.02-isolation-levels.md)
  - 📄 3. [Multi-Version Concurrency Control (MVCC)](./09.05-transactions-concurrency/09.05.03-mvcc.md)
  - 📄 4. [Explicit Locking and Row-Level Locks](./09.05-transactions-concurrency/09.05.04-explicit-locking.md)
  - 📄 5. [Deadlock Detection and Prevention](./09.05-transactions-concurrency/09.05.05-deadlock-prevention.md)

- 📁 **6. PostgreSQL JSONB**
  - 📄 0. [Overview](./09.06-jsonb/09.06.00-overview.md)
  - 📄 1. [JSON vs JSONB Fundamentals](./09.06-jsonb/09.06.01-json-vs-jsonb.md)
  - 📄 2. [JSONB Operators and Querying](./09.06-jsonb/09.06.02-jsonb-operators.md)
  - 📄 3. [JSONPath and SQL/JSON Functions](./09.06-jsonb/09.06.03-jsonpath-sqljson.md)
  - 📄 4. [Indexing JSONB Columns](./09.06-jsonb/09.06.04-jsonb-indexing.md)
  - 📄 5. [JSONB vs Normalized Tables: Design Patterns](./09.06-jsonb/09.06.05-jsonb-design-patterns.md)

- 📁 **7. Full-Text Search**
  - 📄 0. [Overview](./09.07-full-text-search/09.07.00-overview.md)
  - 📄 1. [tsvector and tsquery Fundamentals](./09.07-full-text-search/09.07.01-tsvector-tsquery-fundamentals.md)
  - 📄 2. [Text Search Configurations and Dictionaries](./09.07-full-text-search/09.07.02-text-search-configurations.md)
  - 📄 3. [Indexing for Full-Text Search](./09.07-full-text-search/09.07.03-indexing-full-text-search.md)
  - 📄 4. [Ranking and Relevance](./09.07-full-text-search/09.07.04-ranking-relevance.md)
  - 📄 5. [Advanced Search Features](./09.07-full-text-search/09.07.05-advanced-search-features.md)

- 📁 **8. PostgreSQL Extensions and Advanced Features**
  - 📄 0. [Overview](./09.08-extensions-advanced-features/09.08.00-overview.md)
  - 📄 1. [pg_stat_statements for Query Analysis](./09.08-extensions-advanced-features/09.08.01-pg-stat-statements.md)
  - 📄 2. [Table Partitioning Strategies](./09.08-extensions-advanced-features/09.08.02-table-partitioning.md)
  - 📄 3. [Materialized Views](./09.08-extensions-advanced-features/09.08.03-materialized-views.md)
  - 📄 4. [Foreign Data Wrappers](./09.08-extensions-advanced-features/09.08.04-foreign-data-wrappers.md)
  - 📄 5. [Essential PostgreSQL Extensions](./09.08-extensions-advanced-features/09.08.05-essential-extensions.md)

- 📁 **9. Database Design Patterns**
  - 📄 0. [Overview](./09.09-database-design-patterns/09.09.00-overview.md)
  - 📄 1. [Normalization Fundamentals](./09.09-database-design-patterns/09.09.01-normalization-fundamentals.md)
  - 📄 2. [Denormalization Strategies](./09.09-database-design-patterns/09.09.02-denormalization-strategies.md)
  - 📄 3. [Temporal Tables and Versioning](./09.09-database-design-patterns/09.09.03-temporal-tables-versioning.md)
  - 📄 4. [Soft Deletes and Audit Logging](./09.09-database-design-patterns/09.09.04-soft-deletes-audit-logging.md)
  - 📄 5. [Schema Migration Best Practices](./09.09-database-design-patterns/09.09.05-schema-migration-practices.md)

---

## Practical Exercises

1. Write complex queries using CTEs and window functions for a reporting scenario
2. Analyze slow queries using EXPLAIN ANALYZE and optimize them
3. Design and test indexing strategies for a query workload
4. Implement a JSONB-based flexible attributes system
5. Set up full-text search with ranking for a content search feature

---

## Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [The Art of PostgreSQL by Dimitri Fontaine](https://theartofpostgresql.com/)
- [PostgreSQL: Up and Running](https://www.oreilly.com/library/view/postgresql-up-and/9781491963401/)
- [Use The Index, Luke](https://use-the-index-luke.com/)
- [pgExercises](https://pgexercises.com/)
