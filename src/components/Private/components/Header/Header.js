import React from 'react';
import styled from 'styled-components';
import { Anchor, Avatar } from 'antd';
import logo from '../../../../assets/img/logo.png';
import { UserOutlined } from '@ant-design/icons';
import { HOMEPAGE } from '../../../../Routes';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid #eee;
  background-color: #f7f7f7;
  text-align: center;
`;

const StyledLogo = styled.div`
  flex: 0 0 200px;
  border-right: 1px solid #eee;

  & img {
    height: 55px;
  }
`;

const Main = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1 1;
  padding: 0 15px;
`;

const Left = styled.div`
  width: 100px;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
`;

const Dropdown = styled.div`
  width: 360px;
  height: 240px;
  position: absolute;
  z-index: 3;
  right: 0;
  padding: 10px 20px;
  background-color: #eefaff;
`;

const Logout = styled.div`
  color: red;
`;

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };
  }

  render() {
    const { authentication } = this.props;
    const { show } = this.state;

    return (
      <Wrapper>
        <StyledLogo>
          <a href={HOMEPAGE}>
            <img src={logo} alt="logo" />
          </a>
        </StyledLogo>
        <Main>
          <Left></Left>
          <Right>
            {/* <Authentication /> */}
            <div>
              <div
                onClick={() => {
                  this.setState({ show: !show });
                }}
              >
                <Avatar style={{ backgroundColor: "lightblue" }} icon={<UserOutlined />} />
              </div>
              {this.state.show ? (
                <Dropdown>
                  <h3>
                    <Avatar size={64} icon={<UserOutlined />} />
                  </h3>
                  <div class="">zixiangli0516</div>
                  <div class="">User ID : 123456</div>
                  <p>
                    <small class="">zixiangli0516@gmail.com</small>
                  </p>
                  <Logout onClick>Log out</Logout>
                </Dropdown>
              ) : null}
            </div>
          </Right>
        </Main>
      </Wrapper>
    );
  }
}

export default Header;