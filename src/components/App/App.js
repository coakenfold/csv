import { useState, useEffect, useMemo } from "react";
import { Typography, Space } from "antd";
import Tabs from "../Tabs/Tabs";
import Table from "../Table/Table";
import CSVDisplay from "../CSVDisplay/CSVDisplay";
import DragAndDrop from "../DragAndDrop/DragAndDrop";
import CSVDirectInput from "../CSVDirectInput/CSVDirectInput";
import { parseCSV } from "../../service/service";
import "./App.styles.css";
const { Title } = Typography;
function App() {
  const [uploadCSV, setUploadCSV] = useState();
  const [parsedUploadCSV, setParsedUploadCSV] = useState({});
  const [uploadCSVName, setUploadCSVName] = useState();
  const [manualCSV, setManualCSV] = useState();
  const [parsedManualCSV, setParsedManualCSV] = useState({});
  const mapping = useMemo(() => {
    return {
      part_number: 0,
      price: 1,
      quantity: 2,
      uom: 3,
      supplier_name: 6,
      supplier_address: 7,
      ordered_date: 8,
      delivery_addres: 9,
    };
  }, []);
  useEffect(() => {
    if (uploadCSV) {
      const { data, errors, meta } = parseCSV(uploadCSV);
      if (errors.length === 0) {
        setParsedUploadCSV({
          data,
          headings: meta.fields,
          mapping,
        });
      }
    }
  }, [uploadCSV, mapping]);

  useEffect(() => {
    if (manualCSV) {
      const { data, errors, meta } = parseCSV(manualCSV);
      if (errors.length === 0) {
        setParsedManualCSV({ data, headings: meta.fields, mapping });
      }
    }
  }, [manualCSV, mapping]);
  return (
    <div className="App">
      <Space direction="vertical" className="w-100">
        <Title>CSV importer</Title>
        <Tabs
          tabs={[
            {
              title: "Drag and Drop",
              pane: (
                <Space direction="vertical" className="w-100">
                  <DragAndDrop
                    updateFile={setUploadCSV}
                    updateFileName={setUploadCSVName}
                  />
                  {uploadCSV && (
                    <>
                      <CSVDisplay
                        title="Drag and drop results"
                        rawCSV={uploadCSV}
                      />
                      <Table config={parsedUploadCSV} />
                    </>
                  )}
                </Space>
              ),
            },
            {
              title: "Direct Input",
              pane: (
                <Space direction="vertical" className="w-100">
                  <CSVDirectInput
                    updateFile={setManualCSV}
                    uploadCSV={uploadCSV}
                    uploadCSVName={uploadCSVName}
                  />
                  {manualCSV && (
                    <>
                      <CSVDisplay
                        title="Direct input results"
                        rawCSV={manualCSV}
                      />
                      <Table config={parsedManualCSV} />
                    </>
                  )}
                </Space>
              ),
            },
          ]}
        />
      </Space>
    </div>
  );
}

export default App;
