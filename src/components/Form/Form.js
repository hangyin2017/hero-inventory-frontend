import React from 'react';
import { Form as AntdForm, Col as AntdCol } from 'antd';
import SimpleFooter from './components/SimpleFooter';
import styled from 'styled-components';

const Section = styled.section`
  margin-bottom: 24px;
`;

const Col = styled(AntdCol).attrs({
  span: 24,
  md: 12,
})`
  padding-right: 20px;
`;

const Item = styled(AntdForm.Item)`
`;

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-top: 1px solid #eee;
  box-shadow: 0 -4px 5px -3px rgba(0,0,0,.1);
  background-color: #fff;
  padding: 15px;

  & > button {
    margin: 0 8px;
  }
`;

const Form = styled(AntdForm)`
  margin-bottom: 50px;
`;

Form.Section = Section;
Form.Col = Col;
Form.Item = Item;
Form.Footer = Footer;
// Form.SimpleFooter = SimpleFooter;

export default Form;
