
import React from "react";
import Page from '../../components/Page';
import dashboard from '../../apis/dashboard';
import ItemCounts from "./components/ItemCounts";
import DashboardCalendar from "./components/DashboardCalendar";
import PAGES from '../../pages';
import { Col, Row, Divider } from "antd";
import styled from 'styled-components';
import OrderCounts from "./components/OrderCounts";
import TotalAmount from "./components/TotalAmount";

const LeftCol = styled(Col)`
display: flex;
flex-direction: column;
justify-content: space-between;
`
const RightCol = styled(Col)`

`
const StyledRow = styled(Row)`
margin: 20px 20px;
display: flex;
flex-wrap: nowrap;
justify-content: space-around;
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
        <StyledRow>
        <LeftCol span={8}>
          <ItemCounts />
          <OrderCounts />
          <TotalAmount />
        </LeftCol>
        <RightCol span={14}>
          <DashboardCalendar />
        </RightCol>
      </StyledRow>
      <Divider />
      <Footer> © 2020, Hero Inventory Group. All Rights Reserved. </Footer>
      </Page>
    );
  };
}

export default Dashboard;
