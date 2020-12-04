import { Input } from 'antd';
import styled from 'styled-components';

const InlineInput = styled(Input)`
  position: absolute;
  top: 2px;
  float: left;
  width: 250px;
  padding: 2px 3px;
  margin-left: -4px;
`;

export default InlineInput;