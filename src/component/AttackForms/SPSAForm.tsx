import React, { useState } from "react";
import { InfoCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Input, Button, Radio, Select, Cascader, DatePicker, InputNumber, TreeSelect, Switch, Checkbox, Upload } from "antd";
import { Tooltip } from "antd";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const SPSAForm: React.FC = () => {
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
  const onFormLayoutChange = ({ disabled }: { disabled: boolean }) => {
    setComponentDisabled(disabled);
  };

  SPSAForm.displayName = "SPSAForm";

  return (
    <>
      <Checkbox checked={componentDisabled} onChange={(e) => setComponentDisabled(e.target.checked)} style={{ paddingBottom: "1.5em" }}>
        <b>SPSA Method Attack</b>
      </Checkbox>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onValuesChange={onFormLayoutChange}
        disabled={!componentDisabled}
        style={{ maxWidth: 600 }}
      >
        <Form.Item label="Epsilon:">
          <Input
            suffix={
              <Tooltip title="Epsilon Definition: The maximum distortion of adversarial example compared to original input.">
                <InfoCircleOutlined style={{ color: "gray" }} />
              </Tooltip>
            }
          />
        </Form.Item>
      </Form>
    </>
  );
};

export default SPSAForm;
