import React from 'react';
import { Row, Col, Spin } from 'antd';
import styled from 'styled-components';
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
      loading: true,
      editing: false,
    };

    this.setEditing = this.setEditing.bind(this);
  }

  async componentDidUpdate(prevProps) {
    this.setLoading(prevProps);
  }

  setLoading(prevProps) {
    const { data, visible } = this.props;

    if(!!data && data != prevProps.data){
      this.setState({ loading: false });
    }

    if(!!visible && !prevProps.visible) {
      this.setState({ loading: true });
    }
  }

  setEditing(editing) {
    return (e) => {
      this.setState({ editing });
    }
  }

  render() {
    const { data, onCancel, ...modalProps } = this.props;
    const { loading, editing } = this.state;
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
        />
      </Modal>
    );
  }
}

export default ItemDetailModal;
