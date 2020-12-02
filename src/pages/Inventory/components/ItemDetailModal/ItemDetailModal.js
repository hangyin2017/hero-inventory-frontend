import { Descriptions, Modal, Statistic, Button } from "antd";
import DescriptionsItem from "antd/lib/descriptions/Item";
import React from "react";
import styled from "styled-components";
import itemApi from "../../../../apis/items";
import Header from './components/Header';


class ItemDetailModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
			descriptionData: [],
    };
  }

  async componentDidUpdate(prevProps, prevState) {
    if(prevProps.rowId !== this.props.rowId){
      const { data } = await itemApi.get(this.props.rowId);
      this.setState({
        descriptionData: data,
      });
    }
  }

  render() {
    const { onCancel, ...modalProps } = this.props;
		const { descriptionData } = this.state;
		const { sku, upc, name, description, category, brand, manufacturer, costPrice, sellingPrice, applyGst} = this.state.descriptionData;


    return (
      <Modal
        title={<Header />}
        {...modalProps} onCancel={onCancel} footer={null} destroyOnClose={true} width={1000}
      >
        <div style={{ display: "flex" }}>
          <Descriptions title="Item Information" layout="vertical" column="24" style={{ width: "50%" }} bordered>
            <DescriptionsItem label="SKU">{sku}</DescriptionsItem>
            <DescriptionsItem label="UPC">{upc}</DescriptionsItem>
            <DescriptionsItem label="Name">{name}</DescriptionsItem>
            <DescriptionsItem label="Description">{description}</DescriptionsItem>
            <DescriptionsItem label="Category">{category}</DescriptionsItem>
            <DescriptionsItem label="Brand">{brand}</DescriptionsItem>
            <DescriptionsItem label="Manufacturer">{manufacturer}</DescriptionsItem>
            <DescriptionsItem label="cost price">{costPrice}</DescriptionsItem>
            <DescriptionsItem label="selling price">{sellingPrice}</DescriptionsItem>
            <DescriptionsItem label="apply GST">{String(applyGst)}</DescriptionsItem>
          </Descriptions>
          <div
            style={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignContent: "space-between",
              backgroundColor: "#e0e0e0",
            }}
          >
            <Statistic
              title="Accounting Stock"
              value={descriptionData.physicalStock + descriptionData.arrivingQuantity - descriptionData.lockedStock}
              style={{ textAlign: "center" }}
            ></Statistic>
            <Statistic
              title="Physical Stock"
              value={descriptionData.physicalStock}
              style={{ textAlign: "center" }}
            ></Statistic>
            <Statistic
              title="Locked Stock"
              value={descriptionData.lockedStock}
              style={{ textAlign: "center" }}
            ></Statistic>
          </div>
        </div>
      </Modal>
    );
  }
}

export default ItemDetailModal;
