// backend/src/utils/seedModels.js
import dotenv from "dotenv";
dotenv.config();

import connectDB from "../config/db.js";
import Framework from "../models/Framework.js";
import Control from "../models/Control.js";
import Project from "../models/Project.js";

await connectDB();

async function seed() {
  try {
    // Cleanup (comment out if you don't want deleting)
    await Control.deleteMany({});
    await Framework.deleteMany({});
    await Project.deleteMany({});

    // Create a framework
    const fw = await Framework.create({
      key: "ISO27001",
      name: "ISO 27001",
      year: 2022,
      sector: "General",
      description: "Information security management standard",
    });

    // Create some controls for the framework
    const controls = await Control.create([
      {
        frameworkId: fw._id,
        controlId: "ISO_A.5.1",
        name: "Information security policy",
        requirement: "Establish an information security policy and maintain it.",
      },
      {
        frameworkId: fw._id,
        controlId: "ISO_A.6.1",
        name: "Organization of information security",
        requirement: "Establish the organizational structure for security responsibilities.",
      },
    ]);

    // Create a sample project (you can replace userId with a valid user in your DB)
    const project = await Project.create({
      userId: '6932be597dbfd3ef9d2bf201' , // replace with real user _id when available
      title: "Sample Project - ISO Assessment",
      frameworks: [fw._id],
      description: "A demo project seeded for testing.",
    });

    console.log("Seeding complete:");
    console.log("Framework:", fw);
    console.log("Controls:", controls.map(c => ({ id: c._id, controlId: c.controlId })));
    console.log("Project:", { id: project._id, title: project.title });
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}

seed();
