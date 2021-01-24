import {
  parseCSV,
  parsedCSVHasExactHeader,
  removeExactHeader,
} from "./service";

const head = ["head1", "head2", "head3"];
const csv = `head1,head2,head3
h1r1Content,h2r1Content,h3r1Content
h1r2Content,h2r2Content,h3r2Content`;
const csvNoHead = `h1r1Content,h2r1Content,h3r1Content
h1r2Content,h2r2Content,h3r2Content`;

const parsed = parseCSV(csv);
const parsedNoHead = parseCSV(csvNoHead);

test("parses csv", () => {
  expect(parsed).toStrictEqual({
    data: [
      ["head1", "head2", "head3"],
      ["h1r1Content", "h2r1Content", "h3r1Content"],
      ["h1r2Content", "h2r2Content", "h3r2Content"],
    ],
    errors: [],
    meta: {
      delimiter: ",",
      linebreak: "\n",
      aborted: false,
      truncated: false,
      cursor: 89,
    },
  });

  expect(parsedNoHead).toStrictEqual({
    data: [
      ["h1r1Content", "h2r1Content", "h3r1Content"],
      ["h1r2Content", "h2r2Content", "h3r2Content"],
    ],
    errors: [],
    meta: {
      delimiter: ",",
      linebreak: "\n",
      aborted: false,
      truncated: false,
      cursor: 71,
    },
  });
});
test("detects exact header", () => {
  expect(parsedCSVHasExactHeader({ head, data: parsed.data })).toBe(true);
  expect(parsedCSVHasExactHeader({ head, data: parsedNoHead.data })).toBe(
    false
  );
  expect(
    parsedCSVHasExactHeader({
      head: ["nonExistent", "headings", "inThe", "csv"],
      data: parsed.data,
    })
  ).toBe(false);
});
test("removes exact header", () => {
  const processedData = removeExactHeader({ head, data: parsed.data });
  expect(processedData).toStrictEqual([
    ["h1r1Content", "h2r1Content", "h3r1Content"],
    ["h1r2Content", "h2r2Content", "h3r2Content"],
  ]);
  expect(processedData).not.toStrictEqual(parsed.data);
});
