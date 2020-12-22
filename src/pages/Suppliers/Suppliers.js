import React from "react";
import Page from '../../components/Page';
import suppliers from '../../apis/suppliers';
import NewSupplierModal from './components/NewSupplierModal';
import SupplierDetailModal from './components/SupplierDetailModal';
import PAGES from '../../pages';
import fields from './fields';

const DEFAULT_COLUMNS = Object.keys(fields).filter((key) => fields[key].inTable);

const columns = DEFAULT_COLUMNS.map((key) => ({
  title: fields[key].title || fields[key].label,
  dataIndex: key,
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
          title: PAGES.suppliers.title,
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