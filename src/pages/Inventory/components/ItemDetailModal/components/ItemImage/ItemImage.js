import React from 'react';
import styled from 'styled-components';
import { baseUrl } from '../../../../../../lib/aws';

const Wrapper = styled.div`
  height: 200px;
  margin-bottom: 20px;
  overflow: hidden;
  text-align: center;
`;

const Image = styled.img`
  height: 100%;
  max-width: 100%;
`;

class ItemImage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { id } = this.props;
    const photoUrl = `${baseUrl}${id}/1.jpg`;

    return (
      <Wrapper>
        <Image src={photoUrl} alt="item image" />
      </Wrapper>
    );
  }
}

export default ItemImage;