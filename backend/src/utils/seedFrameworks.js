import dotenv from "dotenv";
dotenv.config();

import connectDB from "../config/db.js";
import Framework from "../models/Framework.js";
import Control from "../models/Control.js";

await connectDB();

const frameworksData = [
  { key: "ISO27001", name: "ISO 27001", year: 2022, sector: "Security", description: "Information Security Management Standard" },
  { key: "ISO9001", name: "ISO 9001", year: 2015, sector: "Quality", description: "Quality Management Standard" },
  { key: "SOC2", name: "SOC 2", year: 2017, sector: "Security", description: "Service Organization Controls Type 2" },
  { key: "GDPR", name: "GDPR", year: 2018, sector: "Privacy", description: "General Data Protection Regulation" },
  { key: "HIPAA", name: "HIPAA", year: 1996, sector: "Healthcare", description: "Health Insurance Portability and Accountability Act" },
  { key: "PCI", name: "PCI DSS", year: 2022, sector: "Payment", description: "Payment Card Industry Data Security Standard" },
  { key: "NIST80053", name: "NIST 800-53", year: 2020, sector: "Government", description: "Security and Privacy Controls for Federal Systems" },
  { key: "NIST800171", name: "NIST 800-171", year: 2021, sector: "Defense", description: "Protecting Controlled Unclassified Information" },
  { key: "CCPA", name: "CCPA", year: 2020, sector: "Privacy", description: "California Consumer Privacy Act" },
  { key: "COBIT5", name: "COBIT 5", year: 2012, sector: "IT Governance", description: "Framework for IT Management and Governance" },
];

async function seed() {
  try {
    await Framework.deleteMany({});
    await Control.deleteMany({});

    console.log("🌱 Seeding frameworks...");

    for (const fw of frameworksData) {
      const framework = await Framework.create(fw);

      // Seed 3 simple controls per framework
      await Control.create([
        {
          frameworkId: framework._id,
          controlId: `${fw.key}_1`,
          name: "Control 1",
          requirement: "Description for control 1",
        },
        {
          frameworkId: framework._id,
          controlId: `${fw.key}_2`,
          name: "Control 2",
          requirement: "Description for control 2",
        },
        {
          frameworkId: framework._id,
          controlId: `${fw.key}_3`,
          name: "Control 3",
          requirement: "Description for control 3",
        },
      ]);

      console.log(`✔ Seeded framework: ${fw.name}`);
    }

    console.log("\n🎉 Framework seeding completed!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed error:", error);
    process.exit(1);
  }
}

seed();
