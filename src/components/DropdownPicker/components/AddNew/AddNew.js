import React from 'react';
import { Input } from 'antd';
import styled from 'styled-components';
import { color } from '../../../../styles'

const { lightGrey } = color;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  margin-top: 4px;
  padding: 4px 8px 0px;
  border-top: 1px solid ${lightGrey};
`;

const StyledInput = styled(Input)`
  flex: auto;
  height: 30px;
`;

const Add = styled.a`
  display: block;
  flex: none;
  padding: 8px;
  cursor: pointer;
`;

class AddNew extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };

    this.clear = this.clear.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  clear() {
    const{ selectRef } = this.props;

    this.setState({ value: '' });

    selectRef.focus();
  }

  handleAdd(e) {
    e.stopPropagation();

    const { onAdd } = this.props;
    const { value } = this.state;
    
    this.clear();

    if(value === '') return;

    onAdd(value);
  }

  render() {
    const { value } = this.state;
    const { maxLength } = this.props;
    
    return (
      <Wrapper>
        <StyledInput
          value={value}
          maxLength={maxLength}
          onChange={(e) => this.setState({ value: e.target.value })}
          onPressEnter={this.handleAdd}
        />
        <Add onClick={this.handleAdd}>Add</Add>
      </Wrapper>
    );
  }
}

export default AddNew;
