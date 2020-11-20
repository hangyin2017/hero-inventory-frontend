import React from 'react';
import Header from './components/Header';

const Page = ({ children, ...headerProps }) => {
  return (
    <>
      <Header {...headerProps} />
      {children}
    </>
  );
};

export default Page;