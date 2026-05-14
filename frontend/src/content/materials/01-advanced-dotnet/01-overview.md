# Topic 1: Advanced .NET & C#

## Overview

This topic deepens your mastery of the .NET ecosystem and C# language, focusing on features and techniques that distinguish expert developers from intermediate ones. We'll explore the latest language innovations, runtime internals, high-performance programming, and modern framework capabilities.

**Prerequisites:** Solid C# fundamentals, experience with .NET Core/5+

**Outcome:** Write more expressive, performant, and maintainable code while leveraging cutting-edge .NET capabilities.

---

## Chapters

- 📁 **1. Modern C# Language Features**
  - 📄 0. [Overview](./01.01-modern-csharp-features/01.01.00-overview.md)
  - 📄 1. [Pattern Matching Deep Dive](./01.01-modern-csharp-features/01.01.01-pattern-matching.md)
  - 📄 2. [Records and Immutability](./01.01-modern-csharp-features/01.01.02-records-immutability.md)
  - 📄 3. [Nullable Reference Types](./01.01-modern-csharp-features/01.01.03-nullable-reference-types.md)
  - 📄 4. [Primary Constructors and New Features](./01.01-modern-csharp-features/01.01.04-primary-constructors.md)

- 📁 **2. Asynchronous Programming Mastery**
  - 📄 0. [Overview](./01.02-async-programming/01.02.00-overview.md)
  - 📄 1. [Task-Based Async Pattern Fundamentals](./01.02-async-programming/01.02.01-task-fundamentals.md)
  - 📄 2. [ValueTask and Performance Optimization](./01.02-async-programming/01.02.02-valuetask-performance.md)
  - 📄 3. [IAsyncEnumerable and Async Streams](./01.02-async-programming/01.02.03-async-streams.md)
  - 📄 4. [Common Async Pitfalls and Debugging](./01.02-async-programming/01.02.04-async-pitfalls.md)

- 📁 **3. High-Performance .NET**
  - 📄 0. [Overview](./01.03-high-performance-dotnet/01.03.00-overview.md)
  - 📄 1. [Span and Memory](./01.03-high-performance-dotnet/01.03.01-span-memory.md)
  - 📄 2. [ArrayPool and Object Pooling](./01.03-high-performance-dotnet/01.03.02-object-pooling.md)
  - 📄 3. [Stack Allocation and Ref Structs](./01.03-high-performance-dotnet/01.03.03-stack-allocation.md)
  - 📄 4. [Garbage Collection Tuning](./01.03-high-performance-dotnet/01.03.04-gc-tuning.md)

- 📁 **4. .NET Runtime Internals**
  - 📄 0. [Overview](./01.04-runtime-internals/01.04.00-overview.md)
  - 📄 1. [JIT and Tiered Compilation](./01.04-runtime-internals/01.04.01-jit-compilation.md)
  - 📄 2. [Assembly Loading and AssemblyLoadContext](./01.04-runtime-internals/01.04.02-assembly-loading.md)
  - 📄 3. [Native AOT Compilation](./01.04-runtime-internals/01.04.03-native-aot.md)
  - 📄 4. [Memory Internals and Heap Management](./01.04-runtime-internals/01.04.04-memory-internals.md)
  - 📄 5. [Interop and P/Invoke Source Generation](./01.04-runtime-internals/01.04.05-interop-pinvoke.md)

- 📁 **5. Source Generators and Metaprogramming**
  - 📄 0. [Overview](./01.05-source-generators/01.05.00-overview.md)
  - 📄 1. [Source Generator Fundamentals](./01.05-source-generators/01.05.01-generator-fundamentals.md)
  - 📄 2. [Creating Your First Generator](./01.05-source-generators/01.05.02-creating-generators.md)
  - 📄 3. [Emitting Diagnostics and Working with Analyzers](./01.05-source-generators/01.05.03-diagnostics-analyzers.md)
  - 📄 4. [Real-World Generator Patterns and Use Cases](./01.05-source-generators/01.05.04-real-world-patterns.md)
  - 📄 5. [Advanced Techniques and Production Deployment](./01.05-source-generators/01.05.05-advanced-deployment.md)

- 📁 **6. Modern ASP.NET Core Features**
  - 📄 0. [Overview](./01.06-modern-aspnet-core/01.06.00-overview.md)
  - 📄 1. [Minimal APIs Fundamentals](./01.06-modern-aspnet-core/01.06.01-minimal-apis.md)
  - 📄 2. [Endpoint Filters and Rate Limiting](./01.06-modern-aspnet-core/01.06.02-endpoint-filters.md)
  - 📄 3. [Middleware and Request Pipeline](./01.06-modern-aspnet-core/01.06.03-middleware-pipeline.md)
  - 📄 4. [Dependency Injection and Configuration](./01.06-modern-aspnet-core/01.06.04-dependency-injection-configuration.md)
  - 📄 5. [Background Services and Hosted Services](./01.06-modern-aspnet-core/01.06.05-background-services.md)

- 📁 **7. gRPC and High-Performance Communication**
  - 📄 0. [Overview](./01.07-grpc-communication/01.07.00-overview.md)
  - 📄 1. [Protocol Buffers and gRPC Basics](./01.07-grpc-communication/01.07.01-grpc-basics.md)
  - 📄 2. [gRPC Streaming](./01.07-grpc-communication/01.07.02-grpc-streaming.md)
  - 📄 3. [gRPC Authentication and Authorization](./01.07-grpc-communication/01.07.03-authentication-authorization.md)
  - 📄 4. [gRPC Interceptors and Performance](./01.07-grpc-communication/01.07.04-interceptors-performance.md)
  - 📄 5. [Production Deployment and Monitoring](./01.07-grpc-communication/01.07.05-production-deployment.md)

- 📁 **8. Benchmarking and Profiling**
  - 📄 0. [Overview](./01.08-benchmarking-profiling/01.08.00-overview.md)
  - 📄 1. [BenchmarkDotNet Fundamentals](./01.08-benchmarking-profiling/01.08.01-benchmarkdotnet.md)
  - 📄 2. [CPU and Memory Profiling](./01.08-benchmarking-profiling/01.08.02-profiling.md)
  - 📄 3. [Advanced BenchmarkDotNet Techniques](./01.08-benchmarking-profiling/01.08.03-advanced-benchmarking.md)
  - 📄 4. [.NET Diagnostic Tools](./01.08-benchmarking-profiling/01.08.04-diagnostic-tools.md)
  - 📄 5. [Production Performance Monitoring](./01.08-benchmarking-profiling/01.08.05-production-monitoring.md)

---

## Practical Exercises

1. Refactor a codebase to use modern C# features (records, pattern matching, nullable reference types)
2. Implement a high-throughput data processing pipeline using Span<T> and ArrayPool
3. Create a source generator that eliminates reflection from a serialization scenario
4. Build a gRPC service with bidirectional streaming
5. Profile an existing application and optimize the top 3 bottlenecks

---

## Resources

- [What's new in C# - Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/csharp/whats-new/)
- [.NET Blog](https://devblogs.microsoft.com/dotnet/)
- [Writing High-Performance .NET Code by Ben Watson](https://www.amazon.com/Writing-High-Performance-NET-Code-Watson/dp/0990583457)
- [BenchmarkDotNet Documentation](https://benchmarkdotnet.org/)
- [Stephen Toub's Blog Posts on .NET Performance](https://devblogs.microsoft.com/dotnet/author/toub/)
