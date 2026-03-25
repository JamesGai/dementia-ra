// Execute: node src/scripts/subsectionContent/seedSubsection144Content.js

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
  const subsectionId = "subsection-1.4.4";

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
      subsectionNumber: 4,
      title: "Enduring Power of Attorney (EPA)",
      content: [
        {
          type: "heading",
          text: "Enduring Power of Attorney (EPA)",
        },
        {
          type: "paragraph",
          text: "Setting up an EPA means someone can appoint a person/people they trust to look after them and make decisions on behalf of them if they became incapable of doing so themselves.",
        },
        {
          type: "paragraph",
          text: "There are two types of EPA:",
        },
        {
          type: "list",
          items: [
            "Personal care and welfare (for decisions about medical treatment or care). It will be enacted only when a doctor decided the person can no longer make good, safe decisions for themselves.",
            "Finances (for financial decisions, such as regarding bank accounts, assets, property)",
          ],
        },
        {
          type: "paragraph",
          text: "EPA is a legal document which has to be set up when the person is still mentally capable. Therefore, it is important to support the person you are caring for to seek legal support to set this up.",
        },
        {
          type: "paragraph",
          text: "If the person no longer has the mental capacity to set up an EPA, the family has to apply to the Family Court to be allowed to make decisions on their behalf.",
        },
        {
          type: "paragraph",
          text: "For more information on EPA and Family Court, please visit:",
        },
        {
          type: "list",
          items: [
            "https://alzheimers.org.nz/get-support/living-with-dementia/the-future-wills-epa/",
            "https://www.justice.govt.nz/family/powers-to-make-decisions/the-court-and-enduring-power-of-attorney-epa/#:~:text=An%20enduring%20power%20of%20attorney,a%20lawyer%20or%20trustee%20corporation.",
          ],
        },
      ],
    },
    { merge: true },
  );

  console.log("✅ Seeded subsection-1.4.4 content successfully.");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
