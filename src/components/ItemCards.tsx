import React, { useState } from "react";
import { useInterval } from "../components/hooks/useInterval";

const generateDataset = () => {
  const dataset = [];
  for (let i = 0; i < 10; i++) {
    dataset.push([Math.random() * 50, Math.random() * 50]);
  }
  return dataset;
};

const ItemCards = () => {
  const [dataset, setDataset] = useState(generateDataset());
  useInterval(() => {
    const newDataset = generateDataset();
    setDataset(newDataset);
  }, 2000);
  return (
    <svg viewBox="0 0 100 50">
      {dataset.map(([x, y], i) => (
        <circle cx={x} cy={y} r="3" />
      ))}
    </svg>
  );
};

export default ItemCards;
