# Topic 11: Application Security

## Overview

This topic covers security from a developer's perspective: understanding common vulnerabilities, implementing authentication and authorization correctly, and building security into the development lifecycle. We focus on practical security that protects real applications.

**Prerequisites:** Experience building web applications, basic understanding of HTTP

**Outcome:** Build secure applications by default and identify security vulnerabilities in existing code.

---

## Chapters

- 📁 **1. Security Mindset**
  - 📄 0. [Overview](./11.01-security-mindset/11.01.00-overview.md)
  - 📄 1. [Defense in Depth and Layered Security](./11.01-security-mindset/11.01.01-defense-in-depth.md)
  - 📄 2. [Principle of Least Privilege](./11.01-security-mindset/11.01.02-least-privilege.md)
  - 📄 3. [Fail-Safe Defaults and Secure Design](./11.01-security-mindset/11.01.03-fail-safe-defaults.md)
  - 📄 4. [Trust Boundaries and Zero Trust](./11.01-security-mindset/11.01.04-trust-boundaries.md)
  - 📄 5. [Introduction to Threat Modeling](./11.01-security-mindset/11.01.05-threat-modeling.md)

- 📁 **2. OWASP Top 10**
  - 📄 0. [Overview](./11.02-owasp-top-10/11.02.00-overview.md)
  - 📄 1. [OWASP Top 10 Overview and Broken Access Control](./11.02-owasp-top-10/11.02.01-overview-broken-access-control.md)
  - 📄 2. [Security Misconfiguration](./11.02-owasp-top-10/11.02.02-security-misconfiguration.md)
  - 📄 3. [Injection Attacks (SQL, Command, LDAP)](./11.02-owasp-top-10/11.02.03-injection-attacks.md)
  - 📄 4. [Cryptographic Failures and Sensitive Data](./11.02-owasp-top-10/11.02.04-cryptographic-failures.md)
  - 📄 5. [Cross-Site Scripting (XSS)](./11.02-owasp-top-10/11.02.05-cross-site-scripting.md)
  - 📄 6. [Insecure Design and Software Supply Chain](./11.02-owasp-top-10/11.02.06-insecure-design-supply-chain.md)

- 📁 **3. Authentication Fundamentals**
  - 📄 0. [Overview](./11.03-authentication-fundamentals/11.03.00-overview.md)
  - 📄 1. [Password Hashing and Storage](./11.03-authentication-fundamentals/11.03.01-password-hashing.md)
  - 📄 2. [Session Management Security](./11.03-authentication-fundamentals/11.03.02-session-management.md)
  - 📄 3. [Multi-Factor Authentication (MFA)](./11.03-authentication-fundamentals/11.03.03-multi-factor-authentication.md)
  - 📄 4. [Brute Force and Account Lockout Protection](./11.03-authentication-fundamentals/11.03.04-brute-force-protection.md)
  - 📄 5. [Account Enumeration Prevention](./11.03-authentication-fundamentals/11.03.05-account-enumeration.md)

- 📁 **4. OAuth 2.0 and OpenID Connect**
  - 📄 0. [Overview](./11.04-oauth-oidc/11.04.00-overview.md)
  - 📄 1. [OAuth 2.0 Fundamentals and Grant Types](./11.04-oauth-oidc/11.04.01-oauth-grant-types.md)
  - 📄 2. [Authorization Code Flow with PKCE](./11.04-oauth-oidc/11.04.02-authorization-code-pkce.md)
  - 📄 3. [OpenID Connect Fundamentals](./11.04-oauth-oidc/11.04.03-openid-connect-fundamentals.md)
  - 📄 4. [Access Tokens vs ID Tokens](./11.04-oauth-oidc/11.04.04-access-id-tokens.md)
  - 📄 5. [Token Validation and Security](./11.04-oauth-oidc/11.04.05-token-validation.md)

- 📁 **5. JWT Security**
  - 📄 0. [Overview](./11.05-jwt-security/11.05.00-overview.md)
  - 📄 1. [JWT Structure and Anatomy](./11.05-jwt-security/11.05.01-jwt-structure.md)
  - 📄 2. [JWT Signing Algorithms](./11.05-jwt-security/11.05.02-signing-algorithms.md)
  - 📄 3. [JWT Validation and Claims](./11.05-jwt-security/11.05.03-validation-claims.md)
  - 📄 4. [Common JWT Vulnerabilities](./11.05-jwt-security/11.05.04-jwt-vulnerabilities.md)
  - 📄 5. [JWT Storage and Best Practices](./11.05-jwt-security/11.05.05-storage-best-practices.md)

- 📁 **6. Authorization Patterns**
  - 📄 0. [Overview](./11.06-authorization-patterns/11.06.00-overview.md)
  - 📄 1. [Role-Based Access Control (RBAC)](./11.06-authorization-patterns/11.06.01-rbac.md)
  - 📄 2. [Claims-Based Authorization in .NET](./11.06-authorization-patterns/11.06.02-claims-based-authorization.md)
  - 📄 3. [Policy-Based Authorization](./11.06-authorization-patterns/11.06.03-policy-based-authorization.md)
  - 📄 4. [Attribute-Based and Resource-Based Authorization](./11.06-authorization-patterns/11.06.04-abac-resource-based.md)
  - 📄 5. [Centralized Authorization and Best Practices](./11.06-authorization-patterns/11.06.05-centralized-authorization.md)

- 📁 **7. Secure Coding Practices**
  - 📄 0. [Overview](./11.07-secure-coding-practices/11.07.00-overview.md)
  - 📄 1. [Input Validation Strategies](./11.07-secure-coding-practices/11.07.01-input-validation.md)
  - 📄 2. [Output Encoding and XSS Prevention](./11.07-secure-coding-practices/11.07.02-output-encoding.md)
  - 📄 3. [Parameterized Queries and SQL Injection Prevention](./11.07-secure-coding-practices/11.07.03-parameterized-queries.md)
  - 📄 4. [Secure Configuration Management](./11.07-secure-coding-practices/11.07.04-secure-configuration.md)
  - 📄 5. [Error Handling and Logging Security](./11.07-secure-coding-practices/11.07.05-error-handling-logging.md)

- 📁 **8. Cryptography for Developers**
  - 📄 0. [Overview](./11.08-cryptography-developers/11.08.00-overview.md)
  - 📄 1. [Symmetric Encryption with AES](./11.08-cryptography-developers/11.08.01-symmetric-encryption-aes.md)
  - 📄 2. [Asymmetric Encryption with RSA](./11.08-cryptography-developers/11.08.02-asymmetric-encryption-rsa.md)
  - 📄 3. [Cryptographic Hashing and HMAC](./11.08-cryptography-developers/11.08.03-hashing-hmac.md)
  - 📄 4. [Digital Signatures and Certificates](./11.08-cryptography-developers/11.08.04-digital-signatures.md)
  - 📄 5. [TLS/HTTPS Configuration and Best Practices](./11.08-cryptography-developers/11.08.05-tls-https.md)

- 📁 **9. Secrets Management**
  - 📄 0. [Overview](./11.09-secrets-management/11.09.00-overview.md)
  - 📄 1. [Secrets in Version Control: Why Not and How to Prevent](./11.09-secrets-management/11.09.01-secrets-in-version-control.md)
  - 📄 2. [Environment Variables and Configuration Providers](./11.09-secrets-management/11.09.02-environment-variables.md)
  - 📄 3. [Azure Key Vault for .NET Applications](./11.09-secrets-management/11.09.03-azure-key-vault.md)
  - 📄 4. [HashiCorp Vault and External Secret Stores](./11.09-secrets-management/11.09.04-hashicorp-vault.md)
  - 📄 5. [Secret Rotation and Kubernetes Secrets](./11.09-secrets-management/11.09.05-secret-rotation-kubernetes.md)

- 📁 **10. Security Testing**
  - 📄 0. [Overview](./11.10-security-testing/11.10.00-overview.md)
  - 📄 1. [Static Application Security Testing (SAST)](./11.10-security-testing/11.10.01-sast.md)
  - 📄 2. [Dynamic Application Security Testing (DAST)](./11.10-security-testing/11.10.02-dast.md)
  - 📄 3. [Dependency Vulnerability Scanning](./11.10-security-testing/11.10.03-dependency-scanning.md)
  - 📄 4. [Security Code Review](./11.10-security-testing/11.10.04-security-code-review.md)
  - 📄 5. [Penetration Testing Fundamentals](./11.10-security-testing/11.10.05-penetration-testing.md)

---

## Practical Exercises

1. Identify and fix OWASP Top 10 vulnerabilities in a sample application
2. Implement OAuth 2.0 / OIDC authentication with a proper flow
3. Build a claims-based authorization system
4. Set up a secrets management solution (HashiCorp Vault or similar)
5. Integrate security scanning into a CI/CD pipeline

---

## Resources

- [OWASP Website](https://owasp.org/)
- [OAuth 2.0 Simplified by Aaron Parecki](https://www.oauth.com/)
- [Web Security for Developers by Malcolm McDonald](https://www.amazon.com/Web-Security-Developers-Malcolm-McDonald/dp/1593279949)
- [The Tangled Web by Michal Zalewski](https://www.amazon.com/Tangled-Web-Securing-Modern-Applications/dp/1593273886)
- [Microsoft Identity Platform Documentation](https://docs.microsoft.com/en-us/azure/active-directory/develop/)
