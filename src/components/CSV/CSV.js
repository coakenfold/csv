import Papa from "papaparse";
import { Typography, Descriptions } from "antd";
const { Title } = Typography;
function CSV({ manualCSV, uploadCSV }) {
  var manual = manualCSV
    ? JSON.stringify(
        Papa.parse(manualCSV, {
          dynamicTyping: true,
        })
      )
    : "";

  var upload = uploadCSV
    ? JSON.stringify(
        Papa.parse(uploadCSV, {
          dynamicTyping: true,
        })
      )
    : "";
  return (
    <div className="CSV">
      <Title level={2}>CSVs available</Title>
      <Descriptions bordered layout="vertical">
        <Descriptions.Item label="Drag and drop">{upload}</Descriptions.Item>
        <Descriptions.Item label="Direct input">{manual}</Descriptions.Item>
      </Descriptions>
    </div>
  );
}

export default CSV;
