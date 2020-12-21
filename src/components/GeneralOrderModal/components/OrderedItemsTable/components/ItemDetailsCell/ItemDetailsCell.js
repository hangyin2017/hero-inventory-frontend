import React from 'react';
import { Form, Input } from 'antd';
import styled from 'styled-components';

const CellContent = styled.div`
  display: flex;
  flex-direction: column;
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

class ItemDetailsCell extends React.Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();

    this.state = {
      editing: false,
    }
    
    this.toggleEdit = this.toggleEdit.bind(this);
    this.setEditing = this.setEditing.bind(this);
    this.search = this.search.bind(this);
  }

  toggleEdit() {
    const { dataIndex, record, formRef } = this.props;
    const { editing } = this.state;
    this.setEditing(!editing);
    formRef.setFieldsValue({ [dataIndex]: record[dataIndex] });
    if(editing) {
      this.inputRef.current.focus();
    }
  };

  setEditing(editing) {
    this.setState({ editing });
  }

  search(e) {
    const { allData } = this.props;
    let result = allData.filter((item) => {
      return (
        new RegExp(e.target.value, 'i').test(item.name) ||
        new RegExp(e.target.value, 'i').test(item.sku)
      );
    });
    setData(result);
  };

  render() {
    const { itemData, dataIndex, title, children, myblur, record, save, handleAdd, ...restProps } = this.props;
    const { editing } = this.state;

    const editingNode = (
      <div>
        {record.data?.name ? (
          <>
            <span>{children}</span>
            <span>SKU: {record.data.sku}</span>
          </>
        ) : (
          <>
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
                ref={this.inputRef}
                autocomplete="off"
                onBlur={myblur}
                onPressEnter={myblur}
                onChange={this.search}
              />
            </Form.Item>
            <ItemsList>
              {itemData.map((item) => (
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
                    <span> SKU: {item.sku}</span>
                    <span> Rate: {item.sellingPrice} </span>
                    <span> Stock: {item.physicalStock}</span>
                  </ItemsDetail>
                </li>
              ))}
            </ItemsList>
          </>
        )}
      </div>
    );

    const displayNode = (
      <CellContent>
        {record.data?.name ? (
          <>
            <span>{children}</span>
            <span>SKU: {record.data.sku}</span>
          </>
        ) : (
          <span style={{ flex: 1 }} onClick={this.toggleEdit}>
            {children}
          </span>
        )}
      </CellContent>
    );

    return (
      <td {...restProps}>
        {editing ? (
          editingNode
        ) : (
          displayNode
        )}
      </td>
    );
  }
}

export default ItemDetailsCell;