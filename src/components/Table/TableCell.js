import { useState, useEffect, /*useContext,*/ useRef } from "react";
import { Input, Form } from "antd";
const TableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  onEditSave,
  ...restProps
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);
  const [editValue, setEditValue] = useState();
  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const enterEditState = () => {
    setIsEditing(true);
  };
  const exitEditState = () => {
    setIsEditing(false);
  };
  const onEnterWhenNotEditing = (e) => {
    if (e.key === "Enter") {
      enterEditState();
    }
  };
  const onEscapeWhileEditing = (e) => {
    if (e.key === "Escape") {
      exitEditState();
    }
  };
  const onChange = (e) => {
    setEditValue(e.currentTarget.value);
  };
  const onEnterWhileEditing = () => {
    const update = {
      ...record,
      [dataIndex]: editValue,
    };
    onEditSave(update);
    setIsEditing(false);
  };
  const formItemRules = [
    {
      required: true,
      message: `${title} is required.`,
    },
  ];
  const formInitialValues = {
    [dataIndex]: record[dataIndex],
  };

  return (
    <td {...restProps}>
      {editable && isEditing ? (
        <Form initialValues={formInitialValues}>
          <Form.Item name={dataIndex} rules={formItemRules} className="m-0">
            <Input
              ref={inputRef}
              onPressEnter={onEnterWhileEditing}
              onBlur={exitEditState}
              onKeyDown={onEscapeWhileEditing}
              onChange={onChange}
            />
          </Form.Item>
        </Form>
      ) : (
        <div
          tabIndex={0}
          onKeyDown={onEnterWhenNotEditing}
          onClick={enterEditState}
        >
          {children}
        </div>
      )}
    </td>
  );
};
export default TableCell;
