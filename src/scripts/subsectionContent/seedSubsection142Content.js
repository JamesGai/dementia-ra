// Execute: node src/scripts/subsectionContent/seedSubsection142Content.js

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
  const subsectionId = "subsection-1.4.2";

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
      subsectionNumber: 2,
      title: "Managing finances",
      content: [
        {
          type: "heading",
          text: "Managing finances",
        },
        {
          type: "paragraph",
          text: "As their dementia progresses, your loved one might need support in managing their finances. It is a good idea to start talking about this early on.",
        },
        {
          type: "paragraph",
          text: "If the person is having difficulties to manage their finances, it might help to identify why they are struggling and what step in the task is challenging.",
        },
        {
          type: "paragraph",
          text: "They might want to discuss about what kind of support they need and how to ensure their needs are taken care of.",
        },
        {
          type: "paragraph",
          text: "For example, some families might want to set up direct debits for bills so that the person living with dementia does not have to worry about arranging and remembering payments.",
        },
      ],
    },
    { merge: true },
  );

  console.log("✅ Seeded subsection-1.4.2 content successfully.");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
