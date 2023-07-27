import { useState, useRef } from "react";
import { Table, Button, Input, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

function CustomTable(props) {
  const {
    tableData,
    columns,
    current,
    pageSize,
    totalItems,
    loading,
    pageSizeOptions,
    selectedRowKeys,
    setSelectedRowKeys,
    onChange,
  } = props;
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex, title) => {
    return {
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
        return (
          <div style={{ padding: 8 }}>
            <Input
              ref={searchInput}
              placeholder={`Qidirish ${title}`}
              value={selectedKeys[0]}
              onChange={(e) => {
                return setSelectedKeys(e.target.value ? [e.target.value] : []);
              }}
              onPressEnter={() => {
                return handleSearch(selectedKeys, confirm, dataIndex);
              }}
              style={{
                marginBottom: 8,
                display: "block",
              }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => {
                  return handleSearch(selectedKeys, confirm, dataIndex);
                }}
                icon={<SearchOutlined />}
                size="small"
                className="bg-blue-500"
                style={{ width: 90 }}
              >
                Qidirish
              </Button>
              <Button
                onClick={() => {
                  return clearFilters && handleReset(clearFilters);
                }}
                size="small"
                style={{ width: 90 }}
              >
                Tozalash
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  confirm({ closeDropdown: false });
                  setSearchText(selectedKeys[0]);
                  setSearchedColumn(dataIndex);
                }}
              >
                Filter
              </Button>
            </Space>
          </div>
        );
      },
      filterIcon: (filtered) => {
        return <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />;
      },
      // eslint-disable-next-line max-len
      onFilter: (value, record) => {
        return record[dataIndex].toString().toLowerCase().includes(value.toLowerCase());
      },
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => {
            return searchInput.current?.select();
          }, 100);
        }
      },
      render: (text) => {
        return searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{
              backgroundColor: "#ffc069",
              padding: 0,
            }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ""}
          />
        ) : (
          text
        );
      },
    };
  };

  const onSelectChange = (selectedRowKeys, record) => {
    setSelectedRowKeys([[...selectedRowKeys], [...record]]);
  };

  const handleSelect = (record) => {
    if (!selectedRowKeys[0].includes(record.id)) {
      setSelectedRowKeys((prev) => {
        return [
          [...prev[0], record.id],
          [...prev[1], record],
        ];
      });
    } else {
      setSelectedRowKeys((prev) => {
        const arr = prev[0].filter((key) => {
          return key !== record.id;
        });
        const arr1 = prev[1].filter((key) => {
          return key.id !== record.id;
        });
        return [[...arr], [...arr1]];
      });
    }
  };

  const rowSelection = {
    selectedRowKeys: selectedRowKeys[0],
    onChange: onSelectChange,
  };

  const arr = columns?.map((item) => {
    return item.search === true ?
      { ...item, ...getColumnSearchProps(item.dataIndex, item.title) } :
      { ...item };
  });
  arr?.map((item) => {
    return delete item.search;
  });

  const dataTableColumns = [...arr];

  return (
    <Table
      rowSelection={rowSelection}
      loading={loading}
      columns={dataTableColumns}
      dataSource={tableData}
      bordered
      rowKey="id"
      onRow={(record) => {
        return {
          onClick: () => {
            handleSelect(record);
          },
        };
      }}
      scroll={{
        x: "800px",
        y: "hidden",
      }}
      pagination={{
        showSizeChanger: true,
        total: totalItems,
        pageSize,
        current,
        pageSizeOptions,
        onChange,
      }}
    />
  );
}

export default CustomTable;
