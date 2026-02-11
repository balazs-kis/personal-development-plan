# Topic 2: Software Architecture & Design Patterns

## Overview

This topic elevates your thinking from code-level design to system-level architecture. We'll explore proven patterns for structuring applications, modeling complex domains, and making architectural decisions that enable long-term maintainability and scalability.

**Prerequisites:** Familiarity with basic OOP principles and design patterns

**Outcome:** Design systems with clear boundaries, appropriate abstractions, and patterns matched to the problem at hand.

---

## Chapters

- 📁 **1. SOLID Principles at Scale**
  - 📄 0. [Overview](./02.01-solid-principles/02.01.00-overview.md)
  - 📄 1. [Single Responsibility Principle at Architecture Level](./02.01-solid-principles/02.01.01-srp-architecture.md)
  - 📄 2. [Open-Closed Principle and Extension Points](./02.01-solid-principles/02.01.02-ocp-extensions.md)
  - 📄 3. [Dependency Inversion and DI Containers](./02.01-solid-principles/02.01.03-dip-containers.md)
  - 📄 4. [When SOLID Principles Become STUPID](./02.01-solid-principles/02.01.04-solid-vs-stupid.md)

- 📁 **2. Domain-Driven Design Fundamentals**
  - 📄 0. [Overview](./02.02-domain-driven-design/02.02.00-overview.md)
  - 📄 1. [Ubiquitous Language and Domain Modeling](./02.02-domain-driven-design/02.02.01-ubiquitous-language.md)
  - 📄 2. [Bounded Contexts and Context Mapping](./02.02-domain-driven-design/02.02.02-bounded-contexts.md)
  - 📄 3. [Aggregates and Aggregate Roots](./02.02-domain-driven-design/02.02.03-aggregates.md)
  - 📄 4. [Entities, Value Objects, and Domain Events](./02.02-domain-driven-design/02.02.04-tactical-patterns.md)

- 📁 **3. Clean Architecture**
  - 📄 0. [Overview](./02.03-clean-architecture/02.03.00-overview.md)
  - 📄 1. [The Dependency Rule and Layer Separation](./02.03-clean-architecture/02.03.01-dependency-rule.md)
  - 📄 2. [Implementing Clean Architecture in .NET](./02.03-clean-architecture/02.03.02-clean-arch-dotnet.md)
  - 📄 3. [Ports and Adapters Pattern](./02.03-clean-architecture/02.03.03-ports-adapters.md)

- 📁 **4. CQRS and Event Sourcing**
  - 📄 0. [Overview](./02.04-cqrs-event-sourcing/02.04.00-overview.md)
  - 📄 1. [CQRS Fundamentals and MediatR](./02.04-cqrs-event-sourcing/02.04.01-cqrs-fundamentals.md)
  - 📄 2. [Event Sourcing Principles](./02.04-cqrs-event-sourcing/02.04.02-event-sourcing.md)
  - 📄 3. [Implementing CQRS in .NET](./02.04-cqrs-event-sourcing/02.04.03-cqrs-implementation.md)

- 📁 **5. Creational Design Patterns**
  - 📄 0. [Overview](./02.05-creational-patterns/02.05.00-overview.md)
  - 📄 1. [Factory Method and Abstract Factory](./02.05-creational-patterns/02.05.01-factory-patterns.md)
  - 📄 2. [Builder Pattern for Complex Objects](./02.05-creational-patterns/02.05.02-builder-pattern.md)
  - 📄 3. [Dependency Injection as a Pattern](./02.05-creational-patterns/02.05.03-dependency-injection.md)
  - 📄 4. [Object Pooling and Resource Management](./02.05-creational-patterns/02.05.04-object-pooling.md)

- 📁 **6. Structural Design Patterns**
  - 📄 0. [Overview](./02.06-structural-patterns/02.06.00-overview.md)
  - 📄 1. [Adapter and Bridge Patterns](./02.06-structural-patterns/02.06.01-adapter-bridge.md)
  - 📄 2. [Decorator Pattern and Middleware](./02.06-structural-patterns/02.06.02-decorator-pattern.md)
  - 📄 3. [Facade and Proxy Patterns](./02.06-structural-patterns/02.06.03-facade-proxy.md)

- 📁 **7. Behavioral Design Patterns**
  - 📄 0. [Overview](./02.07-behavioral-patterns/02.07.00-overview.md)
  - 📄 1. [Strategy and Template Method Patterns](./02.07-behavioral-patterns/02.07.01-strategy-template.md)
  - 📄 2. [Observer Pattern and .NET Events](./02.07-behavioral-patterns/02.07.02-observer-events.md)
  - 📄 3. [Command Pattern and MediatR](./02.07-behavioral-patterns/02.07.03-command-mediatr.md)
  - 📄 4. [State Machines and State Pattern](./02.07-behavioral-patterns/02.07.04-state-pattern.md)

- 📁 **8. Anti-Patterns and Technical Debt**
  - 📄 0. [Overview](./02.08-anti-patterns/02.08.00-overview.md)
  - 📄 1. [Common Architectural Anti-Patterns](./02.08-anti-patterns/02.08.01-architectural-antipatterns.md)
  - 📄 2. [Understanding Technical Debt](./02.08-anti-patterns/02.08.02-technical-debt.md)
  - 📄 3. [Refactoring and Debt Management](./02.08-anti-patterns/02.08.03-refactoring-strategies.md)

---

## Practical Exercises

1. Analyze an existing codebase and identify SOLID violations
2. Model a complex domain using DDD tactical patterns (create aggregate diagrams, define bounded contexts)
3. Refactor a layered application to Clean Architecture
4. Implement a feature using CQRS (without event sourcing)
5. Document an architectural decision using ADR format

---

## Resources

- [Domain-Driven Design by Eric Evans](https://www.domainlanguage.com/ddd/)
- [Clean Architecture by Robert C. Martin](https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164)
- [Patterns of Enterprise Application Architecture by Martin Fowler](https://martinfowler.com/books/eaa.html)
- [Event Storming by Alberto Brandolini](https://www.eventstorming.com/)
- [Refactoring.Guru Design Patterns](https://refactoring.guru/design-patterns)
