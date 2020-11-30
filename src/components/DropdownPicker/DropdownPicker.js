import React from 'react';
import { Select, Spin, Alert } from 'antd';
import styled from 'styled-components';
import AddNew from './components/AddNew';
import Option from './components/Option';

const FloatingAlert = styled(Alert)`
  position: absolute;
  z-index: 3;
  width: 100%;
`;
class DropdownPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      editing: null,
      loading: false,
      error: null,
    };

    this.setEditing = this.setEditing.bind(this);
    this.request = this.request.bind(this);
    this.add = this.add.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
    this.refreshAll = this.refreshAll.bind(this);
    this.setError = this.setError.bind(this);
    this.dropdownRender = this.dropdownRender.bind(this);
  }

  componentDidMount() {
    this.refreshAll();
  }

  async refreshAll() {
    const { api } = this.props;
    const { data } = await api.getAll();
    
    this.setState({ data });
  }

  setEditing(id) {
    this.setState({ editing: id });
  }
  
  request(method) {  
    return async (...args) => {
      this.setState({
        loading: true,
        error: null,
      });

      await method(...args).catch((err) => this.setError(err.response.data.message));

      this.setState({ loading: false });
    }
  }

  setError(message) {
    this.setState({ error: message });
  }

  async add(value) {
    const { api } = this.props;

    await api.add({ name: value }).then(this.refreshAll);

    this.setState({ value });
  }

  async update(item, value) {
    const { api } = this.props;

    await api.update(item.id, { name: value }).then(this.refreshAll);
    
    this.setState({ value });
  }

  async remove(item) {
    const { name, api, formRef, value } = this.props;

    await api.remove(item.id).then(this.refreshAll);

    item.name == value && formRef.current.setFieldsValue({ [name]: null });
  }

  dropdownRender(options) {
    const { loading } = this.state;

    return (
      <Spin spinning={loading}>
        {this.state.error &&
          <FloatingAlert
            message={this.state.error}
            type="error"
            closable
            showIcon
            onClose={() => this.setError(null)}
          />        
        }
        {options}
        <AddNew selectRef={this.select} maxLength={50} request={this.request} onAdd={this.add}/>
      </Spin>
    );
  };

  render() {
    const { placeholder, value, onChange } = this.props;
    const { data, editing } = this.state;

    return (
      <Select
        ref={(el) => this.select = el}
        placeholder={placeholder}
        allowClear
        showSearch
        optionLabelProp="value"
        value={value}
        // onChange={(value) => this.setState({value})}
        onChange={onChange}
        filterOption={(input, option) => option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        dropdownRender={this.dropdownRender}
      >
        {data.map((item) => (
          <Select.Option key={item.id} value={item.name} >
            <Option
              item={item}
              selectRef={this.select}
              editing={editing}
              setEditing={this.setEditing}
              request={this.request}
              onRemove={this.remove}
              onUpdate={this.update}
            />
          </Select.Option>
        ))}
      </Select>
    );
  }
}

export default DropdownPicker;