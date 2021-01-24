import Papa from "papaparse";
export const parse = (csv) => {
  return Papa.parse(csv, {
    dynamicTyping: true,
  });
};
