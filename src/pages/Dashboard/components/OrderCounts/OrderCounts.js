import { Card, Col, Row, Statistic, message } from 'antd';
import React from 'react';


const cardStyle = {
  textAlign: 'center',
  borderRadius: 20,
};
class OrderCounts extends React.Component {

  constructor(props) {
    super(props);

    this.state={}

  }

  render() {
    return (
          <Card title="Orders Overview" style={cardStyle} hoverable={true}>
              <Row>
                <Col span={12}>
                  <Statistic title="Sales Orders" value={this.props.salesOrderCount} />
                  </Col>
                <Col span={12}>
                  <Statistic title="Purchase Orders" value={this.props.purchaseOrderCount} />
                </Col>
              </Row>
          </Card>
    );
  };
  }
  

export default OrderCounts;