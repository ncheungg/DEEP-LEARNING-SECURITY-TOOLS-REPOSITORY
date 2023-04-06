import React, { useRef, useState, useMemo } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef } from "antd";
import { Button, Input, Space, Table } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { attackPromiseState, attackResultState } from "@/recoil/Atom";
import { useRecoilValue } from "recoil";

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

const MLPrivacyMeterTable: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const attackResults = useRecoilValue(attackResultState);
  console.log({ attackResults });

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
  ];
  const privacyMeterResults = attackResults.filter((result) => {
    return result.attackname === "population" && result.library === "privacy meter";
  });
  const data: DataType[] = [];

  const dataSource: DataType[] = useMemo(() => {
    if (privacyMeterResults.length > 0) {
      const falsePositiveRate = privacyMeterResults[0].data.false_positive_rate;
      const accuracy = privacyMeterResults[0].data.accuracy;
      const roc = privacyMeterResults[0].data.roc_auc;
      const tn = privacyMeterResults[0].data.true_negative;
      const fp = privacyMeterResults[0].data.false_positives;
      const fn = privacyMeterResults[0].data.false_negatives;
      const tp = privacyMeterResults[0].data.true_positives;

      const data = falsePositiveRate.map((fpr: number, index: number) => ({
        key: index.toString(),
        fpr,
        accuracy: accuracy[index],
        roc: roc[index],
        tn: tn[index],
        fp: fp[index],
        fn: fn[index],
        tp: tp[index],
      }));

      return data;
    }
    return data;
  }, [privacyMeterResults]);

  return <Table columns={columns} dataSource={dataSource} />;
};

export default MLPrivacyMeterTable;
