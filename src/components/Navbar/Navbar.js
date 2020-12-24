import React from 'react';
import styled from 'styled-components';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import ROUTES from '../../Routes';

const SideMenu = styled(Menu)`
  font-size: 16px;
`;

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKey: this.props.history.location.pathname,
    };
  };

  componentDidMount() {
    this.props.history.listen((e) => this.setSelectedKey(e.pathname));
  }

  setSelectedKey(pathname) {
    this.setState({ selectedKey: pathname });
  }

  render() {
    const { selectedKey } = this.state;

    return (
      <SideMenu theme="dark" selectedKeys={[selectedKey]}>
        {Object.keys(ROUTES)
          .filter((key) => ROUTES[key].inNavbar)
          .map((key) => (
            <Menu.Item key={ROUTES[key].path}>
              <NavLink to={ROUTES[key].path}>{ROUTES[key].title}</NavLink>
            </Menu.Item>
          ))
        }
      </SideMenu>
    );
  }
};

export default withRouter(Navbar);