import React from 'react';
import Form from 'antd';

class ItemDetails extends React.Component {
  constructor() {

  }

  render() {
    const { editing, dataIndex, title, myblur, search, record }

    return (
      editing ? (
        <div>
          <Form.Item
            style={{ margin: 0 }}
            name={dataIndex}
            rules={[
              {
                required: true,
                message: `${title} is required.`,
              },
            ]}
          >
            <Input
              ref={inputRef}
              autocomplete="off"
              onBlur={myblur}
              onPressEnter={myblur}
              onChange={search}
            />
          </Form.Item>
          {record.data?.name ? (
            <span>SKU: {record.data.sku}</span>
          ) : (
            <ItemsList>
              {data.map((item) => (
                <li
                  key={item.id}
                  onClick={() => {
                    save(item);
                    handleAdd();
                  }}
                >
                  <ItemsName>
                    {item.name}
                  </ItemsName>
                  <ItemsDetail>
                    <span> SKU: {item.sku}</span>
                    <span> Rate: {item.sellingPrice} </span>
                    <span> Stock: {item.physicalStock}</span>
                  </ItemsDetail>
                </li>
              ))}
            </ItemsList>
          )}
        </div>
      ) : (
        <CellContent>
          <span style={{ flex: 1 }} onClick={toggleEdit}>
            {children}
          </span>
          {record.data?.name ? (
            <span>SKU: {record.data.sku}</span>
          ) : null}
        </CellContent>
      )
    );
  }
}

export default ItemDetails;