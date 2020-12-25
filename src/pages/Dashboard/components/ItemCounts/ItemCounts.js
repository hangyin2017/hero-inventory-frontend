import { Card, Col, Row, Statistic, message } from "antd";
import React from "react";
import dashboard from "../../../../apis/dashboard";
import withFetch from '../../../../components/withFetch';


const cardStyle = {
  textAlign: 'center',
};
class ItemCounts extends React.Component {

  constructor(props) {
    super(props);

    this.state={
      data:{},
    }

  }

  async componentDidMount() {
    this.refreshData();
  }

  async refreshData() {
    const { fetch } = this.props;

    try {
      const data = await fetch(() => dashboard.getAll());
      this.setState({ data });
    } catch(err) {
      message.error(`Something went wrong while fetching details`);
    }
  }


  render() {
    return (
          <Card title="Stock Overview" style={cardStyle} hoverable={true}>
              <Row>
                <Col span={12}>
                  <Statistic title="All Items" value={this.state.data.itemCount} />
                  </Col>
                <Col span={12}>
                  <Statistic title="Low Stock Items" value={this.state.data.lowStockItemCount}  valueStyle={{ color: '#cf1322' }} />
                </Col>
              </Row>
          </Card>
    );
  };
  }
  

export default withFetch(ItemCounts);