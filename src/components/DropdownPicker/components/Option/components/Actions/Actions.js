import styled from 'styled-components';

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

export default Actions;