import { parseCSV } from "./service";

const csv = `head 1,head 2,head 3
h1r1Content,h2r1Content,h3r1Content
h1r2Content,h2r2Content,h3r2Content`;
const csvNoHead = `h1r1Content,h2r1Content,h3r1Content
h1r2Content,h2r2Content,h3r2Content`;

const parsed = parseCSV(csv);
const parsedNoHead = parseCSV(csvNoHead);

test("parses csv", () => {
  expect(parsed).toStrictEqual({
    data: [
      {
        "head 1": "h1r1Content",
        "head 2": "h2r1Content",
        "head 3": "h3r1Content",
      },
      {
        "head 1": "h1r2Content",
        "head 2": "h2r2Content",
        "head 3": "h3r2Content",
      },
    ],
    errors: [],
    meta: {
      aborted: false,
      cursor: 92,
      delimiter: ",",
      fields: ["head 1", "head 2", "head 3"],
      linebreak: `
`,
      truncated: false,
    },
  });

  expect(parsedNoHead).toStrictEqual({
    data: [
      {
        h1r1Content: "h1r2Content",
        h2r1Content: "h2r2Content",
        h3r1Content: "h3r2Content",
      },
    ],
    errors: [],
    meta: {
      aborted: false,
      cursor: 71,
      delimiter: ",",
      fields: ["h1r1Content", "h2r1Content", "h3r1Content"],
      linebreak: `
`,
      truncated: false,
    },
  });
});
