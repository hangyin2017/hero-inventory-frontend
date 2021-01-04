import React from 'react';
import styled from 'styled-components';
import { Statistic, Card } from 'antd';
import { color } from '../../../../../../styles';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 30px;
  background-color: ${color.lightGrey};
  text-align: center;
`;

const StyledCard = styled(Card)`
  & ~ & {
    margin-top: 20px;
  }
`;

const StockData = ({
  physicalStock,
  lockedStock,
  arrivingQuantity,
}) => {
  return (
    <Wrapper>
      <StyledCard>
        <Statistic
          title="Physical Stock"
          value={physicalStock}
        />
      </StyledCard>
      <StyledCard>
        <Statistic
          title="Locked Stock"
          value={lockedStock}
        />
      </StyledCard>
      <StyledCard>
        <Statistic
          title="Available Stock"
          value={physicalStock + arrivingQuantity - lockedStock}
        />
      </StyledCard>
    </Wrapper>
  );
};

export default StockData;