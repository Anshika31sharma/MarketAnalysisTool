import React from 'react';
import ChartComponent from './ChartComponent.jsx';
import TableComponent from './TableComponent.jsx';

function App() {
  return (
    <div className="App">
      <header className="text-center p-5">
        <h1 className="text-2xl font-bold">Drawdown Periods</h1>
      </header>
      <div className="p-4 flex flex-col lg:flex-row">
        <ChartComponent className="lg:w-1/2" />
        <TableComponent className="lg:w-1/2 mt-4 lg:mt-0" />
      </div>
    </div>
  );
}

export default App;
