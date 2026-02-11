# Topic 7: Linux for Backend Engineers

## Overview

This topic builds serious Linux proficiency for backend engineers. We'll go beyond basic commands to understand system administration, shell scripting, networking, security, and performance troubleshooting — skills essential for operating applications in production.

**Prerequisites:** Basic familiarity with command line, some experience with Linux

**Outcome:** Confidently administer Linux servers, write automation scripts, and troubleshoot production issues.

---

## Chapters

- 📁 **1. Linux Fundamentals Review**
  - 📄 0. [Overview](./07.01-linux-fundamentals-review/07.01.00-overview.md)
  - 📄 1. [Filesystem Hierarchy Standard (FHS)](./07.01-linux-fundamentals-review/07.01.01-filesystem-hierarchy.md)
  - 📄 2. [File Permissions Deep Dive](./07.01-linux-fundamentals-review/07.01.02-file-permissions.md)
  - 📄 3. [Users, Groups, and Ownership](./07.01-linux-fundamentals-review/07.01.03-users-groups-ownership.md)
  - 📄 4. [Symbolic and Hard Links](./07.01-linux-fundamentals-review/07.01.04-links.md)
  - 📄 5. [Unix Philosophy and Pipelines](./07.01-linux-fundamentals-review/07.01.05-unix-philosophy-pipes.md)

- 📁 **2. Command-Line Mastery**
  - 📄 0. [Overview](./07.02-command-line-mastery/07.02.00-overview.md)
  - 📄 1. [Grep and Text Searching](./07.02-command-line-mastery/07.02.01-grep-text-searching.md)
  - 📄 2. [Sed and Awk for Text Processing](./07.02-command-line-mastery/07.02.02-sed-awk-processing.md)
  - 📄 3. [Find and Xargs for File Operations](./07.02-command-line-mastery/07.02.03-find-xargs.md)
  - 📄 4. [Process Management with ps, top, and kill](./07.02-command-line-mastery/07.02.04-process-management.md)
  - 📄 5. [Tar and File Compression](./07.02-command-line-mastery/07.02.05-tar-compression.md)

- 📁 **3. Bash Scripting**
  - 📄 0. [Overview](./07.03-bash-scripting/07.03.00-overview.md)
  - 📄 1. [Variables and Data Types](./07.03-bash-scripting/07.03.01-variables-data-types.md)
  - 📄 2. [Conditionals: if and case Statements](./07.03-bash-scripting/07.03.02-conditionals.md)
  - 📄 3. [Loops: for and while](./07.03-bash-scripting/07.03.03-loops.md)
  - 📄 4. [Functions and Code Reuse](./07.03-bash-scripting/07.03.04-functions.md)
  - 📄 5. [Error Handling and Exit Codes](./07.03-bash-scripting/07.03.05-error-handling.md)

- 📁 **4. Process and Service Management**
  - 📄 0. [Overview](./07.04-process-service-management/07.04.00-overview.md)
  - 📄 1. [Process States and Lifecycle](./07.04-process-service-management/07.04.01-process-states-lifecycle.md)
  - 📄 2. [Introduction to systemd](./07.04-process-service-management/07.04.02-systemd-intro.md)
  - 📄 3. [Managing Services with systemctl](./07.04-process-service-management/07.04.03-systemctl-management.md)
  - 📄 4. [systemd Unit Files and Custom Services](./07.04-process-service-management/07.04.04-unit-files-custom-services.md)
  - 📄 5. [Journal Logging with journalctl](./07.04-process-service-management/07.04.05-journalctl-logging.md)

- 📁 **5. Linux Networking**
  - 📄 0. [Overview](./07.05-linux-networking/07.05.00-overview.md)
  - 📄 1. [Network Interfaces and Configuration](./07.05-linux-networking/07.05.01-network-interfaces.md)
  - 📄 2. [Firewall Basics: iptables and nftables](./07.05-linux-networking/07.05.02-firewall-basics.md)
  - 📄 3. [SSH Configuration and Security](./07.05-linux-networking/07.05.03-ssh-security.md)
  - 📄 4. [DNS Configuration and Troubleshooting](./07.05-linux-networking/07.05.04-dns-configuration.md)
  - 📄 5. [Network Troubleshooting Tools](./07.05-linux-networking/07.05.05-troubleshooting-tools.md)

- 📁 **6. Linux Security**
  - 📄 0. [Overview](./07.06-linux-security/07.06.00-overview.md)
  - 📄 1. [User Management and Least Privilege](./07.06-linux-security/07.06.01-user-management-least-privilege.md)
  - 📄 2. [Sudo Configuration and Best Practices](./07.06-linux-security/07.06.02-sudo-configuration.md)
  - 📄 3. [SELinux and AppArmor Basics](./07.06-linux-security/07.06.03-selinux-apparmor.md)
  - 📄 4. [File Integrity Monitoring](./07.06-linux-security/07.06.04-file-integrity-monitoring.md)
  - 📄 5. [Security Updates and Patch Management](./07.06-linux-security/07.06.05-security-updates.md)

- 📁 **7. Performance Monitoring and Troubleshooting**
  - 📄 0. [Overview](./07.07-performance-monitoring/07.07.00-overview.md)
  - 📄 1. [CPU Performance Monitoring](./07.07-performance-monitoring/07.07.01-cpu-performance.md)
  - 📄 2. [Memory and Swap Analysis](./07.07-performance-monitoring/07.07.02-memory-swap.md)
  - 📄 3. [Disk I/O Performance](./07.07-performance-monitoring/07.07.03-disk-io-performance.md)
  - 📄 4. [Network Performance Monitoring](./07.07-performance-monitoring/07.07.04-network-performance.md)
  - 📄 5. [Systematic Performance Troubleshooting](./07.07-performance-monitoring/07.07.05-systematic-troubleshooting.md)

- 📁 **8. Linux Containers from the OS Perspective**
  - 📄 0. [Overview](./07.08-containers-os-perspective/07.08.00-overview.md)
  - 📄 1. [Linux Namespaces](./07.08-containers-os-perspective/07.08.01-namespaces.md)
  - 📄 2. [Control Groups (cgroups)](./07.08-containers-os-perspective/07.08.02-cgroups.md)
  - 📄 3. [Overlay Filesystems](./07.08-containers-os-perspective/07.08.03-overlay-filesystems.md)
  - 📄 4. [Container Resource Limits](./07.08-containers-os-perspective/07.08.04-resource-limits.md)
  - 📄 5. [Debugging Containers from the Host](./07.08-containers-os-perspective/07.08.05-debugging-containers.md)

---

## Practical Exercises

1. Write a Bash script that monitors a log file and alerts on specific patterns
2. Set up a systemd service for a custom application with automatic restart
3. Configure firewall rules to allow only specific traffic
4. Diagnose a performance issue using system monitoring tools
5. Harden an SSH configuration and set up key-based authentication

---

## Resources

- [The Linux Command Line by William Shotts](https://linuxcommand.org/tlcl.php) (free PDF)
- [Linux Bible by Christopher Negus](https://www.wiley.com/en-us/Linux+Bible%2C+10th+Edition-p-9781119578888)
- [UNIX and Linux System Administration Handbook](https://www.admin.com/)
- [Linux Performance Analysis by Brendan Gregg](https://www.brendangregg.com/linuxperf.html)
- [DigitalOcean Linux Tutorials](https://www.digitalocean.com/community/tutorials)
