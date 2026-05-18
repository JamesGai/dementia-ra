// Execute all: node src/scripts/seedSubsectionContent.js
// Execute one: node src/scripts/seedSubsectionContent.js --only=1.1.0

import admin from "firebase-admin";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import introductionContent11 from "./subsectionContent/introductionContent11.js";
import subsectionContent111 from "./subsectionContent/subsectionContent111.js";
import subsectionContent112 from "./subsectionContent/subsectionContent112.js";
import subsectionContent113 from "./subsectionContent/subsectionContent113.js";
import subsectionContent114 from "./subsectionContent/subsectionContent114.js";
import subsectionContent115 from "./subsectionContent/subsectionContent115.js";
import subsectionContent116 from "./subsectionContent/subsectionContent116.js";
import subsectionContent120 from "./subsectionContent/subsectionContent120.js";
import subsectionContent121 from "./subsectionContent/subsectionContent121.js";
import subsectionContent122 from "./subsectionContent/subsectionContent122.js";
import subsectionContent130 from "./subsectionContent/subsectionContent130.js";
import subsectionContent131 from "./subsectionContent/subsectionContent131.js";
import subsectionContent132 from "./subsectionContent/subsectionContent132.js";
import subsectionContent140 from "./subsectionContent/subsectionContent140.js";
import subsectionContent141 from "./subsectionContent/subsectionContent141.js";
import subsectionContent142 from "./subsectionContent/subsectionContent142.js";
import subsectionContent143 from "./subsectionContent/subsectionContent143.js";
import subsectionContent144 from "./subsectionContent/subsectionContent144.js";
import subsectionContent145 from "./subsectionContent/subsectionContent145.js";
import subsectionContent146 from "./subsectionContent/subsectionContent146.js";
import subsectionContent147 from "./subsectionContent/subsectionContent147.js";
import subsectionContent148 from "./subsectionContent/subsectionContent148.js";

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
const courseId = "isupport-nz";

const subsectionContents = [
  introductionContent11,
  subsectionContent111,
  subsectionContent112,
  subsectionContent113,
  subsectionContent114,
  subsectionContent115,
  subsectionContent116,
  subsectionContent120,
  subsectionContent121,
  subsectionContent122,
  subsectionContent130,
  subsectionContent131,
  subsectionContent132,
  subsectionContent140,
  subsectionContent141,
  subsectionContent142,
  subsectionContent143,
  subsectionContent144,
  subsectionContent145,
  subsectionContent146,
  subsectionContent147,
  subsectionContent148,
];

function parseArgs(argv) {
  const onlyArg = argv.find((arg) => arg.startsWith("--only="));

  return {
    only: onlyArg ? onlyArg.replace("--only=", "") : null,
  };
}

function getSubsectionPath(content) {
  const { moduleNumber, sectionNumber, subsectionNumber } = content;

  return {
    moduleId: `module-${moduleNumber}`,
    sectionId: `section-${moduleNumber}.${sectionNumber}`,
    subsectionId: `subsection-${moduleNumber}.${sectionNumber}.${subsectionNumber}`,
  };
}

function getContentKey(content) {
  const { moduleNumber, sectionNumber, subsectionNumber } = content;
  return `${moduleNumber}.${sectionNumber}.${subsectionNumber}`;
}

function validateContent(content) {
  const key = getContentKey(content);
  const requiredFields = [
    "moduleNumber",
    "sectionNumber",
    "subsectionNumber",
    "title",
    "content",
  ];

  for (const field of requiredFields) {
    if (content[field] === undefined) {
      throw new Error(`Missing ${field} in subsection ${key}`);
    }
  }

  if (!Array.isArray(content.content)) {
    throw new Error(`Expected content array in subsection ${key}`);
  }
}

async function seedSubsectionContent(content) {
  validateContent(content);

  const { moduleId, sectionId, subsectionId } = getSubsectionPath(content);
  const ref = db
    .collection("course")
    .doc(courseId)
    .collection("module")
    .doc(moduleId)
    .collection("section")
    .doc(sectionId)
    .collection("subsection")
    .doc(subsectionId);

  await ref.set(content, { merge: true });

  console.log(`Seeded ${subsectionId}: ${content.title}`);
}

async function main() {
  const { only } = parseArgs(process.argv.slice(2));
  const contentsToSeed = only
    ? subsectionContents.filter((content) => getContentKey(content) === only)
    : subsectionContents;

  if (only && contentsToSeed.length === 0) {
    throw new Error(`No subsection content found for --only=${only}`);
  }

  for (const content of contentsToSeed) {
    await seedSubsectionContent(content);
  }

  console.log(
    `Done seeding ${contentsToSeed.length} subsection content file(s).`,
  );
  process.exit(0);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
