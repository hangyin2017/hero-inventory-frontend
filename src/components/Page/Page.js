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
      itemData: null,
    };
  
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
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

    const { modal, itemData } = this.state;

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
              // visible
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