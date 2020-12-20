
import React from "react";
import Page from '../../components/Page';
import dashboard from '../../apis/dashboard';
import ItemCounts from "./components/ItemCounts";


export const Dashboard = () => {

  return (
    <Page
      headerProps={{
        title: 'Dashboard',
      }}
      api={dashboard}
    ><ItemCounts></ItemCounts>
    </Page>
  );
};

export default Dashboard;
