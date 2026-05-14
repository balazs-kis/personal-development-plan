# Topic 4: Event-Driven Architecture & Messaging

## Overview

This topic explores asynchronous communication patterns using message brokers and event-driven architectures. We'll cover both traditional message queuing with RabbitMQ and event streaming with Apache Kafka, understanding when to use each and how to implement them in .NET.

**Prerequisites:** Understanding of distributed systems basics, familiarity with async programming

**Outcome:** Design and implement event-driven systems with appropriate messaging patterns and guarantees.

---

## Chapters

- 📁 **1. Event-Driven Architecture Fundamentals**
  - 📄 0. [Overview](./04.01-event-driven-fundamentals/04.01.00-overview.md)
  - 📄 1. [Events vs Commands vs Queries](./04.01-event-driven-fundamentals/04.01.01-events-commands-queries.md)
  - 📄 2. [Temporal Decoupling and Async Communication](./04.01-event-driven-fundamentals/04.01.02-temporal-decoupling.md)
  - 📄 3. [Event Notification vs Event-Carried State Transfer](./04.01-event-driven-fundamentals/04.01.03-event-patterns.md)
  - 📄 4. [Event-Driven vs Request-Driven Architecture](./04.01-event-driven-fundamentals/04.01.04-event-vs-request-driven.md)
  - 📄 5. [Benefits and Challenges of Event-Driven Systems](./04.01-event-driven-fundamentals/04.01.05-benefits-challenges.md)

- 📁 **2. Message Brokers Overview**
  - 📄 0. [Overview](./04.02-message-brokers-overview/04.02.00-overview.md)
  - 📄 1. [Message Queues vs Event Streams](./04.02-message-brokers-overview/04.02.01-queues-vs-streams.md)
  - 📄 2. [Push vs Pull Consumption Models](./04.02-message-brokers-overview/04.02.02-push-vs-pull.md)
  - 📄 3. [Message Persistence and Replay](./04.02-message-brokers-overview/04.02.03-persistence-replay.md)
  - 📄 4. [Ordering Guarantees](./04.02-message-brokers-overview/04.02.04-ordering-guarantees.md)
  - 📄 5. [Scalability Characteristics](./04.02-message-brokers-overview/04.02.05-scalability.md)

- 📁 **3. RabbitMQ Deep Dive**
  - 📄 0. [Overview](./04.03-rabbitmq-deep-dive/04.03.00-overview.md)
  - 📄 1. [Exchange Types and Routing](./04.03-rabbitmq-deep-dive/04.03.01-exchange-types-routing.md)
  - 📄 2. [Queue Durability and Persistence](./04.03-rabbitmq-deep-dive/04.03.02-queue-durability-persistence.md)
  - 📄 3. [Message Acknowledgment Modes](./04.03-rabbitmq-deep-dive/04.03.03-message-acknowledgment.md)
  - 📄 4. [Dead Letter Exchanges](./04.03-rabbitmq-deep-dive/04.03.04-dead-letter-exchanges.md)
  - 📄 5. [Publisher Confirms and Clustering](./04.03-rabbitmq-deep-dive/04.03.05-publisher-confirms.md)

- 📁 **4. Apache Kafka Fundamentals**
  - 📄 0. [Overview](./04.04-kafka-fundamentals/04.04.00-overview.md)
  - 📄 1. [Topics and Partitions](./04.04-kafka-fundamentals/04.04.01-topics-partitions.md)
  - 📄 2. [Consumer Groups and Partition Assignment](./04.04-kafka-fundamentals/04.04.02-consumer-groups.md)
  - 📄 3. [Offset Management](./04.04-kafka-fundamentals/04.04.03-offset-management.md)
  - 📄 4. [Replication and Fault Tolerance](./04.04-kafka-fundamentals/04.04.04-replication-fault-tolerance.md)
  - 📄 5. [Log Compaction](./04.04-kafka-fundamentals/04.04.05-log-compaction.md)

- 📁 **5. Message Delivery Guarantees**
  - 📄 0. [Overview](./04.05-delivery-guarantees/04.05.00-overview.md)
  - 📄 1. [At-Most-Once Delivery](./04.05-delivery-guarantees/04.05.01-at-most-once.md)
  - 📄 2. [At-Least-Once Delivery](./04.05-delivery-guarantees/04.05.02-at-least-once.md)
  - 📄 3. [Exactly-Once Semantics](./04.05-delivery-guarantees/04.05.03-exactly-once.md)
  - 📄 4. [Idempotent Consumers](./04.05-delivery-guarantees/04.05.04-idempotent-consumers.md)
  - 📄 5. [Transactional Messaging](./04.05-delivery-guarantees/04.05.05-transactional-messaging.md)

- 📁 **6. Messaging Patterns**
  - 📄 0. [Overview](./04.06-messaging-patterns/04.06.00-overview.md)
  - 📄 1. [Publish-Subscribe Pattern](./04.06-messaging-patterns/04.06.01-publish-subscribe.md)
  - 📄 2. [Competing Consumers for Load Balancing](./04.06-messaging-patterns/04.06.02-competing-consumers.md)
  - 📄 3. [Message Filtering and Routing](./04.06-messaging-patterns/04.06.03-message-filtering-routing.md)
  - 📄 4. [Request-Reply Over Messaging](./04.06-messaging-patterns/04.06.04-request-reply.md)
  - 📄 5. [Transactional Outbox Pattern](./04.06-messaging-patterns/04.06.05-transactional-outbox.md)

- 📁 **7. Event Sourcing in Practice**
  - 📄 0. [Overview](./04.07-event-sourcing/04.07.00-overview.md)
  - 📄 1. [Event Store Design](./04.07-event-sourcing/04.07.01-event-store-design.md)
  - 📄 2. [Aggregate Reconstruction](./04.07-event-sourcing/04.07.02-aggregate-reconstruction.md)
  - 📄 3. [Event Versioning and Upcasting](./04.07-event-sourcing/04.07.03-event-versioning.md)
  - 📄 4. [Snapshots for Performance](./04.07-event-sourcing/04.07.04-snapshots.md)
  - 📄 5. [Projections and Read Models](./04.07-event-sourcing/04.07.05-projections-read-models.md)

- 📁 **8. Messaging in .NET with MassTransit**
  - 📄 0. [Overview](./04.08-masstransit/04.08.00-overview.md)
  - 📄 1. [MassTransit Consumers and Producers](./04.08-masstransit/04.08.01-consumers-producers.md)
  - 📄 2. [Sagas and State Machines](./04.08-masstransit/04.08.02-sagas-state-machines.md)
  - 📄 3. [Middleware and Filters](./04.08-masstransit/04.08.03-middleware-filters.md)
  - 📄 4. [Testing with MassTransit](./04.08-masstransit/04.08.04-testing.md)
  - 📄 5. [Transport Abstraction](./04.08-masstransit/04.08.05-transport-abstraction.md)

---

## Practical Exercises

1. Set up RabbitMQ locally and implement pub/sub communication between two services
2. Implement a Kafka producer and consumer with consumer groups
3. Build an idempotent consumer that handles duplicate messages
4. Implement the transactional outbox pattern
5. Create an event-sourced aggregate with snapshots using MassTransit

---

## Resources

- [RabbitMQ Tutorials](https://www.rabbitmq.com/getstarted.html)
- [Kafka: The Definitive Guide](https://www.confluent.io/resources/kafka-the-definitive-guide/)
- [MassTransit Documentation](https://masstransit.io/)
- [Enterprise Integration Patterns by Hohpe & Woolf](https://www.enterpriseintegrationpatterns.com/)
- [Event Sourcing pattern - Microsoft](https://docs.microsoft.com/en-us/azure/architecture/patterns/event-sourcing)
