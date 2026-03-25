// Execute: node src/scripts/subsectionContent/seedSubsection115Content.js

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
  const subsectionId = "subsection-1.1.5";

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
      sectionNumber: 1,
      subsectionNumber: 5,
      title: "How to reach out for help",
      content: [
        {
          type: "heading",
          text: "How to reach out for help",
        },
        {
          type: "paragraph",
          text: "It is important to realise that you, alone, are not going to be able to provide all the care that the person living with dementia needs, especially as things get more complex over time. So, we encourage you to reach out to family members, friends, and professional organisations or services for help.",
        },
        {
          type: "paragraph",
          text: "In New Zealand, organisations such as Alzheimers New Zealand (Alzheimers NZ) or Dementia New Zealand have various resources which may also be of interest.",
        },
        {
          type: "paragraph",
          text: "Please contact your GP or Alzheimers NZ for information, support and care that is available in your area and could benefit the person you care for as well as yourself.",
        },
      ],
    },
    { merge: true },
  );

  console.log("✅ Seeded subsection-1.1.5 content successfully.");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
