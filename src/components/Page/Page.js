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
      visibleModals: [],
      editing: false,
      rowId: '',
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

      const visibleModals = [...this.state.visibleModals, modal];
      this.setState({ visibleModals });
    };
  }

  hideModal() {
    const visibleModals = this.state.visibleModals.slice(0, -1);
    this.setState({ visibleModals });
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

  setRowId(id) {
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
      // modalVisible,
      // showModal,
      // hideModal,
    } = this.props;

    const { visibleModals, editing } = this.state;

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
              footer={null}
              maskClosable={false}
              destroyOnClose={true}
              visible={visibleModals.find((modal) => modal == 'newItem')}
              editing={editing}
              onCancel={this.hideModal}
            />
          )}
          {DetailsModal && (
            <DetailsModal
              visible={visibleModals.find((modal) => modal == 'details')}
              // visible
              onEditButtonClick={this.setEditing(true)}
              onCancel={this.hideModal}
              rowId={this.state.rowId}
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