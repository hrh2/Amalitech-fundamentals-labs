# Software Testing & Quality Assurance

## Learning Objectives

### Introduction to Software Testing and QA
This module provides a foundational understanding of Software Testing and Quality Assurance (QA), explaining their importance, core principles, and key distinctions.

### Learning Objectives:
By the end of this lesson, trainees should be able to:

* **Define** software testing and Quality Assurance (QA).
* **Explain** the importance of testing in software development and its impact on business.
* **Differentiate** between Quality Assurance (QA), Quality Control (QC), and Testing.
* **Identify** the core principles of software testing.

## Learning Approach

This module uses a **Microlearning** and **Experiential Learning** approach, culminating in a **Problem-Based Learning (PrBL)** assessment.

* Learners begin by acquiring foundational knowledge through short, focused content (readings and videos) covering the principles and vocabulary of QA.
* The module builds progressively from Understanding concepts (e.g., SDLC, test types)—which is checked via formative quizzes—to the final Application of those skills in the capstone.
* The learning journey culminates in a PrBL capstone. Learners are given a realistic scenario—reviewing a new feature for a fictional Ghanaian fintech startup, "PaySwift." This requires them to Apply their knowledge to create professional QA documentation.
* This approach is highly effective for the target audience, as it grounds essential theory in the practical, hands-on skills required to contribute to product quality in any modern tech role

## Learning Activities
* **Knowledge Quizzes:** Short, required quizzes at the end of each of the first four topics to reinforce understanding of core concepts like testing principles, test types, test case components, and the bug lifecycle.
* **Role-Specific Reflection:** A brief writing prompt in Topic 1 asking learners to identify one "Shift Left" action they can take from their specialization's perspective.
* **Capstone Assessment:** A summative, problem-based scenario where learners analyze a feature specification and UI mockup for the "Swift Pay" app. They must complete a structured "QA Review Template," which requires them to write a positive test case, a negative/edge test case, a detailed bug report, and a process improvement suggestion.

## Module Structure

| Lesson / Section | Main Topic                                                                                                        | Format                           | Learning Activity / Outcome                                                                          |
| ---------------- | ----------------------------------------------------------------------------------------------------------------- | -------------------------------- | ---------------------------------------------------------------------------------------------------- |
| **Topic 1**      | [The Quality Mindset: Principles and Lifecycles](https://beta.learning.amalitech.org/mod/book/view.php?id=401)    | Reading, Video, Quiz, Reflection | Explain the role of QA in the SDLC and the **"Shift Left"** philosophy.                              |
| **Topic 2**      | [The Testing Toolkit: Levels and Types](https://beta.learning.amalitech.org/mod/book/view.php?id=402)             | Reading, Video, Quiz             | Differentiate between testing levels and types, including **functional vs. non-functional** testing. |
| **Topic 3**      | [The Blueprint: Test Case Design and Documentation](https://beta.learning.amalitech.org/mod/book/view.php?id=403) | Reading, Video, Quiz             | Apply techniques for designing and writing structured test cases.                                    |
| **Topic 4**      | [The Discovery: Bug Reporting and Triage](https://beta.learning.amalitech.org/mod/book/view.php?id=404)           | Reading, Video, Quiz             | Create effective bug reports and understand the bug lifecycle.                                       |
| **Capstone**     | **Quality Review for "PaySwift"**                                                                                 | Assessment (Scenario Analysis)   | Evaluate a feature specification to write test cases and bug reports.                                |


## Topic 1: The Quality Mindset: Principles and Lifecycles

### 1.1 Introduction
Welcome! This topic introduces the foundational concepts of software quality. You'll learn the difference between proactive quality assurance (QA) and reactive quality control (QC), the guiding principles of testing, and how testing fits into the overall software development lifecycle (SDLC).

#### Learning Objectives 🎯
Upon completion of this module, trainees will be able to:

* Differentiate between Quality Assurance (QA), a proactive process, and Quality Control (QC), a reactive activity.
* Explain the role and importance of testing within the Software Development Lifecycle (SDLC).
* Understand the Seven Testing Principles as a guiding philosophy.
* Define the concept of "Shifting Left" and its benefits.

### 1.2 QA vs. QC
#### QA vs. QC: The Proactive and Reactive Roles
This section defines the two core components of quality management: Quality Assurance (the process) and Quality Control (the activity).

Article: [All About Quality Assurance | Guru99](https://www.guru99.com/all-about-quality-assurance.html)

This article provides a detailed breakdown of Quality Assurance (QA) as a proactive process focused on preventing defects and Quality Control (QC) as a reactive activity focused on finding defects.

### 1.3 Testing's Role in the Software Lifecycle (SDLC)
Testing isn't just a final step; it's an integrated part of the entire development process. This section explains the relationship between the Software Development Life Cycle (SDLC) and the Software Testing Life Cycle (STLC).

Video: [SDLC vs STLC | Software Testing Life Cycle | Edureka (13 min)](https://www.google.com/search?q=https://youtu.be/PhzYlopDCX0%3Fsi%3DUq9liYZ4OJVI_Ud_)

This video directly compares the Software Development Life Cycle (SDLC) with the Software Testing Life Cycle (STLC). It explains how the testing process (STLC) runs in parallel to the development process (SDLC) to ensure quality at each stage.

Video:[Play Video](https://www.youtube.com/watch?v=_3OhZrad8RM)
This video provides a deep dive into the specific phases of the STLC, such as Requirement Analysis, Test Planning, and Test Case Development, which are all essential activities within the overall SDLC.

### 1.4 The Seven Principles of Testing
Learn the fundamental philosophy that guides all effective testing efforts. These principles explain why we test the way we do.

Article: [Software Engineering | Seven Principles of Software Testing | GeeksforGeeks](https://www.geeksforgeeks.org/software-engineering/software-engineering-seven-principles-of-software-testing/)

This article outlines the Seven Testing Principles, such as "Testing shows presence of defects, not absence," "Exhaustive testing is impossible," and the "Pesticide paradox."

### 1.5 The Modern Approach: "Shifting Left"
Discover the modern strategy of "Shifting Left," which integrates testing earlier in the development process to find and fix defects sooner (and cheaper).

Article: [What is Shift Left Testing? | BrowserStack](https://www.browserstack.com/guide/what-is-shift-left-testing)

This guide defines "Shift Left" testing as the practice of moving testing activities earlier in the SDLC. It explains the significant benefits of this approach, such as reduced costs, faster delivery, and improved overall product quality.


### 1.6 Discussion Prompt
* In your own words, describe the difference between QA and QC. Can you have effective QA without QC, or vice versa? Why?
* Imagine your team is starting a new project. How would you use the concept of 'Shifting Left' to integrate testing into the very first phase (Requirement Analysis) of the SDLC?"
* From your specialization's perspective (e.g., Data, DevOps), what is one action you can take to 'Shift Left' and improve quality early in the process?
* Which of the 'Seven Testing Principles' do you think is the most challenging for a new tester to accept? Why? (e.g., 'Exhaustive testing is impossible').

## Topic 2: The Testing Toolkit

### 2.1 Introduction
The Testing Toolkit: Levels and Types
Welcome! This topic explores the essential vocabulary of software testing. You'll learn how tests are categorized by "levels" (like the testing pyramid) and "types" (like functional or performance) to build a comprehensive and effective testing strategy.

#### Learning Objectives 🎯
Upon completion of this module, trainees will be able to:

* Explain the different levels of testing using the **Testing Pyramid**: Unit, Integration, and End-to-End (E2E).
* Distinguish between **Functional Testing** (does it work?) and **Non-Functional Testing** (how well does it work?).
* Identify key testing types such as **Performance**, **Usability**, **Security**, and **Regression** testing.

### 2.2 Levels of Testing: The Testing Pyramid
This section breaks down the different layers of testing, from the smallest piece of code to the full application.

Video: [Play Video](https://www.youtube.com/watch?v=YaXJeUkBe4Y)
This video provides a clear overview of the **Testing Pyramid** [00:08], starting with **Unit Tests** at the base [00:27], moving up to **Component Tests** [01:36], **Integration Tests** [02:23], **End-to-End Tests** [03:56], and finally **Manual Tests** at the peak [05:31]. It explains why tests at the bottom are faster and more numerous, while tests at the top are slower and more complex.

**Article**: [Types of Software Testing: 100+ Types | BrowserStack](https://www.browserstack.com/guide/types-of-testing)

Explore the "Testing Levels" section of this article. It details the scope of **Unit Testing**, **Integration Testing**, **System Testing** (a similar concept to E2E), and **Acceptance Testing**, explaining what each level is designed to verify.

### 2.3 Types of Testing: Functional vs. Non-Functional
Beyond when you test (levels), this section covers what you are testing (types).

Article: [Types of Software Testing: 100+ Types | BrowserStack](https://www.browserstack.com/guide/types-of-testing)

* This comprehensive guide is the primary resource for this section.
* **Functional Testing (LO 2)**: Review the sections on Functional Testing to see how it verifies the application's features against requirements. This category includes types like Regression Testing, which ensures new changes don't break old features.
* **Non-Functional Testing (LO 2 & 3)**: Explore this major category to understand how you test the quality and characteristics of the application. This includes critical types like Performance Testing (load, stress), Usability Testing, and Security Testing.

### 2.4 Discussion Prompt
The testing pyramid suggests writing many more unit tests than end-to-end (E2E) tests. What are the main risks of inverting this pyramid (i.e., having mostly E2E tests and very few unit tests)?

You are testing a new 'Add to Cart' button on an e-commerce website. Give one example of a **functional test** and one example of a **non-functional test** you would perform on this button.

What is regression testing, and at what point in the development process is it most critical to perform?

## Topic 3: The Blueprint: Test Case Design and Documentation

### 3.1 Introduction
Welcome! This topic provides the essential skills for designing and documenting effective test cases. You'll learn the structure of a professional test case and the core techniques used to select test data that maximizes bug-finding.

#### Learning Objectives 🎯
Upon completion of this module, trainees will be able to:

* **Understand** the components of a well-written test case (e.g., ID, Title, Preconditions, Steps, Expected Result).
* **Apply** techniques for designing test cases, including positive, negative, and edge case testing.
* **Differentiate** between a test plan, test suite, and test case.

### 3.2 The Building Blocks: Plan, Suite, and Case
Before writing a test, it's crucial to understand the hierarchy of test documentation and the specific components of a single test case.

Article: [Guide to Test Case Design Techniques | Pixel QA](https://www.pixelqa.com/blog/post/guide-to-test-case-design-techniques)

This guide explains the fundamental components of a Test Case (LO 1), such as the Test Case ID, Title, Steps, and Expected Results. It also helps differentiate between a Test Suite (a container for related test cases) and a Test Plan (the overall strategy), addressing (LO 3).

### 3.3 Test Design Techniques
Learn how to efficiently select what to test. These techniques help you design fewer, smarter tests that cover more scenarios and find more bugs.

Article: [Guide to Test Case Design Techniques | Pixel QA](https://www.pixelqa.com/blog/post/guide-to-test-case-design-techniques)

This article introduces core "black-box" design techniques. These methods are the formal process for identifying positive (valid), negative (invalid), and edge case test scenarios (LO 2).

Video: [Play Video](https://www.youtube.com/watch?v=UR0wLo3aYIo)
This video provides a clear, visual explanation of the most important test design techniques. It demonstrates how to apply **Equivalence Partitioning** [01:45] (for positive/negative cases) and **Boundary Value Analysis** [02:29] (for edge cases) to efficiently test inputs, like an age field, without testing every possible number.

### 3.4 Discussion Prompt
Based on the resources, explain the relationship between a Test Plan, a Test Suite, and a Test Case. Why is it important to organize test cases into suites?

## Topic 4: The Discovery: Bug Reporting and Triage

### 4.1 Introduction
Welcome! Finding a bug is just the first step. This topic focuses on the critical skills of documenting, reporting, and managing defects. A well-written bug report is the key communication tool between QA and development, ensuring issues are understood, prioritized, and fixed efficiently.

#### Learning Objectives 🎯
Upon completion of this module, trainees will be able to:

* Write a clear, concise, and reproducible bug report.
* Understand the key elements of a bug report (e.g., Title, Steps to Reproduce, Actual vs. Expected Results, Environment).
* Differentiate between Severity (impact on the system) and Priority (urgency to fix).
* Outline the stages of the Bug Lifecycle (e.g., New, Assigned, Fixed, Retested, Closed).

### 4.2 How to Write an Effective Bug Report
Learn the anatomy of a high-quality, actionable bug report. This is the most important skill for communicating a defect clearly to the development team.

Article: [How to Write an Effective Bug Report: A Guide | BrowserStack](https://www.browserstack.com/guide/how-to-write-a-bug-report)

**Description:** This guide is the primary resource for (LO 1 & 2). It provides a clear template and best practices for writing a bug report, covering essential components like a concise title, environment details (OS, browser), clear steps to reproduce, actual vs. expected results, and the importance of visual evidence (screenshots/videos).

### 4.3 The Bug Lifecycle
Understand the journey a bug takes from the moment it's found (New) to the moment it's confirmed fixed (Closed).

Article: [Defect Life Cycle in Software Testing | Guru99](https://www.guru99.com/defect-life-cycle.html)

**Description:** This article directly addresses (LO 4) by providing a detailed map of the bug lifecycle. It defines the various states a defect can be in, such as **New**, **Assigned**, **Open**, **Fixed**, **Pending Retest**, **Retested**, **Verified**, **Closed**, or **Reopened**.

### 4.4 Defect Management and Triage
Learn the high-level process of managing defects, which includes "Triage"—the crucial step of assessing a bug's importance.

Article: [Defect Management Process in Software Testing | Guru99](https://www.guru99.com/defect-management-process.html)

**Description:** This resource covers the overall management process. Pay close attention to the sections on defect reporting and analysis (Triage), which explain how to differentiate between Severity (the technical impact of the bug on the system) and Priority (the business urgency to fix the bug) (LO 3).

Video: [Play Video](https://www.youtube.com/watch?v=4vaHENk5awo)
**Description:** This short video from Udacity introduces the concept of **Bug Triage**, which is the process of determining a bug's severity and ensuring it's not a duplicate before it gets assigned to a developer.

### 4.5 Discussion Prompt
Based on the bug lifecycle, why is the 'Retested' or 'Verified' step so important? What problems can occur if a developer marks a bug as 'Fixed' and the team immediately moves it to 'Closed' without QA retesting it?

