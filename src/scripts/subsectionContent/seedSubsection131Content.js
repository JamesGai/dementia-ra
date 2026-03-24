// Execute: node src/scripts/subsectionContent/seedSubsection131Content.js

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
  const subsectionId = "subsection-1.3.1";

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
      subsectionNumber: 1,
      title: "Personhood and person-centred care",
      content: [
        {
          type: "heading",
          text: "Personhood and person-centred care",
        },
        {
          type: "paragraph",
          text: "The concept of 'personhood' in dementia care was first introduced by Tom Kitwood (1997). A person with dementia is still an individual with their own unique personality, life experiences, needs, wishes and preferences.",
        },
        {
          type: "paragraph",
          text: "Providing a person-centred care means focusing on the person as an individual, rather than the disease. It means considering what matters most for them when providing care or making plans and decisions.",
        },
        {
          type: "paragraph",
          text: "You might already have done this in your daily caring activities. For example, asking them which clothes they want to wear, what they would like to eat for dinner, or driving them to their church meetings so they can continue to stay in touch with their friends. All of these are the examples of person-centred care.",
        },
        {
          type: "paragraph",
          text: "People with dementia need us to stay engaged authentically with them through respectful communication. As dementia progresses and communication becomes more difficult, you might wonder whether person-centred care is still possible. It is still possible. Understanding a person's life history, values, and the environment around them will guide you to keep implementing person-centred care in these stages.",
        },
        {
          type: "paragraph",
          text: "Dementia might change how someone perceives and responds to the world around them or how they express themselves, but it is important to remember that they are still the person you know and love.",
        },
      ],
    },
    { merge: true },
  );

  console.log("✅ Seeded subsection-1.3.1 content successfully.");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
