import { Anchor } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/img/logo.png";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useState } from "react";

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
  background-image: url(./logo.png);

  & > img {
    height: 40px;
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
  constructor() {
    super();
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
          <Anchor>
            <a href={process.env.REACT_APP__API_HOST}>
              <img src={logo} alt="logo" />
            </a>
          </Anchor>
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
