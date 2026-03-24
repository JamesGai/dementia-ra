// Execute: node src/scripts/seedVideos.js

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

function generateKeywords(title, description) {
  const text = `${title} ${description}`.toLowerCase();

  return Array.from(
    new Set(
      text
        .replace(/[^\w\s]/g, "") // remove punctuation
        .split(/\s+/) // split by whitespace
        .filter((word) => word.length > 2), // ignore short words
    ),
  );
}

async function main() {
  const videos = [
    {
      title: "Person-centred care",
      description:
        "Sunita takes care of her mum Priya who has dementia. She discusses person-centred care - an approach that encourages carers to see past the dementia and remember that it is still an individual you are caring for, with wants, feelings and preferences. She highlights the importance of remembering the person they were before and fostering the relationship you have with them.",
      durationText: "02:50",
      numOfViewed: 52,
      createdAt: parseDateMMDDYYYY("04-29-2024"),
      videoUrl: "",
      module: 2,
    },
    {
      title: "Managing everyday responsibilities",
      description:
        "Donna is looking after her cousin Puti, who has dementia. She notices some of Puti's bills have gone unpaid, which is unlike her. Puti initially dismisses the matter, but Donna finds ways to involve her in the process so her bills get paid.",
      durationText: "02:48",
      numOfViewed: 57,
      createdAt: parseDateMMDDYYYY("04-29-2024"),
      videoUrl: "",
      module: 2,
    },
    {
      title: "Preventing someone from getting lost",
      description:
        "Sandra cares for her husband Peter who has dementia, and has started to wander out of the house. Sandra discusses ways to keep him safe while still meeting his needs.",
      durationText: "03:00",
      numOfViewed: 42,
      createdAt: parseDateMMDDYYYY("04-29-2024"),
      videoUrl: "",
      module: 2,
    },
    {
      title: "The importance of enjoyable activities for carers",
      description:
        "Michelle cares for her partner Sue, who has dementia. She highlights the importance of carers taking time out for themselves, discussing potential barriers and solutions to these barriers, as well as the benefits of taking time away to recharge.",
      durationText: "04:57",
      numOfViewed: 29,
      createdAt: parseDateMMDDYYYY("04-29-2024"),
      videoUrl: "",
      module: 2,
    },
    {
      title: "Saying the wrong things in public",
      description:
        "Michelle cares for her partner Sue, who has dementia. She notices Sue starts to make uncharacteristically impolite remarks to others in public, and discusses ways to approach this issue and diffuse any frustration.",
      durationText: "02:25",
      numOfViewed: 18,
      createdAt: parseDateMMDDYYYY("04-29-2024"),
      videoUrl: "",
      module: 2,
    },
    {
      title: "Creating a comfortable environment",
      description:
        "Vijay lives with his grandmother Priya, who has dementia. One day he gets home and puts on his favourite show, which agitates Priya. He discusses ways to make adjustments to meet everyone's needs while ensuring his grandmother is still comfortable.",
      durationText: "02:10",
      numOfViewed: 12,
      createdAt: parseDateMMDDYYYY("04-29-2024"),
      videoUrl: "",
      module: 2,
    },
    {
      title: "Reframing negative thoughts",
      description:
        "Rob cares for his partner Philip, who has dementia. He discusses the importance of reframing negative thoughts into a positive mindset.",
      durationText: "03:25",
      numOfViewed: 16,
      createdAt: parseDateMMDDYYYY("04-29-2024"),
      videoUrl: "",
      module: 2,
    },
    {
      title: "Involving family & friends in your caring activities",
      description:
        "Mele cares for her mum who has dementia. She discusses how involving family and friends around her can lighten her workload, allowing herself more time to tend to other responsibilities.",
      durationText: "03:28",
      numOfViewed: 12,
      createdAt: parseDateMMDDYYYY("04-29-2024"),
      videoUrl: "",
      module: 2,
    },
    {
      title: "Supported decision making",
      description:
        "Sunita cares for her mum Priya, who has dementia. Priya gets overwhelmed making decisions about renting or selling her family home, so together they explore ways to support her in making these big decisions.",
      durationText: "05:45",
      numOfViewed: 5,
      createdAt: parseDateMMDDYYYY("04-29-2024"),
      videoUrl: "",
      module: 2,
    },
    {
      title: "Intimate relationships",
      description:
        "David cares for his wife Olivia, who has younger-onset dementia. The progression of Olivia's dementia has changed the nature of their relationship, and this video follows the couple as they navigate these changes together.",
      durationText: "04:09",
      numOfViewed: 11,
      createdAt: parseDateMMDDYYYY("04-29-2024"),
      videoUrl: "",
      module: 2,
    },
    {
      title: "Understanding changes in behaviour",
      description:
        "Kath cares for her husband Harry, who has dementia. She notices an increase in agitation in his responses, which isn't usually like him. She explores ways to identify what triggers this response and how to prevent him from getting frustrated so easily.",
      durationText: "03:58",
      numOfViewed: 6,
      createdAt: parseDateMMDDYYYY("04-29-2024"),
      videoUrl: "",
      module: 2,
    },
    {
      title: "Addressing difficulty with eating",
      description:
        "Rick cares for his wife Maggie, who has dementia. She starts to have trouble swallowing her food, so Rick makes some changes to ensure she can eat safely.",
      durationText: "02:54",
      numOfViewed: 8,
      createdAt: parseDateMMDDYYYY("04-29-2024"),
      videoUrl: "",
      module: 2,
    },
    {
      title: "Respectful and effective communication",
      description:
        "Dave cares for his mother Rose, who has dementia. She sometimes has trouble communicating what she wants to say, which can result in muddled words and partial sentences. This can be frustrating in conversation, so Dave discusses ways to understand what it is she's trying to say without treating her like a child or being dismissive.",
      durationText: "03:47",
      numOfViewed: 19,
      createdAt: parseDateMMDDYYYY("04-29-2024"),
      videoUrl: "",
      module: 2,
    },
    {
      title: "Health conditions affecting eating and drinking",
      description:
        "Neil cares for his dad Don, who has dementia. He notices his dad stops eating properly, refusing even his favourite foods. Upon finding that Don's dentures were causing him discomfort, Neil highlights the need be aware of any health conditions affecting eating patterns, especially because his dad was unable to communicate the issue himself.",
      durationText: "01:55",
      numOfViewed: 3,
      createdAt: parseDateMMDDYYYY("04-29-2024"),
      videoUrl: "",
      module: 2,
    },
    {
      title: "Supporting someone with memory loss",
      description:
        "Aroha visits her mum Puti, and notices she has almost no food in her kitchen, which is unlike her. She puts this unusual behaviour down to memory loss, and discusses some ways she can help her mum remember to shop.",
      durationText: "03:15",
      numOfViewed: 9,
      createdAt: parseDateMMDDYYYY("04-29-2024"),
      videoUrl: "",
      module: 2,
    },
    {
      title: "Independent living and services",
      description:
        "Maliya discusses the support available to help those living with dementia and their carers.",
      durationText: "03:46",
      numOfViewed: 2,
      createdAt: parseDateMMDDYYYY("04-30-2024"),
      videoUrl: "",
      module: 2,
    },
    {
      title: "Incontinence",
      description:
        "Vivienne lives her mother in law Shirley, who has dementia and has recently started struggling with incontinence. They visit their GP for some advice on how to handle this issue.",
      durationText: "02:48",
      numOfViewed: 6,
      createdAt: parseDateMMDDYYYY("05-01-2024"),
      videoUrl: "",
      module: 2,
    },
    {
      title: "Losing interest in daily activities",
      description:
        "Maliya cares for her husband George, who has dementia and has recently lost interest in daily activities. She finds new ways to motivate him to do things like he used to.",
      durationText: "02:42",
      numOfViewed: 0,
      createdAt: parseDateMMDDYYYY("04-30-2024"),
      videoUrl: "",
      module: 2,
    },
    {
      title: "The importance of hearing and vision in social engagement",
      description:
        "Kath cares for her husband Harry, who has dementia. She notices he has difficulty engaging in social situations, and checkups reveal that he needs hearing aids and a stronger prescription for his glasses. Following these changes he resumes his usual ability to socialise in groups.",
      durationText: "04:27",
      numOfViewed: 3,
      createdAt: parseDateMMDDYYYY("04-30-2024"),
      videoUrl: "",
      module: 2,
    },
    {
      title: "Responding to anger",
      description:
        "Neil cares for his father Don, who has dementia. When Don responds to Neil's suggestions with anger, he tries his best to understand what might've caused such a strong response and finds alternative approaches.",
      durationText: "02:49",
      numOfViewed: 2,
      createdAt: parseDateMMDDYYYY("05-01-2024"),
      videoUrl: "",
      module: 2,
    },
    {
      title: "Adapting tasks to changing abilities",
      description:
        "Mele cares for her mother Sia, who has dementia. They used to cook together at dinner time, but lately her mum has just been getting in the way; dropping things and getting easily confused. Mele finds alternative ways for her mum to help her in a way that suits her changing abilities, so that she can still be involved.",
      durationText: "02:38",
      numOfViewed: 1,
      createdAt: parseDateMMDDYYYY("04-30-2024"),
      videoUrl: "",
      module: 2,
    },
    {
      title: "Mistaking somebody for someone else",
      description:
        "Dave cares for his mother Rose, who has dementia and has recently started mistaking strangers for family members. Dave discusses ways to navigate this situation when it happens.",
      durationText: "02:43",
      numOfViewed: 0,
      createdAt: parseDateMMDDYYYY("04-30-2024"),
      videoUrl: "",
      module: 2,
    },
    {
      title: "Substitute decision making",
      description:
        "Salma details the process of becoming the substitute decision maker for her father Yusef, who has dementia and needs assistance in making decisions himself.",
      durationText: "05:33",
      numOfViewed: 2,
      createdAt: parseDateMMDDYYYY("04-30-2024"),
      videoUrl: "",
      module: 2,
    },
    {
      title: "Personal hygiene and dressing",
      description:
        "Rob cares for his partner Phillip, who has dementia. Upon getting ready to go out for an appointment, he discovers Phillip unshowered and wearing dirty clothes he hasn't put on properly. Rob discusses ways to help Phillip with his personal hygiene and dressing without taking over too much.",
      durationText: "03:39",
      numOfViewed: 2,
      createdAt: parseDateMMDDYYYY("04-30-2024"),
      videoUrl: "",
      module: 2,
    },
    {
      title: "Apathy",
      description:
        "Yong cares for his wife Li, who has dementia and has recently lost interest in doing things. He finds new ways to spend time with her and make sure she's participating in meaningful activities for her wellbeing.",
      durationText: "02:39",
      numOfViewed: 0,
      createdAt: parseDateMMDDYYYY("04-30-2024"),
      videoUrl: "",
      module: 2,
    },
    {
      title: "Support services at home",
      description:
        "Neil discusses the different support services available to carers, to help lighten their workload and maintain their wellbeing.",
      durationText: "03:13",
      numOfViewed: 7,
      createdAt: parseDateMMDDYYYY("04-30-2024"),
      videoUrl: "",
      module: 2,
    },
    {
      title: "Waking up in the middle of the night",
      description:
        "Kim cares for her mum Ann, who has dementia and has been waking her up during the night recently. She makes adjustments to her mum's routine to help her sleep through the night more consistently.",
      durationText: "03:04",
      numOfViewed: 4,
      createdAt: parseDateMMDDYYYY("04-30-2024"),
      videoUrl: "",
      module: 2,
    },
    {
      title: "Responding to worrying changes in behaviour",
      description:
        "Mary cares for her husband Joe, who has dementia. She starts noticing some worrying changes in his behaviour, such as hiding his valuables and becoming more verbally and physically aggressive. Mary discusses understanding the feelings that could be causing this behaviour, and provides some resources that can help provide carers with the support they need.",
      durationText: "04:23",
      numOfViewed: 0,
      createdAt: parseDateMMDDYYYY("04-29-2024"),
      videoUrl: "",
      module: 2,
    },
    {
      title: "Inappropriate sexual advances",
      description:
        "Sandra cares for her husband Peter, who has dementia. She is shocked when she finds that he's made inappropriate sexual advances to his new community care worker, which is unusual behaviour for him. She finds help to understand the causes of this behaviour and finds ways to prevent it from happening again.",
      durationText: "04:27",
      numOfViewed: 2,
      createdAt: parseDateMMDDYYYY("04-30-2024"),
      videoUrl: "",
      module: 2,
    },
    {
      title: "Uncharacteristic changes in behaviour",
      description:
        "Michelle cares foir her partner Sue, who has dementia. She's noticed Sue tends to stay in her pyjamas all day and doesn't want to do much, which is not like her. Michelle finds ways to help Sue want to get dressed for the day and engage in more activities.",
      durationText: "02:10",
      numOfViewed: 0,
      createdAt: parseDateMMDDYYYY("04-29-2024"),
      videoUrl: "",
      module: 2,
    },
    {
      title: "Concerns about driving",
      description:
        "Lara sees her neighbour Valerie, who has dementia, almost get into an accident while driving. She finds ways to suggest other options for transport without upsetting Valerie, in the interest of safety.",
      durationText: "04:43",
      numOfViewed: 3,
      createdAt: parseDateMMDDYYYY("05-01-2024"),
      videoUrl: "",
      module: 2,
    },
    {
      title: "Carer support",
      description: "Aida discusses the resources available to support carers.",
      durationText: "04:38",
      numOfViewed: 4,
      createdAt: parseDateMMDDYYYY("04-30-2024"),
      videoUrl: "",
      module: 2,
    },
    {
      title: "Preventing dehydration",
      description:
        "Yong cares for his wife Li, who has dementia. After she passes out from dehydration, he discusses ways to prevent this from happening again.",
      durationText: "02:16",
      numOfViewed: 2,
      createdAt: parseDateMMDDYYYY("05-01-2024"),
      videoUrl: "",
      module: 2,
    },
    {
      title: "Supporting someone to eat safely",
      description:
        "Aida cares for her brother Moses, who has dementia. One day she went out to the shops and came home to find him trying to eat the flowers on table top, then remembering she didn't feed him a proper breakfast. She seeks advice on how to make sure he doesn't eat things he shouldn't.",
      durationText: "02:23",
      numOfViewed: 1,
      createdAt: parseDateMMDDYYYY("05-01-2024"),
      videoUrl: "",
      module: 2,
    },
    {
      title: "Younger onset dementia",
      description:
        "Ian has younger onset dementia. He and his family discuss the unique challenges that come with having dementia at his age, and the adjustments he and his family are making to accommodate these changes. They also explore the different resources and groups available to support Ian and his family through his journey.",
      durationText: "05:15",
      numOfViewed: 4,
      createdAt: parseDateMMDDYYYY("04-30-2024"),
      videoUrl: "",
      module: 2,
    },
    {
      title: "Relaxation for carers",
      description: "Kim walks through some relaxation techniques for carers.",
      durationText: "09:18",
      numOfViewed: 4,
      createdAt: parseDateMMDDYYYY("06-03-2024"),
      videoUrl: "",
      module: 2,
    },
    {
      title: "Difficulty sleeping",
      description:
        "Grace helps to care for her nan Rosie, who has dementia. Her nan has trouble sleeping through the night, so her family learns how to adjust her routine to encourage healthier sleeping habits.",
      durationText: "02:29",
      numOfViewed: 6,
      createdAt: parseDateMMDDYYYY("04-29-2024"),
      videoUrl: "",
      module: 2,
    },
  ];

  const col = db.collection("videos");

  for (const v of videos) {
    const docId = v.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

    const keywords = generateKeywords(v.title, v.description);

    await col.doc(docId).set(
      {
        ...v,
        keywords,
      },
      { merge: true },
    );
    console.log("Seeded:", docId);
  }

  console.log("✅ Done seeding videos.");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
