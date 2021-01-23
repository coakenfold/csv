import { useContext } from "react";
function CSV({ context }) {
  const csv = useContext(context);
  return (
    <div className="CSV">
      <h1>CSV</h1>
      <textarea defaultValue={csv} />
    </div>
  );
}

export default CSV;
