import React from 'react';
import styled from 'styled-components';
import { Image, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { BASE_URL } from '@/lib/s3/constants.js';
import resources from '@/apis/resources';
import items from '@/apis/items';

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
      images: this.props.data.images,
    };

    this.putImage = this.putImage.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;
    if(!!data && (data.images !== prevProps.data.images)) {
      this.setState({ images: data.images });
    }
  }

  async putImage({ file }) {
    const { default: s3Lib } = await import('@/lib/s3');
    const { s3, upload } = s3Lib;
    const { data } = this.props;
    const id = data.id;

    // Creates new folder on S3 if folder doesn't exist
    s3.headObject({Key: `${id}/`}, (err, data) => {
      if(err?.code === "NotFound") {
        s3.putObject({Key: `${id}/`});
      }
    });

    // Uploads resource to S3 and db
    const url = `${id}/${file.name}`;
    this.setState({ loading: true });
    try {
      const S3Res = await upload(url, file);
      const resourcesRes = await resources.add({
        name: file.name,
        link: S3Res.Key,
        type: 'image',
      });
      const newItem = await items.update(id, {
        ...data,
        images: [resourcesRes.data],
      });
      this.setState({ images: newItem.data.images });
      message.success('Item image added');
    } catch(err) {
      message.error('Cannot upload image. Please try again later');
    }
    this.setState({ loading: false });
  } 

  render() {
    const { loading, images } = this.state;
    const hasImage = images && images.length > 0;

    return (
      <Wrapper>
        {hasImage ? (
          <Image height={200} src={`${BASE_URL}/${images[0].link}`} alt="item image" />
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