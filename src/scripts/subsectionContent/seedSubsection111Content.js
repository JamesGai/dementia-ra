// Execute: node src/scripts/subsectionContent/seedSubsection111Content.js

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
  const sectionId = "section-1.1";
  const subsectionId = "subsection-1.1.1";

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
      subsectionNumber: 1,
      title: "What is dementia?",
      content: [
        {
          type: "heading",
          text: "What is dementia?",
        },
        {
          type: "paragraph",
          text: "Dementia occurs as a result of a disease process that increasingly damages the brain over time. Dementia affects all groups of society and is not linked to social class, gender, ethnic group, or geographic location.",
        },
        {
          type: "paragraph",
          text: "Dementia is not a part of normal ageing. Although dementia is more common among older people, younger people can also be affected.",
        },
      ],
    },
    { merge: true },
  );

  console.log("✅ Seeded subsection-1.1.1 content successfully.");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
