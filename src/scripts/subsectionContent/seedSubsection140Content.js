// Execute: node src/scripts/subsectionContent/seedSubsection140Content.js

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
  const sectionId = "section-1.4";
  const subsectionId = "subsection-1.4.0";

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
      sectionNumber: 4,
      subsectionNumber: 0,
      title: "Why is this section important?",
      content: [
        {
          type: "heading",
          text: "Why is this section important?",
        },
        {
          type: "paragraph",
          text: "As dementia progresses, it might affect someone's ability to make decisions and interferes with communication. Although your loved one might not have to make big changes right away, it is a good idea to start talking about how you can support them in planning for the future as soon as possible.",
        },
        {
          type: "subheading",
          text: "How will this section help me?",
        },
        {
          type: "paragraph",
          text: "This section will talk about the things you might want to discuss with your loved one.",
        },
        {
          type: "subheading",
          text: "What will I learn?",
        },
        {
          type: "list",
          items: [
            "The importance of planning for the future",
            "Managing finances",
            "Driving",
            "Enduring Power of Attorney (EPA)",
            "Making a will",
            "Respite care and additional support",
            "Emergency support plan",
            "Advanced Care Plan (ACP)",
          ],
        },
      ],
    },
    { merge: true },
  );

  console.log("✅ Seeded subsection-1.4.0 content successfully.");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
