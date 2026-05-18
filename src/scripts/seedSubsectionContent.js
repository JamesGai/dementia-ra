// Execute all: node src/scripts/seedSubsectionContent.js
// Execute course content: node src/scripts/seedSubsectionContent.js --subsection=1.1.1
// Execute introduction: node src/scripts/seedSubsectionContent.js --introduction=2.1.1
// Execute activity: node src/scripts/seedSubsectionContent.js --activity=2.1.1
// Execute review: node src/scripts/seedSubsectionContent.js --review=2.1.1

import admin from "firebase-admin";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import introductionContent111 from "./subsectionContent/module1/section1.1/introduction111.js";
import subsectionContent111 from "./subsectionContent/module1/section1.1/subsectionContent111.js";
import subsectionContent112 from "./subsectionContent/module1/section1.1/subsectionContent112.js";
import subsectionContent113 from "./subsectionContent/module1/section1.1/subsectionContent113.js";
import subsectionContent114 from "./subsectionContent/module1/section1.1/subsectionContent114.js";
import subsectionContent115 from "./subsectionContent/module1/section1.1/subsectionContent115.js";
import subsectionContent116 from "./subsectionContent/module1/section1.1/subsectionContent116.js";
import introduction121 from "./subsectionContent/module1/section1.2/introduction121.js";
import subsectionContent121 from "./subsectionContent/module1/section1.2/subsectionContent121.js";
import subsectionContent122 from "./subsectionContent/module1/section1.2/subsectionContent122.js";
import introduction131 from "./subsectionContent/module1/section1.3/introduction131.js";
import subsectionContent131 from "./subsectionContent/module1/section1.3/subsectionContent131.js";
import subsectionContent132 from "./subsectionContent/module1/section1.3/subsectionContent132.js";
import introduction141 from "./subsectionContent/module1/section1.4/introduction141.js";
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
  introductionContent111,
  subsectionContent111,
  subsectionContent112,
  subsectionContent113,
  subsectionContent114,
  subsectionContent115,
  subsectionContent116,
  introduction121,
  subsectionContent121,
  subsectionContent122,
  introduction131,
  subsectionContent131,
  subsectionContent132,
  introduction141,
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
  const subsectionArg = argv.find((arg) => arg.startsWith("--subsection="));
  const introductionArg = argv.find((arg) => arg.startsWith("--introduction="));
  const activityArg = argv.find((arg) => arg.startsWith("--activity="));
  const reviewArg = argv.find((arg) => arg.startsWith("--review="));

  return {
    subsection: subsectionArg
      ? subsectionArg.replace("--subsection=", "")
      : null,
    introduction: introductionArg
      ? introductionArg.replace("--introduction=", "")
      : null,
    activity: activityArg ? activityArg.replace("--activity=", "") : null,
    review: reviewArg ? reviewArg.replace("--review=", "") : null,
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
  const { moduleNumber, sectionNumber, subsectionNumber } = content;
  return `${moduleNumber}.${sectionNumber}.${subsectionNumber}`;
}

function getContentDocId(content) {
  return getSubsectionPath(content).subsectionId;
}

function getRequestedDocId(type, value) {
  return `${type}-${value}`;
}

function getRequestedContentFilter(args) {
  const requested = [
    args.subsection,
    args.introduction,
    args.activity,
    args.review,
  ].filter(Boolean);

  if (requested.length > 1) {
    throw new Error(
      "Use only one content filter: --subsection, --introduction, --activity, or --review.",
    );
  }

  if (args.subsection) {
    const docId = getRequestedDocId("subsection", args.subsection);
    return {
      label: `--subsection=${args.subsection}`,
      matches: (content) =>
        (!content.docId && getContentKey(content) === args.subsection) ||
        getContentDocId(content) === docId,
    };
  }

  for (const type of ["introduction", "activity", "review"]) {
    if (args[type]) {
      const docId = getRequestedDocId(type, args[type]);
      return {
        label: `--${type}=${args[type]}`,
        matches: (content) => getContentDocId(content) === docId,
      };
    }
  }

  return null;
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
  const args = parseArgs(process.argv.slice(2));
  const contentFilter = getRequestedContentFilter(args);
  let contentsToSeed = subsectionContents;

  if (contentFilter) {
    contentsToSeed = contentsToSeed.filter(contentFilter.matches);
  }

  if (contentFilter && contentsToSeed.length === 0) {
    throw new Error(`No subsection content found for ${contentFilter.label}`);
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
