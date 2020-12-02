import { Descriptions, Statistic, Spin } from "antd";
import DescriptionsItem from "antd/lib/descriptions/Item";
import React from "react";
import styled from "styled-components";
import itemApi from "../../../../apis/items";
import Modal from '../../../../components/Modal';
import NewItemModal from '../NewItemModal';
import Header from './components/Header';

const ModalSpin = styled(Spin).attrs({
  size: 'large',
})`
  width: 100%;
  height: 60vh;
`;

const Container = styled.div`
  display: flex;
`;

const Stock = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-content: space-between;
  background-color: #e0e0e0;
`;

class ItemDetailModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      editing: false,
    };
  }

  async componentDidUpdate(prevProps) {
    const { data } = this.props;
    if(!!data && data != prevProps.data){
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { data, onCancel, onEditButtonClick, ...modalProps } = this.props;
    const { loading, editing } = this.state;
		// const { sku, upc, name, description, category, brand, manufacturer, costPrice, sellingPrice, applyGst} = this.state.descriptionData;
    console.log(data);

    return (
      <Modal
        title={<Header onEditButtonClick={()=> this.setState({ editing: true })} />}
        {...modalProps} onCancel={onCancel} footer={null} destroyOnClose={true} width={1000}
      >
        {loading ? (
          <ModalSpin></ModalSpin>
        ) : (
          <Container>
            <Descriptions title="Item Information" layout="vertical" column="24" style={{ width: "50%" }} bordered>
              {Object.keys(data).map((key) => (
                <DescriptionsItem label={key}>{data[key]}</DescriptionsItem>
              ))}
              {/* <DescriptionsItem label="SKU">{data.sku}</DescriptionsItem>
              <DescriptionsItem label="UPC">{data.upc}</DescriptionsItem>
              <DescriptionsItem label="Name">{data.name}</DescriptionsItem>
              <DescriptionsItem label="Description">{data.description}</DescriptionsItem>
              <DescriptionsItem label="Category">{data.category}</DescriptionsItem>
              <DescriptionsItem label="Brand">{data.brand}</DescriptionsItem>
              <DescriptionsItem label="Manufacturer">{data.manufacturer}</DescriptionsItem>
              <DescriptionsItem label="cost price">{data.costPrice}</DescriptionsItem>
              <DescriptionsItem label="selling price">{data.sellingPrice}</DescriptionsItem>
              <DescriptionsItem label="apply GST">{String(data.applyGst)}</DescriptionsItem> */}
            </Descriptions>
            <Stock>
              <Statistic
                title="Accounting Stock"
                value={data.physicalStock + data.arrivingQuantity - data.lockedStock}
                style={{ textAlign: "center" }}
              />
              <Statistic
                title="Physical Stock"
                value={data.physicalStock}
                style={{ textAlign: "center" }}
              />
              <Statistic
                title="Locked Stock"
                value={data.lockedStock}
                style={{ textAlign: "center" }}
              />
            </Stock>
          </Container>
        )}
        <NewItemModal
          visible={editing}
          initialData={data}
          onCancel={()=>this.setState({editing:false})}
        />
      </Modal>
    );
  }
}

export default ItemDetailModal;
