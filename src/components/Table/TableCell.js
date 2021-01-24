import { useState, useEffect, /*useContext,*/ useRef } from "react";
import { Input, Form } from "antd";
const TableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  //   const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    // form.setFieldsValue({
    //   [dataIndex]: record[dataIndex],
    // });
  };

  const save = async () => {
    console.log({ ...record });
    setEditing(false);
    // try {
    //   const values = await form.validateFields();
    //   toggleEdit();
    //   handleSave({ ...record, ...values });
    // } catch (errInfo) {
    //   console.log("Save failed:", errInfo);
    // }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form
        initialValues={{
          [dataIndex]: record[dataIndex],
        }}
      >
        <Form.Item
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
          style={{ margin: 0 }}
        >
          <Input
            ref={inputRef}
            onPressEnter={save}
            onBlur={save}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setEditing(false);
              }
            }}
          />
        </Form.Item>
      </Form>
    ) : (
      <div
        className="editable-cell-value-wrap"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setEditing(true);
          }
        }}
        onClick={() => {
          setEditing(true);
        }}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};
export default TableCell;
