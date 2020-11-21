import React from 'react';
import { Table } from 'antd';
import Header from './components/Header';

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
        {...headerProps}
        searchBarProps={searchBarProps}
        newButtonProps={newButtonProps}
      />
      {tableProps && (
        <Table {...tableProps} />
      )}
      {children}
    </>
  );
};

export default Page;