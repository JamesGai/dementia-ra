// Execute: node src/scripts/seedVideos.js to add video documents

import admin from "firebase-admin";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// ESM-compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Put your serviceAccountKey.json here:
const serviceAccountPath = path.resolve(
  __dirname,
  "../../serviceAccountKey.json",
);

// ✅ Read JSON safely in ESM
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

function parseDateMMDDYYYY(mmddyyyy) {
  const [mm, dd, yyyy] = mmddyyyy.split("-").map(Number);
  return admin.firestore.Timestamp.fromDate(
    new Date(Date.UTC(yyyy, mm - 1, dd)),
  );
}

async function main() {
  const videos = [
    {
      title: "Person-centred care",
      description:
        "Sunita takes care of her mum Priya who has dementia. She discusses person-centred care - an approach that encourages carers to see past the dementia and remember that it is still an individual you are caring for, with wants, feelings and preferences. She highlights the importance of remembering the person they were before and fostering the relationship you have with them.",
      durationText: "02:50",
      numOfViewed: 45,
      createdAt: parseDateMMDDYYYY("04-29-2024"),
      videoUrl: "",
      thumbnailUrl: "",
      module: 2,
    },
    {
      title: "Managing everyday responsibilities",
      description:
        "Donna is looking after her cousin Puti, who has dementia. She notices some of Puti's bills have gone unpaid, which is unlike her. Puti initially dismisses the matter, but Donna finds ways to involve her in the process so her bills get paid.",
      durationText: "02:48",
      numOfViewed: 51,
      createdAt: parseDateMMDDYYYY("03-10-2024"),
      videoUrl: "",
      thumbnailUrl: "",
      module: 2,
    },
    {
      title: "Preventing someone from getting lost",
      description:
        "Sandra cares for her husband Peter who has dementia, and has started to wander out of the house. Sandra discusses ways to keep him safe while still meeting his needs.",
      durationText: "03:00",
      numOfViewed: 38,
      createdAt: parseDateMMDDYYYY("07-18-2023"),
      videoUrl: "",
      thumbnailUrl: "",
      module: 3,
    },
    {
      title: "The importance of enjoyable activities for carers",
      description:
        "Michelle cares for her partner Sue, who has dementia. She highlights the importance of carers taking time out for themselves, discussing potential barriers and solutions to these barriers, as well as the benefits of taking time away to recharge.",
      durationText: "04:57",
      numOfViewed: 29,
      createdAt: parseDateMMDDYYYY("11-03-2023"),
      videoUrl: "",
      thumbnailUrl: "",
      module: 4,
    },
    {
      title: "Saying the wrong things in public",
      description:
        "Michelle cares for her partner Sue, who has dementia. She notices Sue starts to make uncharacteristically impolite remarks to others in public, and discusses ways to approach this issue and diffuse any frustration.",
      durationText: "02:25",
      numOfViewed: 18,
      createdAt: parseDateMMDDYYYY("10-30-2024"),
      videoUrl: "",
      thumbnailUrl: "",
      module: 4,
    },
    {
      title: "Creating a comfortable environment",
      description:
        "Vijay lives with his grandmother Priya, who has dementia. One day he gets home and puts on his favourite show, which agitates Priya. He discusses ways to make adjustments to meet everyone's needs while ensuring his grandmother is still comfortable.",
      durationText: "02:10",
      numOfViewed: 11,
      createdAt: parseDateMMDDYYYY("01-15-2024"),
      videoUrl: "",
      thumbnailUrl: "",
      module: 1,
    },
    {
      title: "Reframing negative thoughts",
      description:
        "Rob cares for his partner Philip, who has dementia. He discusses the importance of reframing negative thoughts into a positive mindset.",
      durationText: "03:25",
      numOfViewed: 14,
      createdAt: parseDateMMDDYYYY("12-18-2023"),
      videoUrl: "",
      thumbnailUrl: "",
      module: 4,
    },
  ];

  const col = db.collection("videos");

  for (const v of videos) {
    const docId = v.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

    await col.doc(docId).set(v, { merge: true });
    console.log("Seeded:", docId);
  }

  console.log("✅ Done seeding videos.");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
