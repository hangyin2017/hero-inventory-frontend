import { Card, Col, Row, Statistic, message } from "antd";
import React from "react";
import dashboard from "../../../../apis/dashboard";
import withFetch from '../../../../components/withFetch';


const cardStyle = {
  textAlign: 'center',
  margin: 20,
  marginTop: 10,
  marginBottom:10,
};
class TotalAmount extends React.Component {

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
          <Card title="Total Orders Amount" style={cardStyle} hoverable={true}>
              <Row>
                <Col span={12}>
                  <Statistic title="Sales Amount" value={"$" + this.state.data.totalSalesOrderPrice} />
                  </Col>
                <Col span={12}>
                  <Statistic title="Purchase Amount" value={"$" + this.state.data.totalPurchaseOrderPrice} />
                </Col>
              </Row>
          </Card>
    );
  };
  }
  

export default withFetch(TotalAmount);