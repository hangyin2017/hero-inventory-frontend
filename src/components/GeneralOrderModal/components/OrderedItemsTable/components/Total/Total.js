import React from 'react';
import { Input } from 'antd';
import styled from 'styled-components';
import accounting from '../../../../../../utils/accounting';

const Box = styled.div`
  padding: 20px;
  border-radius: 10px;
  background-color: #fbfafa;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 32px;
  margin-top: 10px;
  font-size: 14px;

  & > input {
    flex: 0 0 30%;
  }

  & > span {
    flex: 0 0 30%;
  }
`;

const Money = styled.span`
  text-align: right;
`;

const TotalWrapper = styled(Row)`
  margin-top: 20px;
  font-size: 20px;
  font-weight: 500;
`;

class Total extends React.Component {
  constructor(props) {
    super(props);
    const { initialData } = this.props;
    this.state = {
      shipment: initialData ? initialData.shipment : 0,
      adjustment: initialData ? initialData.adjustment : 0,
    };

    this.handleAdjustment = this.handleAdjustment.bind(this);
    this.setShipping = this.setShipping.bind(this);
    this.setAdjust = this.setAdjust.bind(this);
  }

  handleAdjustment(setter) {
    return (e) => {
      const number = parseFloat(e.target.value);
      if(!number) return setter(0);
      return setter(number);
    }
  }

  setShipping(shipment) {
    const { prices } = this.props;
    this.updatePrices({
      ...prices,
      shipment,
    });
  };

  setAdjust(adjustment) {
    const { prices } = this.props;
    this.updatePrices({
      ...prices,
      adjustment,
    });
  };

  updatePrices(newPrices) {
    const { dataSource, setPrices, applyGst } = this.props;
    const { shipment, adjustment } = newPrices;
    
    let subTotal = dataSource.reduce((sum, cur) => sum + cur.amount, 0);
    subTotal = accounting.toFixedNumber2(subTotal);
    let gst = accounting.calcGst(subTotal, applyGst);
    let totalPrice = accounting.toFixedNumber2(subTotal + gst + shipment + adjustment);
    setPrices({
      ...newPrices,
      totalPrice,
      gst,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { dataSource, prices } = this.props;
    if (prevProps.dataSource != dataSource) {
      this.updatePrices(prices);
    }
  }

  render() {
    const { dataSource, initialData, applyGst, prices } = this.props;
    const { totalPrice, gst, shipment = 0, adjustment = 0 } = prices;
    let subTotal = dataSource.reduce((prev, cur) => prev + cur.amount, 0);
    subTotal = accounting.toFixedNumber2(subTotal);

    return (
      <Box>
        <Row>
          <span>Sub Total</span>
          <Money>{subTotal.toFixed(2)}</Money>
        </Row>
        <Row>
          <span>GST (10%)</span>
          <Money>{gst.toFixed(2)}</Money>
        </Row>
        <Row>
          <span>Shipping Charges</span>
          <Input 
            maxLength={15}
            onChange={this.handleAdjustment(this.setShipping)}
            pattern="^[-]?(0|([1-9]\d{0,11}))(\.\d{1,2})?$"
            title="Please enter a number"
          />
          <Money>{shipment.toFixed(2)}</Money>
        </Row>
        <Row>
          <span>Adjustment</span>
          <Input
            maxLength={15}
            onChange={this.handleAdjustment(this.setAdjust)}
            pattern="^[-]?(0|([1-9]\d{0,11}))(\.\d{1,2})?$"
            title="Please enter a number"
          />
          <Money>{adjustment.toFixed(2)}</Money>
        </Row>
        <TotalWrapper>
          <span>Total</span>
          <Money>{totalPrice.toFixed(2)}</Money>
        </TotalWrapper>
      </Box>
    );
  }
}

export default Total;