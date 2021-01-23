import Papa from "papaparse";
import { useState } from "react";
function CSVDirectInput({ updateFiles }) {
  const [manualCSV, setManualCSV] = useState();
  const [csvErrors, setCsvErrors] = useState([]);
  return (
    <form
      className="CSVDirectInput"
      onSubmit={(e, b, c) => {
        e.preventDefault();
        const { errors } = Papa.parse(manualCSV, {
          dynamicTyping: true,
        });
        if (errors.length) {
          setCsvErrors(errors);
          return;
        }
        updateFiles(manualCSV);
      }}
    >
      <h1>Direct input</h1>
      {csvErrors.length > 0 &&
        csvErrors.map(({ type, message }, index) => {
          return <div key={`${type}${index}`}>{message}</div>;
        })}
      <textarea
        value={manualCSV}
        onChange={(e) => {
          setManualCSV(e.currentTarget.value);
        }}
      />
      <button>Submit</button>
    </form>
  );
}

export default CSVDirectInput;
