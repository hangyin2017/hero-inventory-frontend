import React from "react";
import Page from '../../components/Page';
import NewCustomerModal from './components/NewCustomerModal';
import PAGES from "../../pages";
import NewItemModal from "../Inventory/components/NewItemModal";



class Customers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }

  }

  render() {
    return (
      <Page
        headerProps={{
          title: PAGES.customers.title,
          hasNewButton: true,
        }}
        // searchBarProps={{
        //   placeholder: 'Search by customer\'s name',
        // }}
        // tableProps={{
        //   columns: columns,
        //   rowKey: 'id',
        // }}
        NewModal={NewCustomerModal}
        // api={customers}
      />
    )
  }    
}

export default Customers;
