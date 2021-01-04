import React from 'react';
import styled from 'styled-components';
import { Image, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { baseUrl } from '../../../../../../lib/aws';

const { Dragger } = Upload;

const Wrapper = styled.div`
  height: 200px;
  margin-bottom: 20px;
  overflow: hidden;
  text-align: center;
`;

class ItemImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasImage: false,
    };
  }

  render() {
    const { id } = this.props;
    const photoUrl = `${baseUrl}${id}/1.jpg`;

    return (
      <Wrapper>
        {/* <Image height={200} src={photoUrl} alt="item image" /> */}
        <Dragger>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            You can add up to 15 images, each not exceeding 5 MB.
          </p>
        </Dragger>
      </Wrapper>
    );
  }
}

export default ItemImage;