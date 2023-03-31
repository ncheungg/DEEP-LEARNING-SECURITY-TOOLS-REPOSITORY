import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

const URL1 = "https://dlstr-cleverhans-api-gateway-1brzzfaf.ue.gateway.dev/original-data";
const URL2 = "https://dlstr-cleverhans-api-gateway-1brzzfaf.ue.gateway.dev/cleverhans/fgm";
const URL3 = "https://dlstr-cleverhans-api-gateway-1brzzfaf.ue.gateway.dev/cleverhans/bim";
const URL4 = "https://dlstr-cleverhans-api-gateway-1brzzfaf.ue.gateway.dev/cleverhans/mim";
const URL5 = "https://dlstr-cleverhans-api-gateway-1brzzfaf.ue.gateway.dev/cleverhans/mea";

export const Demo = () => {
  const [epsilon, setEpsilon] = useState(0.01);
  const [isLoading, setIsLoading] = useState(false);

  const [attack1Text, setAttack1Text] = useState("");
  const [attack2Text, setAttack2Text] = useState("");
  const [attack3Text, setAttack3Text] = useState("");
  const [attack4Text, setAttack4Text] = useState("");
  const [attack5Text, setAttack5Text] = useState("");

  const fetchUrls = async () => {
    setIsLoading(true);

    const res1 = fetch(URL1, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model_name: "test_model",
        dataset_name: "cifar10",
      }),
    });

    const res2 = fetch(URL2, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model_name: "test_model",
        dataset_name: "cifar10",
        epsilon,
        order_of_norm: "inf",
      }),
    });

    const res3 = fetch(URL3, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model_name: "test_model",
        dataset_name: "cifar10",
        epsilon,
        epsilon_iter: 0.01,
        attack_iter: 40,
        order_of_norm: "inf",
      }),
    });

    const res4 = fetch(URL4, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        attack_name: "FGM",
        model_name: "test_model",
        dataset_name: "cifar10",
        epsilon,
        epsilon_iter: 0.01,
        attack_iter: 40,
        order_of_norm: "inf",
        decay_factor: 1.0,
      }),
    });

    const res5 = fetch(URL5, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model_name: "test_model",
        dataset_name: "cifar10",
        epsilon,
        epsilon_iter: 0.01,
        attack_iter: 40,
        order_of_norm: "inf",
      }),
    });

    const promises = await Promise.all([res1, res2, res3, res4, res5]);

    const text1 = await promises[0].text();
    const text2 = await promises[1].text();
    const text3 = await promises[2].text();
    const text4 = await promises[3].text();
    const text5 = await promises[4].text();

    setAttack1Text(text1);
    setAttack2Text(text2);
    setAttack3Text(text3);
    setAttack4Text(text4);
    setAttack5Text(text5);

    setIsLoading(false);
  };

  return (
    <>
      <div>
        <Typography gutterBottom>Epsilon</Typography>
        <Slider
          size="small"
          defaultValue={0.01}
          step={0.001}
          min={0}
          max={0.5}
          aria-label="Small"
          valueLabelDisplay="auto"
          onChangeCommitted={(e, v) => setEpsilon(v as number)}
        />

        <Button variant="contained" onClick={fetchUrls}>
          Fetch
        </Button>
      </div>

      {isLoading && <CircularProgress />}

      <>
        <p>{attack1Text}</p>
        <p>{attack2Text}</p>
        <p>{attack3Text}</p>
        <p>{attack4Text}</p>
        <p>{attack5Text}</p>
      </>
    </>
  );
};
export default Demo;
