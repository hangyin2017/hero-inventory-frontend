import styled from 'styled-components';
import { Col } from 'antd';

const Col12 = styled(Col).attrs({
  span: 24,
  md: 12,
})`
  padding-right: 20px;
`;

const Section = styled.section`
  display: flex;
  flex-flow: row wrap;
`;

Section.Col = Col12;

export default Section;