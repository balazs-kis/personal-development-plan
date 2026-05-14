# Topic 5: API Design & Communication Patterns

## Overview

This topic covers the design and implementation of APIs — the contracts between services and with external consumers. We'll explore REST, GraphQL, and gRPC, understanding when to use each and how to design APIs that are intuitive, evolvable, and performant.

**Prerequisites:** Experience building HTTP APIs, basic understanding of HTTP protocol

**Outcome:** Design APIs that are consistent, well-documented, and evolvable without breaking clients.

---

## Chapters

- 📁 **1. API Design Principles**
  - 📄 0. [Overview](./05.01-api-design-principles/05.01.00-overview.md)
  - 📄 1. [API as a Product Mindset](./05.01-api-design-principles/05.01.01-api-as-product.md)
  - 📄 2. [Consistency and Predictability](./05.01-api-design-principles/05.01.02-consistency-predictability.md)
  - 📄 3. [Principle of Least Astonishment](./05.01-api-design-principles/05.01.03-least-astonishment.md)
  - 📄 4. [API-First Design Approach](./05.01-api-design-principles/05.01.04-api-first-design.md)
  - 📄 5. [API Design Review Process](./05.01-api-design-principles/05.01.05-design-review-process.md)

- 📁 **2. RESTful API Design**
  - 📄 0. [Overview](./05.02-restful-api-design/05.02.00-overview.md)
  - 📄 1. [Resource-Oriented Design](./05.02-restful-api-design/05.02.01-resource-oriented-design.md)
  - 📄 2. [HTTP Method Semantics](./05.02-restful-api-design/05.02.02-http-method-semantics.md)
  - 📄 3. [Status Code Selection](./05.02-restful-api-design/05.02.03-status-code-selection.md)
  - 📄 4. [URL Design and Naming Conventions](./05.02-restful-api-design/05.02.04-url-design-naming.md)
  - 📄 5. [HATEOAS and Richardson Maturity Model](./05.02-restful-api-design/05.02.05-hateoas-maturity-model.md)

- 📁 **3. API Versioning Strategies**
  - 📄 0. [Overview](./05.03-api-versioning-strategies/05.03.00-overview.md)
  - 📄 1. [URL Path Versioning](./05.03-api-versioning-strategies/05.03.01-url-path-versioning.md)
  - 📄 2. [Header-Based Versioning](./05.03-api-versioning-strategies/05.03.02-header-based-versioning.md)
  - 📄 3. [Query Parameter and Media Type Versioning](./05.03-api-versioning-strategies/05.03.03-query-media-versioning.md)
  - 📄 4. [Semantic Versioning for APIs](./05.03-api-versioning-strategies/05.03.04-semantic-versioning.md)
  - 📄 5. [Deprecation and Sunset Policies](./05.03-api-versioning-strategies/05.03.05-deprecation-sunset.md)

- 📁 **4. OpenAPI and API Documentation**
  - 📄 0. [Overview](./05.04-openapi-documentation/05.04.00-overview.md)
  - 📄 1. [OpenAPI 3.x Specification Fundamentals](./05.04-openapi-documentation/05.04.01-openapi-specification.md)
  - 📄 2. [Generating OpenAPI from .NET Code](./05.04-openapi-documentation/05.04.02-generating-openapi.md)
  - 📄 3. [Swagger UI and Interactive Documentation](./05.04-openapi-documentation/05.04.03-swagger-ui.md)
  - 📄 4. [Client Code Generation and SDKs](./05.04-openapi-documentation/05.04.04-client-generation.md)
  - 📄 5. [API-First Design Workflow](./05.04-openapi-documentation/05.04.05-api-first-workflow.md)

- 📁 **5. GraphQL Fundamentals**
  - 📄 0. [Overview](./05.05-graphql-fundamentals/05.05.00-overview.md)
  - 📄 1. [GraphQL Schema Definition Language](./05.05-graphql-fundamentals/05.05.01-schema-definition.md)
  - 📄 2. [Queries, Mutations, and Subscriptions](./05.05-graphql-fundamentals/05.05.02-queries-mutations.md)
  - 📄 3. [Resolvers and Execution Model](./05.05-graphql-fundamentals/05.05.03-resolvers-execution.md)
  - 📄 4. [N+1 Problem and DataLoader](./05.05-graphql-fundamentals/05.05.04-n-plus-one-dataloader.md)
  - 📄 5. [GraphQL vs REST Trade-offs](./05.05-graphql-fundamentals/05.05.05-graphql-vs-rest.md)

- 📁 **6. GraphQL in .NET**
  - 📄 0. [Overview](./05.06-graphql-dotnet/05.06.00-overview.md)
  - 📄 1. [Hot Chocolate Schema Definition](./05.06-graphql-dotnet/05.06.01-schema-definition.md)
  - 📄 2. [Query and Mutation Resolvers](./05.06-graphql-dotnet/05.06.02-query-mutation-resolvers.md)
  - 📄 3. [Filtering and Sorting](./05.06-graphql-dotnet/05.06.03-filtering-sorting.md)
  - 📄 4. [Cursor-Based Pagination](./05.06-graphql-dotnet/05.06.04-cursor-pagination.md)
  - 📄 5. [Subscriptions and Real-Time Updates](./05.06-graphql-dotnet/05.06.05-subscriptions-realtime.md)

- 📁 **7. gRPC for Service Communication**
  - 📄 0. [Overview](./05.07-grpc-communication/05.07.00-overview.md)
  - 📄 1. [Protocol Buffers Schema Design](./05.07-grpc-communication/05.07.01-protobuf-schema.md)
  - 📄 2. [Service Definition Best Practices](./05.07-grpc-communication/05.07.02-service-definition.md)
  - 📄 3. [Streaming Patterns](./05.07-grpc-communication/05.07.03-streaming-patterns.md)
  - 📄 4. [Error Handling and Status Codes](./05.07-grpc-communication/05.07.04-error-handling.md)
  - 📄 5. [Interceptors for Cross-Cutting Concerns](./05.07-grpc-communication/05.07.05-interceptors.md)

- 📁 **8. API Security and Rate Limiting**
  - 📄 0. [Overview](./05.08-api-security/05.08.00-overview.md)
  - 📄 1. [Authentication Mechanisms for APIs](./05.08-api-security/05.08.01-authentication-mechanisms.md)
  - 📄 2. [API Key Management](./05.08-api-security/05.08.02-api-key-management.md)
  - 📄 3. [JWT Validation and Token Security](./05.08-api-security/05.08.03-jwt-validation.md)
  - 📄 4. [Rate Limiting and Throttling](./05.08-api-security/05.08.04-rate-limiting.md)
  - 📄 5. [Input Validation and Sanitization](./05.08-api-security/05.08.05-input-validation.md)

---

## Practical Exercises

1. Design a RESTful API for a domain model, including documentation in OpenAPI format
2. Implement API versioning with a deprecation strategy
3. Build a GraphQL API with Hot Chocolate including pagination and filtering
4. Create a gRPC service with streaming endpoints
5. Implement rate limiting middleware for an ASP.NET Core API

---

## Resources

- [REST API Design Rulebook by Mark Masse](https://www.oreilly.com/library/view/rest-api-design/9781449317904/)
- [OpenAPI Specification](https://swagger.io/specification/)
- [GraphQL Specification](https://spec.graphql.org/)
- [Hot Chocolate Documentation](https://chillicream.com/docs/hotchocolate)
- [gRPC Documentation](https://grpc.io/docs/)
