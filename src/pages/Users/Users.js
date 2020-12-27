import React from "react";
import Page from '../../components/Page';
import UserDetailsModal from './components/UserDetailsModal';
import users from '../../apis/users';
import fields from './fields';
import ROUTES from '../../Routes';

const DEFAULT_COLUMNS = Object.keys(fields).filter((key) => fields[key].inTable);

const columns = DEFAULT_COLUMNS.map((key) => ({
  title: fields[key].title || fields[key].label,
  dataIndex: key,
}));

const Users = () => {
  return (
    <Page
      headerProps={{
        title: ROUTES.users.title,
        hasNewButton: false,
      }}
      searchBarProps={{
        placeholder: 'Search by user\'s name',
      }}
      tableProps={{
        columns: columns,
        rowKey: 'id',
      }}
      DetailsModal={UserDetailsModal}
      api={users}
    />
  );
};

export default Users;
