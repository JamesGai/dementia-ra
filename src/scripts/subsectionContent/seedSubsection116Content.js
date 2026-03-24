// Execute: node src/scripts/subsectionContent/seedSubsection116Content.js

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
  const subsectionId = "subsection-1.1.6";

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
      subsectionNumber: 6,
      title: "Who is this course for?",
      content: [
        {
          type: "heading",
          text: "Who is this course for?",
        },
        {
          type: "paragraph",
          text: "The focus is on you, a carer of someone with dementia.",
        },
        {
          type: "paragraph",
          text: "When someone has dementia, most of the care is provided by family/friends. You may still provide care even when they move into a care home, are in hospital, or receive additional support at home.",
        },
        {
          type: "paragraph",
          text: "There are negative as well as positive experiences that come with caring for a person with dementia. With most journeys, you must be prepared, and the purpose of this course is to assist you and your whānau to prepare to look after your loved ones, and also look after yourself and your family/whānau.",
        },
        {
          type: "paragraph",
          text: "The iSupport course will show you how to do this and provide you with support to feel more comfortable and confident with caregiving on a day-to-day basis. It will also show you some common scenarios that might happen in people with dementia so that you are aware and can practice how to respond to such situations.",
        },
        {
          type: "subheading",
          text: "Keep in mind",
        },
        {
          type: "list",
          items: [
            "Dementia may affect a person’s everyday life.",
            "The risk of dementia increases as we get older.",
            "Dementia is not necessarily a part of normal ageing.",
            "As a first step it is important to see your GP, if possible.",
            "It is important for you to also take care of yourself, not only the person you care for.",
            "iSupport is a self-help tool for carers.",
          ],
        },
      ],
    },
    { merge: true },
  );

  console.log("✅ Seeded subsection-1.1.6 content successfully.");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
