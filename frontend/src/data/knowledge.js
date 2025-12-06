// frontend/src/data/knowledge.js

export const faqs = [
  {
    id: "faq1",
    question: "What is AuditFlow?",
    answer: "AuditFlow is a compliance automation and audit management platform."
  },
  {
    id: "faq2",
    question: "How does Gap Analysis work?",
    answer: "It compares your organization controls against frameworks and highlights missing controls."
  }
];

export const blogs = [
  {
    id: "blog1",
    title: "Understanding ISO 27001 Fundamentals",
    excerpt: "A quick guide to the core principles of ISO 27001...",
    cover: "/placeholder-blog.jpg",
    content: `
      ISO 27001 is a global standard for information security management.
      It defines how organizations should protect information assets using
      systematic processes and risk management...
    `
  },
  {
    id: "blog2",
    title: "SOC 2 Compliance Checklist",
    excerpt: "Before starting SOC 2, make sure you follow these steps...",
    cover: "/placeholder-blog.jpg",
    content: `
      SOC 2 focuses on Trust Service Criteria: Security, Availability,
      Processing Integrity, Confidentiality, and Privacy...
    `
  }
];

export const caseStudies = [
  {
    id: "case1",
    title: "How Company A Achieved ISO 27001 in 90 Days",
    excerpt: "A step-by-step transformation journey...",
    cover: "/placeholder-case.jpg",
    content: `
      Company A used AuditFlow to streamline their compliance documentation,
      map controls, and automate evidence collection...
    `
  },
  {
    id: "case2",
    title: "SOC 2 Journey for a FinTech Startup",
    excerpt: "From zero maturity to audit-ready...",
    cover: "/placeholder-case.jpg",
    content: `
      This FinTech startup implemented security controls, continuous monitoring,
      and automated reporting using AuditFlow...
    `
  }
];
