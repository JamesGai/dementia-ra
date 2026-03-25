// Execute: node src/scripts/subsectionContent/seedSubsection141Content.js

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
  const subsectionId = "subsection-1.4.1";

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
      subsectionNumber: 1,
      title: "The importance of planning for the future",
      content: [
        {
          type: "heading",
          text: "The importance of planning for the future",
        },
        {
          type: "paragraph",
          text: "By planning for the future after the diagnosis, a person with dementia can continue to play an important role in making decisions regarding their life, such as on their treatment and care, finances, and legal affairs.",
        },
        {
          type: "paragraph",
          text: "People may want to consider changes that happens in their life, such as who will manage their finances, what happens if they become unwell, or if they are no longer able to drive.",
        },
        {
          type: "paragraph",
          text: "This might include thinking about:",
        },
        {
          type: "list",
          items: [
            "Managing finances",
            "Driving",
            "Enduring Power of Attorney (EPA)",
            "Making a will",
            "Respite services and additional support",
            "Emergency support plan",
            "Advanced Care Plan (ACP)",
          ],
        },
      ],
    },
    { merge: true },
  );

  console.log("✅ Seeded subsection-1.4.1 content successfully.");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
