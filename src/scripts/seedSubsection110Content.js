// Execute: node src/scripts/seedSubsection110Content.js

import admin from "firebase-admin";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccountPath = path.resolve(
  __dirname,
  "../../serviceAccountKey.json",
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
  const sectionId = "section-1.1";
  const subsectionId = "subsection-1.1.0";

  const subsectionRef = db
    .collection("course")
    .doc(courseId)
    .collection("module")
    .doc(moduleId)
    .collection("section")
    .doc(sectionId)
    .collection("subsection")
    .doc(subsectionId);

  await subsectionRef.set(
    {
      moduleNumber: 1,
      sectionNumber: 1,
      subsectionNumber: 0,
      title: "Why is this section important?",
      content: [
        {
          type: "heading",
          text: "Why is this section important?",
        },
        {
          type: "paragraph",
          text: "Dementia is a term to describe symptoms caused by a number of different diseases which can affect how well our brain works. Understanding types of dementia might help you find the appropriate sections in this manual and direct you to relevant support which might be available around you.",
        },
        {
          type: "subheading",
          text: "How will this section help me?",
        },
        {
          type: "paragraph",
          text: "This section helps you to understand the basics of what dementia is and how it affects someone. This information is essential for you to prepare for your journey of caring.",
        },
        {
          type: "subheading",
          text: "What will I learn?",
        },
        {
          type: "list",
          items: [
            "What is dementia?",
            "What causes dementia?",
            "What happens to people with dementia as the disease progresses?",
            "What to do if you think that your family/whānau member or friend has dementia",
            "How to reach out for help",
            "Who is this manual for?",
          ],
        },
      ],
    },
    { merge: true },
  );

  console.log("✅ Seeded subsection-1.1.0 content successfully.");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
