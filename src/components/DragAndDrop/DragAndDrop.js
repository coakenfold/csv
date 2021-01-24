import { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { List, Space, Typography } from "antd";
import "./DragAndDrop.css";
const { Text } = Typography;
function DragAndDrop({ updateFile, updateFileName }) {
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: "text/csv",
  });

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      acceptedFiles.forEach((file) => {
        const { name } = file;
        file.text().then((text) => {
          updateFile(text);
          updateFileName(name);
        });
      });
    }
  }, [acceptedFiles, updateFile, updateFileName]);
  return (
    <section className="DragAndDrop">
      <Space direction="vertical" style={{ width: "100%" }}>
        <div {...getRootProps({ className: "DragAndDrop__dropzone" })}>
          <input {...getInputProps()} />
          <Space direction="vertical" style={{ width: "100%" }}>
            <Text>Drag 'n' drop a file here, or click to select a file</Text>
            <Text strong>(Only *.csv text files will be accepted)</Text>
            {fileRejections.map(({ file, errors }) => {
              const { name } = file;
              return (
                <Text type="danger">
                  Rejected {name} - {errors.map((e) => e.message)}
                </Text>
              );
            })}
          </Space>
        </div>
        <aside>
          <List
            size="large"
            header={<div>Uploaded File</div>}
            bordered
            dataSource={acceptedFiles}
            renderItem={({ path, size }) => (
              <List.Item>
                {path} - {size} bytes
              </List.Item>
            )}
          />
        </aside>
      </Space>
    </section>
  );
}

export default DragAndDrop;
