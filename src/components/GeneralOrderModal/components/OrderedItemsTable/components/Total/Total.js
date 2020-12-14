import React, { Component } from 'react';
import { Input } from 'antd';
import './total.less';

export default class Total extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shipment: 0,
      adjustment: 0,
    };
  }

  inputShipping = (e) => {
    this.setState({
      shipment: parseInt(e.target.value),
    });
  };

  inputAdjust = (e) => {
    this.setState({
      adjustment: parseInt(e.target.value),
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.dataSource != this.props.dataSource || prevState.shipment != this.state.shipment || prevState.adjustment != this.state.adjustment) {
      let subTotal = this.props.dataSource.reduce((prev, cur) => prev + cur.AMOUNT, 0);
      let total = subTotal + this.state.shipment + this.state.adjustment;
      this.props.getTotalPrice(total)
    } else {
      return false;
    }
  }

  render() {
    const { dataSource } = this.props;
    const { shipment, adjustment } = this.state;
    let subTotal = dataSource.reduce((prev, cur) => prev + cur.AMOUNT, 0);
    let total = subTotal + shipment + adjustment;
    return (
      <div className="total">
        <div>
          <span>Sub Total</span>
          <span>{subTotal}</span>
        </div>
        <div>
          <p>
            <span>Shipping Charges</span>
            <Input className="inp" onChange={this.inputShipping} type="text" />
          </p>
          <span>{shipment}</span>
        </div>
        <div>
          <p>
            <Input value={"Adjustment"} type="text" />
            <Input
              className="inp"
              onChange={this.inputAdjust}
              style={{ marginLeft: 64 }}
              type="text"
            />
          </p>
          <span>{adjustment}</span>
        </div>
        <h2>
          <span>Total</span>
          <span>{total}</span>
        </h2>
      </div>
    );
  }
}
