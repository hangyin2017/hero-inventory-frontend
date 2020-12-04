import React from 'react';
import { Row, Col, Spin } from 'antd';
import styled from 'styled-components';
import items from '../../../../apis/items';
import Modal from '../../../../components/Modal';
import NewItemModal from '../NewItemModal';
import Header from './components/Header/Header';
import DescriptionList from '../../../../components/DescriptionList';
import StockData from './components/StockData';
import fields from '../../fields';

const Content = styled(Row)`
  min-height: 60vh;
`;

const Meta = styled(Col).attrs({ span: 24, md: 18 })`
`;

const Stock = styled(Col).attrs({ span: 24, md: 6 })`
`;

class ItemDetailModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      loading: true,
      editing: false,
    };

    this.setEditing = this.setEditing.bind(this);
    this.refreshData = this.refreshData.bind(this);
  }

  async componentDidUpdate(prevProps) {
    const { id } = this.props;

    if(!!id && id != prevProps.id){
      this.refreshData();
    }
  }

  async refreshData() {
    const { id } = this.props;

    this.setState({ loading: true });
    
    if (!!id) {
      try {
        const { data } = await items.get(id);
        this.setState({ data });
      } catch(err) {
        message.error(`Something went wrong while fetching details for item ${id}`);
        this.hideModal();
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  setEditing(editing) {
    return (e) => {
      this.setState({ editing });
    }
  }

  render() {
    const { onCancel, refreshTableData, refreshDetailsData, ...modalProps } = this.props;
    const { data, loading, editing } = this.state;
		const { physicalStock, lockedStock, arrivingQuantity } = data;

    return (
      <Modal
        title={<Header onEditButtonClick={this.setEditing(true)} loading={loading} />}
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
                  .filter((key) =>  fields[key].inDetails && !!data[key])
                  .map((key) => ({
                    title: fields[key].title || fields[key].label,
                    value: data[key]
                  }))
                }
              />
            </Meta>
            <Stock>
              <StockData
                physicalStock={physicalStock}
                lockedStock={lockedStock}
                arrivingQuantity={arrivingQuantity}
              />
            </Stock>
          </Content>
        </Spin>
        <NewItemModal
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

export default ItemDetailModal;
