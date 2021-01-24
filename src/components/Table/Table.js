import PropTypes from "prop-types";
import { Table as AntTable } from "antd";

function Table({ config }) {
  const { data, headings, mapping } = config;
  if (data === undefined || headings === undefined || mapping === undefined) {
    return null;
  }
  const columns = [];
  for (const [key, value] of Object.entries(mapping)) {
    columns.push({
      name: key,
      title: headings[value],
      dataIndex: headings[value],
    });
  }
  const dataWithKeys = [...data].map((entry, index) => {
    return {
      ...entry,
      key: index,
    };
  });
  return <AntTable columns={columns} dataSource={dataWithKeys} />;
}
const { array } = PropTypes;
Table.propTypes = {
  tabs: array,
};
export default Table;
