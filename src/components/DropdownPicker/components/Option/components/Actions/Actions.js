import styled from 'styled-components';

const Actions = styled.div`
  visibility: hidden;
  float: right;
  font-size: 16px;
  opacity: 0.7;

  & > span {
    padding: 3px 4px;
  }

  .ant-select-item-option-active & {
    visibility: visible;
  }
`;

export default Actions;