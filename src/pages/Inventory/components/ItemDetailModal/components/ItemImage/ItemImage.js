import React, { Suspense } from 'react';
import styled from 'styled-components';
import { Image, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
// import { BASE_URL } from '@/lib/s3/constants.js';
import { BASE_URL } from '../../../../../../lib/s3/constants.js';
import resources from '@/apis/resources';

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
    const { default: s3Lib } = await import('@/lib/s3');
    const { s3, upload } = s3Lib;

    // Creates new folder on S3 if folder doesn't exist
    s3.headObject({Key: `${id}/`}, (err, data) => {
      if(err?.code === "NotFound") {
        s3.putObject({Key: `${id}/`});
      }
    });

    // Uploads resource to S3
    const url = `${id}/${file.name}`;
    try {
      const S3Res = await upload(url, file);
      console.log(S3Res);
      const resourcesRes = await resources.add({
        name: file.name,
        link: url,
        type: 'image',
      });
      message.success('Item image added');
    } catch(err) {
      message.error('Cannot upload image. Please try again later');
    }
  }

  render() {
    const { data } = this.props;
    const { loading } = this.state;
    const hasImage = data.images && data.images.length > 0;
    // const photoUrl = `${BASE_URL}${data.images[0]}`;
    

    if(loading) {
      return (
        <Wrapper></Wrapper>
      );
    }

    return (
      <Wrapper>
        {hasImage ? (
          <Image height={200} src={`${BASE_URL}${data.images[0].link}`} alt="item image" />
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