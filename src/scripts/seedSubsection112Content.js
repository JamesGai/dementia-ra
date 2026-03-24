// Execute: node src/scripts/seedSubsection112Content.js

import admin from "firebase-admin";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccountPath = path.resolve(
  __dirname,
  "../../serviceAccountKey.json",
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
  const subsectionId = "subsection-1.1.2";

  const subsectionRef = db
    .collection("course")
    .doc(courseId)
    .collection("module")
    .doc(moduleId)
    .collection("section")
    .doc(sectionId)
    .collection("subsection")
    .doc(subsectionId);

  await subsectionRef.set(
    {
      moduleNumber: 1,
      sectionNumber: 1,
      subsectionNumber: 2,
      title: "What causes dementia?",
      content: [
        {
          type: "heading",
          text: "What causes dementia?",
        },
        {
          type: "paragraph",
          text: "Dementia is a term used to describe symptoms caused by a number of different diseases which can affect how well our brain works. It is usually progressive, which means most people with dementia will gradually need more support with their daily activities.",
        },
        {
          type: "paragraph",
          text: "The symptoms might differ from one person to another depending on the disease causing it and the parts of the brain involved.",
        },
        {
          type: "paragraph",
          text: "Some of the common forms of dementia are outlined below.",
        },
        {
          type: "subheading",
          text: "Alzheimer’s disease",
        },
        {
          type: "paragraph",
          text: "Alzheimer’s disease is the most common cause of dementia. It affects the brain cells and nerves by disrupting the transmitters that carry messages in the brain. This usually start in parts of the brain which are responsible for storing memories, before progressing to other parts. A common problem often experienced by someone with Alzheimer’s disease early on is easily forgetting a recent event or conversation and repetitively asking the same question.",
        },
        {
          type: "paragraph",
          text: "If your loved one has Alzheimer’s disease, you might be interested in Module 5 Section 2. Memory loss and Section 3. Repetitive behaviour for useful tips and advice.",
        },
        {
          type: "subheading",
          text: "Vascular dementia",
        },
        {
          type: "paragraph",
          text: "Vascular dementia occurs due to poor blood supply to the brain. This can appear either suddenly, following a stroke, or over time, through a series of small strokes. Some people might develop both vascular dementia and Alzheimer’s disease.",
        },
        {
          type: "paragraph",
          text: "The symptoms of vascular dementia vary depending on the parts of the brain affected. This might involve difficulties in language and communication or in executive function, which includes planning and making a decision.",
        },
        {
          type: "subheading",
          text: "Dementia with Lewy bodies",
        },
        {
          type: "paragraph",
          text: "Dementia with Lewy bodies is similar to Alzheimer’s disease in that it is caused by deteriorating and dying nerve cells in the brain. It takes its name from abnormal build-ups of protein called Lewy bodies in the nerve cells of the brain. It may account for around 10% of all cases of dementia.",
        },
        {
          type: "paragraph",
          text: "It is quite common for people who have dementia with Lewy bodies to experience visual hallucinations, and also symptoms of Parkinson’s disease, such as tremors, stiffness, or slow movement.",
        },
        {
          type: "subheading",
          text: "Fronto-temporal dementia",
        },
        {
          type: "paragraph",
          text: "Fronto-temporal dementia leads to changes in personality and the way a person responds. People with this type of dementia also often experience language difficulties. Memory loss is not as common in the early stages.",
        },
        {
          type: "subheading",
          text: "Other causes",
        },
        {
          type: "paragraph",
          text: "There are many other rarer forms of dementia. Read Section 2. Optimising brain health to see what factors can increase the risk of dementia and what protects your brain from it.",
        },
      ],
    },
    { merge: true },
  );

  console.log("✅ Seeded subsection-1.1.2 content successfully.");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
