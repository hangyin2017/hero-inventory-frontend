import React from 'react';
import { Table, message } from 'antd';
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
      tableData: [],
      loading: false,
      itemData: {},
    };
  
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.refreshTableData = this.refreshTableData.bind(this);
  }

  componentDidMount() {
    this.refreshTableData();
  }

  async refreshTableData() {
    const { api } = this.props;

    this.setState({ loading: true });

    try {
      const { data } = await api.getAll();
      this.setState({ tableData: data });
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

  handleRowClick(id) {
    return async (e) => {
      e && e.preventDefault();

      const { api } = this.props;
      
      if (!!id) {
        this.showModal('details')();

        try {
          const { data } = await api.get(id);
          this.setState({ itemData: data });
        } catch(err) {
          message.error(`Something went wrong while fetching details for item ${id}`);
          this.hideModal();
        }
      }
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

    const { modal, tableData, itemData } = this.state;

    return (
      <>
        <Header
          {...headerProps}
          searchBarProps={searchBarProps}
          onNewButtonClick={this.showModal('newItem')}
        />
        <Content>
          {tableProps && (
            <Table
              // sticky={true}
              // scroll={{ y: 700 }}
              dataSource={tableData}
              pagination= {{
                position: ['bottomRight'],
                defaultPageSize: 10,
              }}
              onRow={(record) => {
                return {
                  onClick: this.handleRowClick(record.id)
                };
              }}
              {...tableProps}
            />
          )}
          {NewItemModal && (
            <NewItemModal
              visible={modal == 'newItem'}
              onCancel={this.hideModal}
            />
          )}
          {DetailsModal && (
            <DetailsModal
              visible={modal == 'details'}
              onCancel={this.hideModal}
              data={itemData}
            />
          )}
          {children}
        </Content>
      </>
    );
  }
}

export default Page;
// export default withModal(Page);