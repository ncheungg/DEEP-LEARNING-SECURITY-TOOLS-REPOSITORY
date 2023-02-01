import React, { useState } from "react";
import { AppstoreOutlined, CloudSyncOutlined, HomeOutlined, InfoCircleOutlined, MailOutlined, SettingOutlined } from "@ant-design/icons";
import { Col, MenuProps } from "antd";
import { Menu } from "antd";
import Image from "next/image";

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
//       <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
//         Navigation Four - Link
//       </a>
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
      <a href="/" rel="noopener noreferrer">
        Home
      </a>
    ),
    key: "home",
    icon: <HomeOutlined />,
  },
  {
    label: (
      <a href="/attack" rel="noopener noreferrer">
        Attack
      </a>
    ),
    key: "attack",
    icon: <CloudSyncOutlined />,
  },
  {
    label: (
      <a href="/about" rel="noopener noreferrer">
        About
      </a>
    ),
    key: "about",
    icon: <InfoCircleOutlined />,
  },
  {
    label: (
      <a href="/contact" rel="noopener noreferrer">
        Contact Us
      </a>
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
    <Col span={18} offset={3}>
      <a style={{ width: 40, height: 40, position: "absolute", paddingLeft: "1em", paddingTop: "2px" }} href="/">
        <img style={{ width: 40, height: 40 }} src="https://www.dropbox.com/s/veip84995nzd0mb/navlogo.png?raw=1" alt="Logo" />
      </a>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        style={{
          justifyContent: "right",
          paddingRight: "2em",
        }}
      />
    </Col>
  );
};

export default Navbar;
