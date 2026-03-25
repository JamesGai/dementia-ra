// Execute: node src/scripts/subsectionContent/seedSubsection113Content.js

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
  const subsectionId = "subsection-1.1.3";

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
      subsectionNumber: 3,
      title: "What happens to people with dementia as the disease progresses?",
      content: [
        {
          type: "heading",
          text: "What happens to people with dementia as the disease progresses?",
        },
        {
          type: "paragraph",
          text: "Every person is unique and dementia affects people differently. No two people will develop the same difficulties in exactly the same way. It is not just the brain damage that determines how dementia affects someone, but also other factors including an individual’s personality, life course, general health and functioning, and living environment.",
        },

        {
          type: "subheading",
          text: "Do all people with dementia have memory loss?",
        },
        {
          type: "paragraph",
          text: "Although most people think of forgetfulness when they think of dementia, not everyone who has dementia will experience memory loss.",
        },
        {
          type: "paragraph",
          text: "Memory loss is a common symptom in Alzheimer's disease, which is the most common form of dementia. Some people with other types of dementia might develop memory loss later on, and some do not experience it at all.",
        },

        {
          type: "subheading",
          text: "Dementia progression",
        },
        {
          type: "paragraph",
          text: "Dementia symptoms can range from minor memory loss or thinking problems to severe difficulties with memory or thinking that make it difficult to manage daily activities without help. Not all people with dementia will have all symptoms and some of the symptoms may only appear at one stage of the disease.",
        },
        {
          type: "paragraph",
          text: "It can be helpful to view dementia progression as an increase of the person's need for support and help in doing their day-to-day activities.",
        },
        {
          type: "paragraph",
          text: "For example, someone early in the early stages of Alzheimer's disease might be fairly independent, but needs reminders to take their medication, attend an appointment, or pay a bill. As the dementia progresses, they might need more help in activities such as dressing, washing, eating, or going to the toilet. We will talk about ways to support people in these activities in Module 4.",
        },
        {
          type: "paragraph",
          text: "Later, people with dementia might have difficulties in communication, and changes in behaviour. They may need a lot of support to stay connected with their family/whānau and friends. Module 5 offers ideas about support in these areas.",
        },
        {
          type: "paragraph",
          text: "Different forms of dementia affect the brain in different ways and can result in different symptoms and progression. Do not hesitate to contact your GP to seek more advice on what resources or support you may need.",
        },

        {
          type: "subheading",
          text: "Activity",
        },
        {
          type: "paragraph",
          text: "Here are some common things that may happen to people at various stages of dementia.",
        },
        {
          type: "paragraph",
          text: "Do you think that your family member/friend/the person that you care for experiences any of the following?",
        },
        {
          type: "paragraph",
          text: "You can write down the details, such as when it first occurred and whether it is worsening. Give specific examples.",
        },
        {
          type: "paragraph",
          text: "You can bring this note when consulting the GP.",
        },

        {
          type: "table",
          headers: ["Does the person you care for...", "Examples"],
          rows: [
            {
              left: "Have trouble remembering things that happened minutes before?",
              right: ["Forgetting recent events", "Repeating questions"],
            },
            {
              left: "Find it difficult to perform daily activities?",
              right: ["Money management", "Shopping", "Preparing dinner"],
            },
            {
              left: "Struggle to identify time or place?",
              right: ["Forgetting the date and time of appointments"],
            },
            {
              left: "Communicate differently than they did before?",
              right: [
                "Difficulty expressing oneself",
                "Difficulty finding the right words",
              ],
            },
            {
              left: "Misplace things",
              right: [
                "Not finding common objects, such as keys",
                "Suspecting things are stolen",
              ],
            },
            {
              left: "Withdraw socially?",
              right: [
                "Showing decline in social activity",
                "Lacking urge to do something",
              ],
            },
            {
              left: "Show changes in feelings or personality?",
              right: [
                "Having a lot of ups and downs",
                "Becoming more anxious than before",
              ],
            },
          ],
        },
      ],
    },
    { merge: true },
  );

  console.log("✅ Seeded subsection-1.1.3");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
