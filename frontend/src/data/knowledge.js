// frontend/src/data/knowledge.js

export const faqs = [
  {
    id: "faq1",
    question: "What is compliance?",
    answer: "Compliance means following required laws, standards, and policies to keep systems and data secure."
  },
  {
    id: "faq2",
    question: "What is an audit?",
    answer: "An audit is a formal check to verify whether a company is following its defined processes and compliance requirements."
  },
  {
    id: "faq3",
    question: "Why do companies need compliance frameworks?",
    answer: "Companies use frameworks to structure their security practices and prove they protect customer data."
  },
  {
    id: "faq4",
    question: "Is compliance only for big companies?",
    answer: "No, compliance applies to businesses of all sizes depending on the data they handle."
  },
  {
    id: "faq5",
    question: "What happens if my company is not compliant?",
    answer: "Non-compliance can lead to fines, data breaches, legal issues, and loss of customer trust."
  },
  {
    id: "faq6",
    question: "What is the difference between ISO 27001 and SOC 2?",
    answer: "ISO 27001 is an international security standard, while SOC 2 is an American trust-based audit for service providers."
  },
  {
    id: "faq7",
    question: "What is a gap analysis?",
    answer: "A gap analysis identifies what controls or requirements are missing compared to a compliance framework."
  },
  {
    id: "faq8",
    question: "What is evidence in compliance?",
    answer: "Evidence is documented proof such as policies, screenshots, or logs showing that controls are being followed."
  },
  {
    id: "faq9",
    question: "How often should audits be done?",
    answer: "Audits are usually done annually or whenever major changes occur."
  },
  {
    id: "faq10",
    question: "What is risk level in compliance?",
    answer: "Risk level measures how likely a threat is and how much damage it could cause."
  },
  {
    id: "faq11",
    question: "What is a control?",
    answer: "A control is a security action or rule implemented to reduce risk."
  },
  {
    id: "faq12",
    question: "What is data privacy?",
    answer: "Data privacy means ensuring personal data is collected, used, and stored safely and responsibly."
  },
  {
    id: "faq13",
    question: "Does compliance guarantee zero risk?",
    answer: "No, compliance reduces risk but cannot completely eliminate it."
  },
  {
    id: "faq14",
    question: "What is incident response?",
    answer: "Incident response is the process of detecting, managing, and recovering from security incidents."
  },
  {
    id: "faq15",
    question: "What is RBAC (Role-Based Access Control)?",
    answer: "RBAC assigns system access based on a user's role to ensure least-privileged access."
  }
];

export const caseStudies = [
  {
    id: "case1",
    title: "Equifax Data Breach (2017)",
    excerpt: "A massive breach caused by an unpatched vulnerability.",
    cover: "/placeholder-case.jpg",
    content: `
What went wrong:
- Unpatched Apache Struts vulnerability
- Weak internal monitoring
- Poor patch management

Impact:
- 147 million records exposed
- Over $700 million in penalties
- Significant long-term reputation damage

Lesson learned:
Patch critical vulnerabilities immediately and maintain strong asset management.
    `
  },
  {
    id: "case2",
    title: "Facebook–Cambridge Analytica (2018)",
    excerpt: "A global privacy controversy involving unauthorized data harvesting.",
    cover: "/placeholder-case.jpg",
    content: `
What went wrong:
- Lax data-sharing policies
- Unauthorized data harvesting through third-party applications

Impact:
- 87 million users affected
- Political and regulatory investigations worldwide
- Major loss of user trust

Lesson learned:
Strong data governance and transparent consent policies are essential.
    `
  },
  {
    id: "case3",
    title: "NHS WannaCry Ransomware (2017)",
    excerpt: "A ransomware attack that crippled healthcare systems.",
    cover: "/placeholder-case.jpg",
    content: `
What went wrong:
- Outdated Windows systems
- Lack of reliable backups
- Weak emergency response practices

Impact:
- Hospitals and medical systems shut down
- Thousands of appointments canceled
- Millions in operational and recovery costs

Lesson learned:
Maintain updated systems and resilient backup procedures.
    `
  },
  {
    id: "case4",
    title: "Marriott Hotel Breach (2018)",
    excerpt: "A long-running breach exposing millions of customer records.",
    cover: "/placeholder-case.jpg",
    content: `
What went wrong:
- Breach remained undetected for four years
- Poor database security
- Weak monitoring and alerting mechanisms

Impact:
- 500 million customer records exposed
- GDPR fines imposed
- Significant loss of user confidence

Lesson learned:
Continuous monitoring and strong logging practices are critical.
    `
  },
  {
    id: "case5",
    title: "Colonial Pipeline Attack (2021)",
    excerpt: "A ransomware attack that disrupted national fuel supply.",
    cover: "/placeholder-case.jpg",
    content: `
What went wrong:
- Compromised VPN password
- Lack of multi-factor authentication

Impact:
- Fuel supply disruption across multiple states
- Ransom payment exceeding four million dollars
- Broad economic repercussions

Lesson learned:
Enforce MFA and secure all remote access points.
    `
  },
  {
    id: "case6",
    title: "First American Financial Breach (2019)",
    excerpt: "A major data exposure caused by broken access control.",
    cover: "/placeholder-case.jpg",
    content: `
What went wrong:
- Broken access control mechanism
- Sensitive financial documents accessible without authentication

Impact:
- 885 million financial records exposed

Lesson learned:
Implement and validate strong access control across all systems.
    `
  },
  {
    id: "case7",
    title: "Aadhaar Data Exposure (2018)",
    excerpt: "A large-scale exposure impacting national identity data.",
    cover: "/placeholder-case.jpg",
    content: `
What went wrong:
- Weak API endpoint security
- Poor access management controls

Impact:
- Data of over one billion individuals exposed
- Significant national and global privacy concerns

Lesson learned:
Critical identity systems require the highest level of security controls.
    `
  }
];

export const blogs = [
  {
    id: "blog1",
    title: "Introduction: Why Audit and Compliance Matter",
    excerpt: "A simple explanation of why audits and compliance are essential for organizations.",
    cover: "/placeholder-blog.jpg",
    content: `
Introduction: Why Audit and Compliance Matter

Imagine you run a shop. You lock the door at night, keep records of sales, and treat customers properly.  
In the digital world, companies must protect data in a similar way. This is where audit and compliance come in.

Audit refers to checking whether the organization is following proper processes.  
Compliance means following required rules and standards to reduce risk.

What Is Compliance?

Compliance means adhering to rules that protect customer data and ensure business security.  
Different industries follow different compliance frameworks such as:

- ISO 27001 for information security
- SOC 2 for service companies
- GDPR and DPDP for privacy
- PCI-DSS for payment security
- HIPAA for healthcare data management

What Is an Audit?

An audit validates whether an organization is following its documented rules and security practices.  
If everything is correct, the company passes. Otherwise, it receives a report with issues to fix.

Why Audit and Compliance Matter

1. They prevent data breaches  
2. They build customer trust  
3. They help avoid legal and financial penalties  
4. They improve internal processes and system maturity

Proper audit and compliance practices help organizations operate safely and responsibly.
    `
  }
];
