// Execute: node src/scripts/subsectionContent/seedSubsection120Content.js

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
  const subsectionId = "subsection-1.2.0";

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
      subsectionNumber: 0,
      title: "Why is this section important?",
      content: [
        {
          type: "heading",
          text: "Why is this section important?",
        },
        {
          type: "paragraph",
          text: "Being diagnosed with dementia does not mean there is nothing can be done. It is important to understand how to maintain and optimise a person's brain function to minimise further deterioration and improve their quality of life.",
        },
        {
          type: "subheading",
          text: "How will this section help me?",
        },
        {
          type: "paragraph",
          text: "This section will talk about risk factors and protective factors of brain health. The information will help you to reduce your own risk of developing dementia and understand what can be done to help a person who has already been diagnosed with dementia slowdown its progression.",
        },
        {
          type: "subheading",
          text: "What will I learn?",
        },
        {
          type: "list",
          items: [
            "Dementia risk factors and protective factors",
            "How to reduce risk of dementia",
          ],
        },
      ],
    },
    { merge: true },
  );

  console.log("✅ Seeded subsection-1.2.0 content successfully.");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
