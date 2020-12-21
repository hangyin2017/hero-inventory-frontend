import React, { useContext, useState, useEffect, useRef } from 'react';
import { Form, Input, Popover, Select, Popconfirm } from 'antd';
import { CloseCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { EditableContext } from '../../OrderedItemsTable';
import items from '../../../../../../apis/items';
import ItemDetailsCell from '../ItemDetailsCell';

const { Option } = Select;

const SelectedItemName = styled.h2`
  display: flex; 
  justify-content: space-between;
`;

const CellContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const OrderedItemsTableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  rowCount,
  handleSave,
  handleAdd,
  handleDelete,
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
    if (editing && dataIndex !== "itemName") {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  //失去焦点的时候 自动计算
  const myblur = async () => {
    const values = await form.validateFields();
    setTimeout(() => {
      toggleEdit();
    }, 300);
    if (dataIndex !== "itemName") {
      let data = { ...record, ...values };
      let amount = 0;
      // if (record.flag == "%") {
      //   amount = data.QUANTITY * data.RATE * (1 - data.DISCOUNT / 100);
      // } else {
      //   amount = data.QUANTITY * data.RATE - data.DISCOUNT;
      // }
      amount = data.quantity * data.rate;
      handleSave({
        ...data,
        amount: amount,
      });
    } else {
      handleSave({ ...record, ...values });
      setData(allData);
    }
  };

  const save = async (data) => {

    try {
      const values = await form.validateFields();
      if (dataIndex == "itemName") {
        handleSave({
          ...record,
          data: data,
          rate: data.sellingPrice,
          itemName: data.name,
          amount: data.sellingPrice,
        });
      } else {
        handleSave({ ...record, ...values });
      }
      setTimeout(() => {
        toggleEdit();
      }, 300);
    } catch (errInfo) { }
  };

  let childNode = children;

  // let childNode = {};

  if(dataIndex == 'action') {
    childNode = rowCount > 1 ? (
      <Popconfirm
        title="Sure to delete?"
        onConfirm={() => handleDelete(record.key)}
      >
        <CloseCircleOutlined style={{ fontSize: '20px' }} />
      </Popconfirm>
    ) : (null);
  }

  if(dataIndex == 'itemName') {
    return (<ItemDetailsCell
      record={record}
      itemData={allData}
      dataIndex={dataIndex}
      data={data}
      title={title}
      children={children}
      formRef={form}
      myblur={myblur}
      save={save}
      handleAdd={handleAdd}
      handleDelete={handleDelete}
    />);
  }

  // if(dataIndex == 'itemName') {
  //   childNode = editing ? (
  //     <div>
  //       {record.data?.name ? (
  //         <>
  //           <span>{children}</span>
  //           <span>SKU: {record.data.sku}</span>
  //         </>
  //       ) : (
  //         <>
  //           <Form.Item
  //             style={{ margin: 0 }}
  //             name={dataIndex}
  //             rules={[
  //               {
  //                 required: true,
  //                 message: `${title} is required.`,
  //               },
  //             ]}
  //           >
  //             <Input
  //               ref={inputRef}
  //               autocomplete="off"
  //               onBlur={myblur}
  //               onPressEnter={myblur}
  //               onChange={search}
  //             />
  //           </Form.Item>
  //           <ItemsList>
  //             {data.map((item) => (
  //               <li
  //                 key={item.id}
  //                 onClick={() => {
  //                   save(item);
  //                   handleAdd();
  //                 }}
  //               >
  //                 <ItemsName>
  //                   {item.name}
  //                 </ItemsName>
  //                 <ItemsDetail>
  //                   <span> SKU: {item.sku}</span>
  //                   <span> Rate: {item.sellingPrice} </span>
  //                   <span> Stock: {item.physicalStock}</span>
  //                 </ItemsDetail>
  //               </li>
  //             ))}
  //           </ItemsList>
  //         </>
  //       )}
  //     </div>
  //   ) : (
  //     <CellContent>
  //       {record.data?.name ? (
  //         <>
  //           <span>{children}</span>
  //           <span>SKU: {record.data.sku}</span>
  //         </>
  //       ) : (
  //         <span style={{ flex: 1 }} onClick={toggleEdit}>
  //           {children}
  //         </span>
  //       )}
  //     </CellContent>
  //   );
  // }

  if (editable) {
    childNode = editing ? (
      <div>
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
          />
        </Form.Item>
        {/* {dataIndex == "discount" ? (
          <Select defaultValue={record.flag} style={{ marginLeft: 10, flex: 1 }}>
            <Option value="%">%</Option>
            <Option value="$">$</Option>
          </Select>
        ) : null} */}
      </div>
    ) : (//失去焦点，不可编辑状态，显示具体的数据
        <div style={{ paddingRight: 24 }}>
          <CellContent>
            <span style={{ flex: 1 }} onClick={toggleEdit}>
              {children}
            </span>
            {/* {dataIndex == "discount" ? (
              <Select
                onClick={() => setEditing(false)}
                defaultValue={record.flag}
                style={{ width: 60, marginLeft: 10, flex: 1 }}
                onChange={(val) => {
                  let data = { ...record };
                  let amount = 0;
                  if (val == "%") {
                    amount =
                      data.QUANTITY * data.RATE * (1 - data.discount / 100);
                  } else {
                    amount = data.QUANTITY * data.RATE - data.discount;
                  }
                  handleSave({
                    ...data,
                    amount: amount,
                    flag: val,
                  });
                }}
              >
                <Option value="%">%</Option>
                <Option value="$">$</Option>
              </Select>
            ) : null} */}
          </CellContent>
        </div>
      );
  }

  return <td {...restProps}>{childNode}</td>;
};

export default OrderedItemsTableCell;
