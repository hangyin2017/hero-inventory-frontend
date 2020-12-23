
import React from "react";
import Page from '../../components/Page';
import dashboard from '../../apis/dashboard';
import ItemCounts from "./components/ItemCounts";
import DashboardCalendar from "./components/DashboardCalendar";
import PAGES from '../../pages';
import { Col, Row, Divider } from "antd";
import styled from 'styled-components';
import OrderCounts from "./components/OrderCounts";

const StyledCol = styled(Col)`
display: flex;
flex-direction: column;
justify-content: space-between;
`
const Footer = styled.div`
text-align:center;
`
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
      >
        <Row>
        <StyledCol span={8}>
          <ItemCounts />
          <OrderCounts />
        </StyledCol>
        <Col span={16}>
          <DashboardCalendar />
        </Col>
      </Row>
      <Divider />
      <Footer> © 2020, Hero Inventory Group. All Rights Reserved. </Footer>
      </Page>
    );
  };
}

export default Dashboard;
