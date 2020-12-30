import React from 'react';
import { message, Row, Col, Spin, Progress } from 'antd';
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

const OrderProgress = styled(Col).attrs({ span: 24, md: 6, })`
  display: flex;
  flex-direction: column;
`;

const ProgressTitle = styled.span`
  text-align: center;
  font-size: 16px;
  font-weight: 500;
`;

const StyledProgress = styled(Progress)`
  width: 120px;
  margin: 20px auto;
`;

class GeneralOrderDetailModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      editing: false,
      status: '',
    }

    this.setEditing = this.setEditing.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.delete = this.delete.bind(this);
    this.confirmOrder = this.confirmOrder.bind(this);
    this.closeOrder = this.closeOrder.bind(this);
  }

  async componentDidUpdate(prevProps) {
    const { id } = this.props;

    if (!!id & id != prevProps.id) {
      this.refreshData();
    }
  }

  async refreshData() {
    const { id, fetch, orderApi } = this.props;

    if (!!id) {
      try {
        const data = await fetch(() => orderApi.get(id));

        data.date = moment(data.date);
        this.setState({
          data,
          status: data.status,
        });
      } catch (err) {
        message.error(`Something went wrong while fetching details for order ${id}`);
      }
    }
  }

  setEditing(editing) {
    return (e) => { this.setState({ editing }) };
  }

  async delete() {
    const { id, onCancel, refreshTableData, fetch, orderApi } = this.props;

    if (!!id) {
      try {
        await fetch(() => orderApi.remove(id));

        onCancel();
        refreshTableData();
        message.success(`Successfully deleted order ${id}`);
      } catch (err) {
        message.error(this.props.error);
      }
    }
  }

  async confirmOrder() {
    const { id, fetch, orderApi, error } = this.props;

    if (!!id) {
      try {
        await fetch(() => orderApi.confirm(id));

        this.refreshData();
        message.success(`Successfully confirming order ${id}`);
      } catch (err) {
        message.error(`Something went wrong while confirming order ${id}`);
      }
    }
  }

  async closeOrder() {
    const { id, fetch, orderApi } = this.props;

    if (!!id) {
      try {
        await fetch(() => orderApi.close(id));

        // onCancel();
        this.refreshData();
        message.success(`Successfully finishing order ${id}`);
      } catch (err) {
        message.error(`Something went wrong while sending order ${id}`)
      }
    }
  }

  render() {
    const { onCancel, refreshTableData, loading, error, fetch, id, fields, orderApi, ...modalProps } = this.props;
    const { data, editing, status } = this.state;

    return (
      <Modal
        title={<Header
          onEdit={this.setEditing(true)}
          loading={loading}
          onDelete={this.delete}
          onConfirm={this.confirmOrder}
          onCloseOrder={this.closeOrder}
          status={status}
          orderApi={orderApi}
        />}
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
                  .filter((key) => fields[key] && !!data[key])
                  .map((key) => ({
                    title: fields[key].title || fields[key].label,
                    value: data[key]
                  }))
                }
              />
            </Meta>
            <OrderProgress>
              <ProgressTitle>Order Progress</ProgressTitle>
              <StyledProgress
                type="circle"
                strokeColor={{
                  '0%': '#108ee9',
                  '100%': '#87d068',
                }}
                percent={{
                  draft: 0,
                  confirmed: 50,
                  closed: 100,
                }[status]}
              />
            </OrderProgress>
          </Content>
          <ItemTable
            id={id}
            orderApi={orderApi}
          />
        </Spin>
        {orderApi == salesOrders ? (
          <NewSalesOrderModal
            visible={editing}
            initialData={data}
            onCancel={this.setEditing(false)}
            refreshTableData={refreshTableData}
            refreshDetailsData={this.refreshData}
          />
        ) : (
          <NewPurchaseOrderModal
            visible={editing}
            initialData={data}
            onCancel={this.setEditing(false)}
            refreshTableData={refreshTableData}
            refreshDetailsData={this.refreshData}
          />
        )}
      </Modal>
    )
  }
}

export default withFetch()(GeneralOrderDetailModal);