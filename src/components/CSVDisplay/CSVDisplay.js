import { parseCSV } from "../../service/service";
import { Descriptions } from "antd";
function CSV({ title, rawCSV }) {
  let rendered = "";
  if (rawCSV) {
    const { errors, data } = parseCSV(rawCSV);
    if (errors.length === 0) {
      rendered = JSON.stringify(data);
    }
  }
  return (
    <div className="CSV">
      <Descriptions bordered layout="vertical">
        <Descriptions.Item label={title}>{rendered}</Descriptions.Item>
      </Descriptions>
    </div>
  );
}

export default CSV;
