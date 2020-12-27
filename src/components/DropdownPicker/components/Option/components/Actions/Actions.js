import styled from 'styled-components';
import { fontSizes } from '../../../../../../styles';

const { FONT_M } = fontSizes;

const Actions = styled.div`
  visibility: hidden;
  float: right;
  font-size: ${FONT_M};
  opacity: 0.7;

  & > span {
    padding: 3px 4px;
  }

  .ant-select-item-option-active & {
    visibility: visible;
  }
`;

export default Actions;