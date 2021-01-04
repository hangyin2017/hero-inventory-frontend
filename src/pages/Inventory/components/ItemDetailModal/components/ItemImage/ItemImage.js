import React from 'react';
import AWS from 'aws-sdk';
import styled from 'styled-components';

const albumBucketName = 'hero-inventory-item-image';

AWS.config.region = 'ap-southeast-2';
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'ap-southeast-2:2ab03726-216c-46bd-b263-5cc2e8ab7d63',
});

var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {Bucket: albumBucketName}
});

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

  componentDidMount() {
    this.getImage();
  }
  
  getImage() {
    const albumPhotosKey = encodeURIComponent('item1') + '/';
    s3.listObjects({Prefix: albumPhotosKey}, (err, data) => {
      console.log(err, data);
    });
  }

  render() {
    return (
      <Wrapper>
        <Image src="https://hero-inventory-item-image.s3.ap-southeast-2.amazonaws.com/item1/71vwroqcDHL._AC_UL210_SR210,210_.jpg" alt="item image" />
      </Wrapper>
    );
  }
}

export default ItemImage;