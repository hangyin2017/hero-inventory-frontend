import React, { Component } from 'react';
import { Input } from 'antd';
import './total.less';

export default class Total extends Component {
  constructor() {
    super();
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

  render() {
    const { dataSource } = this.props;
    const { shipment, adjustment} = this.state;
    let sum = dataSource.reduce((prev, cur) => prev + cur.AMOUNT, 0);
    return (
      <div className="total">
        <div>
          <span>Sub Total</span>
          <span>{ sum }</span>
        </div>
        <div>
          <p>
            <span>Shipping Charges</span>
            <Input className="inp" onChange={ this.inputShipping } type="text" />
          </p>
          <span>{ shipment }</span>
        </div>
        <div>
          <p>
            <Input value={"Adjustment"} type="text" />
            <Input
              className="inp"
              onChange={ this.inputAdjust }
              style={{ marginLeft: 64 }}
              type="text"
            />
          </p>
          <span>{ adjustment }</span>
        </div>
        <h2>
          <span>Total（$）</span>
          <span>{ (sum + shipment + adjustment) }</span>
        </h2>
      </div>
    );
  }
}
