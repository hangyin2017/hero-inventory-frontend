import React from 'react';
import { Row, Col, Spin, message } from 'antd';
import styled from 'styled-components';
import customers from '../../../../apis/customers';
import Modal from '../../../../components/Modal';
import NewCustomerModal from '../NewCustomerModal';
import Header from './components/Header';
import DescriptionList from '../../../../components/DescriptionList';
import fields from '../../fields';
import withFetch from '../../../../components/withFetch';

const Content = styled(Row)`
  min-height: 60vh;
`;

const Meta = styled(Col).attrs({ span: 24, md: 24 })`
`;


class CustomerDetailModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      editing: false,
    };

    this.setEditing = this.setEditing.bind(this);
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
        const data = await fetch(() => customers.get(id));
        this.setState({ data });
      } catch(err) {
        message.error(`Something went wrong while fetching details for customer ${id}`);
      }
    }
  }

  setEditing(editing) {
    return (e) => {
      this.setState({ editing });
    }
  }

  async delete() {
    const { id, onCancel, refreshTableData, fetch } = this.props;
    
    if (!!id) {
      try {
        await fetch(() => customers.remove(id));

        onCancel();
        refreshTableData();
        message.success(`Successfully deleted customer ${id}`);
      } catch(err) {
        message.error(`Something went wrong while deleting customer ${id}`);
      }
    }
  }

  render() {
    const { onCancel, refreshTableData, refreshDetailsData, loading, error, fetch, ...modalProps } = this.props;
    const { data, editing } = this.state;

    return (
      <Modal
        title={<Header onEdit={this.setEditing(true)} loading={loading} onDelete={this.delete} />}
        footer={null}
        onCancel={onCancel}
        width={1000}
        {...modalProps}   
      >
        <Spin size="large" spinning={loading}>
          <Content>
            <Meta>
              <DescriptionList
                data={Object.keys(data)
                  .filter((key) =>  fields[key] && !!data[key])
                  .map((key) => ({
                    title: fields[key].title || fields[key].label,
                    value: data[key]
                  }))
                }
              />
            </Meta>
          </Content>
        </Spin>
        <NewCustomerModal
          visible={editing}
          initialData={data}
          onCancel={this.setEditing(false)}
          refreshTableData={refreshTableData}
          refreshDetailsData={this.refreshData}
        />
      </Modal>
    );
  }
}

export default withFetch()(CustomerDetailModal);