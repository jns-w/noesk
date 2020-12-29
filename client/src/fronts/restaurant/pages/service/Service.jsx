import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import TableCard from './components/ui/TableCard';
import Table from './Table';
import './styles/service.scss'

function Service() {
  const [restaurantData, setRestaurantData] = useState([]);
  const [expandedTable, setExpandedTable] = useState('');
  let tables = '';
  async function getRestaurantData() {
    // const res = await axios.get('/api/tables')
    await Axios.get('/api/tables')
      .then((res) => {
        setRestaurantData(res.data.tables);
      })
      .catch((err) => console.log(err));
  }

  function receiveOrder() {
    // return socket.receive('order', () => {
    //   getRestaurantData();
    // });
  }

  if (restaurantData) {
    tables = restaurantData.map((tableData) => (
      <TableCard
        tableData={tableData}
        key={tableData._id}
        getRestaurantData={getRestaurantData}
        setExpandedTable={setExpandedTable}
      />
    ));
  }

  useEffect(() => {
    getRestaurantData();
    receiveOrder();
  }, []);

  if (expandedTable && restaurantData) {
    return (
      <Table
        setExpandedTable={setExpandedTable}
        tableData={restaurantData[expandedTable - 1]}
        expandedTable={expandedTable}
        getRestaurantData={getRestaurantData()}
      />
    );
  }
  return (
    <div className="container">
      <div className="tables-container">{tables}</div>
    </div>
  );
}

export default Service;
