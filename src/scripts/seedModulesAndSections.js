// Execute: node src/scripts/seedModulesAndSections.js

import admin from "firebase-admin";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// ESM-compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load service account
const serviceAccountPath = path.resolve(
  __dirname,
  "../../serviceAccountKey.json",
);

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function main() {
  const courseId = "isupport-nz";

  const modules = [
    {
      number: 2,
      title: "Being a carer",
      sections: [
        "The journey together",
        "Improving communication",
        "Supported decision-making",
        "Involving others",
      ],
    },
    {
      number: 3,
      title: "Caring for me",
      sections: [
        "Reducing stress in everyday life",
        "Making time for enjoyable activities",
        "Thinking differently",
      ],
    },
    {
      number: 4,
      title: "Providing everyday care",
      sections: [
        "An enjoyable day",
        "Eating and drinking - more pleasant mealtimes",
        "Eating, drinking, and preventing health problems",
        "Personal care",
        "Toileting and continence care",
      ],
    },
    {
      number: 5,
      title: "Understanding changes in behaviour",
      sections: [
        "Introduction to changes in behaviour",
        "Memory loss",
        "Repetitive behaviour",
        "Depression, anxiety, and apathy",
        "Difficulty sleeping",
        "Walking and getting lost",
        "Changes in judgement",
        "Aggression",
        "Delusions and hallucinations",
        "Putting it all together",
      ],
    },
  ];

  const courseRef = db.collection("course").doc(courseId);
  const moduleCol = courseRef.collection("module");

  for (const module of modules) {
    const moduleId = `module-${module.number}`;
    await moduleCol.doc(moduleId).set(
      {
        number: module.number,
        title: module.title,
      },
      { merge: true },
    );

    console.log("Seeded module:", moduleId);

    const sectionCol = moduleCol.doc(moduleId).collection("section");

    for (let i = 0; i < module.sections.length; i++) {
      const sectionNumber = i + 1;
      const sectionTitle = module.sections[i];
      const sectionId = `section-${module.number}.${sectionNumber}`;
      await sectionCol.doc(sectionId).set(
        {
          moduleNumber: module.number,
          sectionNumber,
          title: sectionTitle,
        },
        { merge: true },
      );
      console.log("  ↳ Seeded section:", sectionId);
    }
  }

  console.log("✅ Done seeding modules and sections.");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
