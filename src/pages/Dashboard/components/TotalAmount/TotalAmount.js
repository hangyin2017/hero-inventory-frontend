import { Card, Col, Row, Statistic, message } from 'antd';
import React from 'react';


const cardStyle = {
  textAlign: 'center',
  borderRadius: 20,
};
class TotalAmount extends React.Component {

  constructor(props) {
    super(props);

    this.state={}

  }

  render() {
    return (
          <Card title="Total Orders Amount" style={cardStyle} hoverable={true}>
              <Row>
                <Col span={12}>
                  <Statistic title="Sales Amount" value={"$" + this.props.totalSalesOrderPrice} />
                  </Col>
                <Col span={12}>
                  <Statistic title="Purchase Amount" value={"$" + this.props.totalPurchaseOrderPrice} />
                </Col>
              </Row>
          </Card>
    );
  };
  }
  

export default TotalAmount;