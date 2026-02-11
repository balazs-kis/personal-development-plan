# Topic 13: DevOps & Infrastructure as Code

## Overview

This topic covers DevOps practices and Infrastructure as Code (IaC), focusing on automating the software delivery pipeline and managing infrastructure through code. We emphasize open-source, vendor-neutral tools that work across environments.

**Prerequisites:** Basic command-line skills, understanding of software deployment concepts

**Outcome:** Design CI/CD pipelines and manage infrastructure as code using industry-standard tools.

---

## Chapters

- 📁 **1. DevOps Culture and Principles**
  - 📄 0. [Overview](./13.01-devops-culture-principles/13.01.00-overview.md)
  - 📄 1. [Understanding DevOps Culture](./13.01-devops-culture-principles/13.01.01-understanding-devops-culture.md)
  - 📄 2. [The CALMS Framework](./13.01-devops-culture-principles/13.01.02-calms-framework.md)
  - 📄 3. [Breaking Down Silos and Building Collaboration](./13.01-devops-culture-principles/13.01.03-breaking-silos-collaboration.md)
  - 📄 4. [Shared Responsibility and Team Structures](./13.01-devops-culture-principles/13.01.04-shared-responsibility-team-structures.md)
  - 📄 5. [Continuous Improvement and Feedback Loops](./13.01-devops-culture-principles/13.01.05-continuous-improvement-feedback.md)

- 📁 **2. CI/CD Pipeline Design**
  - 📄 0. [Overview](./13.02-cicd-pipeline-design/13.02.00-overview.md)
  - 📄 1. [Pipeline Architecture and Stages](./13.02-cicd-pipeline-design/13.02.01-pipeline-architecture-stages.md)
  - 📄 2. [Automated Testing in Pipelines](./13.02-cicd-pipeline-design/13.02.02-automated-testing-pipelines.md)
  - 📄 3. [Artifact Management and Versioning](./13.02-cicd-pipeline-design/13.02.03-artifact-management-versioning.md)
  - 📄 4. [Environment Promotion and Deployment Strategies](./13.02-cicd-pipeline-design/13.02.04-environment-promotion-deployment.md)
  - 📄 5. [Pipeline-as-Code and Branching Strategies](./13.02-cicd-pipeline-design/13.02.05-pipeline-as-code-branching.md)

- 📁 **3. GitHub Actions**
  - 📄 0. [Overview](./13.03-github-actions/13.03.00-overview.md)
  - 📄 1. [Workflow Syntax and Triggers](./13.03-github-actions/13.03.01-workflow-syntax-triggers.md)
  - 📄 2. [Jobs, Steps, and Actions](./13.03-github-actions/13.03.02-jobs-steps-actions.md)
  - 📄 3. [Secrets and Environment Variables](./13.03-github-actions/13.03.03-secrets-environment.md)
  - 📄 4. [Matrix Builds and Advanced Workflows](./13.03-github-actions/13.03.04-matrix-builds.md)
  - 📄 5. [Reusable Workflows and Best Practices](./13.03-github-actions/13.03.05-reusable-workflows.md)

- 📁 **4. GitLab CI/CD**
  - 📄 0. [Overview](./13.04-gitlab-cicd/13.04.00-overview.md)
  - 📄 1. [GitLab CI/CD Configuration Basics](./13.04-gitlab-cicd/13.04.01-configuration-basics.md)
  - 📄 2. [Stages, Jobs, and Dependencies](./13.04-gitlab-cicd/13.04.02-stages-jobs-dependencies.md)
  - 📄 3. [Artifacts and Caching](./13.04-gitlab-cicd/13.04.03-artifacts-caching.md)
  - 📄 4. [Environments and Deployments](./13.04-gitlab-cicd/13.04.04-environments-deployments.md)
  - 📄 5. [GitLab Runners and Advanced Features](./13.04-gitlab-cicd/13.04.05-runners-advanced.md)

- 📁 **5. Infrastructure as Code Principles**
  - 📄 0. [Overview](./13.05-iac-principles/13.05.00-overview.md)
  - 📄 1. [Declarative vs Imperative IaC](./13.05-iac-principles/13.05.01-declarative-imperative.md)
  - 📄 2. [Idempotency in Infrastructure](./13.05-iac-principles/13.05.02-idempotency.md)
  - 📄 3. [State Management and Consistency](./13.05-iac-principles/13.05.03-state-management.md)
  - 📄 4. [Drift Detection and Remediation](./13.05-iac-principles/13.05.04-drift-detection.md)
  - 📄 5. [Testing Infrastructure as Code](./13.05-iac-principles/13.05.05-testing-iac.md)

- 📁 **6. Terraform Fundamentals**
  - 📄 0. [Overview](./13.06-terraform-fundamentals/13.06.00-overview.md)
  - 📄 1. [HCL Syntax and Configuration Basics](./13.06-terraform-fundamentals/13.06.01-hcl-syntax-basics.md)
  - 📄 2. [Providers and Resources](./13.06-terraform-fundamentals/13.06.02-providers-resources.md)
  - 📄 3. [Variables and Outputs](./13.06-terraform-fundamentals/13.06.03-variables-outputs.md)
  - 📄 4. [Data Sources and Dependencies](./13.06-terraform-fundamentals/13.06.04-data-sources-dependencies.md)
  - 📄 5. [Terraform Workflow: Init, Plan, Apply](./13.06-terraform-fundamentals/13.06.05-terraform-workflow.md)

- 📁 **7. Terraform Advanced Topics**
  - 📄 0. [Overview](./13.07-terraform-advanced/13.07.00-overview.md)
  - 📄 1. [Module Design and Reusability](./13.07-terraform-advanced/13.07.01-module-design.md)
  - 📄 2. [Workspaces and Environments](./13.07-terraform-advanced/13.07.02-workspaces-environments.md)
  - 📄 3. [Remote State Management](./13.07-terraform-advanced/13.07.03-remote-state.md)
  - 📄 4. [State Locking and Collaboration](./13.07-terraform-advanced/13.07.04-state-locking-collaboration.md)
  - 📄 5. [Terraform Cloud and Best Practices](./13.07-terraform-advanced/13.07.05-terraform-cloud-best-practices.md)

- 📁 **8. Configuration Management with Ansible**
  - 📄 0. [Overview](./13.08-ansible/13.08.00-overview.md)
  - 📄 1. [Ansible Architecture and Fundamentals](./13.08-ansible/13.08.01-ansible-architecture.md)
  - 📄 2. [Inventory and Host Management](./13.08-ansible/13.08.02-inventory-host-management.md)
  - 📄 3. [Playbooks and Tasks](./13.08-ansible/13.08.03-playbooks-tasks.md)
  - 📄 4. [Roles and Code Organization](./13.08-ansible/13.08.04-roles-organization.md)
  - 📄 5. [Idempotency and Best Practices](./13.08-ansible/13.08.05-idempotency-best-practices.md)

- 📁 **9. GitOps Practices**
  - 📄 0. [Overview](./13.09-gitops-practices/13.09.00-overview.md)
  - 📄 1. [GitOps Principles and Foundations](./13.09-gitops-practices/13.09.01-gitops-principles-foundations.md)
  - 📄 2. [Pull vs Push-Based Deployment Models](./13.09-gitops-practices/13.09.02-pull-push-deployment.md)
  - 📄 3. [Declarative Configuration and State Management](./13.09-gitops-practices/13.09.03-declarative-configuration.md)
  - 📄 4. [Automated Reconciliation and Drift Detection](./13.09-gitops-practices/13.09.04-automated-reconciliation.md)
  - 📄 5. [GitOps Tools: ArgoCD and Flux Overview](./13.09-gitops-practices/13.09.05-gitops-tools.md)

- 📁 **10. Environment Management**
  - 📄 0. [Overview](./13.10-environment-management/13.10.00-overview.md)
  - 📄 1. [Environment Parity and the 12-Factor App](./13.10-environment-management/13.10.01-environment-parity.md)
  - 📄 2. [Configuration Management Across Environments](./13.10-environment-management/13.10.02-configuration-management.md)
  - 📄 3. [Secrets Management Strategies](./13.10-environment-management/13.10.03-secrets-management.md)
  - 📄 4. [Environment Promotion and Deployment Gates](./13.10-environment-management/13.10.04-environment-promotion.md)
  - 📄 5. [Feature Flags and Progressive Delivery](./13.10-environment-management/13.10.05-feature-flags.md)

---

## Practical Exercises

1. Build a complete CI/CD pipeline for a .NET application with GitHub Actions
2. Set up infrastructure with Terraform (local containers or cloud free tier)
3. Configure servers with Ansible playbooks
4. Implement a GitOps workflow for Kubernetes deployments
5. Design a multi-environment deployment strategy with proper promotion gates

---

## Resources

- [Terraform Documentation](https://www.terraform.io/docs)
- [Ansible Documentation](https://docs.ansible.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [The DevOps Handbook](https://www.amazon.com/DevOps-Handbook-World-Class-Reliability-Organizations/dp/1942788002)
- [Infrastructure as Code by Kief Morris](https://www.oreilly.com/library/view/infrastructure-as-code/9781098114664/)
