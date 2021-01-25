import { useState } from "react";
import PropTypes from "prop-types";
import { Table as AntTable, Button, Drawer, Typography } from "antd";
import TableCell from "./TableCell";
const { Text } = Typography;
function Table({ config, updateCSV, csvData }) {
  const [visible, setVisible] = useState(false);
  const { data, headings, mapping, validator } = config;
  if (data === undefined || headings === undefined || mapping === undefined) {
    return null;
  }

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
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
        <>
          <Button
            size="large"
            type="primary"
            onClick={() => {
              // console.log("POST:", config.data);
              // notification.success({
              //   message: "Simulated POST",
              //   description: JSON.stringify(config.data),
              // });
              showDrawer();
            }}
          >
            Save
          </Button>
          <Drawer
            title="Simulated POST"
            placement="bottom"
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            <Text code>{JSON.stringify(config.data)}</Text>
          </Drawer>
        </>
      )}
    />
  );
}
const { object } = PropTypes;
Table.propTypes = {
  config: object,
};
export default Table;
