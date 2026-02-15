// Execute: node src/scripts/seedModule2Subsections.js

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
    const subsectionId = `subsection-${moduleNumber}.${sectionNumber}.${i}`;

    await subsectionCol.doc(subsectionId).set(
      {
        moduleNumber,
        sectionNumber,
        subsectionNumber: i,
        title: titles[i],
      },
      { merge: true },
    );

    console.log("  ↳ Seeded", subsectionId);
  }
}

async function main() {
  const courseId = "isupport-nz";
  const moduleNumber = 2;

  // -----------------------------
  // SECTION 2.1 — The journey together
  // -----------------------------
  await seedSection(courseId, moduleNumber, 1, [
    "Why is this section important?",
    "How your roles may change over time",
    "How to stay connected to the person with dementia",
    "How to plan pleasant activities and relaxation",
    "How to involve others",
    "How to plan well for the future",
    "Activity",
    "Activity",
    "Activity",
    "Activity",
    "How to plan well for the future? (continued)",
    "Let’s review what you have learned",
  ]);

  // -----------------------------
  // SECTION 2.2 — Improving communication
  // -----------------------------
  await seedSection(courseId, moduleNumber, 2, [
    "Why is this section important?",
    "How to improve communication",
    "How to check the person’s ability to hear and see",
    "Gaining attention in a respectful way",
    "Keep it simple",
    "Responding with respect",
    "Pay attention to reactions and body language",
    "Giving Compliments",
    "Activity",
    "Showing compassion",
    "Let’s review what you have learned",
  ]);

  // -----------------------------
  // SECTION 2.3 — Supported decision-making
  // -----------------------------
  await seedSection(courseId, moduleNumber, 3, [
    "Why is this section important?",
    "Why is support in decision-making needed?",
    "How to make decisions in someone's best interest",
    "Activity",
    "How to support someone with dementia to make everyday decisions",
    "How to support someone with dementia to make everyday decisions as the dementia progresses",
    "How to support someone with dementia to make complex decisions",
    "Activity",
    "Activity",
    "Activity",
    "Activity",
    "Activity",
  ]);

  // -----------------------------
  // SECTION 2.4 — Involving others
  // -----------------------------
  await seedSection(courseId, moduleNumber, 4, [
    "Why is this section important?",
    "The importance of involving family and friends",
    "Types of help and support that you might need",
    "Activity",
    "Activity",
    "Activity",
    "Activity",
    "Activity",
    "Types of help and support that you might need (continued)",
    "Types of help and support that you might need (continued)",
    "Activity",
    "Types of help and support that you might need (continued)",
    "Effectively asking for help from others",
    "Activity",
    "Activity",
    "Activity",
    "Activity",
    "Respite services and additional support",
  ]);

  console.log("✅ Done seeding ALL Module 2 subsections.");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
