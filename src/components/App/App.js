import { useState } from "react";
import { Typography, Space } from "antd";
import Input from "../Input/Input";
import CSV from "../CSV/CSV";
import DragAndDrop from "../DragAndDrop/DragAndDrop";
import CSVDirectInput from "../CSVDirectInput/CSVDirectInput";
const { Title } = Typography;
function App() {
  const [uploadCSV, setUploadCSV] = useState();
  const [uploadCSVName, setUploadCSVName] = useState();
  const [manualCSV, setManualCSV] = useState();
  return (
    <div style={{ padding: "2rem" }}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Title>CSV importer</Title>
        <Input
          tabPane1={
            <DragAndDrop
              updateFile={setUploadCSV}
              updateFileName={setUploadCSVName}
            />
          }
          tabPane2={
            <CSVDirectInput
              updateFile={setManualCSV}
              uploadCSV={uploadCSV}
              uploadCSVName={uploadCSVName}
            />
          }
        />
        <CSV manualCSV={manualCSV} uploadCSV={uploadCSV} />
      </Space>
    </div>
  );
}

export default App;
