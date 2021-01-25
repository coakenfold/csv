import { useState, useEffect, useRef } from "react";
import { Input, InputNumber, DatePicker, Form } from "antd";
import moment from "moment";

const TableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  onEditSave,
  validator,
  mappingKey,
  ...restProps
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);
  const [editValue, setEditValue] = useState();
  const [form] = Form.useForm();

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);
  const enterEditState = () => {
    setIsEditing(true);
    form.setFieldsValue({
      [dataIndex]:
        componentType === "date"
          ? moment(record[dataIndex], dateFormat)
          : record[dataIndex],
    });
  };
  const exitEditState = () => {
    setIsEditing(false);
  };
  const onEnterWhenNotEditing = (e) => {
    if (e.key === "Enter") {
      enterEditState();
    }
  };
  const onEscape = (e) => {
    if (e.key === "Escape") {
      exitEditState();
    }
  };
  const onTextChange = (e) => {
    setEditValue(e.currentTarget.value);
  };
  const onDateChange = (date, dateString) => {
    setEditValue(dateString);
  };
  const onDateBlur = () => {
    saveChanges();
    setIsEditing(false);
  };

  const onNumberChange = (value) => {
    setEditValue(value);
  };

  const formItemRules = validator[mappingKey];
  const ruleWithType = formItemRules.find(({ componentType }) => {
    return componentType;
  });
  const componentType = ruleWithType ? ruleWithType.componentType : "text";
  const dateFormat =
    componentType === "date" ? ruleWithType.dateFormat : "YYYY-MM-DD";
  const formInitialValues = {
    [dataIndex]: record[dataIndex],
  };

  const saveChanges = async () => {
    form
      .validateFields()
      .then((values) => {
        onEditSave({
          ...record,
          [dataIndex]: editValue,
        });
        setIsEditing(false);
      })
      .catch(() => {});
  };

  let inputType = null;

  switch (componentType) {
    case "date":
      inputType = (
        <DatePicker
          format={dateFormat}
          className="w-100"
          allowClear={false}
          ref={inputRef}
          onChange={onDateChange}
          onKeyDown={onEscape}
          onBlur={onDateBlur}
        />
      );
      break;
    case "number":
      inputType = (
        <InputNumber
          ref={inputRef}
          onChange={onNumberChange}
          onKeyDown={onEscape}
          onBlur={saveChanges}
        />
      );
      break;

    default:
      inputType = (
        <Input
          ref={inputRef}
          onChange={onTextChange}
          onKeyDown={onEscape}
          onBlur={saveChanges}
        />
      );
      break;
  }
  return (
    <td {...restProps}>
      {editable && isEditing ? (
        <Form initialValues={formInitialValues} form={form}>
          <Form.Item name={dataIndex} rules={formItemRules} className="m-0">
            {inputType}
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
