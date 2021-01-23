import Papa from "papaparse";
import { useContext } from "react";
function CSV({ context }) {
  const csv = useContext(context);
  var data = JSON.stringify(
    Papa.parse(csv, {
      dynamicTyping: true,
    })
  );
  return (
    <div className="CSV">
      <h1>CSV</h1>
      <textarea value={csv} />
      <textarea value={data} />
    </div>
  );
}

export default CSV;
