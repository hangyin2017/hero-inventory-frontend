import { Descriptions, Modal, Statistic, Row, Col} from 'antd';
import DescriptionsItem from 'antd/lib/descriptions/Item';
import React from 'react';   
import styled from 'styled-components';
import itemApi from '../../../../apis/items';

class ItemDetailModal extends React.Component {
    constructor(props) {
				super(props);
				
        this.state = {
					descriptionData: [],
        }
    }

    async componentDidMount() {
        const { data } = await itemApi.get(24);
        this.setState({
            descriptionData: data
				});
				console.log(data);
    }

    render() {
        const { onCancel, ...modalProps} = this.props;
				const { descriptionData } = this.state;

        return (
            <Modal
							{...modalProps}
							onCancel={onCancel}
							footer={null}
							destroyOnClose={true}
							width={1000}>
								<div style={{display:'flex'}}>
										<Descriptions title="Item Information" layout="vertical" column="24" style={{width: '50%'}} bordered>
											<DescriptionsItem label="SKU">{descriptionData.sku}</DescriptionsItem>
											<DescriptionsItem label="UPC">{descriptionData.upc}</DescriptionsItem>
											<DescriptionsItem label="Name">{descriptionData.name}</DescriptionsItem>
											<DescriptionsItem label="Description">{descriptionData.description}</DescriptionsItem>
											<DescriptionsItem label="Category">{descriptionData.category}</DescriptionsItem>
											<DescriptionsItem label="Brand">{descriptionData.brand}</DescriptionsItem>
											<DescriptionsItem label="Manufacturer">{descriptionData.manufacturer}</DescriptionsItem>
											<DescriptionsItem label="cost price">{descriptionData.costPrice}</DescriptionsItem>
											<DescriptionsItem label="selling price">{descriptionData.sellingPrice}</DescriptionsItem>
											<DescriptionsItem label="apply GST">{String(descriptionData.applyGst)}</DescriptionsItem>
										</Descriptions>
									<div style={{width: '50%', display:'flex', flexDirection:'column', justifyContent:'space-around', alignContent:'space-between', backgroundColor:'#e0e0e0'}}>
										<Statistic title="Accounting Stock" value={descriptionData.physicalStock + descriptionData.arrivingQuantity - descriptionData.lockedStock} style={{textAlign:"center"}}></Statistic>
										<Statistic title="Physical Stock" value={descriptionData.physicalStock} style={{textAlign:"center"}}></Statistic>
										<Statistic title="Locked Stock" value={descriptionData.lockedStock} style={{textAlign:"center"}}></Statistic>
									</div>
								</div>
							</Modal>
        );
    }
}

export default ItemDetailModal;