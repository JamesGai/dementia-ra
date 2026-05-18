## Core seed scripts

These scripts seed the top-level app data that subsection title and content
scripts build on. Keep `serviceAccountKey.json` in the project root before
running any seed script.

### Modules and sections

Purpose: creates the iSupport NZ course module documents and their section
documents.

Firestore target:

```text
course/isupport-nz/module/module-{moduleNumber}
course/isupport-nz/module/module-{moduleNumber}/section/section-{moduleNumber}.{sectionNumber}
```

The script also generates basic search keywords from each section title.

Run:

```sh
node src/scripts/seedModulesAndSections.js
```

Run this before subsection title or subsection content scripts if the course
structure has not been created yet.

### Services

Purpose: creates support service directory entries, including name,
description, address, link, email, phone, generated keywords, and `createdAt`.

Firestore target:

```text
services/{service-name-slug}
```

Run:

```sh
node src/scripts/seedServices.js
```

Use this when the services list changes or when initializing a fresh Firestore
database.

### Videos

Purpose: creates video directory entries, including title, description,
duration, view count, created date, video URL, module number, and generated
keywords.

Firestore target:

```text
videos/{video-title-slug}
```

Run:

```sh
node src/scripts/seedVideos.js
```

Use this when the video list changes or when initializing a fresh Firestore
database.

## Subsection titles

Use subsection title files when you only need to create or update subsection
documents with their title metadata.

Data files live in `src/scripts/subsectionTitles`.

Each `subsectionTitles*.js` file exports the titles for one section:

```js
const subsectionTitles11 = {
  moduleNumber: 1,
  sectionNumber: 1,
  subsections: [
    {
      subsectionNumber: 0,
      displayOrder: 0,
      title: "Why is this section important?",
    },
    {
      subsectionNumber: 1,
      displayOrder: 1,
      title: "What is dementia?",
    },
  ],
};

export default subsectionTitles11;
```

After adding a new title data file, import it in
`src/scripts/seedSubsectionTitles.js` and add it to the
`subsectionTitleSections` array.

Seed all subsection titles:

```sh
npm run seed:subsection-titles
```

Seed one section:

```sh
npm run seed:subsection-titles -- --section=1.1
```

Seed one subsection title:

```sh
npm run seed:subsection-titles -- --only=1.1.0
```

For non-course items such as `Activity` or review rows, set
`isCourseSubsection: false` and do not set `subsectionNumber`. These rows still
inherit the section's real `moduleNumber` and `sectionNumber`, but the app will
not display a number prefix or count them in course progress. Set `docId`, such
as `activity-2.1.1` or `review-2.1.1`, so Firestore has a stable document ID.

Use `displayOrder` to control the order shown in the app. This is important for
sections such as `2.1`, where unnumbered Activity rows appear between numbered
course rows.

Seed section `2.1` title data:

```sh
npm run seed:subsection-titles -- --section=2.1
```

## Delete subsections in a section

Use this when you want to remove every subsection document under one section
before reseeding that section.

Firestore target:

```text
course/isupport-nz/module/module-{moduleNumber}/section/section-{moduleNumber}.{sectionNumber}/subsection/*
```

Delete all subsection documents in one section:

```sh
npm run delete:section-subsections -- --section=2.1
```

Then reseed the section's titles and content as needed:

```sh
npm run seed:subsection-titles -- --section=2.1
npm run seed:subsection-content -- --only=2.1.0
```

## Subsection content

Use subsection content files when you need to add or update the body content
shown inside a subsection.

Data files live in `src/scripts/subsectionContent`.

Each `subsectionContent*.js` file exports one plain object:

```js
const subsectionContent110 = {
  moduleNumber: 1,
  sectionNumber: 1,
  subsectionNumber: 0,
  title: "Why is this section important?",
  content: [
    { type: "heading", text: "Why is this section important?" },
    { type: "paragraph", text: "..." },
  ],
};

export default subsectionContent110;
```

After adding a new content data file, import it in
`src/scripts/seedSubsectionContent.js` and add it to the `subsectionContents`
array.

Seed all subsection content:

```sh
npm run seed:subsection-content
```

Seed one subsection content document:

```sh
npm run seed:subsection-content -- --only=1.1.0
```
