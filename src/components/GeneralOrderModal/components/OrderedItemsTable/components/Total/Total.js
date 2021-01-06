import React, { Component } from 'react';
import { Input, Form } from 'antd';
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

class Total extends Component {
  constructor(props) {
    super(props);
    const { initialData } = this.props;
    this.state = {
      shipment: initialData ? initialData.shipmentPrice : 0,
      adjustment: initialData ? initialData.adjustmentPrice : 0,
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
    this.setState({ shipment });
  };

  setAdjust(adjustment) {
    this.setState({ adjustment });
  };

  componentDidUpdate(prevProps, prevState) {
    const { dataSource, getPrice } = this.props;
    const { shipment, adjustment } = this.state;
    if (prevProps.dataSource != dataSource || prevState.shipment != shipment || prevState.adjustment != adjustment) {
      let subTotal = dataSource.reduce((prev, cur) => prev + cur.amount, 0);
      let total = subTotal + shipment + adjustment;
      getPrice(total, shipment, adjustment);
    } else {
      return false; 
    }
  }

  render() {
    const { dataSource, initialData, applyGst } = this.props;
    const { shipment, adjustment } = this.state;
    let subTotal = dataSource.reduce((prev, cur) => prev + cur.amount, 0);
    subTotal = accounting.toFixedNumber2(subTotal);
    let gst = accounting.calcGst(subTotal, applyGst);
    let total = subTotal + gst + shipment + adjustment;

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
            onChange={this.handleAdjustment(this.setShipping)}  
            pattern="^[-]?(0|([1-9]\d{1,11}))(\.\d{1,2})?$"
            title="Please enter a number"
          />
          <Money>{shipment.toFixed(2)}</Money>
        </Row>
        <Row>
          <span>Adjustment</span>
          <Input
            onChange={this.handleAdjustment(this.setAdjust)}
            pattern="^[-]?(0|([1-9]\d{1,11}))(\.\d{1,2})?$"
            title="Please enter a number"
          />
          <Money>{adjustment.toFixed(2)}</Money>
        </Row>
        <TotalWrapper>
          <span>Total</span>
          <Money>{total.toFixed(2)}</Money>
        </TotalWrapper>
      </Box>
    );
  }
}

export default Total;