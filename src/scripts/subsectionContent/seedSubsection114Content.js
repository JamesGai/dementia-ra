// Execute: node src/scripts/subsectionContent/seedSubsection114Content.js

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
  const subsectionId = "subsection-1.1.4";

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
      subsectionNumber: 4,
      title:
        "What to do if you think that your family/whānau member or friend has dementia",
      content: [
        {
          type: "heading",
          text: "What to do if you think that your family/whānau member or friend has dementia",
        },
        {
          type: "paragraph",
          text: "If you think that a family/whānau member or friend may have dementia, a good first step is to make sure that they see their GP. The GP will examine their body and brain functioning.",
        },
        {
          type: "paragraph",
          text: "It is important to identify whether the person’s difficulties are really caused by dementia or are due to other treatable conditions such as depression, infection, medication side effects, lack of vitamins or low thyroid hormone. The GP will do a medical assessment. This may include discussing medical history, talking to family/whānau (with permission), a physical examination, blood tests or brain imaging, cognitive testing, and/or a mental health assessment.",
        },
        {
          type: "paragraph",
          text: "The GP may decide the symptoms are a result of a treatable condition, they may refer you to a specialist, or confirm dementia.",
        },
        {
          type: "paragraph",
          text: "This manual provides information on how to support and provide care for someone who has been diagnosed with dementia, while also caring for yourself. This cannot replace the advice of a GP or other specialist, but it may help.",
        },
      ],
    },
    { merge: true },
  );

  console.log("✅ Seeded subsection-1.1.4 content successfully.");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
