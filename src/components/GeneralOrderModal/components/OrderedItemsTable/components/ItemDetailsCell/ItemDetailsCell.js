import React from 'react';
import { Form, Select } from 'antd';
import styled from 'styled-components';

const StyledSelect = styled(Select)`
  width: 100%;
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
  }

  render() {
    const { itemData, children, myblur, save, handleAdd, ...restProps } = this.props;

    return (
      <td {...restProps}>
        <div>
          <StyledSelect
            ref={this.selectRef}
            placeholder={'Type or click to select an item'}
            bordered={false}
            showSearch
            optionLabelProp="value"
            onBlur={myblur}
            showArrow={false}
            value={children[1]}
            filterOption={(input, option) => option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {itemData.map((item, index) => (
              <Select.Option key={index} value={item.name} >
<<<<<<< HEAD
                <div 
                  // key={item.id}
=======
                <div
>>>>>>> origin/HERO-68-refactor-orders
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
        </div>
      </td>
    );
  }
}

export default ItemDetailsCell;