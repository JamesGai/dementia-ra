// Execute all: node src/scripts/seedSubsectionContent.js
// Execute one: node src/scripts/seedSubsectionContent.js --only=1.1.1
// Execute introductions: node src/scripts/seedSubsectionContent.js --introductions

import admin from "firebase-admin";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import introductionContent11 from "./subsectionContent/module1/section1.1/introduction11.js";
import subsectionContent111 from "./subsectionContent/module1/section1.1/subsectionContent111.js";
import subsectionContent112 from "./subsectionContent/module1/section1.1/subsectionContent112.js";
import subsectionContent113 from "./subsectionContent/module1/section1.1/subsectionContent113.js";
import subsectionContent114 from "./subsectionContent/module1/section1.1/subsectionContent114.js";
import subsectionContent115 from "./subsectionContent/module1/section1.1/subsectionContent115.js";
import subsectionContent116 from "./subsectionContent/module1/section1.1/subsectionContent116.js";
import introduction12 from "./subsectionContent/module1/section1.2/introduction12.js";
import subsectionContent121 from "./subsectionContent/module1/section1.2/subsectionContent121.js";
import subsectionContent122 from "./subsectionContent/module1/section1.2/subsectionContent122.js";
import introduction13 from "./subsectionContent/module1/section1.3/introduction13.js";
import subsectionContent131 from "./subsectionContent/module1/section1.3/subsectionContent131.js";
import subsectionContent132 from "./subsectionContent/module1/section1.3/subsectionContent132.js";
import introduction14 from "./subsectionContent/module1/section1.4/introduction14.js";
import subsectionContent141 from "./subsectionContent/module1/section1.4/subsectionContent141.js";
import subsectionContent142 from "./subsectionContent/module1/section1.4/subsectionContent142.js";
import subsectionContent143 from "./subsectionContent/module1/section1.4/subsectionContent143.js";
import subsectionContent144 from "./subsectionContent/module1/section1.4/subsectionContent144.js";
import subsectionContent145 from "./subsectionContent/module1/section1.4/subsectionContent145.js";
import subsectionContent146 from "./subsectionContent/module1/section1.4/subsectionContent146.js";
import subsectionContent147 from "./subsectionContent/module1/section1.4/subsectionContent147.js";
import subsectionContent148 from "./subsectionContent/module1/section1.4/subsectionContent148.js";

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
  introduction12,
  subsectionContent121,
  subsectionContent122,
  introduction13,
  subsectionContent131,
  subsectionContent132,
  introduction14,
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
    introductions: argv.includes("--introductions"),
  };
}

function getSubsectionPath(content) {
  const { moduleNumber, sectionNumber, subsectionNumber, docId } = content;

  return {
    moduleId: `module-${moduleNumber}`,
    sectionId: `section-${moduleNumber}.${sectionNumber}`,
    subsectionId:
      docId ??
      `subsection-${moduleNumber}.${sectionNumber}.${subsectionNumber}`,
  };
}

function getContentKey(content) {
  if (content.docId) {
    return content.docId;
  }

  const { moduleNumber, sectionNumber, subsectionNumber } = content;
  return `${moduleNumber}.${sectionNumber}.${subsectionNumber}`;
}

function validateContent(content) {
  const key = getContentKey(content);
  const requiredFields = ["moduleNumber", "sectionNumber", "title", "content"];

  for (const field of requiredFields) {
    if (content[field] === undefined) {
      throw new Error(`Missing ${field} in subsection ${key}`);
    }
  }

  if (!Array.isArray(content.content)) {
    throw new Error(`Expected content array in subsection ${key}`);
  }

  if (!content.docId && content.subsectionNumber === undefined) {
    throw new Error(`Missing subsectionNumber or docId in subsection ${key}`);
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
  const { only, introductions } = parseArgs(process.argv.slice(2));
  let contentsToSeed = subsectionContents;

  if (only) {
    contentsToSeed = contentsToSeed.filter(
      (content) => getContentKey(content) === only,
    );
  }

  if (introductions) {
    contentsToSeed = contentsToSeed.filter((content) =>
      content.docId?.startsWith("introduction-"),
    );
  }

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
