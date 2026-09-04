# Cloud Engineering Fundamentals I

## Learning Outcomes

The AWS Cloud Practitioner Essentials is a foundational training program designed to bridge the gap between traditional
IT concepts and the modern cloud ecosystem. Over five intensive modules, learners will move beyond high-level theory to
gain practical, hands-on experience with the core services that power the internet today.

This course is meticulously structured to align with the AWS Certified Cloud Practitioner (CLF-C02) exam domains. By
blending self-paced video resources from AWS Educate and Skillbuilder with rigorous practical challenges, we ensure that
learners don't just "know" the cloud—they can build in it. From launching your first virtual server (EC2) to deploying
serverless applications (Lambda) and securing them with industry-standard compliance tools, this curriculum provides the
solid bedrock required for a successful career in cloud computing.

By the end of this course, you will be able to:

* **Speak the Language:** Define the AWS Global Infrastructure (Regions, Availability Zones) and the key value
  propositions of the cloud (CapEx vs. OpEx).
* **Build the Backbone:** Architect secure virtual networks (VPCs) and select the right compute and storage resources
  for any workload.
* **Modernize Applications:** Differentiate between legacy virtualization and modern containerized (Docker) or
  serverless architectures.
* **Operate Efficiently:** Implement monitoring (CloudWatch), automation (IaC), and cost-management strategies to
  maintain operational excellence.
* **Secure the Environment:** Master the "Shared Responsibility Model" and apply Identity and Access Management (IAM)
  principles to secure data and resources.

## Cloud Concepts & Core Infrastructure

### 1. Description

Welcome to your first step into the AWS Cloud. In this module, you will learn why organizations are moving to the cloud,
how the global infrastructure is organized, and how to utilize the two most fundamental resources in IT: **Compute**
(virtual servers) and **Networking** (virtual data centers).

### 2. Learning Objectives

* Define the core value proposition of cloud computing and the Shared Responsibility Model.
* Select the appropriate AWS Compute service (e.g., EC2) based on workload requirements.
* Describe the basic components of AWS Networking (VPC, Subnets, Security Groups) required to connect resources to the
  internet.

### 3. Cloud Fundamentals

Before building, you must understand the "Language of the Cloud." This section covers the definitions, benefits, and the
global physical infrastructure (Regions and Availability Zones) that powers AWS.

* AWS Educate Course:

    * [Introduction to Cloud Computing 101 ](https://awseducate.instructure.com/courses/891)
    * Note: This course includes modules on Cloud Concepts, Cloud Economics, and AWS Global Infrastructure.

### 4. Compute (The Engine)

Compute is the processing power required to run applications. Here, you will learn about Amazon EC2 (Elastic Compute
Cloud), instance types, and pricing models.

* AWS Educate Course:

    * [Getting Started with Compute](https://awseducate.instructure.com/courses/907)
    * Focus areas: Virtual Machines (EC2), Instance Families, and an introduction to Scaling.

### 5. Networking (The Roads)

Compute resources are useless if they cannot communicate. This section introduces the Virtual Private Cloud (VPC), which
isolates your resources and controls traffic flow.

* AWS Educate Course:
    * Getting Started with Networking
    * Focus areas: VPCs, Subnets, IP Addressing, and Security Groups.

### 6. Hands-On Challenge: Your First Server

Apply what you learned in the Compute and Networking courses.

* Scenario: You need to deploy a test server that is accessible from the public internet.

* Task:
    1. Navigate to the AWS Console.
    2. Launch a t2.micro (Free Tier) EC2 Instance.
    3. Ensure the Security Group allows SSH (Port 22) traffic from your IP address.
    4. Connect to the instance.

## Advanced Networking & Data Management

### 1. Description

Now that you have compute resources running, you need to manage the data they process and ensure they communicate
securely. This module dives deeper into Networking architecture and introduces the two critical pillars of data
persistence: Storage (Files/Objects) and Databases (Structured Data).

### 2. Learning Objectives

* Design a secure network architecture using **VPCs**, **Subnets**, and **Route Tables**.
* Distinguish between **Block Storage** (EBS), **Object Storage** (S3), and **File Storage** (EFS) to select the right
  solution for your workload.
* Compare managed database services, specifically **Amazon RDS** (Relational) vs. **Amazon DynamoDB** (NoSQL).

### 3. Networking Architecture Deep Dive

In Topic 1, you saw the basics. Now, we use the AWS Skillbuilder platform to master the flow of traffic. This resource
covers the critical distinctions between Security Groups (Instance level) and Network ACLs (Subnet level).

* **AWS Skillbuilder Course**:
    * [AWS Networking Basics](https://skillbuilder.aws/learn/S1VYRYHD8V/aws-networking-basics/SKP7248UVF)
    * Focus areas: VPC Peering, Transit Gateways, VPNs, and Direct Connect.

### 4. Storage Solutions

Data comes in many forms. You will learn why you store an Operating System on EBS, but your photos and backup files on
S3.

* **AWS Educate Course**:
  *[ Getting Started with Storage](https://awseducate.instructure.com/courses/908)
    * Focus areas: Amazon S3 (Buckets, Classes, Versioning), Amazon EBS (Volumes), and Amazon EFS.

### 5. Databases

Managing your own database server is difficult. This topic introduces "Managed Services" where AWS handles the patching
and backups for you.

* AWS Educate Course:
    * [Getting Started with Databases](https://awseducate.instructure.com/courses/912)
    * Focus areas: Amazon RDS (SQL/Relational) and Amazon DynamoDB (Key-Value/NoSQL).

### 6. Hands-On Challenge: S3 Static Website

Apply your networking and storage knowledge.

* **Scenario**: You need to host a simple company announcement page without paying for a running server (EC2).
* **Task**:
    * Create an **Amazon S3 Bucket**.
    * Upload an `index.html` file.
    * Configure the bucket for **Static Website Hosting**.
    * Adjust the **Bucket Policy** to allow public read access (Careful! This is a public resource test).

## Modern Application Architectures

### 1. Description

In this topic, you will move beyond managing virtual servers (EC2) to more efficient ways of deploying code. You will
explore **Containerization** (Docker), which packages code to run anywhere, and **Serverless** (Lambda), where you pay
only for the milliseconds your code runs.

### 2. Learning Objectives

* Compare and contrast **Virtualization** (VMs) with **Containerization** to understand efficiency gains.
* Explain the basics of **Docker** and how container images are built.
* Deploy a containerized application to the cloud using **Amazon ECS** and **AWS Fargate**.
* Define **Serverless Computing** and identify use cases for **AWS Lambda**.

### 3. The Evolution of Compute

Why are we moving away from heavy Virtual Machines? This section explains the fundamental difference between visualizing
hardware (VMs) and virtualizing the Operating System (Containers).

* Read:
    * [Virtualization vs Containerization: A Comprehensive Guide](https://www.techwrix.com/virtualization-vs-containerization-a-comprehensive-guide/)
    * Key takeaway: Understand the difference in overhead (Guest OS vs. Shared OS kernel).

### 4. Introduction to Docker & Containers

Learn the industry standard tool for containerization. These resources take you from "What is a container?" to
understanding Dockerfiles and Images.

* AWS Skillbuilder Course:
    * [Introduction to Containers](https://skillbuilder.aws/learn/CUCA1DK47V/introduction-to-containers/XJ58VC1FF5)
    * A foundational overview of container concepts.
* Watch:
    * [YouTube Video](https://www.youtube.com/watch?v=31ieHmcTUOk)
    * Recommended videos: #1 Introduction, #2 Installing Docker, and #4 Images & Containers.

### 5. Deploying Containers to the Cloud

Once you have a Docker container, how do you run it on AWS without managing servers? Enter Amazon ECS and Fargate.

* Watch:
    * [Play Video](https://www.youtube.com/watch?v=esISkPlnxL0)
    * A walkthrough of taking a container image and running it on AWS Fargate (Serverless compute for containers).

### 6. Serverless Computing (AWS Lambda)

The ultimate abstraction. No servers, no containers to manage—just upload code and run.

* **AWS Educate Course**:
    * [Getting Started with Serverless](https://awseducate.instructure.com/courses/905)
    * Focus areas: AWS Lambda, Event-driven architecture, and API Gateway.

### 7. Hands-On Challenge: Go Serverless

Experience the speed of serverless deployment.

* Scenario: You need a function that automatically runs every time a user uploads a photo to an S3 bucket.
* Task:
    * Navigate to the **AWS Lambda** console.
    * Create a function from scratch (Author from scratch) using Python or Node.js.
    * Create a "Test Event" and run the function to see the "Hello from Lambda" output in the logs.
    * (Bonus): Set up an **S3 Trigger** for the function.

## Management, Monitoring & Automation

### 1. Description

Building in the cloud is only the beginning. In this module, you will learn how to operate your infrastructure
efficiently ("Day 2 Operations"). We will cover how to monitor system health, automate resource creation using code
(IaC), and crucially, how to track and optimize your AWS bill.

### 2. Learning Objectives

* Identify tools for **Monitoring and Logging** (Amazon CloudWatch) to ensure system performance and reliability.
* Define **Infrastructure as Code** (IaC) and explain how it simplifies provisioning compared to manual configuration.
* Utilize **AWS Billing and Cost Management** tools to set budgets and analyze spending patterns.

### 3. Cloud Operations & Monitoring

ou cannot manage what you cannot see. This section introduces the "eyes and ears" of AWS (CloudWatch) and the best
practices for operating in the cloud.

* AWS Educate Course:
    * [Getting Started with Cloud Operations](https://awseducate.instructure.com/courses/889)
    * Focus areas: The AWS Well-Architected Framework, CloudWatch, and Systems Manager.
* Watch:
    * [Play Video](https://www.youtube.com/watch?v=nD6JfA9nGOg)
    * A visual guide to understanding metrics, alarms, and logs.

### 4. Infrastructure as Code (IaC)

Stop clicking and start coding. Manual deployment is error-prone; IaC allows you to deploy entire environments with a
single script.

* Watch:
    * [Play Video](https://www.youtube.com/watch?v=zWw2wuiKd5o)
    * Key Concept: Understanding how tools like AWS CloudFormation and Terraform work

### 5. Cost Optimization & Billing

The cloud is "Pay-as-you-go," but it's your job to turn off the lights when you leave. Learn how to avoid billing
surprises.

* AWS Skillbuilder Course:
    * [AWS Billing and Cost Management](https://skillbuilder.aws/learn/J59SS92GUN/aws-billing-and-cost-management/25JXE6WYAY)
    * Focus areas: AWS Budgets, Cost Explorer, and Cost Allocation Tags.

### 6. Hands-On Challenge: Set a Budget Alarm

Protect your wallet (or your company's).

* **Scenario**: You are experimenting with AWS services and want to ensure you don't accidentally spend more than $10.
* **Task**:
    * Navigate to the **AWS Billing Dashboard**.
    * Open **AWS Budgets**.
    * Create a "Cost Budget" for **$10.00**.
    * Configure an email alert to notify you if actual costs reach 80% ($8.00).

## Cloud Security & Governance

### 1. Description

Security is the highest priority at AWS. In this final module, you will learn how to secure the resources you built in
previous weeks. We will demystify the Shared Responsibility Model, master Identity and Access Management (IAM) to
control who can access what, and explore the tools that help maintain compliance with global standards.

### 2. Learning Objectives

* Apply the **AWS Shared Responsibility Model** to distinguish between AWS's security tasks (Security of the Cloud) and your
  tasks (Security in the Cloud).
* Create and manage **IAM Users, Groups, and Roles** to enforce the principle of "Least Privilege."
* Identify key security tools for **Governance and Compliance** (e.g., AWS Artifact, AWS Trusted Advisor, and AWS Shield).

### 3. Security Fundamentals
Who is responsible for what? This section covers the foundational agreement between you and AWS, ensuring you know exactly which security controls you need to configure.
* AWS Skillbuilder Course:
  * [AWS Security Fundamentals (Second Edition)](https://skillbuilder.aws/learn/S2N5PM41ZK/aws-security-fundamentals-second-edition/E71QQGTCRZ)
  * Focus areas: The Shared Responsibility Model, Root User vs. IAM User, and Multi-Factor Authentication (MFA).
### 4. Identity & Access Management (IAM)
The front door to your cloud environment. Learn how to create users and assign permissions securely.

* AWS Educate Course:
  * [Getting Started with Security](https://awseducate.instructure.com/courses/890)
  * Focus areas: IAM Policies, Password Policies, and securing data at rest vs. in transit.
### 5. Best Practices & Governance
How do you know if your cloud is safe? This topic covers the checklists and automated tools AWS provides to audit your environment.

* AWS Skillbuilder Course:
  * [AWS Security Best Practices Overview](https://skillbuilder.aws/learn/JDENZUBGWD/aws-security-best-practices-overview/3PFP9F6KY7)
  * Focus areas: The Principle of Least Privilege, rotating keys, and using AWS Trusted Advisor.
### 6. Hands-On Challenge: Secure Access (IAM)
Stop using the Root Account! Create a restricted user for daily tasks.
* **Scenario**: You have hired a new developer, "DevJane," who needs to view EC2 instances but must not be allowed to delete them or access billing information.
* Task:
  * Log in as your Root User (or Admin).
  * Navigate to **IAM**.
  * Create a new User named `DevJane`.
  * Create a Group named `Developers-ReadOnly`.
  * Attach the policy `AmazonEC2ReadOnlyAccess` to the group.
  * Add `DevJane` to the group.
