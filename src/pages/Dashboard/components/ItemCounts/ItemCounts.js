import { Card, Col, Row, Statistic, message } from 'antd';
import React from 'react';



const cardStyle = {
  textAlign: 'center',
  borderRadius: 20,
};
class ItemCounts extends React.Component {

  constructor(props) {
    super(props);

    this.state={}

  }

  render() {
    return (
      <Card title="Stock Overview" style={cardStyle} hoverable={true}>
        <Row>
          <Col span={12}>
            <Statistic title="All Items" value={this.props.itemCount} />
          </Col>
          <Col span={12}>
            <Statistic title="Low Stock Items" value={this.props.lowStockItemCount}  valueStyle={{ color: '#cf1322' }} />
          </Col>
        </Row>
      </Card>
    );
  };
}
  

export default ItemCounts;