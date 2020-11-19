import React from 'react';
import { Select, Input, Table, Button, Modal, Form, Checkbox } from 'antd';
import axios from 'axios';
import styles from './Inventory.module.less';


const DEFAULT_ENTRIES_PER_PAGE = 20;

class Inventory extends React.Component {
  constructor(props) {
    super(props);

    this.columns = [
      {
        title: "Code",
        dataIndex: "code",
        key: "code",
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Brand",
        dataIndex: "brand",
        key: "brand",
      },
      {
        title: "Categary",
        dataIndex: "category",
        key: "category",
      },
      {
        title: "Supplier",
        dataIndex: "supplier",
        key: "supplier",
      },
      {
        title: "Weight",
        dataIndex: "weight",
        key: "weight",
      },
      {
        title: "Standard Price",
        dataIndex: "standardPrice",
        key: "standardPrice",
      },
      {
        title: "Cost",
        dataIndex: "cost",
        key: "cost",
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
      },
    ]

    // const mockData = Array(100).fill({}).map((entry, index) => ({
    //   key: index,
    //   code: parseInt(Math.random() * 10e5),
    //   name: `Item${index}`,
    //   quantity: parseInt(Math.random() * 10e3)
    // }))

    this.state = {
      dataSource: [],
      loading: false,
      visible: false
    }


  }
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  async componentDidMount() {
    const data = await axios.get('http://localhost:8080/item').then(res => res.data);
    this.setState({
      dataSource: data
    });
  }

  handleEntryChange(value) {
    this.setState({
      entriesPerPage: value
    });
  }




  render() {
    const { Search } = Input;
    const { visible, loading } = this.state;
    const { Option } = Select;
    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    };
    const tailLayout = {
      wrapperCol: {
        offset: 8,
        span: 16,
      },
    };





    return (
      <>
        <Search className={styles.search} placeholder="search for item" />

        <Button type="primary" onClick={this.showModal}>
          Add Item
        </Button>
        <Modal
          visible={visible}
          width={1000}
          title="New Item"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={this.handleOk}
            >
              Submit
            </Button>
          ]}
        >
          <Form {...layout} name="control-hooks">
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="SKU"
              label="SKU"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="barcode"
              label="Barcode"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="brand"
              label="Brand"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                placeholder="Select a brand"
                allowClear
              >
                <Option value="male">A2</Option>
                <Option value="female">Sanofi</Option>
                <Option value="other">other</Option>
              </Select>
            </Form.Item>
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
            >
              {({ getFieldValue }) => {
                return getFieldValue('brand') === 'other' ? (
                  <Form.Item
                    name="customizeBrand"
                    label="Customize Brand"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                ) : null;
              }}
            </Form.Item>

            <Form.Item
              name="category"
              label="Category"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                placeholder="Select a category"
                allowClear
              >
                <Option value="male">Health Product</Option>
                <Option value="female">Gift</Option>
                <Option value="other">other</Option>
              </Select>
            </Form.Item>
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
            >
              {({ getFieldValue }) => {
                return getFieldValue('category') === 'other' ? (
                  <Form.Item
                    name="customizeCategory"
                    label="Customize Category"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                ) : null;
              }}
            </Form.Item>

            <Form.Item
              name="manufacturer"
              label="Manufacturer"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                placeholder="Select a manufacturer"
                allowClear
              >
                <Option value="male">Sanofi</Option>
                <Option value="female">Lifespace</Option>
                <Option value="other">other</Option>
              </Select>
            </Form.Item>
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
            >
              {({ getFieldValue }) => {
                return getFieldValue('manufacturer') === 'other' ? (
                  <Form.Item
                    name="customizeManufacturer"
                    label="Customize Manufacturer"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                ) : null;
              }}
            </Form.Item>

            <Form.Item>
              <Checkbox>
                Apply GST
              </Checkbox>
            </Form.Item>


            <Form.Item
              name="selling price"
              label="Selling Price"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="cost price"
              label="Cost Price"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="opening stock"
              label="Opening Stock"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>



          </Form>

        </Modal>

        <Table
          columns={this.columns}
          dataSource={this.state.dataSource}
          pagination={{
            position: ['topRight', 'bottomRight'],
            defaultPageSize: 10,
          }}
        />




      </>
    )
  }
}

export default Inventory;