import React from 'react';
import { message, Row, Col, Spin, Button } from 'antd';
import styled from 'styled-components';
import salesOrders from '../../apis/salesOrders';
import withFetch from '../../components/withFetch';
import Modal from '../../components/Modal';
import Header from './components/Header';
import DescriptionList from '../../components/DescriptionList';
import NewSalesOrderModal from '../../pages/SalesOrders/components/NewSalesOrderModal';
import NewPurchaseOrderModal from '../../pages/PurchaseOrders/components/NewPurchaseOrderModal';
import ItemTable from './components/ItemTable';
import moment from 'moment';


const Content = styled(Row)`
  min-height: 60vh;
`;

const Meta = styled(Col).attrs({ span: 24, md: 18 })`
`;

class GeneralOrderDetailModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      editing: false
    }

    this.setEditing = this.setEditing.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.delete = this.delete.bind(this);
  }

  async componentDidUpdate(prevProps) {
    const { id } = this.props;

    if (!!id & id != prevProps.id) {
      this.refreshData();
    }
  }

  async refreshData() {
    const { id, fetch, orderAPI } = this.props;

    if (!!id) {
      try {
        if (orderAPI == salesOrders) {
          const data = await fetch(() => orderAPI.get(id));
          console.log(data);
          data.date = moment(data.date);
          this.setState({ data });
        } else {
          const data = await fetch(() => orderAPI.get(id));
          console.log(data);
          data.date = moment(data.date);
          this.setState({ data });
        }
      } catch (err) {
        message.error(`Something went wrong while fetching details for order ${id}`);
      }
    }
  }

  setEditing(editing) {
    return (e) => { this.setState({ editing }) };
  }

  onCancel = () => {
    this.setState({ editing: false });
    this.props.onCancel();
  }

  async delete() {
    const { id, onCancel, refreshTableData, fetch, orderAPI } = this.props;

    if (!!id) {
      try {
        if (orderAPI == salesOrders) {
          await fetch(() => orderAPI.remove(id));
          onCancel();
          refreshTableData();
          message.success(`Successfully deleted order ${id}`);
        } else {
          await fetch(() => orderAPI.remove(id));
          onCancel();
          refreshTableData();
          message.success(`Successfully deleted order ${id}`);
        }
      } catch (err) {
        message.error(`Something went wrong while deleting order ${id}`);
      }
    }
  }

  render() {
    const { onCancel, refreshTableData, refreshDetailsData, loading, error, fetch, id, fields, orderAPI, ...modalProps } = this.props;
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
                data={Object.keys(fields)
                  .filter((key) => fields[key].inDetails && !!fields[key])
                  .map((key) => ({
                    title: fields[key].title || fields[key].label,
                    value: data[key]
                  }))
                }
              />
            </Meta>
          </Content>
          <ItemTable
            id={id}
            orderAPI={orderAPI}
          />
        </Spin>
        { orderAPI == salesOrders
          ?
          <NewSalesOrderModal
            visible={editing}
            initialData={data}
            onCancel={this.onCancel}
          />
          :
          <NewPurchaseOrderModal
            visible={editing}
            initialData={data}
            onCancel={this.onCancel}
          />
        }
        <Button onClick={onCancel}>Cancel</Button>
      </Modal>
    )
  }
}

export default withFetch(GeneralOrderDetailModal);