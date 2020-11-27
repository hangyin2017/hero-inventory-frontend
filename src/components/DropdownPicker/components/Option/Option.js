import React from 'react';
import { Input } from 'antd';
import { EditOutlined, DeleteOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { color } from '../../../../styles';

const InlineInput = styled(Input)`
  position: absolute;
  top: 2px;
  float: left;
  width: 250px;
  padding: 2px 3px;
  margin-left: -4px;
`;

const Value = styled.span`
`;

const Actions = styled.div`
  visibility: hidden;
  float: right;
  font-size: 16px;
  opacity: 0.7;

  & > span {
    margin: 0 3px;
  }

  .ant-select-item-option-active & {
    visibility: visible;
  }
`;

const { primary, dangerous } = color;

const Edit = styled(EditOutlined)`
  color: ${primary};
`;

const Delete = styled(DeleteOutlined)`
  color: ${dangerous};
`;

class Option extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // editing: false,
      value: this.props.item.name,
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange({ target: { value } }) {
    this.setState({ value });
  }

  // handleEditClick(e) {
  //   e.stopPropagation();
    // this.setState({ editing: true });
  // }

  render() {
    const { item, editing, onEdit, onDelete } = this.props;
    const { value } = this.state;
    const { id, name } = item;

    return (
      <>
        {editing === id ? (
          <div onClick={(e) => e.stopPropagation()} style={{height: 23}}>
            <InlineInput
              value={value}
              onChange={this.handleInputChange}
              onPressEnter={(e) => {
                e.stopPropagation();
                onEdit(id);
              }}
              onFocus={() => console.log("focus")}
              onBlur={() => console.log("blur")}
            />
            <Actions>
              <CheckOutlined />
              <CloseOutlined />
            </Actions>
          </div>
        ) : (
          <>
            <Value>
              {name}
            </Value>
            <Actions>
              <Edit onClick={(e) => {
                e.stopPropagation();
                onEdit(id);
              }}/>
              <Delete onClick={(e) => {
                e.stopPropagation();
                onDelete(id);
              }}/>
            </Actions>
          </>
        )}
      </>
    );
  }
}

export default Option;