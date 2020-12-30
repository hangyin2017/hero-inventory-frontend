import React from 'react';
import Page from '../../components/Page';
import NewCustomerModal from './components/NewCustomerModal';
import CustomerDetailModal from './components/CustomerDetailModal';
import customers from '../../apis/customers';
import getColumns from '../../utils/getColumns';
import ROUTES from '../../Routes';
import FIELDS from './fields';

const columns = getColumns(FIELDS);

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
          hasSearchBar: true,
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
