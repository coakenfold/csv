import PropTypes from "prop-types";
import { Table as AntTable } from "antd";
import TableCell from "./TableCell";
function Table({ config, updateCSV }) {
  const { data, headings, mapping } = config;
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
      components={{
        body: {
          cell: TableCell,
        },
      }}
    />
  );
}
const { object } = PropTypes;
Table.propTypes = {
  config: object,
};
export default Table;
