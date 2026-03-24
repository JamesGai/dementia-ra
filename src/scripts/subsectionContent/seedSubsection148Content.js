// Execute: node src/scripts/subsectionContent/seedSubsection148Content.js

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
  const subsectionId = "subsection-1.4.8";

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
      subsectionNumber: 8,
      title: "Advanced Care Plan (ACP)",
      content: [
        {
          type: "heading",
          text: "Advanced Care Plan (ACP)",
        },
        {
          type: "paragraph",
          text: "In an Advanced Care Plan (ACP), someone can outline wishes about their future care and treatment. This will help healthcare professionals and the family/whānau to understand what treatments they would want in certain situations, or if there is any treatments they would refuse.",
        },
        {
          type: "paragraph",
          text: "For more information about ACP, please visit: https://www.hqsc.govt.nz/our-work/advance-care-planning/",
        },
        {
          type: "image",
          src: "/course/subsection/subsection-1.4.8-acp-landscape.png",
          alt: "River landscape",
        },
        {
          type: "paragraph",
          text: "We have discussed about different types of dementia and its progression, how to optimize your brain health, person-centred care, and planning for the future. Understanding this will empower you in your journey as a carer.",
        },
        {
          type: "paragraph",
          text: "If you would like to know more about how to support your love done in their daily life, we will discuss it in Module 4 – Providing everyday care.",
        },
      ],
    },
    { merge: true },
  );

  console.log("✅ Seeded subsection-1.4.8 content successfully.");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
