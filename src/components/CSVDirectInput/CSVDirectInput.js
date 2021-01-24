import { useState } from "react";
import { Input, Typography, Button, Space } from "antd";
import { parseCSV } from "../../service/service";
const { TextArea } = Input;
const { Text } = Typography;

function CSVDirectInput({ updateFile, uploadCSV, uploadCSVName }) {
  const [manualCSV, setManualCSV] = useState();
  const [csvErrors, setCsvErrors] = useState([]);

  const formOnSubmit = (e) => {
    e.preventDefault();
    if (manualCSV) {
      const { errors } = parseCSV(manualCSV);
      if (errors.length) {
        setCsvErrors(errors);
        return;
      }
      setCsvErrors([]);
      updateFile(manualCSV);
    }
  };

  const textOnChange = (e) => {
    setManualCSV(e.currentTarget.value);
  };

  const onCopyClick = () => {
    setCsvErrors([]);
    setManualCSV(uploadCSV);
    updateFile(uploadCSV);
  };

  return (
    <form className="CSVDirectInput" onSubmit={formOnSubmit}>
      <Space direction="vertical" className="w-100">
        <TextArea rows={4} value={manualCSV} onChange={textOnChange} />
        <Space direction="horizontal" className="w-100">
          <Button htmlType="submit" type="primary">
            Update Direct Input CSV
          </Button>
          {uploadCSVName && (
            <Button htmlType="button" type="dashed" onClick={onCopyClick}>
              <Text>
                Copy from <Text strong>{uploadCSVName}</Text>
              </Text>
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
