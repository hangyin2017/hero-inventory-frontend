import React from 'react';
import { Form, Select } from 'antd';
import styled from 'styled-components';

const StyledSelect = styled(Select)`
  width: 100%;
`;

const CellContent = styled.div`
  display: flex;
  flex-direction: column;
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

    this.selectRef = React.createRef();

    this.state = {
      editing: false,
    }
    
    this.toggleEdit = this.toggleEdit.bind(this);
    this.setEditing = this.setEditing.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  toggleEdit() {
    const { dataIndex, record, formRef } = this.props;
    const { editing } = this.state;
    this.setEditing(!editing);
    formRef.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  setEditing(editing) {
    this.setState({ editing },
      () => {
        if(editing) {
          this.selectRef.current.focus();
          console.log(this.selectRef);
        }
      }
    );
  }

  onBlur() {
    const { myblur } = this.props;
    setTimeout(() => {
      this.toggleEdit();
    }, 300);
    myblur();
  }

  render() {
    const { itemData, dataIndex, title, children, myblur, record, save, handleAdd, ...restProps } = this.props;
    const { editing } = this.state;

    const editingNode = (
      <div>
        {/* <Form.Item
          style={{ margin: 0 }}
          name={dataIndex}
        > */}
          <StyledSelect
            ref={this.selectRef}
            placeholder={'Type or click to select an item'}
            bordered={false}
            showSearch
            optionLabelProp="value"
            onBlur={this.onBlur}
            showArrow={false}
            value={children[1]}
            // onChange={onChange}
            filterOption={(input, option) => option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            // dropdownRender={this.dropdownRender}
          >
            {itemData.map((item, index) => (
              <Select.Option key={index} value={item.name} >
                <div 
                  // key={item.id}
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
                </div>
              </Select.Option>
            ))}
          </StyledSelect>
        {/* </Form.Item> */}
      </div>
    );

    const displayNode = (
      <CellContent>
        {record.data?.name ? (
          <span>{children}</span>
        ) : (
          <span onClick={this.toggleEdit}>
            {children}
          </span>
        )}
      </CellContent>
    );

    return (
      <td {...restProps}>
        {/* {editing ? ( */}
          {editingNode}
        {/* ) : (
          displayNode
        )} */}
      </td>
    );
  }
}

export default ItemDetailsCell;