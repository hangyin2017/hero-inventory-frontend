
import React from "react";
import Page from '../../components/Page';
import dashboard from '../../apis/dashboard';
import ItemCounts from "./components/ItemCounts";
import DashboardCalendar from "./components/DashboardCalendar";
import PAGES from '../../pages';
import { Col, Row } from "antd";
import OrderCounts from "./components/OrderCounts";


class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    return (
      <Page
        headerProps={{
          title: PAGES.dashboard.title,
        }}
        api={dashboard}
      ><Row>
        <Col span={8}>
          <ItemCounts />
          <OrderCounts />
        </Col>
        <Col span={16}>
          <DashboardCalendar />
        </Col>
      </Row>
      </Page>
    );
  };
}

export default Dashboard;
