# Topic 8: Observability & Monitoring

## Overview

This topic covers the three pillars of observability — logs, metrics, and traces — with a focus on open-source, vendor-neutral solutions. We'll learn to instrument applications, collect telemetry, and build dashboards that provide actionable insights into system behavior.

**Prerequisites:** Experience with application development, basic understanding of distributed systems

**Outcome:** Implement comprehensive observability for applications using OpenTelemetry and open-source tools.

---

## Chapters

- 📁 **1. Observability Fundamentals**
  - 📄 0. [Overview](./08.01-observability-fundamentals/08.01.00-overview.md)
  - 📄 1. [Monitoring vs Observability](./08.01-observability-fundamentals/08.01.01-monitoring-vs-observability.md)
  - 📄 2. [The Three Pillars of Observability](./08.01-observability-fundamentals/08.01.02-three-pillars.md)
  - 📄 3. [Observability-Driven Development](./08.01-observability-fundamentals/08.01.03-observability-driven-development.md)
  - 📄 4. [Cardinality and Dimensionality](./08.01-observability-fundamentals/08.01.04-cardinality-dimensionality.md)
  - 📄 5. [Correlation and Context](./08.01-observability-fundamentals/08.01.05-correlation-context.md)

- 📁 **2. Structured Logging**
  - 📄 0. [Overview](./08.02-structured-logging/08.02.00-overview.md)
  - 📄 1. [Structured vs Unstructured Logging](./08.02-structured-logging/08.02.01-structured-vs-unstructured.md)
  - 📄 2. [Log Levels and When to Use Them](./08.02-structured-logging/08.02.02-log-levels.md)
  - 📄 3. [Serilog: Structured Logging in .NET](./08.02-structured-logging/08.02.03-serilog-dotnet.md)
  - 📄 4. [Contextual Information and Correlation](./08.02-structured-logging/08.02.04-context-correlation.md)
  - 📄 5. [Log Aggregation and Searching](./08.02-structured-logging/08.02.05-aggregation-searching.md)

- 📁 **3. OpenTelemetry Introduction**
  - 📄 0. [Overview](./08.03-opentelemetry-introduction/08.03.00-overview.md)
  - 📄 1. [What is OpenTelemetry?](./08.03-opentelemetry-introduction/08.03.01-what-is-opentelemetry.md)
  - 📄 2. [OpenTelemetry Architecture](./08.03-opentelemetry-introduction/08.03.02-architecture.md)
  - 📄 3. [SDKs and Instrumentation](./08.03-opentelemetry-introduction/08.03.03-sdks-instrumentation.md)
  - 📄 4. [Exporters and Backends](./08.03-opentelemetry-introduction/08.03.04-exporters-backends.md)
  - 📄 5. [OpenTelemetry Collector](./08.03-opentelemetry-introduction/08.03.05-collector.md)

- 📁 **4. Distributed Tracing**
  - 📄 0. [Overview](./08.04-distributed-tracing/08.04.00-overview.md)
  - 📄 1. [Spans and Traces](./08.04-distributed-tracing/08.04.01-spans-traces.md)
  - 📄 2. [Context Propagation](./08.04-distributed-tracing/08.04.02-context-propagation.md)
  - 📄 3. [Trace Sampling Strategies](./08.04-distributed-tracing/08.04.03-sampling-strategies.md)
  - 📄 4. [Instrumenting Code for Tracing](./08.04-distributed-tracing/08.04.04-instrumenting-code.md)
  - 📄 5. [Analyzing Traces](./08.04-distributed-tracing/08.04.05-analyzing-traces.md)

- 📁 **5. Metrics Collection with Prometheus**
  - 📄 0. [Overview](./08.05-metrics-prometheus/08.05.00-overview.md)
  - 📄 1. [Prometheus Architecture](./08.05-metrics-prometheus/08.05.01-architecture.md)
  - 📄 2. [Metric Types and Naming Conventions](./08.05-metrics-prometheus/08.05.02-metric-types.md)
  - 📄 3. [PromQL Query Language](./08.05-metrics-prometheus/08.05.03-promql.md)
  - 📄 4. [Recording Rules and Alerts](./08.05-metrics-prometheus/08.05.04-rules-alerts.md)
  - 📄 5. [Service Discovery](./08.05-metrics-prometheus/08.05.05-service-discovery.md)

- 📁 **6. Visualization with Grafana**
  - 📄 0. [Overview](./08.06-visualization-grafana/08.06.00-overview.md)
  - 📄 1. [Getting Started with Grafana](./08.06-visualization-grafana/08.06.01-getting-started.md)
  - 📄 2. [Panel Types and Visualizations](./08.06-visualization-grafana/08.06.02-panel-types.md)
  - 📄 3. [Variables for Dynamic Dashboards](./08.06-visualization-grafana/08.06.03-variables.md)
  - 📄 4. [Alerting Integration](./08.06-visualization-grafana/08.06.04-alerting.md)
  - 📄 5. [Dashboard as Code](./08.06-visualization-grafana/08.06.05-dashboard-as-code.md)

- 📁 **7. Log Aggregation with Loki**
  - 📄 0. [Overview](./08.07-log-aggregation-loki/08.07.00-overview.md)
  - 📄 1. [Loki Architecture and Labels](./08.07-log-aggregation-loki/08.07.01-architecture-labels.md)
  - 📄 2. [Log Ingestion Patterns](./08.07-log-aggregation-loki/08.07.02-log-ingestion.md)
  - 📄 3. [LogQL Query Language](./08.07-log-aggregation-loki/08.07.03-logql.md)
  - 📄 4. [Grafana Integration](./08.07-log-aggregation-loki/08.07.04-grafana-integration.md)
  - 📄 5. [Loki vs Elasticsearch](./08.07-log-aggregation-loki/08.07.05-loki-vs-elasticsearch.md)

- 📁 **8. Distributed Tracing with Jaeger**
  - 📄 0. [Overview](./08.08-distributed-tracing-jaeger/08.08.00-overview.md)
  - 📄 1. [Jaeger Architecture](./08.08-distributed-tracing-jaeger/08.08.01-architecture.md)
  - 📄 2. [Storage Backends](./08.08-distributed-tracing-jaeger/08.08.02-storage-backends.md)
  - 📄 3. [Trace Analysis with Jaeger UI](./08.08-distributed-tracing-jaeger/08.08.03-trace-analysis.md)
  - 📄 4. [Service Dependency Analysis](./08.08-distributed-tracing-jaeger/08.08.04-service-dependency.md)
  - 📄 5. [OpenTelemetry Integration](./08.08-distributed-tracing-jaeger/08.08.05-opentelemetry-integration.md)

- 📁 **9. Alerting and Incident Response**
  - 📄 0. [Overview](./08.09-alerting-incident-response/08.09.00-overview.md)
  - 📄 1. [Alert Design Principles](./08.09-alerting-incident-response/08.09.01-alert-design-principles.md)
  - 📄 2. [Symptom vs Cause-based Alerting](./08.09-alerting-incident-response/08.09.02-symptom-vs-cause.md)
  - 📄 3. [Alert Severity and Routing](./08.09-alerting-incident-response/08.09.03-severity-routing.md)
  - 📄 4. [Runbooks and Playbooks](./08.09-alerting-incident-response/08.09.04-runbooks-playbooks.md)
  - 📄 5. [On-call Practices and Incident Management](./08.09-alerting-incident-response/08.09.05-oncall-incident-management.md)

---

## Practical Exercises

1. Instrument a .NET application with OpenTelemetry for logs, metrics, and traces
2. Set up Prometheus to scrape metrics from your application
3. Create Grafana dashboards for application monitoring (RED/USE metrics)
4. Configure Loki for log aggregation and create log-based dashboards
5. Implement distributed tracing across multiple services and analyze in Jaeger

---

## Resources

- [OpenTelemetry Documentation](https://opentelemetry.io/docs/)
- [Prometheus Documentation](https://prometheus.io/docs/)
- [Grafana Documentation](https://grafana.com/docs/)
- [Distributed Systems Observability by Cindy Sridharan](https://www.oreilly.com/library/view/distributed-systems-observability/9781492033431/)
- [Site Reliability Engineering book (Google)](https://sre.google/sre-book/table-of-contents/)
