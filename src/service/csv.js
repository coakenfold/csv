import Papa from "papaparse";
export const parse = (csv) => {
  const parsed = Papa.parse(csv, {
    dynamicTyping: true,
    header: true,
  });
  return parsed;
};
