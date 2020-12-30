import React from 'react';
import Page from '../../components/Page';
import UserDetailsModal from './components/UserDetailsModal';
import users from '../../apis/users';
import getColumns from '../../utils/getColumns';
import FIELDS from './fields';
import ROUTES from '../../Routes';

const columns = getColumns(FIELDS);

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
      FIELDS={FIELDS}
    />
  );
};

export default Users;
