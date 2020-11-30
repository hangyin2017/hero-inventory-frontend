import React from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import InlineInput from '../../../InlineInput';
import Actions from '../../../Actions';

class Edit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.item.name,
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    this.input.focus();
  }

  handleInputChange({ target: { value } }) {
    this.setState({ value });
  }

  handleUpdate(e) {
    e.stopPropagation();

    const { value } = this.state;
    const { item, selectRef, setEditing, request, onUpdate } = this.props;

    selectRef.focus();
    setEditing(null);
    
    value && (item.name != value) && request(onUpdate)(item, value);
  }

  render() {
    const { setEditing } = this.props;
    const { value } = this.state;

    return (
      <div onClick={(e) => e.stopPropagation()}>
        <InlineInput
          value={value}
          ref={(el) => this.input = el}
          onBlur={() => setEditing(null)}
          onChange={this.handleInputChange}
          onPressEnter={this.handleUpdate}
        />
        <Actions>
          <CheckOutlined onClick={this.handleUpdate}/>
          <CloseOutlined onClick={(e) => {
            e.stopPropagation();
            setEditing(null);
          }}/>
        </Actions>
      </div>
    )
  }
}

export default Edit;