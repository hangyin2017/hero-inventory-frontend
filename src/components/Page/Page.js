import React from 'react';
import { Table } from 'antd';
import Header from './components/Header';
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
}) => {
  return (
    <>
      <Header
        searchBarProps={searchBarProps}
        newButtonProps={newButtonProps}
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
        {children}
      </Content>
    </>
  );
};

export default Page;