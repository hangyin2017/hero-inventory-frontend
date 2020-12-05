import React from 'react';
import styled from 'styled-components';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import PAGES from '../../pages';

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
    this.props.history.listen((e) => this.setSelectedKey(e));
  }

  setSelectedKey(e) {
    this.setState({ selectedKey: e.pathname });
  }

  render() {
    const { selectedKey } = this.state;

    return (
      <SideMenu theme="dark" selectedKeys={[selectedKey]}>
        {Object.keys(PAGES)
          .filter((key) => PAGES[key].inNavbar)
          .map((key) => (
            <Menu.Item key={PAGES[key].path}>
              <NavLink to={PAGES[key].path}>{PAGES[key].title}</NavLink>
            </Menu.Item>
          ))
        }
      </SideMenu>
    );
  }
};

export default withRouter(Navbar);