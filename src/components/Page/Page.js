import React from 'react';
import { Table } from 'antd';
import Header from './components/Header';
import withModal from '../withModal';
import styled from 'styled-components';

const Content = styled.div`
  width: 100%;
  position: relative;
  overflow-y: auto;
`;

const Page = ({
  children,
  headerProps,
  searchBarProps,
  tableProps,
  Modal,
  modalVisible,
  showModal,
  hideModal,
}) => {
  return (
    <>
      <Header
        {...headerProps}
        searchBarProps={searchBarProps}
        onNewButtonClick={showModal}
      />
      <Content>
        {tableProps && (
          <Table
            // sticky={true}
            // scroll={{ y: 700 }}
            {...tableProps}
          />
        )}
        {Modal && (
          <Modal
            footer={null}
            maskClosable={false}
            destroyOnClose={true}
            visible={modalVisible}
            showModal={showModal}
            hideModal={hideModal}
          />
        )}
        {children}
      </Content>
    </>
  );
};

export default withModal(Page);