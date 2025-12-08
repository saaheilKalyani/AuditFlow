import dotenv from "dotenv";
dotenv.config();

import connectDB from "../config/db.js";
import Framework from "../models/Framework.js";
import Control from "../models/Control.js";

await connectDB();

/**
 * ---------------------------
 * 1. FULL FRAMEWORK DEFINITIONS
 * ---------------------------
 */

const frameworks = [
  {
    key: "ISO27001",
    name: "ISO 27001",
    year: 2022,
    sector: "Security",
    description: "Information Security Management System – ISMS",
    controls: [
      "ISO/IEC 27001:2022 – Core ISMS requirements",
      "ISO/IEC 27002:2022 – Security controls reference",
      "ISO/IEC 27017:2015 – Cloud security controls",
      "ISO/IEC 27018:2019 – Protection of PII in cloud",
      "ISO/IEC 27005:2022 – Risk management guidelines",
      "ISO/IEC 27701:2019 – Privacy information management",
      "ISO/IEC 27035:2023 – Incident management",
      "ISO/IEC 27036 – Supplier/vendor security",
      "ISO/IEC 27032 – Cybersecurity guidelines",
      "ISO 31000 – Risk management principles",
      "ISO/IEC 27004 – ISMS performance measurement",
      "ISO/IEC 27007 – ISMS auditing guidelines",
    ],
  },

  {
    key: "SOC2",
    name: "SOC 2",
    year: 2017,
    sector: "Security",
    description: "System and Organization Controls 2",
    controls: [
      "AICPA Trust Services Criteria (TSC)",
      "AT-C Section 205 – Reporting on controls",
      "AT-C Section 105 – Attestation concepts",
      "COSO Framework (2013)",
      "DC-200 – System description criteria",
    ],
  },

  {
    key: "GDPR",
    name: "GDPR",
    year: 2016,
    sector: "Privacy",
    description: "General Data Protection Regulation (EU)",
    controls: [
      "GDPR Regulation (EU) 2016/679",
      "EDPB – DPIA Guidelines",
      "EDPB – Consent Guidelines",
      "EDPB – Transparency Guidelines",
      "EDPB – Data Portability Guidelines",
      "EDPB – Breach Notification Guidelines",
      "EDPB – Anonymization & Pseudonymization",
      "WP29 Opinions",
      "ISO/IEC 27701 Mapping",
      "ENISA Technical Guidelines",
      "EU ePrivacy Directive",
    ],
  },

  {
    key: "HIPAA",
    name: "HIPAA",
    year: 1996,
    sector: "Healthcare",
    description: "Healthcare Information Security & Privacy",
    controls: [
      "HIPAA Privacy Rule",
      "HIPAA Security Rule",
      "HIPAA Breach Notification Rule",
      "HIPAA Enforcement Rule",
      "HITECH Act",
      "NIST SP 800-66 Rev 2 – HIPAA Security Guidance",
      "OCR Audit Protocol",
    ],
  },

  {
    key: "PCIDSS",
    name: "PCI-DSS",
    year: 2022,
    sector: "Payments",
    description: "Payment Card Industry Data Security Standard",
    controls: [
      "PCI-DSS v4.0 – Core Controls",
      "PCI Secure Software Standard",
      "PCI Secure SLC Standard",
      "PCI Card Production Standards",
      "PCI P2PE Standard",
      "PCI PIN Security Standard",
      "PCI 3DS Core Security Standard",
      "PCI SPoC / CPoC Standards",
      "PCI PA-DSS (Legacy)",
    ],
  },

  {
    key: "COBIT",
    name: "COBIT",
    year: 2019,
    sector: "Governance",
    description: "ISACA Governance & Management Framework",
    controls: [
      "COBIT 2019 Governance & Management Objectives",
      "COBIT 2019 Design Guide",
      "COBIT 2019 Implementation Guide",
      "COBIT Governance Components",
      "COBIT Performance Management",
      "COBIT 5",
      "ISACA Risk IT Framework",
      "ISACA Val IT Framework",
    ],
  },

  {
    key: "CMMC",
    name: "CMMC",
    year: 2022,
    sector: "Defense",
    description: "Cybersecurity Maturity Model Certification",
    controls: [
      "CMMC 2.0 Model – Level 1",
      "CMMC 2.0 Model – Level 2",
      "CMMC 2.0 Model – Level 3",
      "CMMC Level 1 Assessment Guide",
      "CMMC Level 2 Assessment Guide",
      "NIST SP 800-171 Rev 3",
      "NIST SP 800-172",
    ],
  },

  {
    key: "DPDP",
    name: "DPDP Act",
    year: 2023,
    sector: "Privacy",
    description: "Digital Personal Data Protection Act (India)",
    controls: [
      "DPDP Act 2023",
      "DPDP Rules 2024 (Draft)",
      "CERT-In Guidelines 2022",
      "RBI Cybersecurity Framework",
      "MeitY Data Protection Board Rules",
      "ISO/IEC 27701 Mapping",
      "MeitY Data Governance Framework",
    ],
  },

  {
    key: "ESG",
    name: "ESG",
    year: 2024,
    sector: "Sustainability",
    description: "Environmental, Social & Governance Standards",
    controls: [
      "GRI Standards",
      "SASB Standards",
      "TCFD Framework",
      "IFRS Sustainability (ISSB S1 & S2)",
      "UN SDGs",
      "CDP Reporting Framework",
      "ESRS Standards",
      "ISO 26000",
      "ISO 14001",
      "ISO 50001",
    ],
  },

  {
    key: "NIST",
    name: "NIST Standards",
    year: 2024,
    sector: "Security",
    description: "NIST Security & Cyber Risk Standards",
    controls: [
      "NIST SP 800-53 Revision 5",
      "NIST CSF 2.0",
      "NIST SP 800-61 Revision 2",
      "NIST SP 800-63 Revision 4",
      "NIST SP 800-171 Revision 3",
      "NIST SP 800-207",
      "NIST SP 800-218",
      "NIST SP 800-160 Vol 1",
      "NIST SP 800-88 Rev 1",
      "NIST SP 800-37 Rev 2",
      "NIST SP 800-40 Rev 4",
      "NIST SP 800-184",
      "NIST 1800 Series",
      "NIST FIPS 140-3",
      "FIPS 199",
      "FIPS 200",
    ],
  },
];

/**
 * ---------------------------
 * 2. SEED FUNCTION
 * ---------------------------
 */
async function seed() {
  try {
    console.log("🧹 Clearing existing data...");
    await Framework.deleteMany({});
    await Control.deleteMany({});

    console.log("🌱 Seeding frameworks and controls...\n");

    for (const fw of frameworks) {
      const framework = await Framework.create({
        key: fw.key,
        name: fw.name,
        year: fw.year,
        sector: fw.sector,
        description: fw.description,
      });

      // Create controls
      const controlDocs = fw.controls.map((ctrl, index) => ({
        frameworkId: framework._id,
        controlId: `${fw.key}_C${index + 1}`,
        name: ctrl.split(" – ")[0], // short name
        requirement: ctrl,          // full text
      }));

      await Control.insertMany(controlDocs);

      console.log(`✔ Seeded ${fw.name} with ${fw.controls.length} controls.`);
    }

    console.log("\n🎉 FULL FRAMEWORK SEEDING COMPLETE!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed Error:", err);
    process.exit(1);
  }
}

seed();
