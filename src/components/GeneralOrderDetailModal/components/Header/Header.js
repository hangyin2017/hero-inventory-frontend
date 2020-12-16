import React from "react";
import { Menu, Button, Dropdown } from "antd";
import { EditOutlined, DownOutlined } from '@ant-design/icons';
import Modal from '../../../../components/Modal';

const Header = ({
  onEdit,
  loading,
  onDelete,
  onConfirm,
}) => {
  return (
    <Modal.Header title="Order Details">
      <Button
        disabled={loading}
        icon={<EditOutlined />}
        onClick={onEdit}
      />
      <Button 
        disabled={loading} 
        onClick={onConfirm} 
      > Mark As Confirmed</Button>
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