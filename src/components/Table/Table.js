import PropTypes from "prop-types";
import { Table as AntTable, Button } from "antd";
import TableCell from "./TableCell";
function Table({ config, updateCSV, csvData }) {
  const { data, headings, mapping, validator } = config;
  if (data === undefined || headings === undefined || mapping === undefined) {
    return null;
  }
  const columns = [];
  for (const [key, value] of Object.entries(mapping)) {
    const title = headings[value];
    const dataIndex = headings[value];
    columns.push({
      name: key,
      title,
      dataIndex,
      onCell: (record) => ({
        record,
        editable: true,
        dataIndex,
        title,
        key,
        value,
        validator,
        mappingKey: key,
        onEditSave: (update) => {
          updateCSV(update);
        },
      }),
    });
  }
  const dataWithKeys = [...data].map((entry, index) => {
    return {
      ...entry,
      key: index,
    };
  });
  return (
    <AntTable
      columns={columns}
      dataSource={dataWithKeys}
      pagination={false}
      components={{
        body: {
          cell: TableCell,
        },
      }}
      footer={() => (
        <Button
          size="large"
          type="primary"
          onClick={() => {
            console.log("POST:", config.data);
          }}
        >
          Save
        </Button>
      )}
    />
  );
}
const { object } = PropTypes;
Table.propTypes = {
  config: object,
};
export default Table;
