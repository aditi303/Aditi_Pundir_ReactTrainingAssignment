import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import DataGridPage from "./Datagridpage";
 // ✅ import the DataGrid component

interface StockData {
  timestamp: string;
  value: number;
}

const Dashboard: React.FC = () => {
  const [stock1, setStock1] = useState<number>(100);
  const [stock2, setStock2] = useState<number>(200);
  const [data1, setData1] = useState<StockData[]>([]);
  const [data2, setData2] = useState<StockData[]>([]);
  const [min1, setMin1] = useState<number>(100);
  const [max1, setMax1] = useState<number>(100);
  const [min2, setMin2] = useState<number>(200);
  const [max2, setMax2] = useState<number>(200);

  useEffect(() => {
    const interval = setInterval(() => {
      const timestamp = new Date().toLocaleTimeString();

      setStock1(prev => {
        const newVal = prev + (Math.random() * 10 - 5);
        setData1(d => [...d.slice(-9), { timestamp, value: newVal }]);
        setMin1(m => Math.min(m, newVal));
        setMax1(m => Math.max(m, newVal));
        return newVal;
      });

      setStock2(prev => {
        const newVal = prev + (Math.random() * 10 - 5);
        setData2(d => [...d.slice(-9), { timestamp, value: newVal }]);
        setMin2(m => Math.min(m, newVal));
        setMax2(m => Math.max(m, newVal));
        return newVal;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>

      <p>
        Stock 1 Value: {stock1.toFixed(2)} (Min: {min1.toFixed(2)}, Max: {max1.toFixed(2)})
      </p>
      <LineChart width={400} height={200} data={data1}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="blue" />
      </LineChart>

      <p>
        Stock 2 Value: {stock2.toFixed(2)} (Min: {min2.toFixed(2)}, Max: {max2.toFixed(2)})
      </p>
      <LineChart width={400} height={200} data={data2}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="green" />
      </LineChart>

      {/* ✅ Show DataGrid below charts */}
      <DataGridPage />
    </div>
  );
};

export default Dashboard;