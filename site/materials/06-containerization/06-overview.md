# Topic 6: Containerization & Orchestration

## Overview

This topic covers containerization with Docker and orchestration with Kubernetes — the foundation of modern application deployment. We'll learn to package applications as containers, manage container lifecycles, and orchestrate multi-container applications at scale.

**Prerequisites:** Basic command-line skills, understanding of application deployment concepts

**Outcome:** Package applications as containers and deploy them to Kubernetes with confidence.

---

## Chapters

- 📁 **1. Container Fundamentals**
  - 📄 0. [Overview](./06.01-container-fundamentals/06.01.00-overview.md)
  - 📄 1. [Containers vs Virtual Machines](./06.01-container-fundamentals/06.01.01-containers-vs-vms.md)
  - 📄 2. [Container Images and Layers](./06.01-container-fundamentals/06.01.02-images-layers.md)
  - 📄 3. [Container Registries](./06.01-container-fundamentals/06.01.03-registries.md)
  - 📄 4. [Container Runtimes](./06.01-container-fundamentals/06.01.04-runtimes.md)
  - 📄 5. [OCI Specifications](./06.01-container-fundamentals/06.01.05-oci-specs.md)

- 📁 **2. Docker Deep Dive**
  - 📄 0. [Overview](./06.02-docker-deep-dive/06.02.00-overview.md)
  - 📄 1. [Dockerfile Best Practices](./06.02-docker-deep-dive/06.02.01-dockerfile-best-practices.md)
  - 📄 2. [Multi-Stage Builds](./06.02-docker-deep-dive/06.02.02-multi-stage-builds.md)
  - 📄 3. [Docker Networking](./06.02-docker-deep-dive/06.02.03-docker-networking.md)
  - 📄 4. [Docker Volumes and Storage](./06.02-docker-deep-dive/06.02.04-docker-volumes.md)
  - 📄 5. [Docker Compose](./06.02-docker-deep-dive/06.02.05-docker-compose.md)

- 📁 **3. Containerizing .NET Applications**
  - 📄 0. [Overview](./06.03-containerizing-dotnet/06.03.00-overview.md)
  - 📄 1. [.NET Base Images and Selection](./06.03-containerizing-dotnet/06.03.01-dotnet-base-images.md)
  - 📄 2. [Multi-Stage Builds for .NET](./06.03-containerizing-dotnet/06.03.02-multistage-builds-dotnet.md)
  - 📄 3. [Configuration Management](./06.03-containerizing-dotnet/06.03.03-configuration-management.md)
  - 📄 4. [Health Check Endpoints](./06.03-containerizing-dotnet/06.03.04-health-checks.md)
  - 📄 5. [Debugging Containerized .NET Apps](./06.03-containerizing-dotnet/06.03.05-debugging-containers.md)

- 📁 **4. Container Security**
  - 📄 0. [Overview](./06.04-container-security/06.04.00-overview.md)
  - 📄 1. [Image Vulnerability Scanning](./06.04-container-security/06.04.01-vulnerability-scanning.md)
  - 📄 2. [Non-Root Containers](./06.04-container-security/06.04.02-non-root-containers.md)
  - 📄 3. [Read-Only Filesystems and Security Contexts](./06.04-container-security/06.04.03-readonly-filesystems.md)
  - 📄 4. [Resource Limits and Constraints](./06.04-container-security/06.04.04-resource-limits.md)
  - 📄 5. [Secrets Management](./06.04-container-security/06.04.05-secrets-management.md)

- 📁 **5. Kubernetes Architecture**
  - 📄 0. [Overview](./06.05-kubernetes-architecture/06.05.00-overview.md)
  - 📄 1. [Control Plane Components](./06.05-kubernetes-architecture/06.05.01-control-plane.md)
  - 📄 2. [Node Components](./06.05-kubernetes-architecture/06.05.02-node-components.md)
  - 📄 3. [The Kubernetes API](./06.05-kubernetes-architecture/06.05.03-kubernetes-api.md)
  - 📄 4. [Declarative Management and Reconciliation](./06.05-kubernetes-architecture/06.05.04-declarative-reconciliation.md)
  - 📄 5. [Cluster Architecture Patterns](./06.05-kubernetes-architecture/06.05.05-cluster-patterns.md)

- 📁 **6. Kubernetes Workloads**
  - 📄 0. [Overview](./06.06-kubernetes-workloads/06.06.00-overview.md)
  - 📄 1. [Pods: The Building Block](./06.06-kubernetes-workloads/06.06.01-pods.md)
  - 📄 2. [Deployments and ReplicaSets](./06.06-kubernetes-workloads/06.06.02-deployments.md)
  - 📄 3. [StatefulSets for Stateful Applications](./06.06-kubernetes-workloads/06.06.03-statefulsets.md)
  - 📄 4. [DaemonSets for Node-Level Services](./06.06-kubernetes-workloads/06.06.04-daemonsets.md)
  - 📄 5. [Jobs and CronJobs for Batch Processing](./06.06-kubernetes-workloads/06.06.05-jobs-cronjobs.md)

- 📁 **7. Kubernetes Networking and Services**
  - 📄 0. [Overview](./06.07-kubernetes-networking/06.07.00-overview.md)
  - 📄 1. [Kubernetes Services](./06.07-kubernetes-networking/06.07.01-services.md)
  - 📄 2. [Ingress Controllers and Routing](./06.07-kubernetes-networking/06.07.02-ingress.md)
  - 📄 3. [Network Policies](./06.07-kubernetes-networking/06.07.03-network-policies.md)
  - 📄 4. [DNS and Service Discovery](./06.07-kubernetes-networking/06.07.04-dns.md)
  - 📄 5. [Service Mesh Introduction](./06.07-kubernetes-networking/06.07.05-service-mesh.md)

- 📁 **8. Kubernetes Configuration and Storage**
  - 📄 0. [Overview](./06.08-kubernetes-config-storage/06.08.00-overview.md)
  - 📄 1. [ConfigMaps for Configuration](./06.08-kubernetes-config-storage/06.08.01-configmaps.md)
  - 📄 2. [Secrets Management](./06.08-kubernetes-config-storage/06.08.02-secrets.md)
  - 📄 3. [PersistentVolumes and Claims](./06.08-kubernetes-config-storage/06.08.03-persistent-volumes.md)
  - 📄 4. [StorageClasses and Dynamic Provisioning](./06.08-kubernetes-config-storage/06.08.04-storage-classes.md)
  - 📄 5. [StatefulSets and Persistent Storage](./06.08-kubernetes-config-storage/06.08.05-statefulset-storage.md)

- 📁 **9. Helm Package Manager**
  - 📄 0. [Overview](./06.09-helm/06.09.00-overview.md)
  - 📄 1. [Getting Started with Helm](./06.09-helm/06.09.01-helm-basics.md)
  - 📄 2. [Chart Structure and Development](./06.09-helm/06.09.02-chart-structure.md)
  - 📄 3. [Templating and Values](./06.09-helm/06.09.03-templating-values.md)
  - 📄 4. [Chart Dependencies and Release Management](./06.09-helm/06.09.04-dependencies-releases.md)
  - 📄 5. [Helm Repositories and Publishing](./06.09-helm/06.09.05-repositories.md)

---

## Practical Exercises

1. Containerize a .NET application with multi-stage builds and security best practices
2. Create a Docker Compose setup for local development with multiple services
3. Deploy an application to Kubernetes with Deployments, Services, and ConfigMaps
4. Set up Ingress with TLS termination
5. Create a Helm chart for an application with configurable values

---

## Resources

- [Docker Documentation](https://docs.docker.com/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kubernetes Up & Running by Brendan Burns](https://www.oreilly.com/library/view/kubernetes-up-and/9781098110192/)
- [.NET Docker Samples](https://github.com/dotnet/dotnet-docker/tree/main/samples)
- [Helm Documentation](https://helm.sh/docs/)
