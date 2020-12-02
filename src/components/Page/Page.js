import React from 'react';
import { Table } from 'antd';
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
      // visibleModals: [],
      modal: null,
      // editing: false,
      rowId: '',
      itemData: null,
    };
  
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.setRowId = this.setRowId.bind(this);
    this.setEditing = this.setEditing.bind(this);
  }

  showModal(modal) {
    return (event) => {
      if (event) {
        event.preventDefault();
      }

      this.setState({ modal });
    };
  }

  hideModal() {
    this.setState({ modal: null });
  }

  setEditing(editing) {
    return (event) => {
      event && event.preventDefault();

      editing ? this.showModal('newItem')() : this.hideModal('newItem')();

      this.setState({
        editing,
      });
    }
  }

  async setRowId(id) {
    const { api } = this.props;

    this.showModal('details')();

    // if (!!id) {
    //   const { data } = await api.get(id);
    //   this.setState({ itemData: data });
    // }
    
    this.setState({
      rowId: id
    }, this.showModal('details'));
  }

  render() {
    const {
      children,
      headerProps,
      searchBarProps,
      newButtonProps,
      tableProps,
      NewItemModal,
      DetailsModal,
      api,
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
                  onClick: () => this.setRowId(record.id)
                };
              }}
              {...tableProps}
            />
          )}
          {NewItemModal && (
            <NewItemModal
              visible={modal == 'newItem'}
              // initialData={itemData}
              onCancel={this.hideModal}
            />
          )}
          {DetailsModal && (
            <DetailsModal
              visible={modal == 'details'}
              // visible
              onEditButtonClick={this.showModal('newItem')}
              onCancel={this.hideModal}
              // data={itemData}
              // rowId={this.state.rowId}
            />
          )}
          {children}
        </Content>
      </>
    );
  }
}

// const Page = ({
//   children,
//   headerProps,
//   searchBarProps,
//   newButtonProps,
//   tableProps,
//   Modal,
//   modalVisible,
//   showModal,
//   hideModal,
// }) => {
//   return (
//     <>
//       <Header
//         {...headerProps}
//         searchBarProps={searchBarProps}
//         onNewButtonClick={showModal}
//       />
//       <Content>
//         {tableProps && (
//           <Table
//             // sticky={true}
//             // scroll={{ y: 700 }}
//             {...tableProps}
//           />
//         )}
//         {Modal && (
//           <Modal
//             footer={null}
//             maskClosable={false}
//             destroyOnClose={true}
//             visible={modalVisible}
//             showModal={showModal}
//             hideModal={hideModal}
//           />
//         )}
//         {children}
//       </Content>
//     </>
//   );
// };

export default Page;
// export default withModal(Page);