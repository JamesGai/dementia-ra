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
import introduction211 from "./subsectionContent/module2/section2.1/introduction211.js";
import subsectionContent211 from "./subsectionContent/module2/section2.1/subsectionContent211.js";
import subsectionContent212 from "./subsectionContent/module2/section2.1/subsectionContent212.js";
import subsectionContent213 from "./subsectionContent/module2/section2.1/subsectionContent213.js";
import subsectionContent214 from "./subsectionContent/module2/section2.1/subsectionContent214.js";
import subsectionContent215 from "./subsectionContent/module2/section2.1/subsectionContent215.js";
import subsectionContent215Continued from "./subsectionContent/module2/section2.1/subsectionContent215Continued.js";
import review211 from "./subsectionContent/module2/section2.1/review211.js";
import introduction221 from "./subsectionContent/module2/section2.2/introduction221.js";
import subsectionContent221 from "./subsectionContent/module2/section2.2/subsectionContent221.js";
import subsectionContent222 from "./subsectionContent/module2/section2.2/subsectionContent222.js";
import subsectionContent223 from "./subsectionContent/module2/section2.2/subsectionContent223.js";
import subsectionContent224 from "./subsectionContent/module2/section2.2/subsectionContent224.js";
import subsectionContent225 from "./subsectionContent/module2/section2.2/subsectionContent225.js";
import subsectionContent226 from "./subsectionContent/module2/section2.2/subsectionContent226.js";
import subsectionContent227 from "./subsectionContent/module2/section2.2/subsectionContent227.js";
import subsectionContent228 from "./subsectionContent/module2/section2.2/subsectionContent228.js";
import review221 from "./subsectionContent/module2/section2.2/review221.js";
import introduction231 from "./subsectionContent/module2/section2.3/introduction231.js";
import introduction241 from "./subsectionContent/module2/section2.4/introduction241.js";
import introduction311 from "./subsectionContent/module3/section3.1/introduction311.js";
import introduction321 from "./subsectionContent/module3/section3.2/introduction321.js";
import introduction331 from "./subsectionContent/module3/section3.3/introduction331.js";
import introduction411 from "./subsectionContent/module4/section4.1/introduction411.js";
import introduction421 from "./subsectionContent/module4/section4.2/introduction421.js";
import introduction431 from "./subsectionContent/module4/section4.3/introduction431.js";
import introduction441 from "./subsectionContent/module4/section4.4/introduction441.js";
import introduction451 from "./subsectionContent/module4/section4.5/introduction451.js";
import introduction511 from "./subsectionContent/module5/section5.1/introduction511.js";
import introduction521 from "./subsectionContent/module5/section5.2/introduction521.js";
import introduction531 from "./subsectionContent/module5/section5.3/introduction531.js";
import introduction541 from "./subsectionContent/module5/section5.4/introduction541.js";
import introduction551 from "./subsectionContent/module5/section5.5/introduction551.js";
import introduction561 from "./subsectionContent/module5/section5.6/introduction561.js";
import introduction571 from "./subsectionContent/module5/section5.7/introduction571.js";
import introduction581 from "./subsectionContent/module5/section5.8/introduction581.js";
import introduction591 from "./subsectionContent/module5/section5.9/introduction591.js";
import introduction5101 from "./subsectionContent/module5/section5.10/introduction5101.js";

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

function contentDocument(
  content,
  moduleNumber,
  sectionNumber,
  subsectionNumber,
  options = {},
) {
  return {
    ...options,
    moduleNumber,
    sectionNumber,
    subsectionNumber,
    content: content.content,
    contentOnly: true,
  };
}

const subsectionContents = [
  contentDocument(introductionContent111, 1, 1, 1, {
    docId: "introduction-1.1.1",
  }),
  contentDocument(subsectionContent111, 1, 1, 1),
  contentDocument(subsectionContent112, 1, 1, 2),
  contentDocument(subsectionContent113, 1, 1, 3),
  contentDocument(subsectionContent114, 1, 1, 4),
  contentDocument(subsectionContent115, 1, 1, 5),
  contentDocument(subsectionContent116, 1, 1, 6),
  contentDocument(introduction121, 1, 2, 1, {
    docId: "introduction-1.2.1",
  }),
  contentDocument(subsectionContent121, 1, 2, 1),
  contentDocument(subsectionContent122, 1, 2, 2),
  contentDocument(introduction131, 1, 3, 1, {
    docId: "introduction-1.3.1",
  }),
  contentDocument(subsectionContent131, 1, 3, 1),
  contentDocument(subsectionContent132, 1, 3, 2),
  contentDocument(introduction141, 1, 4, 1, {
    docId: "introduction-1.4.1",
  }),
  contentDocument(subsectionContent141, 1, 4, 1),
  contentDocument(subsectionContent142, 1, 4, 2),
  contentDocument(subsectionContent143, 1, 4, 3),
  contentDocument(subsectionContent144, 1, 4, 4),
  contentDocument(subsectionContent145, 1, 4, 5),
  contentDocument(subsectionContent146, 1, 4, 6),
  contentDocument(subsectionContent147, 1, 4, 7),
  contentDocument(subsectionContent148, 1, 4, 8),
  contentDocument(introduction211, 2, 1, 1, {
    docId: "introduction-2.1.1",
  }),
  contentDocument(subsectionContent211, 2, 1, 1),
  contentDocument(subsectionContent212, 2, 1, 2),
  contentDocument(subsectionContent213, 2, 1, 3),
  contentDocument(subsectionContent214, 2, 1, 4),
  contentDocument(subsectionContent215, 2, 1, 5),
  contentDocument(subsectionContent215Continued, 2, 1, 5, {
    docId: "subsection-2.1.5-continued",
  }),
  contentDocument(review211, 2, 1, 1, {
    docId: "review-2.1.1",
  }),
  contentDocument(introduction221, 2, 2, 1, {
    docId: "introduction-2.2.1",
  }),
  contentDocument(subsectionContent221, 2, 2, 1),
  contentDocument(subsectionContent222, 2, 2, 2),
  contentDocument(subsectionContent223, 2, 2, 3),
  contentDocument(subsectionContent224, 2, 2, 4),
  contentDocument(subsectionContent225, 2, 2, 5),
  contentDocument(subsectionContent226, 2, 2, 6),
  contentDocument(subsectionContent227, 2, 2, 7),
  contentDocument(subsectionContent228, 2, 2, 8),
  contentDocument(review221, 2, 2, 1, {
    docId: "review-2.2.1",
  }),
  contentDocument(introduction231, 2, 3, 1, {
    docId: "introduction-2.3.1",
  }),
  contentDocument(introduction241, 2, 4, 1, {
    docId: "introduction-2.4.1",
  }),
  contentDocument(introduction311, 3, 1, 1, {
    docId: "introduction-3.1.1",
  }),
  contentDocument(introduction321, 3, 2, 1, {
    docId: "introduction-3.2.1",
  }),
  contentDocument(introduction331, 3, 3, 1, {
    docId: "introduction-3.3.1",
  }),
  contentDocument(introduction411, 4, 1, 1, {
    docId: "introduction-4.1.1",
  }),
  contentDocument(introduction421, 4, 2, 1, {
    docId: "introduction-4.2.1",
  }),
  contentDocument(introduction431, 4, 3, 1, {
    docId: "introduction-4.3.1",
  }),
  contentDocument(introduction441, 4, 4, 1, {
    docId: "introduction-4.4.1",
  }),
  contentDocument(introduction451, 4, 5, 1, {
    docId: "introduction-4.5.1",
  }),
  contentDocument(introduction511, 5, 1, 1, {
    docId: "introduction-5.1.1",
  }),
  contentDocument(introduction521, 5, 2, 1, {
    docId: "introduction-5.2.1",
  }),
  contentDocument(introduction531, 5, 3, 1, {
    docId: "introduction-5.3.1",
  }),
  contentDocument(introduction541, 5, 4, 1, {
    docId: "introduction-5.4.1",
  }),
  contentDocument(introduction551, 5, 5, 1, {
    docId: "introduction-5.5.1",
  }),
  contentDocument(introduction561, 5, 6, 1, {
    docId: "introduction-5.6.1",
  }),
  contentDocument(introduction571, 5, 7, 1, {
    docId: "introduction-5.7.1",
  }),
  contentDocument(introduction581, 5, 8, 1, {
    docId: "introduction-5.8.1",
  }),
  contentDocument(introduction591, 5, 9, 1, {
    docId: "introduction-5.9.1",
  }),
  contentDocument(introduction5101, 5, 10, 1, {
    docId: "introduction-5.10.1",
  }),
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
  const requiredFields = content.contentOnly
    ? ["moduleNumber", "sectionNumber", "content"]
    : ["moduleNumber", "sectionNumber", "title", "content"];

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
  const payload = content.contentOnly ? { content: content.content } : content;
  const ref = db
    .collection("course")
    .doc(courseId)
    .collection("module")
    .doc(moduleId)
    .collection("section")
    .doc(sectionId)
    .collection("subsection")
    .doc(subsectionId);

  await ref.set(payload, { merge: true });

  console.log(`Seeded ${subsectionId}: ${content.title ?? "content"}`);
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
