import { parse } from "./csv";

export const parseCSV = parse;

export const parsedCSVHasExactHeader = ({ head, data = [] }) => {
  if (data[0] !== undefined) {
    return data[0].every((currentValue, index) => {
      return currentValue === head[index];
    });
  }
  return false;
};

export const removeExactHeader = ({ head, data }) => {
  if (parsedCSVHasExactHeader({ head, data })) {
    const _data = [...data];
    _data.shift();
    return _data;
  }
  return data;
};
