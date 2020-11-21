import React, { Component } from 'react'
import {Input} from 'antd';
import './total.less'
export default class Total extends Component {
    constructor(){
        super();
        this.state = {
            ship: 0,
            adjust: 0
        }
    }
    inputShipping = (e)=>{
        this.setState({
            ship:parseInt(e.target.value)
        })
    }
    inputAdjust = (e)=>{
        this.setState({
            adjust:parseInt(e.target.value)
        })
    }
    render() {
        const {dataSource} = this.props;
        console.log(dataSource);
        let sum = dataSource.reduce((prev,cur)=>prev+cur.AMOUNT,0)
        return (
            <div className='total'>
                <div>
                    <span>Sub Total</span>
                    <span>{sum.toFixed(2)}</span>
                </div>
                <div>
                    <p>
                        <span>Shipping Charges</span>
                        <Input className='inp' onChange={this.inputShipping} type="text"/>
                    </p>
                    <span>{this.state.ship.toFixed(2)}</span>
                </div>
                <div>
                    <p>
                        <Input value={'Adjustment'} type="text" />
                        <Input className='inp' onChange={this.inputAdjust} style={{marginLeft:64}} type="text"/>
                    </p>
                    <span>{this.state.adjust.toFixed(2)}</span>
                </div>
                <h2>
                    <span>Total（$）</span>
                    <span>{(sum+this.state.ship+this.state.adjust).toFixed(2)}</span>
                </h2>
            </div>
        )
    }
}
