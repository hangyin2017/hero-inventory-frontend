import React, { useContext, useState, useEffect, useRef } from 'react';
import { Form, Input, Popover, Select } from 'antd';
import { CloseCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { EditableContext } from '../../OrderedItemsTable';
import items from '../../../../../../apis/items';
import styled from 'styled-components';

const { Option } = Select;

const SelectedItemName = styled.h2`
  display: flex; 
  justify-content: space-between;
`;

const SelectedItemModal = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
`;

const ItemsList = styled.ul`
  position: absolute;
  z-index: 9999;
  height: 250px;
  width: 300px;
  overflow: auto;
  background: #fff;
  margin-left: 0px;
  margin-top: 0px;
`;

const ItemsName = styled.span`
  font-size: 15px; 
  font-weight: bold;
`;

const ItemsDetail = styled.div`
  margin-top: 15px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
`;

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
      const result = await items.getAll("items");
      setData(result.data);
      setAllData(result.data);
    };

    fetchItem();
  }, []);

  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);

  //设置edit时候这个框为焦点
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

  //失去焦点的时候 自动计算
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
      setData(allData);
    }
  };

  const search = (e) => {
    if (dataIndex !== "DETAILS") {
      return;
    }
    let result = allData.filter((item) => {
      return (
        new RegExp(e.target.value, 'i').test(item.name) ||
        new RegExp(e.target.value, 'i').test(item.sku)
      );
    });
    setData(result);
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
    childNode = editing ? (//如果当前是可编辑状态，显示输入框(itemList)
      <div>
        {dataIndex === "DETAILS" && record.data?.name ? (
          <div>
            <SelectedItemName>
              {record.data.name}
              <SelectedItemModal>
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
              </SelectedItemModal>
            </SelectedItemName>
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
          <ItemsList>
            {data.map((item) => (
              <li
                key={item.id}
                onClick={() => {
                  save(item);
                  handleAdd();
                }}
              >
                <ItemsName>
                  {item.name}
                </ItemsName>
                <ItemsDetail>
                  <span> SKU:{item.sku}</span>
                  <span> Rate:{item.sellingPrice} </span>
                  <span> Stock:{item.physicalStock}</span>
                </ItemsDetail>
              </li>
            ))}
          </ItemsList>
        ) : null}
      </div>
    ) : (//失去焦点，不可编辑状态，显示具体的数据
        <div style={{ paddingRight: 24 }}>
          {dataIndex === "DETAILS" && record.data?.name ? (
            <div>
              <SelectedItemName>
                {record.data.name}
                <SelectedItemModal>
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
                </SelectedItemModal>
              </SelectedItemName>
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
