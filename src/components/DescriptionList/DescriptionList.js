import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import { color } from '../../styles';

const Dt = styled(Col).attrs({ span: 24, md: 6 })`
  color: ${color.grey};
`;

const Dd = styled(Col).attrs({ span: 24, md: 18 })`
`;

const Description = styled(Row)`
  margin-bottom: 10px;

  & > div {
    padding: 5px 15px;
  }
`;

const Item = ({
  title,
  value,
}) => (
  <Description>
    <Dt>{title}</Dt>
    <Dd>{String(value)}</Dd>
  </Description>
);

const DescriptionList = ({ data }) => {
  return (
    <dl>
      {data.map((item) => (
        <Item key={item.title} title={item.title} value={item.value} />
      ))}
    </dl>
  );
};

DescriptionList.Item = Item;

export default DescriptionList;