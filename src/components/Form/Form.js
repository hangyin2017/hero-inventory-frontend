import React from 'react';
import { Form as AntdForm, Col as AntdCol } from 'antd';
import styled from 'styled-components';

const Section = styled.section`
  display: flex;
  flex-flow: row wrap;
`;

const Col = styled(AntdCol).attrs({
  span: 24,
  md: 12,
})`
  padding-right: 20px;
`;

const Item = styled(AntdForm.Item)`
  /* margin-bottom: 0;

  & ~ & {
    margin-top: 15px;
  } */
`;

const Form = styled(AntdForm)`
  margin-bottom: 50px;
`;

Form.Section = Section;
Form.Col = Col;
Form.Item = Item;

export default Form;
