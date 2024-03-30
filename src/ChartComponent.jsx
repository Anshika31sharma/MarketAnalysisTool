import React, { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";

const ChartComponent = () => {
  const chartContainerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://apigenerator.dronahq.com/api/b9-fAf8M/table"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        console.log("Fetched data:", jsonData);
        if (
          Array.isArray(jsonData) &&
          jsonData.length > 0 &&
          jsonData[0].data &&
          Array.isArray(jsonData[0].data.combined)
        ) {
          setChartData(jsonData[0].data.combined);
        } else {
          throw new Error("Data format is invalid");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!chartData || !chartContainerRef.current) return;

    const chartOptions = {
      layout: {
        textColor: "black",
        backgroundColor: "white",
      },
    };

    const chartInstance = createChart(chartContainerRef.current, chartOptions);
    const lineSeries = chartInstance.addLineSeries({
      color: "red",
      lineWidth: 2,
    });

    const areaSeries = chartInstance.addAreaSeries({
      topColor: "rgba(255, 0, 0, 0.3)",
      bottomColor: "rgba(255, 0, 0, 0)",
      lineWidth: 0,
    });

    const formattedChartData = chartData.map((item) => ({
      time: new Date(item.date).getTime(),
      value: item.cumsum,
    }));

    formattedChartData.sort((a, b) => a.time - b.time);

    lineSeries.setData(formattedChartData);
    areaSeries.setData(formattedChartData);
    chartInstance.timeScale().fitContent();

    return () => {
      chartInstance.remove();
    };
  }, [chartData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="w-full mx-auto max-w-full mt-8 relative">
      <div className="w-full h-full relative">
        <div
          ref={chartContainerRef}
          className="w-full"
          style={{ height: "400px" }}
        ></div>
        <img
          className="absolute top-0 z-10 right-0 p-2 bg-black h-10 mt-8 lg:mt-80 mr-8 lg:mr-32"
          src="https://maticalgos.com/wp-content/uploads/2022/01/logo_white.png"
          alt="Logo"
        />
      </div>
    </div>
  );
};

export default ChartComponent;
