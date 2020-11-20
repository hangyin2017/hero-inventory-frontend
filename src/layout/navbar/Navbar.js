import React from 'react';
import styled from 'styled-components';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import PAGES from './PAGES';
// import MenuItem from "./components/MenuItem";

const SideMenu = styled(Menu)`
  font-size: 16px;
`;

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.listeners = [];
    this.state = {
      selectedKey: this.props.history.location.pathname,
    };
  };

  componentDidMount() {
    this.props.history.listen((e) => this.setCurrent(e));
  }

  setCurrent(e) {
    this.setState({ selectedKey: e.pathname });
  }

  render() {
    const { selectedKey } = this.state;

    return (
      <SideMenu theme="dark" selectedKeys={[selectedKey]}>
        {PAGES.map(({ to, name }) => (
          <Menu.Item key={to}>
            <NavLink to={to}>{name}</NavLink>
          </Menu.Item>
        ))}
      </SideMenu>
    );
  }
};

export default withRouter(Navbar);