import React, { useEffect, useState } from "react";

const TableComponent = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://apigenerator.dronahq.com/api/JS9vdmVI/data"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        console.log("Fetched data:", jsonData);
        setTableData(jsonData[0].data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error}</div>;

  return (
    <div className="container mx-auto mt-10 p-5">
      <div className="overflow-x-auto">
        <table className="w-full md:max-w-xl rounded-3xl border-collapse">
          <thead>
            <tr>
              <th className="border border-gray-400 px-6 py-3 bg-gray-300">
                Period
              </th>
              <th className="border border-gray-400 px-6 py-3 bg-gray-300">
                Max Drawdown
              </th>
              <th className="border border-gray-400 px-6 py-3 bg-gray-300">
                Trading Days
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-400 px-6 py-3 sm:px-4 sm:py-2">
                  {`${item.Start_Date} - ${item.End_Date}`}
                </td>
                <td className="border border-gray-400 px-6 py-3 sm:px-4 sm:py-2">
                  {item.Max_Drawdown}
                </td>
                <td className="border border-gray-400 px-6 py-3 sm:px-4 sm:py-2">
                  {item.Trading_days}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
