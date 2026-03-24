// Execute: node src/scripts/subsectionContent/seedSubsection130Content.js

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
  const sectionId = "section-1.3";
  const subsectionId = "subsection-1.3.0";

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
      sectionNumber: 3,
      subsectionNumber: 0,
      title: "Why this section is important?",
      content: [
        {
          type: "heading",
          text: "Why is this section important?",
        },
        {
          type: "paragraph",
          text: "Understanding the concept of 'personhood' and 'person-centred care' is important in providing support for a person who lives with dementia.",
        },
        {
          type: "subheading",
          text: "How will this section help me?",
        },
        {
          type: "paragraph",
          text: "This section will talk about what personhood and person-centred care mean, and how to implement it. It will also talk briefly about the different types of psychological needs humans have.",
        },
        {
          type: "subheading",
          text: "What will I learn?",
        },
        {
          type: "list",
          items: [
            "Personhood and person-centred care",
            "Types of psychological needs",
          ],
        },
      ],
    },
    { merge: true },
  );

  console.log("✅ Seeded subsection-1.3.0 content successfully.");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
