import React from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { color } from '../../../../styles';
import Edit from './components/Edit';


const Value = styled.span`
`;

const Actions = styled.div`
  visibility: hidden;
  float: right;
  font-size: 16px;
  opacity: 0.7;

  & > span {
    margin: 0 3px;
  }

  .ant-select-item-option-active & {
    visibility: visible;
  }
`;

const { primary, dangerous } = color;

const EditIcon = styled(EditOutlined)`
  color: ${primary};
`;

const DeleteIcon = styled(DeleteOutlined)`
  color: ${dangerous};
`;

class Option extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    const { item, selectRef, editing, setEditing, update, remove } = this.props;
    const { id, name } = item;

    return (
      <>
        {editing === id ? (
          <Edit
            Actions={Actions}
            item={item}
            selectRef={selectRef}
            onInputChange={this.handleInputChange}
            setEditing={setEditing}
            onClick={(e) => e.stopPropagation()}
            update={update}
          />
        ) : (
          <>
            <Value>
              {name}
            </Value>
            <Actions>
              <EditIcon onClick={(e) => {
                e.stopPropagation();
                setEditing(id);
              }}/>
              <DeleteIcon onClick={(e) => {
                e.stopPropagation();
                remove(item);
              }}/>
            </Actions>
          </>
        )}
      </>
    );
  }
}

export default Option;