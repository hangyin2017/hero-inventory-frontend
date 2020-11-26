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
      input: '',
      addNewing: false,
    };
  }

  render() {
    const { input } = this.state;
    
    return (
      <Wrapper>
        <StyledInput value={input}></StyledInput>
        <Add>Add</Add>
      </Wrapper>
    );
  }
}

export default AddNew;
