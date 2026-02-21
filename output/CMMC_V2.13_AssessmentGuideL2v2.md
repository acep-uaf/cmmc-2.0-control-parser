# CMMC Assessment Guide - Level 2

- **TITLE:**     CMMC Assessment Guide - Level 2
- **FRAMEWORK:** Cybersecurity Maturity Model Certification
- **VERSION:**   2.13
- **DATE:**      2024-09-01
- **ZRIN:**      ZRIN 0790-ZA19
- **OTHER_ID:**  24-T-0461
- **URL:**       https://dodcio.defense.gov/Portals/0/Documents/CMMC/AssessmentGuideL2v2.pdf
- **Control Couts:** 110

# Controls

## Access Control (AC)

#### AC.L2-3.1.1 - Authorized Access Control [CUI Data]

CMMC Assessment Guide - Level 2 | Version 2.13 14 AC.L2-3.1.1 - AUTHORIZED ACCESS CONTROL [CUI DATA] Limit system access to authorized users, processes acting on behalf of authorized users, and devices (including other systems).
##### Assessment Objectives
[**a**] - authorized users are identified;

[**b**] - processes acting on behalf of authorized users are identified;

[**c**] - devices (and other systems) authorized to connect to the system are identified;

[**d**] - system access is limited to authorized users;

[**e**] - system access is limited to processes acting on behalf of authorized users; and

[**f**] - system access is limited to authorized devices (including other systems).

#### AC.L2-3.1.2 - Transaction & Function Control

CMMC Assessment Guide - Level 2 | Version 2.13 17 AC.L2-3.1.2 - TRANSACTION & FUNCTION CONTROL Limit  system  access  to  the  types  of  transactions  and  functions  that  authorized  users  are permitted to execute.
##### Assessment Objectives
[**a**] - the types of transactions and functions that authorized users are permitted to execute are defined; and

[**b**] - system access is limited to the defined types of transactions and functions for authorized users.

#### AC.L2-3.1.3 - Control CUI Flow

CMMC Assessment Guide - Level 2 | Version 2.13 19 AC.L2-3.1.3 - CONTROL CUI FLOW Control the flow of CUI in accordance with approved authorizations.
##### Assessment Objectives
[**a**] - information flow control policies are defined;

[**b**] - methods and enforcement mechanisms for controlling the flow of CUI are defined;

[**c**] - designated sources and destinations (e.g., networks, individuals, and devices) for CUI within the system and between interconnected systems are identified;

[**d**] - authorizations for controlling the flow of CUI are defined; and

[**e**] - approved authorizations for controlling the flow of CUI are enforced.

#### AC.L2-3.1.4 - Separation of Duties

CMMC Assessment Guide - Level 2 | Version 2.13 22 AC.L2-3.1.4 - SEPARATION OF DUTIES Separate the duties of individuals to reduce the risk of malevolent activity without collusion.
##### Assessment Objectives
[**a**] - the duties of individuals requiring separation are defined;

[**b**] - responsibilities for duties that require separation are assigned to separate individuals; and

[**c**] - access privileges that enable individuals to exercise the duties that require separation are granted to separate individuals.

#### AC.L2-3.1.5 - Least Privilege

CMMC Assessment Guide - Level 2 | Version 2.13 24 AC.L2-3.1.5 - LEAST PRIVILEGE Employ   the   principle   of   least   privilege,   including   for   specific   security   functions   and privileged accounts.
##### Assessment Objectives
[**a**] - privileged accounts are identified;

[**b**] - access to privileged accounts is authorized in accordance with the principle of least privilege;

[**c**] - security functions are identified; and

[**d**] - access to security functions is authorized in accordance with the principle of least privilege.

#### AC.L2-3.1.6 - Non-Privileged Account Use

CMMC Assessment Guide - Level 2 | Version 2.13 27 AC.L2-3.1.6 - NON-PRIVILEGED ACCOUNT USE Use non-privileged accounts or roles when accessing nonsecurity functions.
##### Assessment Objectives
[**a**] - nonsecurity functions are identified; and

[**b**] - users are required to use non-privileged accounts or roles when accessing nonsecurity functions.

#### AC.L2-3.1.7 - Privileged Functions

CMMC Assessment Guide - Level 2 | Version 2.13 29 AC.L2-3.1.7 - PRIVILEGED FUNCTIONS Prevent non-privileged users from executing privileged functions and capture the execution of such functions in audit logs.
##### Assessment Objectives
[**a**] - privileged functions are defined;

[**b**] - non-privileged users are defined;

[**c**] - non-privileged users are prevented from executing privileged functions; and

[**d**] - the execution of privileged functions is captured in audit logs.

#### AC.L2-3.1.8 - Unsuccessful Logon Attempts

CMMC Assessment Guide - Level 2 | Version 2.13 32 AC.L2-3.1.8 - UNSUCCESSFUL LOGON ATTEMPTS Limit unsuccessful logon attempts.
##### Assessment Objectives
[**a**] - the means of limiting unsuccessful logon attempts is defined; and

[**b**] - the defined means of limiting unsuccessful logon attempts is implemented.

#### AC.L2-3.1.9 - Privacy & Security Notices

CMMC Assessment Guide - Level 2 | Version 2.13 34 AC.L2-3.1.9 - PRIVACY & SECURITY NOTICES Provide privacy and security notices consistent with applicable CUI rules.
##### Assessment Objectives
[**a**] - privacy and security notices required by CUI-specified rules are identified, consistent, and associated with the specific CUI category; and

[**b**] - privacy and security notices are displayed.

#### AC.L2-3.1.10 - Session Lock

CMMC Assessment Guide - Level 2 | Version 2.13 36 AC.L2-3.1.10 - SESSION LOCK Use session lock with pattern-hiding displays to prevent access and viewing of data after a period of inactivity.
##### Assessment Objectives
[**a**] - the period of inactivity after which the system initiates a session lock is defined;

[**b**] - access to the system and viewing of data is prevented by initiating a session lock after the defined period of inactivity; and

[**c**] - previously visible information is concealed via a pattern-hiding display after the defined period of inactivity.

#### AC.L2-3.1.11 - Session Termination

CMMC Assessment Guide - Level 2 | Version 2.13 38 AC.L2-3.1.11 - SESSION TERMINATION Terminate (automatically) a user session after a defined condition.
##### Assessment Objectives
[**a**] - conditions requiring a user session to terminate are defined; and

[**b**] - a user session is automatically terminated after any of the defined conditions occur.

#### AC.L2-3.1.12 - Control Remote Access

CMMC Assessment Guide - Level 2 | Version 2.13 40 AC.L2-3.1.12 - CONTROL REMOTE ACCESS Monitor and control remote access sessions.
##### Assessment Objectives
[**a**] - remote access sessions are permitted;

[**b**] - the types of permitted remote access are identified;

[**c**] - remote access sessions are controlled; and

[**d**] - remote access sessions are monitored.

#### AC.L2-3.1.13 - Remote Access Confidentiality

CMMC Assessment Guide - Level 2 | Version 2.13 43 AC.L2-3.1.13 - REMOTE ACCESS CONFIDENTIALITY Employ cryptographic mechanisms to protect the confidentiality of remote access sessions.
##### Assessment Objectives
[**a**] - cryptographic mechanisms to protect the confidentiality of remote access sessions are identified; and

[**b**] - cryptographic mechanisms to protect the confidentiality of remote access sessions are implemented.

#### AC.L2-3.1.14 - Remote Access Routing

CMMC Assessment Guide - Level 2 | Version 2.13 45 AC.L2-3.1.14 - REMOTE ACCESS ROUTING Route remote access via managed access control points.
##### Assessment Objectives
[**a**] - managed access control points are identified and implemented; and

[**b**] - remote access is routed through managed network access control points.

#### AC.L2-3.1.15 - Privileged Remote Access

CMMC Assessment Guide - Level 2 | Version 2.13 47 AC.L2-3.1.15 - PRIVILEGED REMOTE ACCESS Authorize remote execution of privileged commands and remote access to security-relevant information.
##### Assessment Objectives
[**a**] - privileged commands authorized for remote execution are identified;

[**b**] - security-relevant information authorized to be accessed remotely is identified;

[**c**] - the execution of the identified privileged commands via remote access is authorized; and

[**d**] - access to the identified security-relevant information via remote access is authorized.

#### AC.L2-3.1.16 - Wireless Access Authorization

CMMC Assessment Guide - Level 2 | Version 2.13 50 AC.L2-3.1.16 - WIRELESS ACCESS AUTHORIZATION Authorize wireless access prior to allowing such connections.
##### Assessment Objectives
[**a**] - wireless access points are identified; and

[**b**] - wireless access is authorized prior to allowing such connections.

#### AC.L2-3.1.17 - Wireless Access Protection

CMMC Assessment Guide - Level 2 | Version 2.13 52 AC.L2-3.1.17 - WIRELESS ACCESS PROTECTION Protect wireless access using authentication and encryption.
##### Assessment Objectives
[**a**] - wireless access to the system is protected using authentication; and

[**b**] - wireless access to the system is protected using encryption.

#### AC.L2-3.1.18 - Mobile Device Connection

CMMC Assessment Guide - Level 2 | Version 2.13 54 AC.L2-3.1.18 - MOBILE DEVICE CONNECTION Control connection of mobile devices.
##### Assessment Objectives
[**a**] - mobile devices that process, store, or transmit CUI are identified;

[**b**] - mobile device connections are authorized; and

[**c**] - mobile device connections are monitored and logged.

#### AC.L2-3.1.19 - Encrypt CUI on Mobile

CMMC Assessment Guide - Level 2 | Version 2.13 56 AC.L2-3.1.19 - ENCRYPT CUI ON MOBILE Encrypt CUI on mobile devices and mobile computing platforms.
##### Assessment Objectives
[**a**] - mobile devices and mobile computing platforms that process, store, or transmit CUI are identified; and

[**b**] - encryption is employed to protect CUI on identified mobile devices and mobile computing platforms.

#### AC.L2-3.1.20 - External Connections [CUI Data]

CMMC Assessment Guide - Level 2 | Version 2.13 58 AC.L2-3.1.20 - EXTERNAL CONNECTIONS [CUI DATA] Verify and control/limit connections to and use of external systems.
##### Assessment Objectives
[**a**] - connections to external systems are identified;

[**b**] - the use of external systems is identified;

[**c**] - connections to external systems are verified;

[**d**] - the use of external systems is verified;

[**e**] - connections to external systems are controlled/limited; and

[**f**] - the use of external systems is controlled/limited.

#### AC.L2-3.1.21 - Portable Storage Use

CMMC Assessment Guide - Level 2 | Version 2.13 61 AC.L2-3.1.21 - PORTABLE STORAGE USE Limit use of portable storage devices on external systems.
##### Assessment Objectives
[**a**] - the use of portable storage devices containing CUI on external systems is identified and documented;

[**b**] - limits on the use of portable storage devices containing CUI on external systems are defined; and

[**c**] - the use of portable storage devices containing CUI on external systems is limited as defined.

#### AC.L2-3.1.22 - Control Public Information [CUI Data]

CMMC Assessment Guide - Level 2 | Version 2.13 63 AC.L2-3.1.22 - CONTROL PUBLIC INFORMATION [CUI DATA] Control CUI posted or processed on publicly accessible systems.
##### Assessment Objectives
[**a**] - individuals authorized to post or process information on publicly accessible systems are identified;

[**b**] - procedures to ensure CUI is not posted or processed on publicly accessible systems are identified;

[**c**] - a review process is in place prior to posting of any content to publicly accessible systems;

[**d**] - content on publicly accessible systems is reviewed to ensure that it does not include CUI; and

[**e**] - mechanisms are in place to remove and address improper posting of CUI.

#### AT.L2-3.2.1 - Role-Based Risk Awareness

CMMC Assessment Guide - Level 2 | Version 2.13 65 AT.L2-3.2.1 - ROLE-BASED RISK AWARENESS Ensure  that  managers,  systems  administrators,  and  users  of  organizational  systems  are made  aware  of  the  security  risks  associated  with  their  activities  and  of  the  applicable policies, standards, and procedures related to the security of those systems.
##### Assessment Objectives
[**a**] - security risks associated with organizational activities involving CUI are identified;

[**b**] - policies, standards, and procedures related to the security of the system are identified;

[**c**] - managers, systems administrators, and users of the system are made aware of the security risks associated with their activities; and

[**d**] - managers, systems administrators, and users of the system are made aware of the applicable policies, standards, and procedures related to the security of the system.

#### AT.L2-3.2.2 - Role-Based Training

CMMC Assessment Guide - Level 2 | Version 2.13 68 AT.L2-3.2.2 - ROLE-BASED TRAINING Ensure  that  personnel  are  trained  to  carry  out  their  assigned  information  security-related duties and responsibilities.
##### Assessment Objectives
[**a**] - information security-related duties, roles, and responsibilities are defined;

[**b**] - information security-related duties, roles, and responsibilities are assigned to designated personnel; and

[**c**] - personnel are adequately trained to carry out their assigned information security- related duties, roles, and responsibilities.

#### AT.L2-3.2.3 - Insider Threat Awareness

CMMC Assessment Guide - Level 2 | Version 2.13 70 AT.L2-3.2.3 - INSIDER THREAT AWARENESS Provide  security  awareness  training  on  recognizing  and  reporting  potential  indicators  of insider threat.
##### Assessment Objectives
[**a**] - potential indicators associated with insider threats are identified; and

[**b**] - security awareness training on recognizing and reporting potential indicators of insider threat is provided to managers and employees.

#### AU.L2-3.3.1 - System Auditing

CMMC Assessment Guide - Level 2 | Version 2.13 72 AU.L2-3.3.1 - SYSTEM AUDITING Create  and  retain  system  audit  logs  and  records  to  the  extent  needed  to  enable  the monitoring,  analysis,  investigation,  and  reporting  of  unlawful  or  unauthorized  system activity.
##### Assessment Objectives
[**a**] - audit logs needed (i.e., event types to be logged) to enable the monitoring, analysis, investigation, and reporting of unlawful or unauthorized system activity are specified;

[**b**] - the content of audit records needed to support monitoring, analysis, investigation, and reporting of unlawful or unauthorized system activity is defined;

[**c**] - audit records are created (generated);

[**d**] - audit records, once created, contain the defined content;

[**e**] - retention requirements for audit records are defined; and

[**f**] - audit records are retained as defined.

#### AU.L2-3.3.2 - User Accountability

CMMC Assessment Guide - Level 2 | Version 2.13 75 AU.L2-3.3.2 - USER ACCOUNTABILITY Ensure that the actions of individual system users can be uniquely traced to those users so they can be held accountable for their actions.
##### Assessment Objectives
[**a**] - the content of the audit records needed to support the ability to uniquely trace users to their actions is defined; and

[**b**] - audit records, once created, contain the defined content.

#### AU.L2-3.3.3 - Event Review

CMMC Assessment Guide - Level 2 | Version 2.13 77 AU.L2-3.3.3 - EVENT REVIEW Review and update logged events.
##### Assessment Objectives
[**a**] - a process for determining when to review logged events is defined;

[**b**] - event types being logged are reviewed in accordance with the defined review process; and

[**c**] - event types being logged are updated based on the review.

#### AU.L2-3.3.4 - Audit Failure Alerting

CMMC Assessment Guide - Level 2 | Version 2.13 79 AU.L2-3.3.4 - AUDIT FAILURE ALERTING Alert in the event of an audit logging process failure.
##### Assessment Objectives
[**a**] - personnel or roles to be alerted in the event of an audit logging process failure are identified;

[**b**] - types of audit logging process failures for which alert will be generated are defined; and

[**c**] - identified personnel or roles are alerted in the event of an audit logging process failure.

#### AU.L2-3.3.5 - Audit Correlation

CMMC Assessment Guide - Level 2 | Version 2.13 81 AU.L2-3.3.5 - AUDIT CORRELATION Correlate  audit  record  review,  analysis,  and  reporting  processes  for  investigation  and response to indications of unlawful, unauthorized, suspicious, or unusual activity.
##### Assessment Objectives
[**a**] - audit record review, analysis, and reporting processes for investigation and response to indications of unlawful, unauthorized, suspicious, or unusual activity are defined; and

[**b**] - defined audit record review, analysis, and reporting processes are correlated.

#### AU.L2-3.3.6 - Reduction & Reporting

CMMC Assessment Guide - Level 2 | Version 2.13 83 AU.L2-3.3.6 - REDUCTION & REPORTING Provide  audit  record  reduction  and  report  generation  to  support  on-demand  analysis  and reporting.
##### Assessment Objectives
[**a**] - an audit record reduction capability that supports on-demand analysis is provided; and

[**b**] - a report generation capability that supports on-demand reporting is provided.

#### AU.L2-3.3.7 - Authoritative Time Source

CMMC Assessment Guide - Level 2 | Version 2.13 85 AU.L2-3.3.7 - AUTHORITATIVE TIME SOURCE Provide a system capability that compares and synchronizes internal system clocks with an authoritative source to generate time stamps for audit records.
##### Assessment Objectives
[**a**] - internal system clocks are used to generate time stamps for audit records;

[**b**] - an authoritative source with which to compare and synchronize internal system clocks is specified; and

[**c**] - internal system clocks used to generate time stamps for audit records are compared to and synchronized with the specified authoritative time source.

#### AU.L2-3.3.8 - Audit Protection

CMMC Assessment Guide - Level 2 | Version 2.13 87 AU.L2-3.3.8 - AUDIT PROTECTION Protect  audit  information  and  audit  logging  tools  from  unauthorized  access,  modification, and deletion.
##### Assessment Objectives
[**a**] - audit information is protected from unauthorized access;

[**b**] - audit information is protected from unauthorized modification;

[**c**] - audit information is protected from unauthorized deletion;

[**d**] - audit logging tools are protected from unauthorized access;

[**e**] - audit logging tools are protected from unauthorized modification; and

[**f**] - audit logging tools are protected from unauthorized deletion.

#### AU.L2-3.3.9 - Audit Management

CMMC Assessment Guide - Level 2 | Version 2.13 89 AU.L2-3.3.9 - AUDIT MANAGEMENT Limit management of audit logging functionality to a subset of privileged users.
##### Assessment Objectives
[**a**] - a subset of privileged users granted access to manage audit logging functionality is defined; and

[**b**] - management of audit logging functionality is limited to the defined subset of privileged users.

#### CM.L2-3.4.1 - System Baselining

CMMC Assessment Guide - Level 2 | Version 2.13 91 CM.L2-3.4.1 - SYSTEM BASELINING Establish  and  maintain  baseline  configurations  and  inventories  of  organizational  systems (including  hardware,  software,  firmware,  and  documentation)  throughout  the  respective system development life cycles.
##### Assessment Objectives
[**a**] - a baseline configuration is established;

[**b**] - the baseline configuration includes hardware, software, firmware, and documentation;

[**c**] - the baseline configuration is maintained (reviewed and updated) throughout the system development life cycle;

[**d**] - a system inventory is established;

[**e**] - the system inventory includes hardware, software, firmware, and documentation; and

[**f**] - the inventory is maintained (reviewed and updated) throughout the system development life cycle.

#### CM.L2-3.4.2 - Security Configuration Enforcement

CMMC Assessment Guide - Level 2 | Version 2.13 94 CM.L2-3.4.2 - SECURITY CONFIGURATION ENFORCEMENT Establish  and  enforce  security  configuration  settings  for  information  technology  products employed in organizational systems.
##### Assessment Objectives
[**a**] - security configuration settings for information technology products employed in the system are established and included in the baseline configuration; and

[**b**] - security configuration settings for information technology products employed in the system are enforced.

#### CM.L2-3.4.3 - System Change Management

CMMC Assessment Guide - Level 2 | Version 2.13 96 CM.L2-3.4.3 - SYSTEM CHANGE MANAGEMENT Track, review, approve or disapprove, and log changes to organizational systems.
##### Assessment Objectives
[**a**] - changes to the system are tracked;

[**b**] - changes to the system are reviewed;

[**c**] - changes to the system are approved or disapproved; and

[**d**] - changes to the system are logged.

#### CM.L2-3.4.4 - Security Impact Analysis

CMMC Assessment Guide - Level 2 | Version 2.13 98 CM.L2-3.4.4 - SECURITY IMPACT ANALYSIS Analyze the security impact of changes prior to implementation.
##### Assessment Objectives
[**a**] - the security impact of changes to the system is analyzed prior to implementation.

#### CM.L2-3.4.5 - Access Restrictions for Change

CMMC Assessment Guide - Level 2 | Version 2.13 100 CM.L2-3.4.5 - ACCESS RESTRICTIONS FOR CHANGE Define,  document,  approve,  and  enforce  physical  and  logical  access  restrictions  associated with changes to organizational systems.
##### Assessment Objectives
[**a**] - physical access restrictions associated with changes to the system are defined;

[**b**] - physical access restrictions associated with changes to the system are documented;

[**c**] - physical access restrictions associated with changes to the system are approved;

[**d**] - physical access restrictions associated with changes to the system are enforced;

[**e**] - logical access restrictions associated with changes to the system are defined;

[**f**] - logical access restrictions associated with changes to the system are documented;

[**g**] - logical access restrictions associated with changes to the system are approved; and

[**h**] - logical access restrictions associated with changes to the system are enforced.

#### CM.L2-3.4.6 - Least Functionality

CMMC Assessment Guide - Level 2 | Version 2.13 103 CM.L2-3.4.6 - LEAST FUNCTIONALITY Employ the principle of least functionality by configuring organizational systems to provide only essential capabilities.
##### Assessment Objectives
[**a**] - essential system capabilities are defined based on the principle of least functionality; and

[**b**] - the system is configured to provide only the defined essential capabilities.

#### CM.L2-3.4.7 - Nonessential Functionality

CMMC Assessment Guide - Level 2 | Version 2.13 105 CM.L2-3.4.7 - NONESSENTIAL FUNCTIONALITY Restrict,  disable,  or  prevent  the  use  of  nonessential  programs,  functions,  ports,  protocols, and services.
##### Assessment Objectives
[**a**] - essential programs are defined;

[**b**] - the use of nonessential programs is defined;

[**c**] - the use of nonessential programs is restricted, disabled, or prevented as defined;

[**d**] - essential functions are defined;

[**e**] - the use of nonessential functions is defined;

[**f**] - the use of nonessential functions is restricted, disabled, or prevented as defined;

[**g**] - essential ports are defined;

[**h**] - the use of nonessential ports is defined;

[**i**] - the use of nonessential ports is restricted, disabled, or prevented as defined;

[**j**] - essential protocols are defined;

[**k**] - the use of nonessential protocols is defined;

[**l**] - the use of nonessential protocols is restricted, disabled, or prevented as defined;

[**m**] - essential services are defined;

[**n**] - the use of nonessential services is defined; and

[**o**] - the use of nonessential services is restricted, disabled, or prevented as defined.

#### CM.L2-3.4.8 - Application Execution Policy

CMMC Assessment Guide - Level 2 | Version 2.13 108 CM.L2-3.4.8 - APPLICATION EXECUTION POLICY Apply deny-by-exception (blacklisting) policy to prevent the use of unauthorized software or  deny-all,  permit-by-exception  (whitelisting)  policy  to  allow  the  execution  of  authorized software.
##### Assessment Objectives
[**a**] - a policy specifying whether whitelisting or blacklisting is to be implemented is specified;

[**b**] - the software allowed to execute under whitelisting or denied use under blacklisting is specified; and

[**c**] - whitelisting to allow the execution of authorized software or blacklisting to prevent the use of unauthorized software is implemented as specified.

#### CM.L2-3.4.9 - User-Installed Software

CMMC Assessment Guide - Level 2 | Version 2.13 110 CM.L2-3.4.9 - USER-INSTALLED SOFTWARE Control and monitor user-installed software.
##### Assessment Objectives
[**a**] - a policy for controlling the installation of software by users is established;

[**b**] - installation of software by users is controlled based on the established policy; and

[**c**] - installation of software by users is monitored.

#### IA.L2-3.5.1 - Identification [CUI Data]

CMMC Assessment Guide - Level 2 | Version 2.13 112 IA.L2-3.5.1 - IDENTIFICATION [CUI DATA] Identify system users, processes acting on behalf of users, and devices.
##### Assessment Objectives
[**a**] - system users are identified;

[**b**] - processes acting on behalf of users are identified; and

[**c**] - devices accessing the system are identified.

#### IA.L2-3.5.2 - Authentication [CUI Data]

CMMC Assessment Guide - Level 2 | Version 2.13 114 IA.L2-3.5.2 - AUTHENTICATION [CUI DATA] Authenticate  (or  verify)  the  identities  of  users,  processes,  or  devices,  as  a  prerequisite  to allowing access to organizational systems.
##### Assessment Objectives
[**a**] - the identity of each user is authenticated or verified as a prerequisite to system access;

[**b**] - the identity of each process acting on behalf of a user is authenticated or verified as a prerequisite to system access; and

[**c**] - the identity of each device accessing or connecting to the system is authenticated or verified as a prerequisite to system access.

#### IA.L2-3.5.3 - Multifactor Authentication

CMMC Assessment Guide - Level 2 | Version 2.13 117 IA.L2-3.5.3 - MULTIFACTOR AUTHENTICATION Use multifactor authentication for local and network access to privileged accounts and for network access to non-privileged accounts.
##### Assessment Objectives
[**a**] - privileged accounts are identified;

[**b**] - multifactor authentication is implemented for local access to privileged accounts;

[**c**] - multifactor authentication is implemented for network access to privileged accounts; and

[**d**] - multifactor authentication is implemented for network access to non-privileged accounts.

#### IA.L2-3.5.4 - Replay-Resistant Authentication

CMMC Assessment Guide - Level 2 | Version 2.13 120 IA.L2-3.5.4 - REPLAY-RESISTANT AUTHENTICATION Employ  replay-resistant  authentication  mechanisms  for  network  access  to  privileged  and non-privileged accounts.
##### Assessment Objectives
[**a**] - replay-resistant authentication mechanisms are implemented for network account access to privileged and non-privileged accounts.

#### IA.L2-3.5.5 - Identifier Reuse

CMMC Assessment Guide - Level 2 | Version 2.13 122 IA.L2-3.5.5 - IDENTIFIER REUSE Prevent reuse of identifiers for a defined period.
##### Assessment Objectives
[**a**] - a period within which identifiers cannot be reused is defined; and

[**b**] - reuse of identifiers is prevented within the defined period.

#### IA.L2-3.5.6 - Identifier Handling

CMMC Assessment Guide - Level 2 | Version 2.13 124 IA.L2-3.5.6 - IDENTIFIER HANDLING Disable identifiers after a defined period of inactivity.
##### Assessment Objectives
[**a**] - a period of inactivity after which an identifier is disabled is defined; and

[**b**] - identifiers are disabled after the defined period of inactivity.

#### IA.L2-3.5.7 - Password Complexity

CMMC Assessment Guide - Level 2 | Version 2.13 126 IA.L2-3.5.7 - PASSWORD COMPLEXITY Enforce  a  minimum  password  complexity  and  change  of  characters  when  new  passwords are created.
##### Assessment Objectives
[**a**] - password complexity requirements are defined;

[**b**] - password change of character requirements are defined;

[**c**] - minimum password complexity requirements as defined are enforced when new passwords are created; and

[**d**] - minimum password change of character requirements as defined are enforced when new passwords are created.

#### IA.L2-3.5.8 - Password Reuse

CMMC Assessment Guide - Level 2 | Version 2.13 128 IA.L2-3.5.8 - PASSWORD REUSE Prohibit password reuse for a specified number of generations.
##### Assessment Objectives
[**a**] - the number of generations during which a password cannot be reused is specified and

[**b**] - reuse of passwords is prohibited during the specified number of generations.

#### IA.L2-3.5.9 - Temporary Passwords

CMMC Assessment Guide - Level 2 | Version 2.13 130 IA.L2-3.5.9 - TEMPORARY PASSWORDS Allow temporary password use for system logons with an immediate change to a permanent password.
##### Assessment Objectives
[**a**] - an immediate change to a permanent password is required when a temporary password is used for system logon.

#### IA.L2-3.5.10 - Cryptographically-Protected Passwords

CMMC Assessment Guide - Level 2 | Version 2.13 132 IA.L2-3.5.10 - CRYPTOGRAPHICALLY-PROTECTED PASSWORDS Store and transmit only cryptographically-protected passwords.
##### Assessment Objectives
[**a**] - passwords are cryptographically protected in storage; and

[**b**] - passwords are cryptographically protected in transit.

#### IA.L2-3.5.11 - Obscure Feedback

CMMC Assessment Guide - Level 2 | Version 2.13 134 IA.L2-3.5.11 - OBSCURE FEEDBACK Obscure feedback of authentication information.
##### Assessment Objectives
[**a**] - authentication information is obscured during the authentication process.

#### IR.L2-3.6.1 - Incident Handling

CMMC Assessment Guide - Level 2 | Version 2.13 136 IR.L2-3.6.1 - INCIDENT HANDLING Establish   an   operational   incident-handling   capability   for   organizational   systems   that includes   preparation,   detection,   analysis,   containment,   recovery,   and   user   response activities.
##### Assessment Objectives
[**a**] - an operational incident-handling capability is established;

[**b**] - the operational incident-handling capability includes preparation;

[**c**] - the operational incident-handling capability includes detection;

[**d**] - the operational incident-handling capability includes analysis;

[**e**] - the operational incident-handling capability includes containment;

[**f**] - the operational incident-handling capability includes recovery; and

[**g**] - the operational incident-handling capability includes user response activities.

#### IR.L2-3.6.2 - Incident Reporting

CMMC Assessment Guide - Level 2 | Version 2.13 139 IR.L2-3.6.2 - INCIDENT REPORTING Track,  document,  and  report  incidents  to  designated  officials  and/or  authorities  both internal and external to the organization.
##### Assessment Objectives
[**a**] - incidents are tracked;

[**b**] - incidents are documented;

[**c**] - authorities to whom incidents are to be reported are identified;

[**d**] - organizational officials to whom incidents are to be reported are identified;

[**e**] - identified authorities are notified of incidents; and

[**f**] - identified organizational officials are notified of incidents.

#### IR.L2-3.6.3 - Incident Response Testing

CMMC Assessment Guide - Level 2 | Version 2.13 142 IR.L2-3.6.3 - INCIDENT RESPONSE TESTING Test the organizational incident response capability.
##### Assessment Objectives
[**a**] - the incident response capability is tested.

#### MA.L2-3.7.1 - Perform Maintenance

CMMC Assessment Guide - Level 2 | Version 2.13 144 MA.L2-3.7.1 - PERFORM MAINTENANCE Perform maintenance on organizational systems.
##### Assessment Objectives
[**a**] - system maintenance is performed.

#### MA.L2-3.7.2 - System Maintenance Control

CMMC Assessment Guide - Level 2 | Version 2.13 146 MA.L2-3.7.2 - SYSTEM MAINTENANCE CONTROL Provide  controls  on  the  tools,  techniques,  mechanisms,  and  personnel  used  to  conduct system maintenance.
##### Assessment Objectives
[**a**] - tools used to conduct system maintenance are controlled;

[**b**] - techniques used to conduct system maintenance are controlled;

[**c**] - mechanisms used to conduct system maintenance are controlled; and

[**d**] - personnel used to conduct system maintenance are controlled.

#### MA.L2-3.7.3 - Equipment Sanitization

CMMC Assessment Guide - Level 2 | Version 2.13 148 MA.L2-3.7.3 - EQUIPMENT SANITIZATION Ensure equipment removed for off-site maintenance is sanitized of any CUI.
##### Assessment Objectives
[**a**] - equipment to be removed from organizational spaces for off-site maintenance is sanitized of any CUI.

#### MA.L2-3.7.4 - Media Inspection

CMMC Assessment Guide - Level 2 | Version 2.13 150 MA.L2-3.7.4 - MEDIA INSPECTION Check media containing diagnostic and test programs for malicious code before the media are used in organizational systems.
##### Assessment Objectives
[**a**] - media containing diagnostic and test programs are checked for malicious code before being used in organizational systems that process, store, or transmit CUI.

#### MA.L2-3.7.5 - Nonlocal Maintenance

CMMC Assessment Guide - Level 2 | Version 2.13 152 MA.L2-3.7.5 - NONLOCAL MAINTENANCE Require multifactor authentication to establish nonlocal maintenance sessions via external network   connections   and   terminate   such   connections   when   nonlocal   maintenance   is complete.
##### Assessment Objectives
[**a**] - multifactor authentication is used to establish nonlocal maintenance sessions via external network connections; and

[**b**] - nonlocal maintenance sessions established via external network connections are terminated when nonlocal maintenance is complete.

#### MA.L2-3.7.6 - Maintenance Personnel

CMMC Assessment Guide - Level 2 | Version 2.13 155 MA.L2-3.7.6 - MAINTENANCE PERSONNEL Supervise  the  maintenance  activities  of  maintenance personnel  without  required  access authorization.
##### Assessment Objectives
[**a**] - maintenance personnel without required access authorization are supervised during maintenance activities.

#### MP.L2-3.8.1 - Media Protection

CMMC Assessment Guide - Level 2 | Version 2.13 157 MP.L2-3.8.1 - MEDIA PROTECTION Protect (i.e., physically control and securely store) system media containing CUI, both paper and digital.
##### Assessment Objectives
[**a**] - paper media containing CUI is physically controlled;

[**b**] - digital media containing CUI is physically controlled;

[**c**] - paper media containing CUI is securely stored; and

[**d**] - digital media containing CUI is securely stored.

#### MP.L2-3.8.2 - Media Access

CMMC Assessment Guide - Level 2 | Version 2.13 159 MP.L2-3.8.2 - MEDIA ACCESS Limit access to CUI on system media to authorized users.
##### Assessment Objectives
[**a**] - access to CUI on system media is limited to authorized users.

#### MP.L2-3.8.3 - Media Disposal [CUI Data]

CMMC Assessment Guide - Level 2 | Version 2.13 161 MP.L2-3.8.3 - MEDIA DISPOSAL [CUI DATA] Sanitize or destroy system media containing CUI before disposal or release for reuse.
##### Assessment Objectives
[**a**] - system media containing CUI is sanitized or destroyed before disposal; and

[**b**] - system media containing CUI is sanitized before it is released for reuse.

#### MP.L2-3.8.4 - Media Markings

CMMC Assessment Guide - Level 2 | Version 2.13 163 MP.L2-3.8.4 - MEDIA MARKINGS Mark media with necessary CUI markings and distribution limitations.
##### Assessment Objectives
[**a**] - media containing CUI is marked with applicable CUI markings; and

[**b**] - media containing CUI is marked with distribution limitations.

#### MP.L2-3.8.5 - Media Accountability

CMMC Assessment Guide - Level 2 | Version 2.13 165 MP.L2-3.8.5 - MEDIA ACCOUNTABILITY Control  access  to  media  containing  CUI  and  maintain  accountability  for  media  during transport outside of controlled areas.
##### Assessment Objectives
[**a**] - access to media containing CUI is controlled; and

[**b**] - accountability for media containing CUI is maintained during transport outside of controlled areas.

#### MP.L2-3.8.6 - Portable Storage Encryption

CMMC Assessment Guide - Level 2 | Version 2.13 167 MP.L2-3.8.6 - PORTABLE STORAGE ENCRYPTION Implement cryptographic mechanisms to protect the confidentiality of CUI stored on digital media during transport unless otherwise protected by alternative physical safeguards.
##### Assessment Objectives
[**a**] - the confidentiality of CUI stored on digital media is protected during transport using cryptographic mechanisms or alternative physical safeguards.

#### MP.L2-3.8.7 - Removeable Media

CMMC Assessment Guide - Level 2 | Version 2.13 169 MP.L2-3.8.7 - REMOVEABLE MEDIA Control the use of removable media on system components.
##### Assessment Objectives
[**a**] - the use of removable media on system components is controlled.

#### MP.L2-3.8.8 - Shared Media

CMMC Assessment Guide - Level 2 | Version 2.13 171 MP.L2-3.8.8 - SHARED MEDIA Prohibit the use of portable storage devices when such devices have no identifiable owner.
##### Assessment Objectives
[**a**] - the use of portable storage devices is prohibited when such devices have no identifiable owner.

#### MP.L2-3.8.9 - Protect Backups

CMMC Assessment Guide - Level 2 | Version 2.13 173 MP.L2-3.8.9 - PROTECT BACKUPS Protect the confidentiality of backup CUI at storage locations.
##### Assessment Objectives
[**a**] - the confidentiality of backup CUI is protected at storage locations.

#### PS.L2-3.9.1 - Screen Individuals

CMMC Assessment Guide - Level 2 | Version 2.13 175 PS.L2-3.9.1 - SCREEN INDIVIDUALS Screen individuals prior to authorizing access to organizational systems containing CUI.
##### Assessment Objectives
[**a**] - individuals are screened prior to authorizing access to organizational systems containing CUI.

#### PS.L2-3.9.2 - Personnel Actions

CMMC Assessment Guide - Level 2 | Version 2.13 177 PS.L2-3.9.2 - PERSONNEL ACTIONS Ensure that organizational systems containing CUI are protected during and after personnel actions such as terminations and transfers.
##### Assessment Objectives
[**a**] - a policy and/or process for terminating system access and any credentials coincident with personnel actions is established;

[**b**] - system access and credentials are terminated consistent with personnel actions such as termination or transfer; and

[**c**] - the system is protected during and after personnel transfer actions.

#### PE.L2-3.10.1 - LIMIT PHYSICAL ACCESS [CUI DATA]

Limit  physical  access  to  organizational  systems,  equipment,  and  the  respective  operating environments to authorized individuals.
##### Assessment Objectives
[**a**] - authorized individuals allowed physical access are identified;

[**b**] - physical access to organizational systems is limited to authorized individuals;

[**c**] - physical access to equipment is limited to authorized individuals; and

[**d**] - physical access to operating environments is limited to authorized individuals.

#### PE.L2-3.10.2 - Monitor Facility

CMMC Assessment Guide - Level 2 | Version 2.13 182 PE.L2-3.10.2 - MONITOR FACILITY Protect  and  monitor  the  physical  facility  and  support  infrastructure  for  organizational systems.
##### Assessment Objectives
[**a**] - the physical facility where organizational systems reside is protected;

[**b**] - the support infrastructure for organizational systems is protected;

[**c**] - the physical facility where organizational systems reside is monitored; and

[**d**] - the support infrastructure for organizational systems is monitored.

#### PE.L2-3.10.3 - Escort Visitors [CUI Data]

CMMC Assessment Guide - Level 2 | Version 2.13 184 PE.L2-3.10.3 - ESCORT VISITORS [CUI DATA] Escort visitors and monitor visitor activity.
##### Assessment Objectives
[**a**] - visitors are escorted; and

[**b**] - visitor activity is monitored.

#### PE.L2-3.10.4 - Physical Access Logs [CUI Data]

CMMC Assessment Guide - Level 2 | Version 2.13 186 PE.L2-3.10.4 - PHYSICAL ACCESS LOGS [CUI DATA] Maintain audit logs of physical access.
##### Assessment Objectives
[**a**] - audit logs of physical access are maintained.

#### PE.L2-3.10.5 - Manage Physical Access [CUI Data]

CMMC Assessment Guide - Level 2 | Version 2.13 188 PE.L2-3.10.5 - MANAGE PHYSICAL ACCESS [CUI DATA] Control and manage physical access devices.
##### Assessment Objectives
[**a**] - physical access devices are identified;

[**b**] - physical access devices are controlled; and

[**c**] - physical access devices are managed.

#### PE.L2-3.10.6 - Alternative Work Sites

CMMC Assessment Guide - Level 2 | Version 2.13 190 PE.L2-3.10.6 - ALTERNATIVE WORK SITES Enforce safeguarding measures for CUI at alternate work sites.
##### Assessment Objectives
[**a**] - safeguarding measures for CUI are defined for alternate work sites; and

[**b**] - safeguarding measures for CUI are enforced for alternate work sites.

#### RA.L2-3.11.1 - RIsk Assessments

CMMC Assessment Guide - Level 2 | Version 2.13 192 RA.L2-3.11.1 - RISK ASSESSMENTS Periodically assess the risk to organizational operations (including mission, functions, image, or  reputation),  organizational  assets,  and  individuals,  resulting  from  the  operation  of organizational systems and the associated processing, storage, or transmission of CUI.
##### Assessment Objectives
[**a**] - the frequency to assess risk to organizational operations, organizational assets, and individuals is defined; and

[**b**] - risk to organizational operations, organizational assets, and individuals resulting from the operation of an organizational system that processes, stores, or transmits CUI is assessed with the defined frequency.

#### RA.L2-3.11.2 - Vulnerability Scan

CMMC Assessment Guide - Level 2 | Version 2.13 195 RA.L2-3.11.2 - VULNERABILITY SCAN Scan  for  vulnerabilities  in  organizational  systems  and  applications  periodically  and  when new vulnerabilities affecting those systems and applications are identified.
##### Assessment Objectives
[**a**] - the frequency to scan for vulnerabilities in organizational systems and applications is defined;

[**b**] - vulnerability scans are performed on organizational systems with the defined frequency;

[**c**] - vulnerability scans are performed on applications with the defined frequency;

[**d**] - vulnerability scans are performed on organizational systems when new vulnerabilities are identified; and

[**e**] - vulnerability scans are performed on applications when new vulnerabilities are identified.

#### RA.L2-3.11.3 - Vulnerability Remediation

CMMC Assessment Guide - Level 2 | Version 2.13 198 RA.L2-3.11.3 - VULNERABILITY REMEDIATION Remediate vulnerabilities in accordance with risk assessments.
##### Assessment Objectives
[**a**] - vulnerabilities are identified; and

[**b**] - vulnerabilities are remediated in accordance with risk assessments.

#### CA.L2-3.12.1 - Security Control Assessment

CMMC Assessment Guide - Level 2 | Version 2.13 200 CA.L2-3.12.1 - SECURITY CONTROL ASSESSMENT Periodically  assess  the  security  controls  in  organizational  systems  to  determine  if  the controls are effective in their application.
##### Assessment Objectives
[**a**] - the frequency of security control assessments is defined; and

[**b**] - security controls are assessed with the defined frequency to determine if the controls are effective in their application.

#### CA.L2-3.12.2 - operational Plan of Action

CMMC Assessment Guide - Level 2 | Version 2.13 203 CA.L2-3.12.2 - OPERATIONAL PLAN OF ACTION Develop  and  implement  plans  of  action  designed  to  correct  deficiencies  and  reduce  or eliminate vulnerabilities in organizational systems.
##### Assessment Objectives
[**a**] - deficiencies and vulnerabilities to be addressed by the plan of action are identified;

[**b**] - a plan of action is developed to correct identified deficiencies and reduce or eliminate identified vulnerabilities; and

[**c**] - the plan of action is implemented to correct identified deficiencies and reduce or eliminate identified vulnerabilities.

#### CA.L2-3.12.3 - Security Control Monitoring

CMMC Assessment Guide - Level 2 | Version 2.13 206 CA.L2-3.12.3 - SECURITY CONTROL MONITORING Monitor security controls on an ongoing basis to ensure the continued effectiveness of the controls.
##### Assessment Objectives
[**a**] - security controls are monitored on an ongoing basis to ensure the continued effectiveness of those controls.

#### CA.L2-3.12.4 - System Security Plan

CMMC Assessment Guide - Level 2 | Version 2.13 208 CA.L2-3.12.4 - SYSTEM SECURITY PLAN Develop,  document,  and  periodically  update  system  security  plans  that  describe  system boundaries,    system    environments    of    operation,    how    security    requirements    are implemented, and the relationships with or connections to other systems.
##### Assessment Objectives
[**a**] - a system security plan is developed;

[**b**] - the system boundary is described and documented in the system security plan;

[**c**] - the system environment of operation is described and documented in the system security plan;

[**d**] - the security requirements identified and approved by the designated authority as non-applicable are identified;

[**e**] - the method of security requirement implementation is described and documented in the system security plan;

[**f**] - the relationship with or connection to other systems is described and documented in the system security plan;

[**g**] - the frequency to update the system security plan is defined; and

[**h**] - system security plan is updated with the defined frequency.

#### SC.L2-3.13.1 - Boundary Protection [CUI Data]

CMMC Assessment Guide - Level 2 | Version 2.13 211 SC.L2-3.13.1 - BOUNDARY PROTECTION [CUI DATA] Monitor, control, and protect communications (i.e., information transmitted or received by organizational   systems)   at   the   external   boundaries   and   key   internal   boundaries   of organizational systems.
##### Assessment Objectives
[**a**] - the external system boundary is defined;

[**b**] - key internal system boundaries are defined;

[**c**] - communications are monitored at the external system boundary;

[**d**] - communications are monitored at key internal boundaries;

[**e**] - communications are controlled at the external system boundary;

[**f**] - communications are controlled at key internal boundaries;

[**g**] - communications are protected at the external system boundary; and

[**h**] - communications are protected at key internal boundaries.

#### SC.L2-3.13.2 - Security Engineering

CMMC Assessment Guide - Level 2 | Version 2.13 214 SC.L2-3.13.2 - SECURITY ENGINEERING Employ  architectural  designs,  software  development  techniques,  and  systems  engineering principles that promote effective information security within organizational systems.
##### Assessment Objectives
[**a**] - architectural designs that promote effective information security are identified;

[**b**] - software development techniques that promote effective information security are identified;

[**c**] - systems engineering principles that promote effective information security are identified;

[**d**] - identified architectural designs that promote effective information security are employed;

[**e**] - identified software development techniques that promote effective information security are employed; and

[**f**] - identified systems engineering principles that promote effective information security are employed.

#### SC.L2-3.13.3 - Role Separation

CMMC Assessment Guide - Level 2 | Version 2.13 217 SC.L2-3.13.3 - ROLE SEPARATION Separate user functionality from system management functionality.
##### Assessment Objectives
[**a**] - user functionality is identified;

[**b**] - system management functionality is identified; and

[**c**] - user functionality is separated from system management functionality.

#### SC.L2-3.13.4 - Shared Resource Control

CMMC Assessment Guide - Level 2 | Version 2.13 219 SC.L2-3.13.4 - SHARED RESOURCE CONTROL Prevent unauthorized and unintended information transfer via shared system resources.
##### Assessment Objectives
[**a**] - unauthorized and unintended information transfer via shared system resources is prevented.

#### SC.L2-3.13.5 - Public-Access System Separation [CUI Data]

CMMC Assessment Guide - Level 2 | Version 2.13 221 SC.L2-3.13.5 - PUBLIC-ACCESS SYSTEM SEPARATION [CUI DATA] Implement  subnetworks  for  publicly  accessible  system  components  that  are  physically  or logically separated from internal networks.
##### Assessment Objectives
[**a**] - publicly accessible system components are identified; and

[**b**] - subnetworks for publicly accessible system components are physically or logically separated from internal networks.

#### SC.L2-3.13.6 - Network Communication by Exception

CMMC Assessment Guide - Level 2 | Version 2.13 223 SC.L2-3.13.6 - NETWORK COMMUNICATION BY EXCEPTION Deny network communications traffic by default and allow network communications traffic by exception (i.e., deny all, permit by exception).
##### Assessment Objectives
[**a**] - network communications traffic is denied by default; and

[**b**] - network communications traffic is allowed by exception.

#### SC.L2-3.13.7 - Split Tunneling

CMMC Assessment Guide - Level 2 | Version 2.13 225 SC.L2-3.13.7 - SPLIT TUNNELING Prevent  remote  devices  from  simultaneously  establishing  non-remote  connections  with organizational  systems  and  communicating  via  some  other  connection  to  resources  in external networks (i.e., split tunneling).
##### Assessment Objectives
[**a**] - remote devices are prevented from simultaneously establishing non-remote connections with the system and communicating via some other connection to resources in external networks (i.e., split tunneling).

#### SC.L2-3.13.8 - Data in Transit

CMMC Assessment Guide - Level 2 | Version 2.13 227 SC.L2-3.13.8 - DATA IN TRANSIT Implement  cryptographic  mechanisms  to  prevent  unauthorized  disclosure  of  CUI  during transmission unless otherwise protected by alternative physical safeguards.
##### Assessment Objectives
[**a**] - cryptographic mechanisms intended to prevent unauthorized disclosure of CUI are identified;

[**b**] - alternative physical safeguards intended to prevent unauthorized disclosure of CUI are identified; and

[**c**] - either cryptographic mechanisms or alternative physical safeguards are implemented to prevent unauthorized disclosure of CUI during transmission.

#### SC.L2-3.13.9 - Connections Termination

CMMC Assessment Guide - Level 2 | Version 2.13 229 SC.L2-3.13.9 - CONNECTIONS TERMINATION Terminate network connections associated with communications sessions at the end of the sessions or after a defined period of inactivity.
##### Assessment Objectives
[**a**] - a period of inactivity to terminate network connections associated with communications sessions is defined;

[**b**] - network connections associated with communications sessions are terminated at the end of the sessions; and

[**c**] - network connections associated with communications sessions are terminated after the defined period of inactivity.

#### SC.L2-3.13.10 - Key Management

CMMC Assessment Guide - Level 2 | Version 2.13 231 SC.L2-3.13.10 - KEY MANAGEMENT Establish  and  manage  cryptographic  keys  for  cryptography  employed  in  organizational systems.
##### Assessment Objectives
[**a**] - cryptographic keys are established whenever cryptography is employed; and

[**b**] - cryptographic keys are managed whenever cryptography is employed.

#### SC.L2-3.13.11 - CUI Encryption

CMMC Assessment Guide - Level 2 | Version 2.13 234 SC.L2-3.13.11 - CUI ENCRYPTION Employ FIPS-validated cryptography when used to protect the confidentiality of CUI.
##### Assessment Objectives
[**a**] - FIPS-validated cryptography is employed to protect the confidentiality of CUI.

#### SC.L2-3.13.12 - Collaborative Device Control

CMMC Assessment Guide - Level 2 | Version 2.13 236 SC.L2-3.13.12 - COLLABORATIVE DEVICE CONTROL Prohibit  remote  activation  of  collaborative  computing  devices  and  provide  indication  of devices in use to users present at the device.
##### Assessment Objectives
[**a**] - collaborative computing devices are identified;

[**b**] - collaborative computing devices provide indication to users of devices in use; and

[**c**] - remote activation of collaborative computing devices is prohibited.

#### SC.L2-3.13.13 - Mobile Code

CMMC Assessment Guide - Level 2 | Version 2.13 238 SC.L2-3.13.13 - MOBILE CODE Control and monitor the use of mobile code.
##### Assessment Objectives
[**a**] - use of mobile code is controlled; and

[**b**] - use of mobile code is monitored.

#### SC.L2-3.13.14 - Voice over Internet Protocol

CMMC Assessment Guide - Level 2 | Version 2.13 240 SC.L2-3.13.14 - VOICE OVER INTERNET PROTOCOL Control and monitor the use of Voice over Internet Protocol (VoIP) technologies.
##### Assessment Objectives
[**a**] - use of Voice over Internet Protocol (VoIP) technologies is controlled; and

[**b**] - use of Voice over Internet Protocol (VoIP) technologies is monitored.

#### SC.L2-3.13.15 - Communications Authenticity

CMMC Assessment Guide - Level 2 | Version 2.13 242 SC.L2-3.13.15 - COMMUNICATIONS AUTHENTICITY Protect the authenticity of communications sessions.
##### Assessment Objectives
[**a**] - the authenticity of communications sessions is protected.

#### SC.L2-3.13.16 - Data at Rest

CMMC Assessment Guide - Level 2 | Version 2.13 244 SC.L2-3.13.16 - DATA AT REST Protect the confidentiality of CUI at rest.
##### Assessment Objectives
[**a**] - the confidentiality of CUI at rest is protected.

#### SI.L2-3.14.1 - Flaw Remediation [CUI Data]

CMMC Assessment Guide - Level 2 | Version 2.13 246 SI.L2-3.14.1 - FLAW REMEDIATION [CUI DATA] Identify, report, and correct system flaws in a timely manner.
##### Assessment Objectives
[**a**] - the time within which to identify system flaws is specified;

[**b**] - system flaws are identified within the specified time frame;

[**c**] - the time within which to report system flaws is specified;

[**d**] - system flaws are reported within the specified time frame;

[**e**] - the time within which to correct system flaws is specified; and

[**f**] - system flaws are corrected within the specified time frame.

#### SI.L2-3.14.2 - Malicious Code Protection [CUI Data]

CMMC Assessment Guide - Level 2 | Version 2.13 249 SI.L2-3.14.2 - MALICIOUS CODE PROTECTION [CUI DATA] Provide  protection  from  malicious  code  at  designated  locations  within  organizational systems.
##### Assessment Objectives
[**a**] - designated locations for malicious code protection are identified; and

[**b**] - protection from malicious code at designated locations is provided.

#### SI.L2-3.14.3 - Security Alerts & Advisories

CMMC Assessment Guide - Level 2 | Version 2.13 252 SI.L2-3.14.3 - SECURITY ALERTS & ADVISORIES Monitor system security alerts and advisories and take action in response.
##### Assessment Objectives
[**a**] - response actions to system security alerts and advisories are identified;

[**b**] - system security alerts and advisories are monitored; and

[**c**] - actions in response to system security alerts and advisories are taken.

#### SI.L2-3.14.4 - Update Malicious Code Protection [CUI Data]

CMMC Assessment Guide - Level 2 | Version 2.13 254 SI.L2-3.14.4 - UPDATE MALICIOUS CODE PROTECTION [CUI DATA] Update malicious code protection mechanisms when new releases are available.
##### Assessment Objectives
[**a**] - malicious code protection mechanisms are updated when new releases are available.

#### SI.L2-3.14.5 - System & File Scanning [CUI Data]

CMMC Assessment Guide - Level 2 | Version 2.13 256 SI.L2-3.14.5 - SYSTEM & FILE SCANNING [CUI DATA] Perform periodic scans of organizational systems and real-time scans of files from external sources as files are downloaded, opened, or executed.
##### Assessment Objectives
[**a**] - the frequency for malicious code scans is defined;

[**b**] - malicious code scans are performed with the defined frequency; and

[**c**] - real-time malicious code scans of files from external sources as files are downloaded, opened, or executed are performed.

#### SI.L2-3.14.6 - Monitor Communications for Attacks

CMMC Assessment Guide - Level 2 | Version 2.13 258 SI.L2-3.14.6 - MONITOR COMMUNICATIONS FOR ATTACKS Monitor organizational systems, including inbound and outbound communications traffic, to detect attacks and indicators of potential attacks.
##### Assessment Objectives
[**a**] - the system is monitored to detect attacks and indicators of potential attacks;

[**b**] - inbound communications traffic is monitored to detect attacks and indicators of potential attacks; and

[**c**] - outbound communications traffic is monitored to detect attacks and indicators of potential attacks.

#### SI.L2-3.14.7 - Identify Unauthorized Use

CMMC Assessment Guide - Level 2 | Version 2.13 261 SI.L2-3.14.7 - IDENTIFY UNAUTHORIZED USE Identify unauthorized use of organizational systems.
##### Assessment Objectives
[**a**] - authorized use of the system is defined; and

[**b**] - unauthorized use of the system is identified.

