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

const FoolboxTable: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const attackResults = useRecoilValue(attackResultState);
  console.log({ attackResults });

  // const lowestAccuracy: { [key: string]: number } = {};
  // const foolboxAttackResults = attackResults.filter((result) => result.library === "foolbox");

  // foolboxAttackResults.forEach((result) => {
  //   const { attackname, data } = result;
  //   const accuracyData = data["2"] ?? data["inf"]; // Check if "2" or "inf" key exists
  //   const minAccuracy = Math.min(...accuracyData.accuracy);

  //   if (lowestAccuracy[attackname] === undefined || lowestAccuracy[attackname] > minAccuracy) {
  //     lowestAccuracy[attackname] = minAccuracy;
  //   }
  // });

  const lowestAccuracy: { [key: string]: number } = {};
  const foolboxAttackResults = attackResults.filter((result) => result.library === "foolbox");

  foolboxAttackResults.forEach((result) => {
    const { attackname, data } = result;
    let minAccuracy;

    if (attackname === "additive gaussian") {
      let allData = [];
      if (data["2"] !== undefined) {
        const additiveData = data["2"]?.["additive"];
        const clippingAwareData = data["2"]?.["clipping-aware-additive"];
        const repeatedData = data["2"]?.["repeated-additive"];
        const repeatedClippingData = data["2"]?.["clipping-aware-repeated-additive"];
        allData = [additiveData, clippingAwareData, repeatedData, repeatedClippingData].filter(Boolean);
      }
      if (data["additive"] !== undefined) {
        allData.push(data["additive"]);
      }
      if (data["clipping-aware-additive"] !== undefined) {
        allData.push(data["clipping-aware-additive"]);
      }
      if (data["repeated-additive"] !== undefined) {
        allData.push(data["repeated-additive"]);
      }
      if (data["clipping-aware-repeated-additive"] !== undefined) {
        allData.push(data["clipping-aware-repeated-additive"]);
      }
      const minAccuracies = allData.map((d) => Math.min(...d.accuracy));
      console.log("minAccuracies:", minAccuracies);
      minAccuracy = Math.min(...minAccuracies);
    } else if (attackname === "additive uniform") {
      let allData = [];
      if (data["2"] !== undefined) {
        const additiveData = data["2"]?.["additive"];
        const clippingAwareData = data["2"]?.["clipping-aware-additive"];
        const repeatedData = data["2"]?.["repeated-additive"];
        const repeatedClippingData = data["2"]?.["clipping-aware-repeated-additive"];
        allData = [additiveData, clippingAwareData, repeatedData, repeatedClippingData].filter(Boolean);
      }
      if (data["inf"] !== undefined) {
        const additiveData = data["inf"]?.["additive"];
        const repeatedData = data["inf"]?.["repeated-additive"];
        allData.push(additiveData, repeatedData);
      }
      const minAccuracies = allData.map((d) => Math.min(...d.accuracy));
      console.log("minAccuracies:", minAccuracies);
      minAccuracy = Math.min(...minAccuracies);
    } else {
      const accuracyData = data["2"] ?? data["inf"] ?? data;
      minAccuracy = Math.min(...accuracyData.accuracy.filter((a: number) => isFinite(a)));
    }

    if (lowestAccuracy[attackname] === undefined || lowestAccuracy[attackname] > minAccuracy) {
      lowestAccuracy[attackname] = minAccuracy;
    }
  });

  // foolboxAttackResults.forEach((result) => {
  //   const { attackname, data } = result;
  //   const accuracyData = data["2"] || data["inf"]; // Check if "2" or "inf" key exists
  //   const minAccuracy = Math.min(...data.accuracy.filter((val: number) => !isNaN(val)));

  //   if (lowestAccuracy[attackname] === undefined || lowestAccuracy[attackname] > minAccuracy) {
  //     lowestAccuracy[attackname] = minAccuracy;
  //   }
  // });

  const showfoolboxSummary = useMemo(() => {
    return attackResults.some((result) => result.library === "foolbox");
  }, [attackResults]);

  const showDeepFool = useMemo(() => {
    return attackResults.some((result) => result.library === "foolbox" && result.attackname === "deep fool");
  }, [attackResults]);

  const showFoolboxFastGradient = useMemo(() => {
    return attackResults.some((result) => result.library === "foolbox" && result.attackname === "fast gradient");
  }, [attackResults]);

  const showFoolboxBasicIterative = useMemo(() => {
    return attackResults.some((result) => result.library === "foolbox" && result.attackname === "basic iterative");
  }, [attackResults]);

  const showAdditiveGaussian = useMemo(() => {
    return attackResults.some((result) => result.library === "foolbox" && result.attackname === "additive gaussian");
  }, [attackResults]);

  const showAdditiveUniform = useMemo(() => {
    return attackResults.some((result) => result.library === "foolbox" && result.attackname === "additive uniform");
  }, [attackResults]);

  const showInversionAttack = useMemo(() => {
    return attackResults.some((result) => result.library === "foolbox" && result.attackname === "inversion");
  }, [attackResults]);

  const showSaltandPepperAttack = useMemo(() => {
    return attackResults.some((result) => result.library === "foolbox" && result.attackname === "salt and pepper");
  }, [attackResults]);

  // const showContrastReductionAttack = useMemo(() => {
  //   return attackResults.some((result) => result.library === "foolbox" && result.attackname === "contrast reduction");
  // }, [attackResults]);

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
    ...(showDeepFool
      ? [
          {
            key: "1",
            name: "Deep Fool Attack",
            accuracy: lowestAccuracy["deep fool"],
          },
        ]
      : []),
    ...(showFoolboxFastGradient
      ? [
          {
            key: "2",
            name: "Fast Gradient Attack",
            accuracy: lowestAccuracy["fast gradient"],
          },
        ]
      : []),
    ...(showFoolboxBasicIterative
      ? [
          {
            key: "3",
            name: "Basic Iterative Attack",
            accuracy: lowestAccuracy["basic iterative"],
          },
        ]
      : []),
    ...(showAdditiveGaussian
      ? [
          {
            key: "4",
            name: "Additive Gaussian Noise Attack",
            accuracy: lowestAccuracy["additive gaussian"],
          },
        ]
      : []),
    ...(showAdditiveUniform
      ? [
          {
            key: "5",
            name: "Additive Uniform Noise Attack",
            accuracy: lowestAccuracy["additive uniform"],
          },
        ]
      : []),
    ...(showInversionAttack
      ? [
          {
            key: "6",
            name: "Inversion",
            accuracy: lowestAccuracy["inversion"],
          },
        ]
      : []),
    ...(showSaltandPepperAttack
      ? [
          {
            key: "7",
            name: "Salt & Pepper Noise Attack",
            accuracy: lowestAccuracy["salt and pepper"],
          },
        ]
      : []),
    // ...(showContrastReductionAttack
    //   ? [
    //       {
    //         key: "8",
    //         name: "Contrast Reduction",
    //         accuracy: lowestAccuracy["inversion"],
    //       },
    //     ]
    //   : []),
  ];

  return <Table columns={columns} dataSource={data} />;
};

export default FoolboxTable;
