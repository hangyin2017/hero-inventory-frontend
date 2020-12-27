import React from 'react';
import styled from 'styled-components';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import Guard from '../Guard';
import withAuthentication from '../withAuthentication';
import compose from '../../utils/compose';
import ROUTES from '../../Routes';
import { fontSizes } from '../../styles';

const { FONT_M } = fontSizes;
const SideMenu = styled(Menu)`
  font-size: ${FONT_M};
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
    const { authentication } = this.props;
    const { selectedKey } = this.state;

    return (
      <SideMenu theme="dark" selectedKeys={[selectedKey]}>
        {Object.keys(ROUTES)
          .filter((key) => ROUTES[key].inNavbar && Guard.permitted(ROUTES[key].permissions, authentication))
          .map((key) => {
            const { path, title } = ROUTES[key];

            return (
              <Menu.Item key={path}>
                <NavLink to={path}>{title}</NavLink>
              </Menu.Item>
            )
          })
        }
      </SideMenu>
    );
  }
};

const EnhancedNavbar = compose(
  withRouter,
  withAuthentication,
)(Navbar);

export default EnhancedNavbar;