
import React from "react";
import Page from '../../components/Page';
import dashboard from '../../apis/dashboard';
import ItemCounts from "./components/ItemCounts";
import PAGES from '../../pages';
import { Col, Row } from "antd";


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
        <Col span={10}>
          <ItemCounts />
        </Col>
      </Row>
      </Page>
    );
  };
}

export default Dashboard;
