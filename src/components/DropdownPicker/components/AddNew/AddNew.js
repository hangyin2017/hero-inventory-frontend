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
      adding: false,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleEnterInput = this.handleEnterInput.bind(this);
  }

  onInputChange({ target: { value } }) {
    this.setState({ value });
  }

  handleAdd() {
    const { onAdd } = this.props;
    const { value } = this.state;
    
    if(value === '') return;

    this.setState({ value: '' });
    
    onAdd(value);
  }

  handleEnterInput(e) {
    e.stopPropagation();
    this.handleAdd();
  }

  render() {
    const { value } = this.state;
    const { maxLength } = this.props;
    
    return (
      <Wrapper>
        <StyledInput
          value={value}
          maxLength={maxLength}
          onChange={this.onInputChange}
          onPressEnter={this.handleEnterInput}
        />
        <Add onClick={this.handleAdd}>Add</Add>
      </Wrapper>
    );
  }
}

export default AddNew;
