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
  padding: 8px 8px 4px;
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

    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd(e) {
    e.stopPropagation();

    const { selectRef, onAdd } = this.props;
    const { value } = this.state;
    
    selectRef.focus();

    if(value === '') return;

    this.setState({ value: '' });
    
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
