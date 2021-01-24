import PropTypes from "prop-types";
import { Table as AntTable } from "antd";
import TableCell from "./TableCell";
function Table({ config }) {
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
        handleSave: () => {
          console.log("save!");
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
const { array } = PropTypes;
Table.propTypes = {
  tabs: array,
};
export default Table;
