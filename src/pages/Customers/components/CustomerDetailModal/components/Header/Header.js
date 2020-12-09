import React from "react";
import styled from "styled-components";
import { Menu, Button, Dropdown } from "antd";
import { EditOutlined, DownOutlined } from '@ant-design/icons';
import Modal from '../../../../../../components/Modal';

const Header = ({
  onEdit,
  loading,
  onDelete,
}) => {
  return (
    <Modal.Header title="Customer Details">
      <Button
        disabled={loading}
        icon={<EditOutlined />}
        onClick={onEdit}
      />
      <Dropdown
        disabled={loading}
        trigger={['click']}
        overlay={
          <Menu>
            <Menu.Item key="delete" onClick={onDelete}>
              Delete
            </Menu.Item>
          </Menu>
        }
      >
        <Button>
          More <DownOutlined />
        </Button>          
      </Dropdown>
    </Modal.Header>
  );
};

export default Header;