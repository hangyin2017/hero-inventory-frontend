import React from 'react';
import { Table } from 'antd';
import Header from './components/Header';

const Page = ({
  children,
  headerProps,
  searchBarProps,
  newButtonProps,
  itemDetailButtonProps,
  tableProps,
}) => {
  return (
    <>
      <Header
        {...headerProps}
        searchBarProps={searchBarProps}
        newButtonProps={newButtonProps}
        itemDetailButtonProps={itemDetailButtonProps}
      />
      {tableProps && (
        <Table {...tableProps} />
      )}
      {children}
    </>
  );
};

export default Page;