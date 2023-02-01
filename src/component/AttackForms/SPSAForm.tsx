import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, Button, Radio, Select, Cascader, DatePicker, InputNumber, TreeSelect, Switch, Checkbox, Upload } from "antd";
import { Tooltip } from "antd";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const SPSAForm: React.FC = () => {
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
  const onFormLayoutChange = ({ disabled }: { disabled: boolean }) => {
    setComponentDisabled(disabled);
  };

  return (
    <>
      <Checkbox checked={componentDisabled} onChange={(e) => setComponentDisabled(e.target.checked)} style={{ paddingBottom: "1.5em" }}>
        SPSA Method Attack
      </Checkbox>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onValuesChange={onFormLayoutChange}
        disabled={componentDisabled}
        style={{ maxWidth: 600 }}
      >
        <Tooltip title="Epsilon Definition: The maximum distortion of adversarial example compared to original input.">
          <Form.Item label="Epsilon:">
            <Input />
          </Form.Item>
        </Tooltip>
      </Form>
    </>
  );
};

export default () => <SPSAForm />;
