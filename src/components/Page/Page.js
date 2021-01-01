import React from 'react';
import styled from 'styled-components';
import { Table, Spin, message } from 'antd';
import Header from './components/Header';
import Footer from './components/Footer';
import withModal from '../withModal';
import withFetch from '../withFetch';
import compose from '../../utils/compose';
import debounce from '../../utils/debounce';
import throttle from '../../utils/throttle';

const Content = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: auto;
`;

class Page extends React.Component {
  constructor(props) {
    super(props);

    this.FIELDS = this.props.FIELDS;

    this.state = {
      modal: null,
      data: [],
      rowId: '',
    };
  
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.setRowId = this.setRowId.bind(this);
    this.refreshData = this.refreshData.bind(this);
  }

  componentDidMount() {
    this.refreshData();
  }

  refreshData() {
    const { api, fetch } = this.props;
    if(!api) { return; }

    fetch(() => api.getAll())
      .then((data) => this.setState({ data }))
      .catch((err) => message.error(`Something went wrong while fetching data`));
  }

  showModal(modal) {
    return (e) => {
      e && e.preventDefault();

      this.setState({ modal });
    };
  }

  hideModal() {
    this.setState({ modal: null });
  }

  setRowId(rowId) {
    return async (e) => {
      e && e.preventDefault();
      this.setState({ rowId });
      this.showModal('details')();
    }
  }

  search(input) {
    const { api, fetch } = this.props;
    if(!api) { return; }
    
    fetch(() => api.filter(input))
      .then((data) => this.setState({ data }))
      .catch((err) => message.error(`Something went wrong while fetching data`));
  }

  debouncedSearch = debounce((e) => this.search(e.target.value), 1000);

  throttledSearch = throttle((input) => this.search(input), 1000);

  render() {
    const {
      children,
      headerProps,
      searchBarProps,
      tableProps,
      NewModal,
      DetailsModal,
      // modalVisible,
      // showModal,
      // hideModal,
      loading,
    } = this.props;

    const { modal, data, rowId } = this.state;
    const formattedData = data.map((row) => Object.keys(row)
      .reduce((obj, key) => ({
        ...obj,
        [key]: this.FIELDS[key]?.formatter ? this.FIELDS[key].formatter(row[key]) : row[key],
      }), {}));
    
    return (
      <>
        <Header
          {...headerProps}
          searchBarProps={{
            onChange: this.debouncedSearch,
            onSearch: this.throttledSearch,
            ...searchBarProps,
          }}
          onNewButtonClick={this.showModal('new')}
        />
        <Content>
          <Spin size="large" spinning={loading}>
            {tableProps && (
              <Table
                dataSource={formattedData}
                pagination= {{
                  position: ['bottomRight'],
                  defaultPageSize: 10,
                }}
                scroll={{ x: 1500, y: 680 }}
                onRow={(record) => {
                  return {
                    onClick: this.setRowId(record.id)
                  };
                }}
                {...tableProps}
              />
            )}
            {NewModal && (
              <NewModal
                visible={modal === 'new'}
                onCancel={this.hideModal}
                refreshTableData={this.refreshData}
              />
            )}
            {DetailsModal && (
              <DetailsModal
                visible={modal === 'details'}
                onCancel={this.hideModal}
                id={rowId}
                refreshTableData={this.refreshData}
              />
            )}
            {React.Children.map(children, (child) => (
              React.cloneElement(child, { loading, data })
            ))}
          </Spin>
        </Content>
        <Footer />
      </>
    );
  }
}

const EnhancedPage = compose(
  withFetch(),
)(Page);

export default EnhancedPage;