import React, { Component } from 'react';
import { Input } from 'antd';
import styled from 'styled-components';
import './total.less';


const ShippingWrapper = styled.div`
  margin-top: 20px;
`;

const AdjustmentWrapper = styled.div`
  margin-top: 15px;
`
const TotalWrapper = styled.h2`
  margin-top: 20px;
`;

const TextWrapper = styled.span`
  font-size: 15px;
`;
class Total extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shipment: 0,
      adjustment: 0,
    };

    this.handleAdjustment = this.handleAdjustment.bind(this);
    this.setShipping = this.setShipping.bind(this);
    this.setAdjust = this.setAdjust.bind(this);
  }

  handleAdjustment(setter) {
    return (e) => {
      const { value } = e.target;
      const floatNumber = parseFloat(value);
      if(!floatNumber) return;

      return setter(floatNumber);
    }
  }

  setShipping(shipment) {
    this.setState({ shipment });
  };

  setAdjust(adjustment) {
    this.setState({ adjustment });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.dataSource != this.props.dataSource || prevState.shipment != this.state.shipment || prevState.adjustment != this.state.adjustment) {
      let subTotal = this.props.dataSource.reduce((prev, cur) => prev + cur.AMOUNT, 0);
      let total = subTotal + this.state.shipment + this.state.adjustment;
      this.props.getTotalPrice(total);
    } else {
      return false;
    }
  }

  render() {
    const { dataSource } = this.props;
    const { shipment, adjustment } = this.state;
    let subTotal = dataSource.reduce((prev, cur) => prev + cur.amount, 0);
    let total = subTotal + shipment + adjustment;
    return (
      <div className="total">
        <div>
          <TextWrapper>Sub Total</TextWrapper>
          <span>{subTotal}</span>
        </div>
        <ShippingWrapper>
          <TextWrapper>Shipping Charges</TextWrapper>
          <Input className="inp" onChange={this.handleAdjustment(this.setShipping)} type="text" />
          <span>{shipment}</span>
        </ShippingWrapper>
        <AdjustmentWrapper>
          <TextWrapper>Adjustment</TextWrapper>
          <Input
            className="inp"
            onChange={this.handleAdjustment(this.setAdjust)}
            style={{ marginLeft: 92 }}
            type="text"
          />
          <span>{adjustment}</span>
        </AdjustmentWrapper>
        <TotalWrapper>
          <span>Total</span>
          <span>{total}</span>
        </TotalWrapper>
      </div>
    );
  }
}

export default Total;