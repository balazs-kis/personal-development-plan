# Topic 3: Distributed Systems & Microservices

## Overview

This topic covers the theory and practice of building distributed systems, with a focus on microservices architecture. We'll explore the fundamental challenges of distribution, patterns for decomposing monoliths, and strategies for building resilient, scalable services.

**Prerequisites:** Understanding of basic system design, experience with monolithic applications

**Outcome:** Design and build distributed systems that handle failures gracefully and scale effectively.

---

## Chapters

- 📁 **1. Distributed Systems Fundamentals**
  - 📄 0. [Overview](./03.01-distributed-systems-fundamentals/03.01.00-overview.md)
  - 📄 1. [The Fallacies of Distributed Computing](./03.01-distributed-systems-fundamentals/03.01.01-fallacies.md)
  - 📄 2. [CAP Theorem and Trade-offs](./03.01-distributed-systems-fundamentals/03.01.02-cap-theorem.md)
  - 📄 3. [Network Partitions and Partial Failures](./03.01-distributed-systems-fundamentals/03.01.03-network-partitions.md)
  - 📄 4. [Time, Clocks, and Ordering](./03.01-distributed-systems-fundamentals/03.01.04-time-and-ordering.md)
  - 📄 5. [Reliability Patterns and Exactly-Once Delivery](./03.01-distributed-systems-fundamentals/03.01.05-reliability-patterns.md)

- 📁 **2. Consistency Models**
  - 📄 0. [Overview](./03.02-consistency-models/03.02.00-overview.md)
  - 📄 1. [Strong Consistency and Linearizability](./03.02-consistency-models/03.02.01-strong-consistency.md)
  - 📄 2. [Eventual Consistency and Convergence](./03.02-consistency-models/03.02.02-eventual-consistency.md)
  - 📄 3. [Causal Consistency](./03.02-consistency-models/03.02.03-causal-consistency.md)
  - 📄 4. [Session Guarantees and Read-Your-Writes](./03.02-consistency-models/03.02.04-session-guarantees.md)
  - 📄 5. [Choosing the Right Consistency Model](./03.02-consistency-models/03.02.05-choosing-consistency.md)

- 📁 **3. Microservices Architecture Principles**
  - 📄 0. [Overview](./03.03-microservices-architecture/03.03.00-overview.md)
  - 📄 1. [Microservices Fundamentals and When to Use Them](./03.03-microservices-architecture/03.03.01-fundamentals.md)
  - 📄 2. [Identifying Service Boundaries](./03.03-microservices-architecture/03.03.02-service-boundaries.md)
  - 📄 3. [Conway's Law and Team Autonomy](./03.03-microservices-architecture/03.03.03-conways-law.md)
  - 📄 4. [Independent Deployability and Polyglot Persistence](./03.03-microservices-architecture/03.03.04-independence.md)
  - 📄 5. [Microservices vs Monoliths: Making the Right Choice](./03.03-microservices-architecture/03.03.05-monolith-vs-microservices.md)

- 📁 **4. Service Decomposition Strategies**
  - 📄 0. [Overview](./03.04-service-decomposition/03.04.00-overview.md)
  - 📄 1. [Decomposing by Business Capability](./03.04-service-decomposition/03.04.01-business-capability.md)
  - 📄 2. [DDD Bounded Contexts as Service Boundaries](./03.04-service-decomposition/03.04.02-bounded-contexts.md)
  - 📄 3. [Strangler Fig Pattern for Migration](./03.04-service-decomposition/03.04.03-strangler-fig.md)
  - 📄 4. [Database Decomposition Strategies](./03.04-service-decomposition/03.04.04-database-decomposition.md)
  - 📄 5. [Avoiding Distributed Monoliths and Shared Libraries](./03.04-service-decomposition/03.04.05-avoiding-pitfalls.md)

- 📁 **5. Inter-Service Communication**
  - 📄 0. [Overview](./03.05-inter-service-communication/03.05.00-overview.md)
  - 📄 1. [Synchronous vs Asynchronous Communication](./03.05-inter-service-communication/03.05.01-sync-vs-async.md)
  - 📄 2. [REST and gRPC for Service Communication](./03.05-inter-service-communication/03.05.02-rest-grpc.md)
  - 📄 3. [Event-Driven Communication Patterns](./03.05-inter-service-communication/03.05.03-event-driven.md)
  - 📄 4. [API Gateways and Service Mesh](./03.05-inter-service-communication/03.05.04-api-gateway-service-mesh.md)
  - 📄 5. [Handling Communication Failures](./03.05-inter-service-communication/03.05.05-handling-failures.md)

- 📁 **6. Data Management in Distributed Systems**
  - 📄 0. [Overview](./03.06-data-management/03.06.00-overview.md)
  - 📄 1. [Database per Service Pattern](./03.06-data-management/03.06.01-database-per-service.md)
  - 📄 2. [Saga Pattern for Distributed Transactions](./03.06-data-management/03.06.02-saga-pattern.md)
  - 📄 3. [Event Sourcing](./03.06-data-management/03.06.03-event-sourcing.md)
  - 📄 4. [CQRS Pattern](./03.06-data-management/03.06.04-cqrs.md)
  - 📄 5. [Data Consistency Strategies](./03.06-data-management/03.06.05-consistency-strategies.md)

- 📁 **7. Resilience Patterns**
  - 📄 0. [Overview](./03.07-resilience-patterns/03.07.00-overview.md)
  - 📄 1. [Circuit Breaker Pattern](./03.07-resilience-patterns/03.07.01-circuit-breaker.md)
  - 📄 2. [Retry Patterns with Exponential Backoff](./03.07-resilience-patterns/03.07.02-retry-patterns.md)
  - 📄 3. [Timeouts and Bulkhead Pattern](./03.07-resilience-patterns/03.07.03-timeouts-bulkhead.md)
  - 📄 4. [Fallback Strategies and Graceful Degradation](./03.07-resilience-patterns/03.07.04-fallback-strategies.md)
  - 📄 5. [Implementing Resilience with Polly in .NET](./03.07-resilience-patterns/03.07.05-polly-library.md)

- 📁 **8. Service Discovery and Load Balancing**
  - 📄 0. [Overview](./03.08-service-discovery/03.08.00-overview.md)
  - 📄 1. [Service Discovery Fundamentals](./03.08-service-discovery/03.08.01-service-discovery-fundamentals.md)
  - 📄 2. [Client-Side vs Server-Side Discovery](./03.08-service-discovery/03.08.02-discovery-patterns.md)
  - 📄 3. [Health Checking and Heartbeats](./03.08-service-discovery/03.08.03-health-checking.md)
  - 📄 4. [Load Balancing Strategies](./03.08-service-discovery/03.08.04-load-balancing.md)
  - 📄 5. [Service Mesh Introduction](./03.08-service-discovery/03.08.05-service-mesh.md)

---

## Practical Exercises

1. Analyze a monolithic application and propose service boundaries
2. Implement a saga pattern for a multi-service workflow
3. Add circuit breakers and retries to service communication using Polly
4. Set up service discovery with Consul or Kubernetes
5. Conduct a chaos engineering exercise (manually fail a service and observe behavior)

---

## Resources

- [Building Microservices by Sam Newman](https://samnewman.io/books/building_microservices_2nd_edition/)
- [Designing Data-Intensive Applications by Martin Kleppmann](https://dataintensive.net/)
- [Release It! by Michael Nygard](https://pragprog.com/titles/mnee2/release-it-second-edition/)
- [Microsoft Microservices Architecture Guide](https://docs.microsoft.com/en-us/dotnet/architecture/microservices/)
- [Polly Library for .NET Resilience](https://github.com/App-vNext/Polly)
