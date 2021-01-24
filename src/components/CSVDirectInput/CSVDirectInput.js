import Papa from "papaparse";
import { useState } from "react";
import { Input, Typography, Button, Space } from "antd";
const { TextArea } = Input;
const { Text } = Typography;

function CSVDirectInput({ updateFile, uploadCSV, uploadCSVName }) {
  const [manualCSV, setManualCSV] = useState();
  const [csvErrors, setCsvErrors] = useState([]);
  return (
    <form
      className="CSVDirectInput"
      onSubmit={(e, b, c) => {
        e.preventDefault();
        if (manualCSV) {
          const { errors } = Papa.parse(manualCSV, {
            dynamicTyping: true,
          });
          if (errors.length) {
            setCsvErrors(errors);
            return;
          }
          setCsvErrors([]);
          updateFile(manualCSV);
        }
      }}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <TextArea
          rows={4}
          value={manualCSV}
          onChange={(e) => {
            setManualCSV(e.currentTarget.value);
          }}
        />
        <Space direction="horizontal" style={{ width: "100%" }}>
          <Button htmlType="submit" type="primary">
            Update Direct Input CSV
          </Button>
          {uploadCSVName && (
            <Button
              htmlType="button"
              type="dashed"
              onClick={() => {
                setManualCSV(uploadCSV);
                updateFile(uploadCSV);
              }}
            >
              Copy {uploadCSVName}
            </Button>
          )}
        </Space>
        {csvErrors.length > 0 &&
          csvErrors.map(({ type, message }, index) => {
            return (
              <div key={`${type}${index}`}>
                <Text type="danger">{message}</Text>
              </div>
            );
          })}
      </Space>
    </form>
  );
}

export default CSVDirectInput;
