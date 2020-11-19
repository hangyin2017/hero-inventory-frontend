import React, { useContext, useState, useEffect, useRef } from "react";
import { Form, Input, Button } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { EditableContext } from "../../OrderedItemTable";
const goodsList = [
  {
    name: "goods01",
    id: "0",
    sku: 9,
    rate: 100,
    stock: 100,
  },
  {
    name: "goods02",
    id: "1",
    sku: 99,
    rate: 200,
    stock: 200,
  },
  {
    name: "goods03",
    id: "2",
    sku: 999,
    rate: 300,
    stock: 400,
  },
];
const OrderedItemTableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };
  const del = async () => {
    handleSave({
      ...record,
      data: {},
      RATE: 0,
      DISCOUNT: 0,
      QUANTITY: 1,
      DETAILS: "Type or click to select an item",
      AMOUNT: 0,
    });
    toggleEdit();
  };
  const myblur = async () => {
    const values = await form.validateFields();
    setTimeout(() => {
      toggleEdit();
    }, 300);
    if (dataIndex !== "DETAILS") {
      let data = { ...record, ...values };
      handleSave({
        ...data,
        AMOUNT: data.QUANTITY * data.RATE * (1 - data.DISCOUNT / 100),
      });
    }
  };
  const save = async (data) => {
    console.log("object");
    try {
      const values = await form.validateFields();
      if (dataIndex === "DETAILS") {
        console.log(data);
        handleSave({
          ...record,
          data: data,
          RATE: data.rate,
          DETAILS:
            data.rate === 0
              ? "Type or click to select an item"
              : "Add description to your item",
          AMOUNT: data.rate,
        });
      } else {
        handleSave({ ...record, ...values });
      }
      setTimeout(() => {
        toggleEdit();
      }, 300);
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <>
        {dataIndex === "DETAILS" && record.data?.name ? (
          <div>
            <h2>
              {record.data.name} <CloseCircleOutlined />
            </h2>
            <span>SKU:{record.data.sku}</span>
          </div>
        ) : null}
        <Form.Item
          style={{ margin: 0 }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input ref={inputRef} onBlur={myblur} onPressEnter={myblur} />
        </Form.Item>

        {dataIndex === "DETAILS" && !record.data?.name ? (
          <ul
            style={{
              position: "absolute",
              zIndex: 9999,
              width: "200px",
              background: "#fff",
            }}
          >
            {goodsList.map((item) => (
              <li key={item.id} onClick={() => save(item)}>
                <h2>{item.name}</h2>
                SKU:{item.sku}
                Rate:{item.rate}
                Stock:{item.stock}
              </li>
            ))}
            <li>+Add New Item</li>
          </ul>
        ) : null}
      </>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {dataIndex === "DETAILS" && record.data?.name ? (
          <div>
            <h2>
              {record.data.name}
              <CloseCircleOutlined onClick={del} />
            </h2>
            <span>SKU:{record.data.sku}</span>
          </div>
        ) : null}
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export default OrderedItemTableCell;