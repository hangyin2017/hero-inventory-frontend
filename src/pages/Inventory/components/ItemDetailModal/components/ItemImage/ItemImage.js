import React from 'react';
import styled from 'styled-components';
import { Image, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import s3, { baseUrl } from '../../../../../../lib/aws';

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
      loading: true,
      hasImage: false,
    };
  }

  componentDidMount() {
    this.getImage();
  }

  getImage() {
    const { id } = this.props;

    this.setState({ loading: true });

    s3.listObjects({Prefix: `${id}/`}, (err, data) => {
      this.setState({ loading: false });

      if(err) {
        return;
      }

      console.log(data);
      const images = data.Contents.filter((obj) => obj.Size > 0);

      if(images.length === 0 ) {
        return;
      }

      this.setState({ hasImage: true });
    })
  }

  render() {
    const { id } = this.props;
    const { loading, hasImage } = this.state;
    const photoUrl = `${baseUrl}${id}/1.jpg`;

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
          <Dragger disabled={loading}>
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