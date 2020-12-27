import React from "react";
import Page from '../../components/Page';
import suppliers from '../../apis/suppliers';
import NewSupplierModal from './components/NewSupplierModal';
import SupplierDetailModal from './components/SupplierDetailModal';
import ROUTES from '../../Routes';
import fields from './fields';

const DEFAULT_COLUMNS = Object.keys(fields).filter((key) => fields[key].inTable);

const columns = DEFAULT_COLUMNS.map((key) => ({
  title: fields[key].title || fields[key].label,
  dataIndex: key,
  sorter: (a, b) => {
    let stringA = a.name.toUpperCase();
    let stringB = b.name.toUpperCase();
    if (stringA < stringB) {
      return -1;
    }
    if (stringA > stringB) {
      return 1;
    }
    return 0;
  },
}));
class Suppliers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }

  }

  render() {
    return (
      <Page
        headerProps={{
          title: ROUTES.suppliers.title,
          hasNewButton: true,
          hasSearchBar: true,
        }}
        searchBarProps={{
          placeholder: 'Search by supplier\'s name',
        }}
        tableProps={{
          columns: columns,
          rowKey: 'id',
        }}
        NewModal={NewSupplierModal}
        DetailsModal={SupplierDetailModal}
        api={suppliers}
      />
    )
  }    
}

export default Suppliers;