import React from 'react';
import styled from 'styled-components';
import { Col, Row, Divider, message } from "antd";
import Page from '../../components/Page';
import ItemCounts from './components/ItemCounts';
import DashboardCalendar from './components/DashboardCalendar';
import OrderCounts from './components/OrderCounts';
import TotalAmount from './components/TotalAmount';
import withFetch from '../../components/withFetch';
import compose from '../../utils/compose';
import dashboard from '../../apis/dashboard';
import ROUTES from '../../routes.ts';

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
    const { loading } = this.props;
    const { data } = this.state;
    const {
      itemCount = 0,
      lowStockItemCount = 0,
      salesOrderCount = 0,
      purchaseOrderCount = 0,
      totalSalesOrderPrice = 0,
      totalPurchaseOrderPrice = 0,
    } = data;

    return (
      <Page
        headerProps={{
          title: ROUTES.dashboard.title,
        }}
      >
        <StyledRow>
          <LeftCol span={8}>
            <ItemCounts 
              loading={loading}
              itemCount={itemCount}
              lowStockItemCount={lowStockItemCount}
            />
            <OrderCounts
              loading={loading}
              salesOrderCount={salesOrderCount}
              purchaseOrderCount={purchaseOrderCount}
            />
            <TotalAmount
              loading={loading}
              totalSalesOrderPrice={totalSalesOrderPrice}
              totalPurchaseOrderPrice={totalPurchaseOrderPrice}
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

const EnhancedDashboard = compose(
  withFetch(),
)(Dashboard);

export default EnhancedDashboard;
