import React from 'react';
import { Input } from 'antd';
import { EditOutlined, DeleteOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const InlineInput = styled(Input)`
  position: absolute;
  top: 2px;
  float: left;
  width: 250px;
  padding: 2px 3px;
  margin-left: -4px;
`;

class Edit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.item.name,
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.input.focus();
  }

  handleInputChange({ target: { value } }) {
    this.setState({ value });
  }

  render() {
    const { item, Actions, setEditing, update } = this.props;
    const { value } = this.state;

    return (
      <div onClick={(e) => e.stopPropagation()} style={{height: 23}}>
        <InlineInput
          value={value}
          ref={(el) => this.input = el}
          onBlur={() => setEditing(null)}
          onChange={this.handleInputChange}
          // onPressEnter={(e) => {
          //   setEditing(id);
          // }}
        />
        <Actions>
          <CheckOutlined onClick={() => value && (item.name != value) && update(item.id, value)}/>
          <CloseOutlined onClick={() => setEditing(null)}/>
        </Actions>
      </div>
    )
  }
}

export default Edit;