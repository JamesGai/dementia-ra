// Execute: node src/scripts/seedModule1Subsections.js

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

async function seedSection(courseId, moduleNumber, sectionNumber, titles) {
  const moduleId = `module-${moduleNumber}`;
  const sectionId = `section-${moduleNumber}.${sectionNumber}`;

  const subsectionCol = db
    .collection("course")
    .doc(courseId)
    .collection("module")
    .doc(moduleId)
    .collection("section")
    .doc(sectionId)
    .collection("subsection");

  for (let i = 0; i < titles.length; i++) {
    const subsectionNumber = i;

    const subsectionId = `subsection-${moduleNumber}.${sectionNumber}.${subsectionNumber}`;

    await subsectionCol.doc(subsectionId).set(
      {
        moduleNumber,
        sectionNumber,
        subsectionNumber,
        title: titles[i],
      },
      { merge: true },
    );

    console.log("  ↳ Seeded subsection:", subsectionId);
  }
}

async function main() {
  const courseId = "isupport-nz";
  const moduleNumber = 1;

  // -----------------------------
  // SECTION 1.1
  // -----------------------------
  await seedSection(courseId, moduleNumber, 1, [
    "Why is this section important?",
    "What is dementia?",
    "What causes dementia?",
    "What happens to people with dementia as the disease progresses?",
    "What to do if you think that your family/whanau member or friend has dementia",
    "How to reach out for help",
    "Who is this course for?",
  ]);

  // -----------------------------
  // SECTION 1.2
  // -----------------------------
  await seedSection(courseId, moduleNumber, 2, [
    "Why is this section important?",
    "Dementia risk factors and protective factors",
    "How to reduce risk of dementia",
  ]);

  // -----------------------------
  // SECTION 1.3 (TYPO FIXED)
  // -----------------------------
  await seedSection(courseId, moduleNumber, 3, [
    "Why is this section important?",
    "Personhood and person-centred care", // fixed (was wrongly shown as 1.2.1)
    "Types of psychological needs",
  ]);

  // -----------------------------
  // SECTION 1.4
  // -----------------------------
  await seedSection(courseId, moduleNumber, 4, [
    "Why is this section important?",
    "The importance of planning for the future",
    "Managing finances",
    "Driving",
    "Enduring Power of Attorney (EPA)",
    "Making a will",
    "Respite services and additional support",
    "Emergency Support Plan",
    "Advanced Care Plan (ACP)",
  ]);

  console.log("✅ Done seeding ALL Module 1 subsections.");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
