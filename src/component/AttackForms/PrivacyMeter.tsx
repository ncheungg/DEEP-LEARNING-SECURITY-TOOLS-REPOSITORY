import React, { useState } from "react";
import { DownOutlined, FileSearchOutlined, InfoCircleOutlined, PlusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Input, Button, Radio, Select, Checkbox, MenuProps, FormInstance } from "antd";
import { runPrivacyMeterPopulationAttack } from "@/api/privacyMeter";
import { modelNameState, datasetNameState, attackPromiseState } from "@/recoil/Atom";
import { useRecoilValue, useSetRecoilState } from "recoil";

interface PrivLibProps {
  formRef: React.MutableRefObject<FormInstance<any>>;
}

const PrivLib = (props: PrivLibProps) => {
  const { formRef } = props;

  // enable/disable form checkbox
  const [componentEnabled, setComponentEnabled] = useState<boolean>(false);
  const onFormLayoutChange = ({ disabled }: { disabled: boolean }) => {
    setComponentEnabled(disabled);
  };

  const [numClasses, setNumClasses] = useState<number>();
  const [lossFunction, setLossFunction] = useState<string>();

  const modelName = useRecoilValue(modelNameState);
  const datasetName = useRecoilValue(datasetNameState);

  const setAttackPromises = useSetRecoilState(attackPromiseState);

  const onFinish = () => {
    if (componentEnabled) {
      const promise = runPrivacyMeterPopulationAttack({ modelName, datasetName, numClasses, lossFunction });
      setAttackPromises((currentState) => [...currentState, promise]);
    }
  };

  return (
    <div style={{ paddingBottom: "1.3em" }}>
      <Checkbox checked={componentEnabled} onChange={(e) => setComponentEnabled(e.target.checked)} style={{ paddingBottom: "1.5em" }}>
        <b>Enable ML Privacy Meter</b>
      </Checkbox>
      <a href="/documentation#ml-privacy-meter" target="_blank" rel="noreferrer noopener">
        <FileSearchOutlined style={{ color: "gray" }} />
      </a>

      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onValuesChange={onFormLayoutChange}
        disabled={!componentEnabled}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        ref={formRef}
      >
        <Form.Item
          label="Num of Classes:"
          rules={[{ required: true, message: "Please input Epsilon value." }]}
          tooltip="Number of possible output classes"
          required={componentEnabled}
        >
          <Input type="number" placeholder="5" onChange={(e) => setNumClasses(Number(e.target.value))} />
        </Form.Item>

        <Form.Item
          required={componentEnabled}
          label="Loss Function:"
          rules={[{ required: true, message: "Please input Order of the Norm value." }]}
          tooltip="Loss function used by ML Privacy Meter to perform audit"
        >
          <Select
            defaultValue="Select"
            // style={{ width: 230 }}
            onChange={(val) => setLossFunction(val)}
            options={[
              { value: "Binary Crossentropy", label: "Binary Crossentropy" },
              { value: "Categorical Crossentropy", label: "Categorical Crossentropy" },
              { value: "Mean Absolute Error", label: "Mean Absolute Error" },
              { value: "Mean Squared Error", label: "Mean Squared Error" },
            ]}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default PrivLib;
