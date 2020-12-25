import React from "react";
import Page from '../../components/Page';
import customers from '../../apis/customers';
import NewCustomerModal from './components/NewCustomerModal';
import CustomerDetailModal from './components/CustomerDetailModal';
import ROUTES from "../../Routes";
import fields from './fields';

const DEFAULT_COLUMNS = Object.keys(fields).filter((key) => fields[key].inTable);

const columns = DEFAULT_COLUMNS.map((key) => ({
  title: fields[key].title || fields[key].label,
  dataIndex: key,
}));

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
          title: ROUTES.customers.title,
          hasNewButton: true,
        }}
        searchBarProps={{
          placeholder: 'Search by customer\'s name',
        }}
        tableProps={{
          columns: columns,
          rowKey: 'id',
        }}
        NewModal={NewCustomerModal}
        DetailsModal={CustomerDetailModal}
        api={customers}
      />
    )
  }    
}

export default Customers;
