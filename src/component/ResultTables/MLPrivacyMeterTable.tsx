import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef } from "antd";
import { Button, Input, Space, Table } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";

interface DataType {
  key: string;
  fpr: number;
  accuracy: number;
  roc: number;
  tn: number;
  fp: number;
  fn: number;
  tp: number;
}

type DataIndex = keyof DataType;

const data: DataType[] = [
  {
    key: "1",
    fpr: 0.0,
    accuracy: 0.5,
    roc: 0.5465198,
    tn: 5000,
    fp: 0,
    fn: 5000,
    tp: 0,
  },
  {
    key: "2",
    fpr: 0.25,
    accuracy: 0.517,
    roc: 0.5892376,
    tn: 4555,
    fp: 0.1876,
    fn: 4746,
    tp: 501,
  },
  {
    key: "3",
    fpr: 0.5,
    accuracy: 0.525,
    roc: 0.5879765,
    tn: 4321,
    fp: 0.2876,
    fn: 2789,
    tp: 1205,
  },
  {
    key: "4",
    fpr: 0.75,
    accuracy: 0.548,
    roc: 0.5987689,
    tn: 2678,
    fp: 0.1876,
    fn: 5676,
    tp: 2678,
  },
  {
    key: "5",
    fpr: 1.0,
    accuracy: 0.588,
    roc: 0.5298901,
    tn: 1675,
    fp: 0.1762,
    fn: 2946,
    tp: 3876,
  },
];

const MLPrivacyMeterTable: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (selectedKeys: string[], confirm: (param?: FilterConfirmProps) => void, dataIndex: DataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<DataType> = [
    {
      title: "False Positive Rate Tolerance",
      dataIndex: "fpr",
      key: "fpr",
      width: "30%",
      ...getColumnSearchProps("fpr"),
    },
    {
      title: "Accuracy (%)",
      dataIndex: "accuracy",
      key: "accuracy",
      width: "20%",
      ...getColumnSearchProps("accuracy"),
    },
    {
      title: "ROC Area Under Curve Score",
      dataIndex: "roc",
      key: "roc",
      width: "20%",
      ...getColumnSearchProps("roc"),
    },
    {
      title: "True Negatives",
      dataIndex: "tn",
      key: "tn",
      width: "20%",
      ...getColumnSearchProps("tn"),
    },
    {
      title: "False Positives",
      dataIndex: "fp",
      key: "fp",
      width: "20%",
      ...getColumnSearchProps("fp"),
    },
    {
      title: "False Negatives",
      dataIndex: "fn",
      key: "fn",
      width: "20%",
      ...getColumnSearchProps("fn"),
    },
    {
      title: "True Positives",
      dataIndex: "tp",
      key: "tp",
      width: "20%",
      ...getColumnSearchProps("tp"),
    },
    // key: string;
    // fpr: number;
    // accuracy: number;
    // roc: number;
    // tn: number;
    // fp: number;
    // fn: number;
    // tp: number;
    // {
    //   title: "Address",
    //   dataIndex: "address",
    //   key: "address",
    //   ...getColumnSearchProps("address"),
    //   sorter: (a, b) => a.address.length - b.address.length,
    //   sortDirections: ["descend", "ascend"],
    // },
  ];

  return <Table columns={columns} dataSource={data} />;
};

export default MLPrivacyMeterTable;
