import React from 'react';
import { Table, Spin, message } from 'antd';
import Header from './components/Header';
import withModal from '../withModal';
import styled from 'styled-components';

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
          searchBarProps={searchBarProps}
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
            {/* <Modal
              title='test'
              width={1000}
              visible
            > */}
          </Spin>
        </Content>
      </>
    );
  }
}

export default Page;
// export default withModal(Page);