// Execute: node src/scripts/subsectionContent/seedSubsection121Content.js

import admin from "firebase-admin";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccountPath = path.resolve(
  __dirname,
  "../../../serviceAccountKey.json",
);

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

async function main() {
  const courseId = "isupport-nz";
  const moduleId = "module-1";
  const sectionId = "section-1.2";
  const subsectionId = "subsection-1.2.1";

  const ref = db
    .collection("course")
    .doc(courseId)
    .collection("module")
    .doc(moduleId)
    .collection("section")
    .doc(sectionId)
    .collection("subsection")
    .doc(subsectionId);

  await ref.set(
    {
      moduleNumber: 1,
      sectionNumber: 2,
      subsectionNumber: 1,
      title: "Dementia risk factors and protective factors",
      content: [
        {
          type: "heading",
          text: "Dementia risk factors and protective factors",
        },
        {
          type: "paragraph",
          text: "There are modifiable and unmodifiable risk factors of dementia. Unmodifiable risk factors are things you are unable to changes, such as your age and your genetics.",
        },
        {
          type: "paragraph",
          text: "Modifiable risk factors are things that you can change that may reduce your risk of developing dementia, or slow down its progression.",
        },
        {
          type: "paragraph",
          text: "Some of the modifiable risk factors are:",
        },
        {
          type: "list",
          items: [
            "Early life (under 45 years old)",
            "Low education",
            "Midlife (age 45-65 years old)",
            "Hearing loss",
            "Traumatic brain injury (TBI/head injury)",
            "Hypertension (high blood pressure)",
            "Alcohol",
            "Obesity",
            "Late life (older than 65 years old)",
            "Smoking",
            "Depression",
            "Social isolation/loneliness",
            "Physical inactivity",
            "Diabetes",
            "Air pollution",
          ],
        },
      ],
    },
    { merge: true },
  );

  console.log("✅ Seeded subsection-1.2.1 content successfully.");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
