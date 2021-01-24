import { useState } from "react";
import { Typography, Space } from "antd";
import Input from "../Input/Input";
import CSVDisplay from "../CSVDisplay/CSVDisplay";
import DragAndDrop from "../DragAndDrop/DragAndDrop";
import CSVDirectInput from "../CSVDirectInput/CSVDirectInput";
import "./App.styles.css";
const { Title } = Typography;
function App() {
  const [uploadCSV, setUploadCSV] = useState();
  const [uploadCSVName, setUploadCSVName] = useState();
  const [manualCSV, setManualCSV] = useState();
  return (
    <div className="App">
      <Space direction="vertical" className="w-100">
        <Title>CSV importer</Title>
        <Input
          tabPane1={
            <Space direction="vertical" className="w-100">
              <DragAndDrop
                updateFile={setUploadCSV}
                updateFileName={setUploadCSVName}
              />
              {uploadCSV && (
                <CSVDisplay title="Drag and drop results" rawCSV={uploadCSV} />
              )}
            </Space>
          }
          tabPane2={
            <Space direction="vertical" className="w-100">
              <CSVDirectInput
                updateFile={setManualCSV}
                uploadCSV={uploadCSV}
                uploadCSVName={uploadCSVName}
              />
              {manualCSV && (
                <CSVDisplay title="Direct input results" rawCSV={manualCSV} />
              )}
            </Space>
          }
        />
      </Space>
    </div>
  );
}

export default App;
