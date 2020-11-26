import React from 'react';
import { EditOutlined } from '@ant-design/icons';
import { DeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { color } from '../../../../styles';

const Wrapper = styled.div`
  &:hover > div {
      visibility: visible;
  }
`;

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
`;

const { primary, dangerous } = color;

const Edit = styled(EditOutlined)`
  color: ${primary};
`;

const Delete = styled(DeleteOutlined)`
  color: ${dangerous};
`;

const Option = ({
  item,
  onDelete,
  active
}) => {
  const { id, name } = item;

  // console.log(active, name);
  return (
    <Wrapper>
      <Value>
        {name}
      </Value>
      <Actions>
        <Edit />
        <Delete onClick={(e) => {
          e.stopPropagation();
          onDelete(id);
        }}/>
      </Actions>
    </Wrapper>
  );
};

export default Option;