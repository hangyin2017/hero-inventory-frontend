import React from 'react';
import { Input } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
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
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    this.input.focus();
  }

  handleInputChange({ target: { value } }) {
    this.setState({ value });
  }

  handleUpdate(e) {
    e.stopPropagation();
    const { value } = this.state;
    const { item, selectRef, setEditing, update } = this.props;
    selectRef.focus();
    setEditing(null);
    value && (item.name != value) && update(item, value);
  }

  render() {
    const { Actions, setEditing } = this.props;
    const { value } = this.state;

    return (
      <div onClick={(e) => e.stopPropagation()}>
        <InlineInput
          value={value}
          ref={(el) => this.input = el}
          onBlur={() => setEditing(null)}
          onChange={this.handleInputChange}
          onPressEnter={this.handleUpdate}
        />
        <Actions>
          <CheckOutlined onClick={this.handleUpdate}/>
          <CloseOutlined onClick={(e) => {
            e.stopPropagation();
            setEditing(null);
          }}/>
        </Actions>
      </div>
    )
  }
}

export default Edit;