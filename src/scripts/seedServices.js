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
  const services = [
    {
      name: "NASC - Northland",
      description: "",
      address:
        "Health of Older People, Te Whatu Ora Te Tai Tokerau, Northland DHB, Private Bag 9742",
      link: "https://www.seniorline.org.nz/local-services/northland/",
      email: "nasc@northlanddhb.org.nz",
      phone: "09 430 4131 or 0800 88 88 90",
    },
    {
      name: "NASC - Capital and Coast (Capital and Coast Care Coordination Centre)",
      description: "",
      address: "PO Box 50-544, Porirua 5240 Level 1, 13 Marina View, Mana 5026",
      link: "https://www.seniorline.org.nz/local-services/capital-and-coast/",
      email: "wellington@careco.org.nz",
      phone: "04 238 2020 or 0800 282 200",
    },
    {
      name: "NASC - Southland (Southland Care Coordination Centre)",
      description: "",
      address:
        "Southland District Health Board (Southland), Kew Road, PO Box 828, Invercargill 9812",
      link: "https://www.healthpoint.co.nz/public/older-peoples-health/needs-assessment-care-coordination-southland/",
      email: "CareCoordinationSTH@southerndhb.govt.nz",
      phone: "0800 223 225 or 03 214 5725",
    },
    {
      name: "0508 TAUTOKO Suicide Crisis Helpline",
      description:
        "A free, nationwide service available 24 hours a day, 7 days a week. TAUTOKO is operated by trained and experienced social service practitioners who have undergone suicide prevention training. If you think you, or someone you know, may be thinking about suicide, call the Suicide Crisis Helpline for support. If either you, or someone you know, is in immediate danger, please call emergency services immediately on 111.",
      address: "95 Great South Road, Epsom, Auckland, 1051",
      link: "https://www.lifeline.org.nz/services/suicide-crisis-helpline",
      email: "office@lifeline.org.nz",
      phone: "0508 828 865",
    },
    {
      name: "Alzheimers Tauranga/Western Bay of Plenty",
      description:
        "Alzheimers Tauranga/Western Bay of Plenty provides support, education, information, and related services directly to those affected by dementia mate wareware.",
      address: "116 Thirteenth Avenue, Tauranga 3112",
      link: "https://alzheimers.org.nz/tauranga/",
      email: "tauranga@alzheimers.org.nz",
      phone: "(07) 577 6344",
    },
    {
      name: "Alzheimers Taranaki",
      description:
        "Alzheimers Taranaki provides support, education, information, and related services directly to those affected by dementia mate wareware.",
      address: "14 Manakohi St, Spotswood, New Plymouth 4310",
      link: "https://alzheimers.org.nz/taranaki/",
      email: "admin.taranaki@alzheimers.org.nz",
      phone: "(06) 769-6916",
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
