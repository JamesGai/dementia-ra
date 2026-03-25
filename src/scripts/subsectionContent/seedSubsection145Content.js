// Execute: node src/scripts/subsectionContent/seedSubsection145Content.js

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
  const subsectionId = "subsection-1.4.5";

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
      subsectionNumber: 5,
      title: "Making a will",
      content: [
        {
          type: "heading",
          text: "Making a will",
        },
        {
          type: "paragraph",
          text: "A Will is a legal document which details about how someone wants their possessions to be distributed after their death.",
        },
        {
          type: "paragraph",
          text: "Similar to EPA, it only has legal power if it is signed by the person making it when they are still capable of understanding what it all means.",
        },
      ],
    },
    { merge: true },
  );

  console.log("✅ Seeded subsection-1.4.5 content successfully.");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
