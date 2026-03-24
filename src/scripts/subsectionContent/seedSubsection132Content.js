// Execute: node src/scripts/subsectionContent/seedSubsection132Content.js

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
  const subsectionId = "subsection-1.3.2";

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
      subsectionNumber: 2,
      title: "Types of psychological needs",
      content: [
        {
          type: "heading",
          text: "Types of psychological needs",
        },
        {
          type: "paragraph",
          text: "Kitwood described there are five types of psychological needs. There are a great overlaps between these five basic needs, fulfilling one usually involves fulfilling another to some extent. All of these come together to fulfil a central need of love. The five basic needs are:",
        },
        {
          type: "list",
          items: [
            "Comfort",
            "Attachment",
            "Inclusion",
            "Occupation",
            "Identity",
          ],
        },
        {
          type: "paragraph",
          text: "Everyone has a need for comfort – free from distress and pain. This might also involves ensuring physical comforts, for example by ensuring a person is not hungry, not too cold or too warm.",
        },
        {
          type: "paragraph",
          text: "Having an attachment, a connection to a familiar person or place provides us with a sense of safety.",
        },
        {
          type: "paragraph",
          text: "As a social species, we all have a need to feel included in our community. With challenges in communication, a person with dementia might need more support to stay connected with other people.",
        },
        {
          type: "paragraph",
          text: "Being occupied with something that is personally significant provides meaning to our life. When people are deprived of this, it will not only lead to boredom and apathy, but also drain them of their self esteem.",
        },
        {
          type: "paragraph",
          text: "To have an identity means to know who one is. Each person with dementia is a unique individual with their own life stories and roles in the society. Understanding a person's life history and honouring their identity will help them in fulfilling other needs, such as providing a sense of attachment.",
        },
        {
          type: "paragraph",
          text: "We will talk more about this in relation to changes in behaviour in Module 5,Section 1. Introduction to Changes in Behaviour.",
        },
        {
          type: "image",
          src: "/subsection-1.3.2-psychological-needs-diagram.png",
          alt: "Diagram showing Kitwood's psychological needs with love at the centre",
        },
      ],
    },
    { merge: true },
  );

  console.log("✅ Seeded subsection-1.3.2 content successfully.");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
