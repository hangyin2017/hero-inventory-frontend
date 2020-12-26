
import React from 'react';
import Page from '../../components/Page';
import dashboard from '../../apis/dashboard';
import ItemCounts from './components/ItemCounts';
import DashboardCalendar from './components/DashboardCalendar';
import ROUTES from '../../Routes';
import { Col, Row, Divider, message } from "antd";
import styled from 'styled-components';
import OrderCounts from './components/OrderCounts';
import TotalAmount from './components/TotalAmount';
import withFetch from '../../components/withFetch';

const LeftCol = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const RightCol = styled(Col)`
`;

const StyledRow = styled(Row)`
  margin: 20px 20px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
`;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
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
      message.error(`Something went wrong while fetching dashboard details`);
    }
  }

  render() {
    return (
      <Page
        headerProps={{
          title: ROUTES.dashboard.title,
        }}
        api={dashboard}
      >
        <StyledRow>
          <LeftCol span={8}>
            <ItemCounts 
              itemCount={this.state.data.itemCount}
              lowStockItemCount={this.state.data.lowStockItemCount}
            />
            <OrderCounts
              salesOrderCount={this.state.data.salesOrderCount}
              purchaseOrderCount={this.state.data.purchaseOrderCount}
            />
            <TotalAmount
              totalSalesOrderPrice={this.state.data?.totalSalesOrderPrice}
              totalPurchaseOrderPrice={this.state.data?.totalPurchaseOrderPrice}
            />
          </LeftCol>
          <RightCol span={14}>
            <DashboardCalendar />
          </RightCol>
        </StyledRow>
        <Divider />
      </Page>
    );
  };
}

export default withFetch()(Dashboard);
