// Execute: node src/scripts/subsectionContent/seedSubsection147Content.js

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
  const subsectionId = "subsection-1.4.7";

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
      subsectionNumber: 7,
      title: "Emergency Support Plan",
      content: [
        {
          type: "heading",
          text: "Emergency Support Plan",
        },
        {
          type: "paragraph",
          text: "Emergency Support Plan contains important information about the person you are caring for, such as their personal details, their medical history, languages they speak, your contacts or other support persons', other services provider, their lawyer, or their Enduring Power of Attorney. It will be useful to refer to this document when there is an emergency situation.",
        },
        {
          type: "paragraph",
          text: "It is important to support the person who has dementia inputting together this document.",
        },
        {
          type: "paragraph",
          text: "Alzheimer's NZ has a template for this document which you can download from https://cdn.alzheimers.org.nz/wp-content/uploads/2021/04/My-Emergency-Support-Plan.pdf",
        },
      ],
    },
    { merge: true },
  );

  console.log("✅ Seeded subsection-1.4.7 content successfully.");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
