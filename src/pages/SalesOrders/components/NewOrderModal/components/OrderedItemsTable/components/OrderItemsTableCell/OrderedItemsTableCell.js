import React, { useContext, useState, useEffect, useRef } from "react";
import { Form, Input, Popover, Select } from "antd";
import { CloseCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { EditableContext } from "../../OrderedItemsTable";
import api from "../../../../../../../../lib/api";

const { Option } = Select;

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
  const [allData, setAllData] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchItem = async () => {
      const result = await api.getAll("items");
      setData(result.data.slice(0, 10));
      setAllData(result.data);
    };

    fetchItem();
  }, []);

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
    } else {
      handleSave({ ...record, ...values });
      setData(allData.slice(0, 10));
    }
  };
  const search = (e) => {
    if (dataIndex !== "DETAILS") {
      return;
    }
    let result = allData.filter((item) => {
      return (
        item.name.toLowerCase().includes(e.target.value) || item.sku.toLowerCase().includes(e.target.value)
      );
    });
    setData(result.slice(0, 10));
  };
  const save = async (data) => {
    try {
      const values = await form.validateFields();
      if (dataIndex === "DETAILS") {
        handleSave({
          ...record,
          data: data,
          RATE: data.sellingPrice,
          DETAILS:
            data.sellingPrice === 0
              ? "Type or click to select an item"
              : "Add description to your item",
          AMOUNT: data.sellingPrice,
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
      <div>
        {dataIndex === "DETAILS" && record.data?.name ? (
          <div>
            <h2 style={{ display: "flex", justifyContent: "space-between" }}>
              {record.data.name}
              <div
                style={{ display: "flex", alignItems: "center", height: 30 }}
              >
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
          <Input
            ref={inputRef}
            autocomplete="off"
            onBlur={myblur}
            onPressEnter={myblur}
            onChange={search}
          />
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
              marginLeft: "0px",
              marginTop: "10px",
            }}
          >
            {data.map((item) => (
              <li
                key={item.id}
                onClick={() => {
                  save(item);
                  handleAdd();
                }}
              >
                <span style={{ fontSize: "15px", fontWeight: "bold" }}>
                  {item.name}
                </span>
                <div style={{ marginTop: "15px", marginBottom: "10px" }}>
                  <span style={{ marginRight: "10px" }}> SKU:{item.sku}</span>
                  <span style={{ marginRight: "10px" }}>
                    {" "}
                    Rate:{item.sellingPrice}
                  </span>
                  <span> Stock:{item.physicalStock}</span>
                </div>
              </li>
            ))}
            <a
              onClick={showModal}
              style={{ marginTop: "30px", marginLeft: "-18px" }}
            >
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
              <div
                style={{ display: "flex", alignItems: "center", height: 30 }}
              >
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
