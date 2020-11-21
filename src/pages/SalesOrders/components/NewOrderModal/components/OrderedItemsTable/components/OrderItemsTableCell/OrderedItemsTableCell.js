/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState, useEffect, useRef } from "react";
import { Form, Input, Popover, Select } from "antd";
import { CloseCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { EditableContext } from "../../OrderedItemsTable";
import api from "../../../../../../../../lib/api";

const { Option } = Select;
let goodsList = [
  {
    name: "hi",
    id: 1,
    sku: 9,
    rate: 100,
    stock: 20,
  },
];

const OrderedItemsTableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  handleAdd,
  showModal,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);
  const [data, setData] = useState({ hits: [] });

  useEffect(() => {
    const fetchItem = async () => {
      const result = await api.getAll("items");
      setData(result.data);
    };

    fetchItem();
  }, []);

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
      let amount = 0;
      if (record.flag === "%") {
        amount = data.QUANTITY * data.RATE * (1 - data.DISCOUNT / 100);
      } else {
        amount = data.QUANTITY * data.RATE - data.DISCOUNT;
      }
      handleSave({
        ...data,
        AMOUNT: amount,
      });
    }
  };

  const save = async (data) => {
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
      <div style={{ display: "flex", justifyContent: "center" }}>
        {dataIndex === "DETAILS" && record.data?.name ? (
          <div>
            <h2 style={{ display: "flex", justifyContent: "space-between" }}>
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
        {dataIndex === "DISCOUNT" ? (
          <Select defaultValue={record.flag} style={{ marginLeft: 10 }}>
            <Option value="%">%</Option>
            <Option value="$">$</Option>
          </Select>
        ) : null}
        {dataIndex === "DETAILS" && !record.data?.name ? (
          <ul
            style={{
              position: "absolute",
              zIndex: 9999,
              width: "300px",
              background: "#fff",
              marginLeft: "80px",
              marginTop: "38px",
            }}
          >
            {goodsList.map((item) => (
              <li
                key={item.id}
                onClick={() => {
                  save(item);
                  handleAdd();
                }}
              >
                <h2>{item.name}</h2>
                <div style={{ marginTop: "-10px" }}>
                  <span style={{ marginRight: 5 }}> SKU:{item.sku}</span>
                  <span style={{ marginRight: 5 }}> Rate:{item.rate}</span>
                  <span> Stock:{item.stock}</span>
                </div>
              </li>
            ))}
            <a 
              onClick={showModal} 
              style={{ marginTop: "30px", marginLeft: "-18px" }}>
                +Add New Item
            </a>
          </ul>
        ) : null}
      </div>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }}>
        {dataIndex === "DETAILS" && record.data?.name ? (
          <div>
            <h2 style={{ display: "flex", justifyContent: "space-between" }}>
              {record.data.name}
              <div>
                <Popover
                  content={
                    <div>
                      <p onClick={showModal}>Edit Item</p>
                      <p onClick={showModal}>View Item Details</p>
                    </div>
                  }
                >
                  <PlusCircleOutlined />
                </Popover>
                <CloseCircleOutlined style={{ marginLeft: 10 }} onClick={del} />
              </div>
            </h2>
            <span>SKU:{record.data.sku}</span>
          </div>
        ) : null}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ flex: 1 }} onClick={toggleEdit}>
            {children}
          </div>
          {dataIndex === "DISCOUNT" ? (
            <Select
              onClick={() => setEditing(false)}
              defaultValue={record.flag}
              style={{ width: 60, marginLeft: 10 }}
              onChange={(val) => {
                let data = { ...record };
                let amount = 0;
                if (val === "%") {
                  amount =
                    data.QUANTITY * data.RATE * (1 - data.DISCOUNT / 100);
                } else {
                  amount = data.QUANTITY * data.RATE - data.DISCOUNT;
                }
                handleSave({
                  ...data,
                  AMOUNT: amount,
                  flag: val,
                });
              }}
            >
              <Option value="%">%</Option>
              <Option value="$">$</Option>
            </Select>
          ) : null}
        </div>
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export default OrderedItemsTableCell;
