# Topic 12: Performance Engineering

## Overview

This topic covers the discipline of performance engineering: measuring, analyzing, and optimizing application performance. We'll learn profiling techniques, caching strategies, load testing, and scalability patterns that ensure applications perform well under real-world conditions.

**Prerequisites:** Experience building and deploying applications, basic understanding of system resources

**Outcome:** Identify performance bottlenecks, optimize critical paths, and design systems that scale.

---

## Chapters

- 📁 **1. Performance Engineering Fundamentals**
  - 📄 0. [Overview](./12.01-performance-fundamentals/12.01.00-overview.md)
  - 📄 1. [Performance Requirements and SLAs](./12.01-performance-fundamentals/12.01.01-performance-requirements.md)
  - 📄 2. [Latency, Throughput, and Key Metrics](./12.01-performance-fundamentals/12.01.02-latency-throughput.md)
  - 📄 3. [Understanding Percentiles](./12.01-performance-fundamentals/12.01.03-percentiles.md)
  - 📄 4. [Resource Utilization Monitoring](./12.01-performance-fundamentals/12.01.04-resource-utilization.md)
  - 📄 5. [Performance Testing vs Production Monitoring](./12.01-performance-fundamentals/12.01.05-testing-vs-monitoring.md)

- 📁 **2. Profiling .NET Applications**
  - 📄 0. [Overview](./12.02-profiling-dotnet/12.02.00-overview.md)
  - 📄 1. [CPU Profiling with Visual Studio and PerfView](./12.02-profiling-dotnet/12.02.01-cpu-profiling.md)
  - 📄 2. [Memory Profiling and Leak Detection](./12.02-profiling-dotnet/12.02.02-memory-profiling.md)
  - 📄 3. [Allocation Tracking and GC Analysis](./12.02-profiling-dotnet/12.02.03-allocation-tracking.md)
  - 📄 4. [Flame Graphs and Call Tree Analysis](./12.02-profiling-dotnet/12.02.04-flame-graphs.md)
  - 📄 5. [Production Profiling Techniques](./12.02-profiling-dotnet/12.02.05-production-profiling.md)

- 📁 **3. Benchmarking with BenchmarkDotNet**
  - 📄 0. [Overview](./12.03-benchmarking-benchmarkdotnet/12.03.00-overview.md)
  - 📄 1. [Benchmark Setup and Configuration](./12.03-benchmarking-benchmarkdotnet/12.03.01-benchmark-setup.md)
  - 📄 2. [Memory Diagnosers and Allocation Tracking](./12.03-benchmarking-benchmarkdotnet/12.03.02-memory-diagnosers.md)
  - 📄 3. [Parameterized Benchmarks](./12.03-benchmarking-benchmarkdotnet/12.03.03-parameterized-benchmarks.md)
  - 📄 4. [Comparing Implementations and Interpreting Results](./12.03-benchmarking-benchmarkdotnet/12.03.04-comparing-implementations.md)

- 📁 **4. Memory Management and GC Optimization**
  - 📄 0. [Overview](./12.04-memory-management-gc/12.04.00-overview.md)
  - 📄 1. [GC Generations and Collection](./12.04-memory-management-gc/12.04.01-gc-generations.md)
  - 📄 2. [Large Object Heap (LOH)](./12.04-memory-management-gc/12.04.02-large-object-heap.md)
  - 📄 3. [GC Modes (Workstation vs Server)](./12.04-memory-management-gc/12.04.03-gc-modes.md)
  - 📄 4. [Reducing Allocations](./12.04-memory-management-gc/12.04.04-reducing-allocations.md)
  - 📄 5. [Object Pooling and ArrayPool](./12.04-memory-management-gc/12.04.05-object-pooling.md)

- 📁 **5. Caching Strategies**
  - 📄 0. [Overview](./12.05-caching-strategies/12.05.00-overview.md)
  - 📄 1. [In-Memory Caching with IMemoryCache](./12.05-caching-strategies/12.05.01-in-memory-caching.md)
  - 📄 2. [Cache-Aside Pattern Implementation](./12.05-caching-strategies/12.05.02-cache-aside-pattern.md)
  - 📄 3. [Distributed Caching with Redis](./12.05-caching-strategies/12.05.03-distributed-caching-redis.md)
  - 📄 4. [Cache Invalidation and Eviction Strategies](./12.05-caching-strategies/12.05.04-cache-invalidation.md)
  - 📄 5. [Write-Through and Write-Behind Patterns](./12.05-caching-strategies/12.05.05-write-patterns.md)

- 📁 **6. Database Performance**
  - 📄 0. [Overview](./12.06-database-performance/12.06.00-overview.md)
  - 📄 1. [Query Optimization and Indexing Fundamentals](./12.06-database-performance/12.06.01-query-optimization.md)
  - 📄 2. [Connection Pooling and DbContext Management](./12.06-database-performance/12.06.02-connection-pooling.md)
  - 📄 3. [Solving the N+1 Query Problem](./12.06-database-performance/12.06.03-n-plus-one-problem.md)
  - 📄 4. [Batch Operations and Bulk Updates](./12.06-database-performance/12.06.04-batch-operations.md)
  - 📄 5. [EF Core Performance Best Practices](./12.06-database-performance/12.06.05-ef-core-best-practices.md)

- 📁 **7. Async and Concurrency Performance**
  - 📄 0. [Overview](./12.07-async-concurrency/12.07.00-overview.md)
  - 📄 1. [Async/Await Performance and Overhead](./12.07-async-concurrency/12.07.01-async-overhead.md)
  - 📄 2. [ConfigureAwait and Synchronization Contexts](./12.07-async-concurrency/12.07.02-configureawait.md)
  - 📄 3. [Parallel Processing with Parallel.ForEachAsync](./12.07-async-concurrency/12.07.03-parallel-processing.md)
  - 📄 4. [Producer-Consumer Patterns with Channels](./12.07-async-concurrency/12.07.04-channels.md)
  - 📄 5. [Avoiding Async Anti-Patterns](./12.07-async-concurrency/12.07.05-async-antipatterns.md)

- 📁 **8. Load Testing**
  - 📄 0. [Overview](./12.08-load-testing/12.08.00-overview.md)
  - 📄 1. [Load Testing Fundamentals and Types](./12.08-load-testing/12.08.01-fundamentals-types.md)
  - 📄 2. [Test Scenario Design and Planning](./12.08-load-testing/12.08.02-scenario-design.md)
  - 📄 3. [Load Testing with k6](./12.08-load-testing/12.08.03-k6-load-testing.md)
  - 📄 4. [Load Testing .NET with NBomber](./12.08-load-testing/12.08.04-nbomber.md)
  - 📄 5. [Analyzing Results and Identifying Bottlenecks](./12.08-load-testing/12.08.05-analyzing-results.md)

- 📁 **9. Scalability Patterns**
  - 📄 0. [Overview](./12.09-scalability-patterns/12.09.00-overview.md)
  - 📄 1. [Horizontal vs Vertical Scaling](./12.09-scalability-patterns/12.09.01-horizontal-vertical-scaling.md)
  - 📄 2. [Stateless Service Design](./12.09-scalability-patterns/12.09.02-stateless-services.md)
  - 📄 3. [Database Scaling Patterns](./12.09-scalability-patterns/12.09.03-database-scaling.md)
  - 📄 4. [Load Balancing and Auto-Scaling](./12.09-scalability-patterns/12.09.04-load-balancing-autoscaling.md)
  - 📄 5. [Identifying Scalability Bottlenecks](./12.09-scalability-patterns/12.09.05-identifying-bottlenecks.md)

---

## Practical Exercises

1. Profile an application and identify the top 3 performance bottlenecks
2. Create benchmarks comparing different implementations of a critical operation
3. Implement a multi-level caching strategy with Redis
4. Design and execute a load test for an API
5. Optimize a data access layer to eliminate N+1 queries

---

## Resources

- [Writing High-Performance .NET Code by Ben Watson](https://www.writinghighperf.net/)
- [Pro .NET Memory Management by Konrad Kokosa](https://prodotnetmemory.com/)
- [BenchmarkDotNet Documentation](https://benchmarkdotnet.org/articles/overview.html)
- [k6 Load Testing Documentation](https://k6.io/docs/)
- [.NET Performance Tips](https://docs.microsoft.com/en-us/dotnet/framework/performance/)
