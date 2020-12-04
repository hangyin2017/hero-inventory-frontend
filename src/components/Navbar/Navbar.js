import React from 'react';
import styled from 'styled-components';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import pages from '../../pages';


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
        {pages
          .filter((page) => page.inNavbar)
          .map(({ path, title }) => (
            <Menu.Item key={path}>
              <NavLink to={path}>{title}</NavLink>
            </Menu.Item>
          ))
        }
      </SideMenu>
    );
  }
};

export default withRouter(Navbar);