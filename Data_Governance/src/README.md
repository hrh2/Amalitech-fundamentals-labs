# Data Governance Lab Series

Five case-file style data presentations built from the Data Governance course material
. Every lab is a self-contained `index.html` — open it in a browser, no
install or build step. Each lab lives in its own folder, and each folder has its own README
with the specifics.

| #  | Folder                                         | Lab | Type |
|----|------------------------------------------------|-----|------|
| 01 | `lab-01-bias-investigation-hirescore/`         | HireScore AI Bias Investigation | Static dashboard (charts, pipeline map, mitigation timeline) |
| 02 | `lab-02-data-access-decision-simulator/`       | EduConnect Data Access Decision Simulator | Interactive system (click-through decision simulator) |
| 03 | `lab-03-multi-jurisdiction-compliance-matrix/` | ShopGhana Multi-Jurisdiction Compliance Matrix | Static dashboard (comparison charts + case tabs) |
| 04 | `lab-04-quickloan-governance-review/`          | QuickLoan Governance Review | Static dashboard (risk register, fairness chart, data flow) |
| 05 | `lab-05-data-quality-assessment-report/`       | EduConnect Data Access Decision Simulator | Interactive system (click-through decision simulator) |

Every lab shares one visual identity (a dark "case file" aesthetic, folder-tab navigation
linking between labs, Fraunces/Inter/JetBrains Mono type system) but uses its own accent
color and severity stamp so each case reads distinctly. Charts are rendered with Chart.js
loaded from a CDN — no local dependencies, so the files also work as plain static sites on
GitHub Pages.

## Why HTML instead of a written report

Each source document (bias report, decision scenario, compliance matrix, governance review
card) contains the *answers*, but a data governance deliverable is supposed to communicate
findings, not just state them. So each lab pulls the concrete numbers, risk levels, and
decision logic out of the source markdown and re-presents them as charts, comparison tables,
timelines, and (for Lab 02) an actual interactive decision tool — the way you'd hand
findings to a stakeholder rather than hand them a homework answer key.

## Repo layout

```
data-governance-labs/
├── README.md                                   ← this file
├── lab-01-bias-investigation-hirescore/
│   ├── index.html
│   └── README.md
├── lab-02-data-access-decision-simulator/
│   ├── index.html
│   └── README.md
├── lab-03-multi-jurisdiction-compliance-matrix/
│   ├── index.html
│   └── README.md
├── lab-04-quickloan-governance-review/
│   ├── index.html
│   └── README.md
└── lab-05-data-quality-assessment-report/
    ├── index.html
    └── README.md
```