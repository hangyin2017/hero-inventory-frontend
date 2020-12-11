import React from 'react';
import { message, Row, Col, Spin, Button } from 'antd';
import styled from 'styled-components';
import salesOrder from '../../apis/salesOrders';
import withFetch from '../../components/withFetch';
import Modal from '../../components/Modal';
import Header from './components/Header';
import DescriptionList from '../../components/DescriptionList';
import NewOrderModal from '../../pages/SalesOrders/components/NewOrderModal';
import fields from '../../pages/SalesOrders/fields';
import ItemTable from './components/ItemTable';


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
    const { id, fetch } = this.props;

    if (!!id) {
      try {
        const data = await fetch(() => salesOrder.get(id));
        this.setState({ data });
        console.log(data);
      } catch (err) {
        message.error(`Something went wrong while fetching details for order ${id}`);
      }
    }
  }

  setEditing(editing) {
    return (e) => { this.setState({ editing }) };
  }

  async delete() {
    const { id, onCancel, refreshTableData, fetch } = this.props;

    if (!!id) {
      try {
        await fetch(() => salesOrder.remove(id));

        onCancel();
        refreshTableData();
        message.success(`Successfully deleted order ${id}`);
      } catch (err) {
        message.error(`Something went wrong while deleting order ${id}`);
      }
    }
  }

  render() {
    const { onCancel, refreshTableData, refreshDetailsData, loading, error, fetch, id, ...modalProps } = this.props;
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
          <ItemTable id={id} />
        </Spin>
        <Button onClick={onCancel}>Cancel</Button>
      </Modal>
    )
  }
}

export default withFetch(GeneralOrderDetailModal);