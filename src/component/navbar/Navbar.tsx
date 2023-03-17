import React, { useState } from "react";
import {
  AppstoreOutlined,
  CloudSyncOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  MailOutlined,
  ScanOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Col, MenuProps } from "antd";
import { Menu } from "antd";
import Image from "next/image";
import Link from "next/link";

// const items: MenuProps["items"] = [
//   {
//     label: "Navigation One",
//     key: "mail",
//     icon: <MailOutlined />,
//   },
//   {
//     label: "Navigation Two",
//     key: "app",
//     icon: <AppstoreOutlined />,
//     disabled: true,
//   },
//   {
//     label: "Navigation Three - Submenu",
//     key: "SubMenu",
//     icon: <SettingOutlined />,
//     children: [
//       {
//         type: "group",
//         label: "Item 1",
//         children: [
//           {
//             label: "Option 1",
//             key: "setting:1",
//           },
//           {
//             label: "Option 2",
//             key: "setting:2",
//           },
//         ],
//       },
//       {
//         type: "group",
//         label: "Item 2",
//         children: [
//           {
//             label: "Option 3",
//             key: "setting:3",
//           },
//           {
//             label: "Option 4",
//             key: "setting:4",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     label: (
//       <Link href="https://Link nt.design" target="_blank" rel="noopener noreferrer">
//         Navigation Four - Link
//       </Link >
//     ),
//     key: "alipay",
//   },
// ];

const items: MenuProps["items"] = [
  // {
  //   label: (
  //     <img
  //       style={{
  //         width: 40,
  //         height: 40,
  //       }}
  //       src="https://www.dropbox.com/s/veip84995nzd0mb/navlogo.png?raw=1"
  //       alt="Logo"
  //     />
  //   ),
  //   key: "logo",
  // },
  {
    label: (
      <Link href="/" rel="noopener noreferrer">
        Home
      </Link>
    ),
    key: "home",
    icon: <HomeOutlined />,
  },
  {
    label: (
      <Link href="/attack" rel="noopener noreferrer">
        Scan
      </Link>
    ),
    key: "attack",
    icon: <ScanOutlined />,
  },
  {
    label: (
      <Link href="/documentation" rel="noopener noreferrer">
        Documentation
      </Link>
    ),
    key: "about",
    icon: <InfoCircleOutlined />,
  },
  {
    label: (
      <Link href="/contact" rel="noopener noreferrer">
        Contact Us
      </Link>
    ),
    key: "contact",
    icon: <MailOutlined />,
  },
];

const Navbar: React.FC = () => {
  const [current, setCurrent] = useState("mail");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <div>
      <Link style={{ width: 40, height: 40, position: "absolute", paddingLeft: "1em", paddingTop: "2px" }} href="/">
        <img style={{ width: 40, height: 40 }} src="https://www.dropbox.com/s/veip84995nzd0mb/navlogo.png?raw=1" alt="Logo" />
      </Link>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        style={{
          justifyContent: "right",
          paddingRight: "2em",
          width: "65em",
        }}
      />
    </div>
  );
};

export default Navbar;
