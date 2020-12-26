import React from 'react';
import { Spin, message } from 'antd';
import styled from 'styled-components';
import Modal from '../../../../components/Modal';
import Header from './components/Header';
import DescriptionList from '../../../../components/DescriptionList';
import fields from '../../fields';
import withFetch from '../../../../components/withFetch';
import compose from '../../../../utils/compose';
import users from '../../../../apis/users';

const Content = styled.div`
  min-height: 60vh;
`;

class UserDetailsModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
    }

    this.refreshData = this.refreshData.bind(this);
    this.delete = this.delete.bind(this);
  }

  async componentDidUpdate(prevProps) {
    const { id } = this.props;

    if(!!id && id != prevProps.id){
      this.refreshData();
    }
  }

  async refreshData() {
    const { id, fetch } = this.props;
    
    if (!!id) {
      try {
        const data = await fetch(() => users.get(id));
        this.setState({ data });
      } catch(err) {
        message.error(`Something went wrong while fetching details for user ${id}`);
      }
    }
  }

  delete() {
    const { id, onCancel, refreshTableData, fetch } = this.props;
    
    if (!!id) {
      fetch(() => users.remove(id))
        .then(() => {
          onCancel();
          refreshTableData();
          message.success(`Successfully deleted user ${id}`);
        })
        .catch(() => message.error(this.props.error));
    }
  }

  render() {
    const { onCancel, refreshTableData, refreshDetailsData, loading, ...modalProps } = this.props;
    const { data } = this.state;


    return (
      <Modal
        title={<Header loading={loading} onDelete={this.delete} />}
        footer={null}
        onCancel={onCancel}
        width={1000}
        {...modalProps}   
      >
        <Spin size="large" spinning={loading}>
          <Content>
              <DescriptionList
                data={Object.keys(data)
                  .filter((key) =>  fields[key] && !!data[key])
                  .map((key) => ({
                    title: fields[key].title || fields[key].label,
                    value: data[key]
                  }))
                }
              />
          </Content>
        </Spin>
      </Modal>
    );
  }
}

const EnhancedUserDetailsModal = compose(
  withFetch(),
)(UserDetailsModal);

export default EnhancedUserDetailsModal;