import React from 'react';
import { Table } from 'antd';
import Header from './components/Header';
import withModal from '../withModal';
import styled from 'styled-components';

const Content = styled.div`
  width: 100%;
  height: calc(100vh - 130px);
  position: relative;
  overflow-y: auto;
`;

const Page = ({
  children,
  headerProps,
  searchBarProps,
  newButtonProps,
  tableProps,
  Modal,
  modalVisible,
  showModal,
  onModalSave,
  onModalCancel,
}) => {
  return (
    <>
      <Header
        searchBarProps={searchBarProps}
        newButtonProps={{
          ...newButtonProps,
          onClick: showModal,
        }}
        {...headerProps}
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
            onSave={onModalSave}
            onCancel={onModalCancel}
          />
        )}
        {children}
      </Content>
    </>
  );
};

export default withModal(Page);