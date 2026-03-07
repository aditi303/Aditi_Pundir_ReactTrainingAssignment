import React, { useState } from "react";

interface StockRow {
  name: string;
  timestamp: string;
  value: number;
}

const mockData: StockRow[] = [
  { name: "Stock 1", timestamp: "10:00:01", value: 101 },
  { name: "Stock 2", timestamp: "10:00:02", value: 205 },
  { name: "Stock 1", timestamp: "10:00:03", value: 98 },
  { name: "Stock 2", timestamp: "10:00:04", value: 210 },
];

const DataGridPage: React.FC = () => {
  const [filter, setFilter] = useState<string>("");
  const [sortColumn, setSortColumn] = useState<keyof StockRow>("name");
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  const filteredData = mockData.filter(
    row =>
      row.name.toLowerCase().includes(filter.toLowerCase()) ||
      row.timestamp.includes(filter) ||
      row.value.toString().includes(filter)
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortAsc ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortAsc ? 1 : -1;
    return 0;
  });

  const handleSort = (column: keyof StockRow) => {
    if (sortColumn === column) {
      setSortAsc(!sortAsc);
    } else {
      setSortColumn(column);
      setSortAsc(true);
    }
  };

  return (
    <div>
      <h1>Datagrid</h1>
      <input
        type="text"
        placeholder="Filter by name/timestamp/value"
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />
      <table border={1} cellPadding={5} style={{ marginTop: "10px" }}>
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>Stock Name</th>
            <th onClick={() => handleSort("timestamp")}>Timestamp</th>
            <th onClick={() => handleSort("value")}>Value</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, idx) => (
            <tr key={idx}>
              <td>{row.name}</td>
              <td>{row.timestamp}</td>
              <td>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataGridPage;