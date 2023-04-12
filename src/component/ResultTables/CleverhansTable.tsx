import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef } from "antd";
import { Button, Input, Space, Table } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { attackPromiseState, attackResultState } from "@/recoil/Atom";
import { useRecoilValue } from "recoil";
import { useMemo } from "react";

interface DataType {
  key: string;
  name: string;
  accuracy: number;
  // lowestAccuracy: number; // add lowestAccuracy property
}

// type DataIndex = keyof DataType;

// const data: DataType[] = [
//   {
//     key: "1",
//     name: "Fast Gradient Method Attack",
//     accuracy: lowestAccuracy["fast gradient"],
//   },
//   {
//     key: "2",
//     name: "Basic Iterative Method Attack",
//     accuracy: 42,
//   },
//   {
//     key: "3",
//     name: "Momentum Iterative Method Attack",
//     accuracy: 32,
//   },
//   {
//     key: "4",
//     name: "Madry Et Al Method Attack",
//     accuracy: 32,
//   },
//   {
//     key: "5",
//     name: "SPSA Method Attack",
//     accuracy: 32,
//   },
// ];

type AttackResult = {
  library: string;
  attackname: string;
  data: {
    epsilons: number[];
    accuracy: number[];
  };
};

type DataIndex = keyof DataType;

const CleverhansTable: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const attackResults = useRecoilValue(attackResultState);
  console.log({ attackResults });

  const lowestAccuracy: { [key: string]: number } = {};
  const cleverhansAttackResults = attackResults.filter((result) => result.library === "cleverhans");

  cleverhansAttackResults.forEach((result) => {
    const { attackname, data } = result;
    const minAccuracy = Math.min(...data.accuracy);
    if (lowestAccuracy[attackname] === undefined || lowestAccuracy[attackname] > minAccuracy) {
      lowestAccuracy[attackname] = minAccuracy;
    }
  });

  const showCleverhansSummary = useMemo(() => {
    return attackResults.some((result) => result.library === "cleverhans");
  }, [attackResults]);

  const showCleverHansBasicIterative = useMemo(() => {
    return attackResults.some((result) => result.library === "cleverhans" && result.attackname === "basic iterative");
  }, [attackResults]);

  const showCleverHansFastGradient = useMemo(() => {
    return attackResults.some((result) => result.library === "cleverhans" && result.attackname === "fast gradient");
  }, [attackResults]);

  const showCleverHansMadryEtAl = useMemo(() => {
    return attackResults.some((result) => result.library === "cleverhans" && result.attackname === "madry et al");
  }, [attackResults]);

  const showCleverHansMomentumIterative = useMemo(() => {
    return attackResults.some((result) => result.library === "cleverhans" && result.attackname === "momentum iterative");
  }, [attackResults]);

  const showCleverHansProjectedGradienDescent = useMemo(() => {
    return attackResults.some((result) => result.library === "cleverhans" && result.attackname === "projected gradient descent");
  }, [attackResults]);

  const showCleverHansSpsa = useMemo(() => {
    return attackResults.some((result) => result.library === "cleverhans" && result.attackname === "spsa");
  }, [attackResults]);

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
      title: "Attack Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Post-Attack Accuracy (%)",
      dataIndex: "accuracy",
      key: "accuracy",
      width: "20%",
      ...getColumnSearchProps("accuracy"),
    },
    // {
    //   title: "Address",
    //   dataIndex: "address",
    //   key: "address",
    //   ...getColumnSearchProps("address"),
    //   sorter: (a, b) => a.address.length - b.address.length,
    //   sortDirections: ["descend", "ascend"],
    // },
  ];

  const data: DataType[] = [
    ...(showCleverHansFastGradient
      ? [
          {
            key: "1",
            name: "Fast Gradient Method Attack",
            accuracy: lowestAccuracy["fast gradient"],
          },
        ]
      : []),
    ...(showCleverHansProjectedGradienDescent
      ? [
          {
            key: "2",
            name: "Projected Gradient Descent Attack",
            accuracy: lowestAccuracy["projected gradient descent"],
          },
        ]
      : []),
    ...(showCleverHansBasicIterative
      ? [
          {
            key: "3",
            name: "Basic Iterative Method Attack",
            accuracy: lowestAccuracy["basic iterative"],
          },
        ]
      : []),
    ...(showCleverHansMomentumIterative
      ? [
          {
            key: "4",
            name: "Momentum Iterative Method Attack",
            accuracy: lowestAccuracy["momentum iterative"],
          },
        ]
      : []),
    ...(showCleverHansMadryEtAl
      ? [
          {
            key: "5",
            name: "Madry Et Al Method Attack",
            accuracy: lowestAccuracy["madry et al"],
          },
        ]
      : []),
    ...(showCleverHansSpsa
      ? [
          {
            key: "6",
            name: "SPSA Method Attack",
            accuracy: lowestAccuracy["spsa"],
          },
        ]
      : []),
  ];

  return <Table columns={columns} dataSource={data} />;
};

export default CleverhansTable;
