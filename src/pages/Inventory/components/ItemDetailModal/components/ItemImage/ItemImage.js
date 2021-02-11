import React, { Suspense } from 'react';
import styled from 'styled-components';
import { Image, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { BASE_URL } from '../../../../../../lib/s3/constants.js';

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
      loading: false,
      hasImage: false,
    };

    this.putImage = this.putImage.bind(this);
  }

  componentDidMount() {
    // this.getImage();
  }

  getImage() {
    const { id } = this.props;

    this.setState({ loading: true });

    s3.listObjects({Prefix: `${id}/`}, (err, data) => {
      this.setState({ loading: false });

      if(err) {
        return;
      }

      const images = data.Contents.filter((obj) => obj.Size > 0);

      if(images.length === 0 ) {
        return;
      }

      this.setState({ hasImage: true });
    })
  }

  async putImage({ file }) {
    const { id } = this.props;
    const { default: s3Lib } = await import('@/lib/s3');
    const { s3, upload } = s3Lib;

    s3.headObject({Key: `${id}/`}, (err, data) => {
      if(err?.code === "NotFound") {
        s3.putObject({Key: `${id}/`});
      }
    });

    upload(`${id}/1.jpg`, file)
      .then((data) => {
        message.success('Item image added');
        this.getImage();
      })
      .catch((err) => message.error('Cannot upload image. Please try again later'));
  }

  render() {
    const { id } = this.props;
    const { loading, hasImage } = this.state;
    const photoUrl = `${BASE_URL}${id}/1.jpg`;

    if(loading) {
      return (
        <Wrapper></Wrapper>
      );
    }

    return (
      <Wrapper>
        {hasImage ? (
          <Image height={200} src={photoUrl} alt="item image" />
        ) : (
          <Dragger
            disabled={loading}
            customRequest={this.putImage}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
              You can add up to 15 images, each not exceeding 5 MB.
            </p>
          </Dragger>
        )}
      </Wrapper>
    );
  }
}

export default ItemImage;