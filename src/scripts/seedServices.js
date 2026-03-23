// Execute: node src/scripts/seedServices.js

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

function generateKeywords(name, description) {
  const text = `${name} ${description}`.toLowerCase();

  return Array.from(
    new Set(
      text
        .replace(/[^\w\s]/g, "") // remove punctuation
        .split(/\s+/) // split by whitespace
        .filter((word) => word.length > 2), // ignore tiny words
    ),
  );
}

async function main() {
  // Actual medical services copied from e-DiVA website
  const services = [
    {
      name: "Dementia Tai Tokerau",
      description:
        "Provides support, education, information, and related services directly to those affected by dementia.",
      address: "112 Corks Road, Tikipunga, Whangārei",
      link: "https://dementiatai​tokerau.nz/",
      email: "info@dementiattt.nz",
      phone: "(09) 438 7771",
    },
    {
      name: "Alzheimers Whangārei",
      description:
        "Provides support, education, information, and related services for people affected by dementia.",
      address: "Suite 4, 236 Victoria Avenue, Whanganui",
      link: "https://alzheimers.org.nz/whanganui/",
      email: "admin@alzheimerswhanganui.org.nz",
      phone: "(06) 3458833",
    },
    {
      name: "Eldernet",
      description:
        "Provides information for older people and their support networks.",
      address: "175 Shaw Avenue, New Brighton, Christchurch 8083",
      link: "https://eldernet.co.nz/",
      email: "team@eldernet.co.nz",
      phone: "(03) 388 1204 / 0800 162 706",
    },
    {
      name: "Dementia Wellington",
      description:
        "Provides dementia support, advice and tools to improve quality of life.",
      address: "55 Hutt Road, Lower Hutt 5045",
      link: "https://dementia.nz/wellington/",
      email: "admin@dementiawellington.org.nz",
      phone: "(04) 972 2595",
    },
    {
      name: "Alzheimers South Canterbury",
      description:
        "Provides support, education, and services for people affected by dementia.",
      address: "Room 7, Community House, 27 Strathallan Street, Timaru",
      link: "https://alzheimers.org.nz/south-canterbury/",
      email: "southcanterbury@alzheimers.org.nz",
      phone: "(03) 687 7583",
    },
    {
      name: "Lifeline",
      description:
        "24/7 helpline providing confidential support and crisis services.",
      address: "95 Great South Road, Epsom, Auckland",
      link: "https://www.lifeline.org.nz/",
      email: "office@lifeline.org.nz",
      phone: "0800 543 354",
    },
    {
      name: "NASC - Auckland",
      description: "",
      address: "Greenlane Clinical Centre, Auckland 1142",
      link: "https://www.healthpoint.co.nz/public/older-peoples-health/needs-assessment/",
      email: "communityservices@adhb.govt.nz",
      phone: "09 631 1234",
    },
    {
      name: "Alzheimers Manawatu",
      description:
        "Provides support, education, and services for people affected by dementia.",
      address: "642 Featherston Street, Roslyn, Palmerston North",
      link: "https://alzheimersmanawatu.org/",
      email: "manawatu@alzman.org.nz",
      phone: "(06) 357 9539",
    },
    {
      name: "Alzheimers Otago",
      description:
        "Provides support, education, and services for people affected by dementia.",
      address: "Burns House, 10 George Street, Dunedin",
      link: "https://alzheimersotago.org.nz/",
      email: "still.me@alzheimersotago.org.nz",
      phone: "(03) 471 6154",
    },
    {
      name: "NASC - Canterbury/West Coast",
      description: "",
      address:
        "Older Persons Health, The Princess Margaret Hospital, Christchurch",
      link: "https://www.seniorline.org.nz/local-services/canterbury/",
      email: "communityreferralcentre@cdhb.health.nz",
      phone: "03 337 6925",
    },
    {
      name: "NASC - Lakes (Rotorua)",
      description: "",
      address: "2 Ranolf Street, Rotorua",
      link: "https://www.lakesdhb.govt.nz/",
      email: "nasc.admin@lakesdhb.govt.nz",
      phone: "07 343 1030",
    },
    {
      name: "Dementia Waikato",
      description:
        "Provides dementia support, advice and tools to improve quality of life.",
      address: "4 Tennyson Road, Hamilton",
      link: "https://dementia.nz/waikato/",
      email: "",
      phone: "(07) 929 4042",
    },
    {
      name: "Dementia Canterbury",
      description:
        "Provides dementia support, advice and tools to improve quality of life.",
      address: "BrainTree, Christchurch",
      link: "https://dementiacanterbury.org.nz/",
      email: "admin@dementiacanterbury.org.nz",
      phone: "0800 444 776",
    },
    {
      name: "Dementia Hawkes Bay Napier",
      description:
        "Provides dementia support, advice and tools to improve quality of life.",
      address: "1 Wilding Ave, Napier",
      link: "https://dementia.nz/hawkes-bay/",
      email: "admin@dementiahb.org.nz",
      phone: "(06) 8340417",
    },
    {
      name: "Alzheimers Northland - Kerikeri",
      description:
        "Provides support, education, and services for people affected by dementia.",
      address: "PO Box 355, Kerikeri",
      link: "https://alzheimersnorthland.org.nz/",
      email: "northland@alzheimers.org.nz",
      phone: "(09) 407 3010",
    },
    {
      name: "Alzheimers Gisborne/Tairāwhiti",
      description:
        "Provides dementia support, advice and tools to improve quality of life.",
      address: "Morris Adair Annex, Gisborne Hospital",
      link: "https://alzheimers.org.nz/gisborne/",
      email: "gisborne.alzheimers@xtra.co.nz",
      phone: "(06) 867 0752",
    },
    {
      name: "Alzheimers Eastern Bay of Plenty",
      description:
        "Provides support, education, and services for people affected by dementia.",
      address: "Lighting Hub, Whakatāne",
      link: "https://alzheimers.org.nz/eastern-bay-of-plenty/",
      email: "administration@alzebop.org",
      phone: "(07) 308 0525",
    },
    {
      name: "Dementia Hawkes Bay Hastings",
      description:
        "Provides dementia support, advice and tools to improve quality of life.",
      address: "102/106 Windsor Ave, Hastings",
      link: "https://dementia.nz/hawkes-bay/",
      email: "admin@dementiahb.org.nz",
      phone: "(06) 878 7502",
    },
    {
      name: "Alzheimers Wairarapa",
      description:
        "Provides support, education, and services for people affected by dementia.",
      address: "Solway Showgrounds, Masterton",
      link: "https://alzheimerswairarapa.co.nz/",
      email: "",
      phone: "(06) 377 7522",
    },
    {
      name: "NASC - Counties Manukau",
      description: "",
      address: "Middlemore Hospital, Auckland",
      link: "https://countiesmanukau.health.nz/",
      email: "DutyNasc@middlemore.co.nz",
      phone: "0800 262 368",
    },
    {
      name: "NASC - Southern Health",
      description: "",
      address: "Dunedin Hospital",
      link: "https://www.southernhealth.nz/",
      email: "",
      phone: "",
    },
    {
      name: "Dementia Lakes Rotorua",
      description:
        "Provides dementia support, advice and tools to improve quality of life.",
      address: "1290 Hinemoa Street, Rotorua",
      link: "https://dementia.nz/",
      email: "",
      phone: "(07) 377 4330",
    },
    {
      name: "Dementia Lakes Taupō/Tūrangi",
      description:
        "Provides dementia support, advice and tools to improve quality of life.",
      address: "129 Spa Road, Taupō",
      link: "https://dementia.nz/",
      email: "",
      phone: "(07) 377 4330",
    },
    {
      name: "Dementia Auckland",
      description:
        "Provides dementia support, advice and tools to improve quality of life.",
      address: "Auckland",
      link: "https://dementia.nz/auckland/",
      email: "info@dementiaauckland.org.nz",
      phone: "0800 433636",
    },
    {
      name: "Alzheimers Nelson/Tasman",
      description:
        "Provides support, education, and services for people affected by dementia.",
      address: "75 Tahunanui Drive, Nelson",
      link: "https://alzheimers.org.nz/nelson/",
      email: "admin@alzheimers.org.nz",
      phone: "(03) 546 7702",
    },
    {
      name: "Alzheimers Southland",
      description:
        "Provides support, education, and services for people affected by dementia.",
      address: "135 Yarrow Street, Invercargill",
      link: "https://alzheimers.org.nz/southland/",
      email: "office@alzheimerssocietysouthland.org.nz",
      phone: "(03) 214 0984",
    },
    {
      name: "Alzheimers Marlborough",
      description:
        "Provides support, education, and services for people affected by dementia.",
      address: "8 Wither Road, Blenheim",
      link: "https://alzheimers.org.nz/marlborough/",
      email: "office.marlb@alzheimers.org.nz",
      phone: "(03) 577 6172",
    },
  ];

  const col = db.collection("services");

  for (const s of services) {
    const docId = s.name
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

    const keywords = generateKeywords(s.name, s.description);

    await col.doc(docId).set(
      {
        ...s,
        keywords,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true },
    );

    console.log("Seeded:", docId);
  }

  console.log("✅ Done seeding services.");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
