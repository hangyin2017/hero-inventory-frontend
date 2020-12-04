import React from 'react';
import styled from 'styled-components';
import { Table, Spin, message } from 'antd';
import Header from './components/Header';
import withModal from '../withModal';
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

    this.state = {
      modal: null,
      data: [],
      loading: false,
      rowId: '',
    };
  
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.setRowId = this.setRowId.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.debouncedSearch = this.debouncedSearch.bind(this);
    this.throttledSearch = this.throttledSearch.bind(this);
  }

  componentDidMount() {
    this.refreshData();
  }

  async refreshData() {
    const { api } = this.props;

    this.setState({ loading: true });

    try {
      const { data } = await api.getAll();
      this.setState({ data });
    } catch(err) {
      message.error(`Something went wrong while fetching data`);
    } finally {
      this.setState({ loading: false });
    }
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

  async search(input) {
    const { api } = this.props;
    
    this.setState({ loading: true });

    const { data } = await api.filter(input);

    this.setState({
      data,
      loading: false,
    });
  }

  debouncedSearch = debounce((e) => this.search(e.target.value), 1000);

  throttledSearch = throttle((input) => this.search(input), 1000);

  render() {
    const {
      children,
      headerProps,
      searchBarProps,
      tableProps,
      NewItemModal,
      DetailsModal,
      // modalVisible,
      // showModal,
      // hideModal,
    } = this.props;

    const { modal, data, loading, rowId } = this.state;

    return (
      <>
        <Header
          {...headerProps}
          searchBarProps={{
            onChange: this.debouncedSearch,
            onSearch: this.throttledSearch,
            ...searchBarProps,
          }}
          onNewButtonClick={this.showModal('newItem')}
        />
        <Content>
          <Spin size="large" spinning={loading}>
            {tableProps && (
              <Table
                // sticky={true}
                // scroll={{ y: 700 }}
                dataSource={data}
                pagination= {{
                  position: ['bottomRight'],
                  defaultPageSize: 10,
                }}
                onRow={(record) => {
                  return {
                    onClick: this.setRowId(record.id)
                  };
                }}
                {...tableProps}
              />
            )}
            {NewItemModal && (
              <NewItemModal
                visible={modal == 'newItem'}
                onCancel={this.hideModal}
                refreshTableData={this.refreshData}
              />
            )}
            {DetailsModal && (
              <DetailsModal
                visible={modal == 'details'}
                onCancel={this.hideModal}
                id={rowId}
                refreshTableData={this.refreshData}
              />
            )}
            {children}
          </Spin>
        </Content>
      </>
    );
  }
}

export default Page;
// export default withModal(Page);