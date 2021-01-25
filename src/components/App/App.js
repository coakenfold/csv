import { useState, useEffect, useMemo } from "react";
import { Typography, Space, ConfigProvider } from "antd";
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
      delivery_address: 9,
    };
  }, []);
  const validatorMessages = {
    whitespace: `Please add content`,
    min: `Zero is the minimum`,
    required: "A: '${name}' is required!",
    type: "'${name}' is not a valid ${type}",
    pattern: "'${name}' does not match pattern ${pattern}",
  };
  const validator = useMemo(() => {
    const rulewhitespace = {
      whitespace: true,
    };
    const ruleNumber = {
      type: "number",
      componentType: "number",
    };
    const ruleUOM = {
      pattern: /^(EA|G|M)$/,
      message: "Use EA, G, or M",
    };
    const ruleRequired = {
      required: true,
    };
    const isDate = {
      pattern: /.*/,
      componentType: "date",
      dateFormat: "YYYY-MM-DD",
    };
    return {
      part_number: [ruleRequired, rulewhitespace],
      price: [ruleNumber],
      quantity: [ruleNumber],
      uom: [ruleUOM, ruleRequired, rulewhitespace],
      supplier_name: [ruleRequired, rulewhitespace],
      supplier_address: [ruleRequired, rulewhitespace],
      ordered_date: [isDate],
      delivery_address: [ruleRequired, rulewhitespace],
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
          validator,
        });
      }
    }
  }, [uploadCSV, mapping, validator]);

  useEffect(() => {
    if (manualCSV) {
      const { data, errors, meta } = parseCSV(manualCSV);
      if (errors.length === 0) {
        setParsedManualCSV({
          data,
          headings: meta.fields,
          mapping,
          validator,
        });
      }
    }
  }, [manualCSV, mapping, validator]);

  const updateUploadCSV = ({ key, ...updateData }) => {
    const newParsedUploadCSV = Object.assign({}, parsedUploadCSV);
    newParsedUploadCSV.data[key] = updateData;
    setParsedUploadCSV(newParsedUploadCSV);
  };

  const updateManualCSV = ({ key, ...updateData }) => {
    const newParsedManualCSV = Object.assign({}, parsedManualCSV);
    newParsedManualCSV.data[key] = updateData;
    setParsedManualCSV(newParsedManualCSV);
  };

  return (
    <div className="App">
      <Space direction="vertical" className="w-100">
        <Title>CSV importer</Title>
        <ConfigProvider form={{ validatorMessages }}>
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
                          title="'Drag and drop' transformation"
                          rawCSV={uploadCSV}
                        />
                        <Table
                          config={parsedUploadCSV}
                          updateCSV={updateUploadCSV}
                          csvData={uploadCSV}
                        />
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
                          title="'Direct input' transformation"
                          rawCSV={manualCSV}
                        />
                        <Table
                          config={parsedManualCSV}
                          updateCSV={updateManualCSV}
                          csvData={manualCSV}
                        />
                      </>
                    )}
                  </Space>
                ),
              },
            ]}
          />
        </ConfigProvider>
      </Space>
    </div>
  );
}

export default App;
