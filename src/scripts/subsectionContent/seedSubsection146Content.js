// Execute: node src/scripts/subsectionContent/seedSubsection146Content.js

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
  const subsectionId = "subsection-1.4.6";

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
      subsectionNumber: 6,
      title: "Respite services and additional support",
      content: [
        {
          type: "heading",
          text: "Respite services and additional support",
        },
        {
          type: "paragraph",
          text: "In your caring journey, there might be times when you need more support outside your whānau and friends. It might be because you need help from someone with a specific skills, or you and your whānau need some time to rest or to deal with an important matter that requires someone else to care for you loved one.",
        },
        {
          type: "paragraph",
          text: "There are supports available in New Zealand from the government or non-governmental organisations. The type of supports available might differ from one area to another, and your GP can advise you on this. They can provide you with information and refer you to the Needs Assessment Service Co-ordination (NASC) team. NASC will do an assessment to work out the type of support your loved one and your whānau need and determine if you are eligible for some government-funded support.",
        },
        {
          type: "paragraph",
          text: "Here we describe some of the available respite services and support you may consider. It is important to remember that the need of every person with dementia and every family is different. Therefore, it is a good idea to start talking and discussing these options early on when the person with dementia can still talk about their wishes.",
        },
        {
          type: "subheading",
          text: "Carer support group",
        },
        {
          type: "paragraph",
          text: "Meeting with other carers, who are in the same shoes as you, might provide you with greater moral support. You can also learn from each other's experiences. Please contact Alzheimers NZ to find out more about available support groups around your area.",
        },
        {
          type: "subheading",
          text: "Respite",
        },
        {
          type: "paragraph",
          text: "Respite means taking a break from your caring responsibilities. There might be times when for some reason you need someone else to take over your caring responsibilities for a temporary period. It can be because you need to rest, to travel, or to take care of another important matter. There are various forms of respite support and services, for example:",
        },
        {
          type: "list",
          items: [
            "having a family/whānau/friend to come over several hours each week",
            "hiring a professional support person",
            "organising activities the person you are caring for can go to",
            "receiving a carer support subsidy which can help you to pay for a support person or a day centre",
            "using a facility-based respite where the person you are caring for can stay overnight.",
          ],
        },
        {
          type: "subheading",
          text: "Long-term residential care",
        },
        {
          type: "paragraph",
          text: "In some cases, as the dementia progresses, some persons will need more constant support, or they might have significant medical needs which proves difficult to be provided at home. Long-term residential care might be considered in this situation.",
        },
        {
          type: "paragraph",
          text: "Please see the Ministry of Health's website for more information about respite support and services:",
        },
        {
          type: "paragraph",
          text: "https://www.health.govt.nz/your-health/services-and-support/disability-services/types-disability-support/respite/respite-supports-and-services",
        },
        {
          type: "paragraph",
          text: "For more information about NASC, please visit:",
        },
        {
          type: "paragraph",
          text: "https://www.govt.nz/browse/health/help-in-your-home/needs-assessment/",
        },
        {
          type: "paragraph",
          text: "You may also find more information on local supports available in your area through Alzheimers NZ's page:",
        },
        {
          type: "paragraph",
          text: "https://alzheimers.org.nz/get-support/where-to-go-for-help/",
        },
      ],
    },
    { merge: true },
  );

  console.log("✅ Seeded subsection-1.4.6 content successfully.");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
