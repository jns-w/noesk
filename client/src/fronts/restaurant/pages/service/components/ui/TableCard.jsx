import React from 'react';
import PropTypes from 'prop-types';
import {
  faPlus,
  faEllipsisH,
  faExclamationCircle,
  faExpand,
} from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import FAIcon from '../../../../../shared/components/FAIcon';

function TableCard({ tableData, getRestaurantData, setExpandedTable }) {
  async function createSession() {
    await Axios.post('/api/session/new', {
      tableNo: tableData.tableNo,
    })
    .then(res => {
      console.log(res)
      getRestaurantData()
    })
    .catch(err => console.log(err));
    // getRestaurantData();
  }

  async function endSession() {
    await Axios.patch(`/api/session/${tableData.tableNo}`)
    .then(res =>{
      console.log(res)
      getRestaurantData();
    })
    .catch(err => console.log(err));
  }

  function calcOrders(data, displayType) {
    if (displayType === 'completed') {
      return data.session.orders.filter((order) => order.status === 'Completed').length;
    }
    if (displayType === 'in-progress') {
      return data.session.orders.filter(
        (order) => order.status === 'Confirmed' || order.status === 'Preparing'
      ).length;
    }
    if (displayType === 'requests') {
      return data.session.orders.filter((order) => order.status === 'Requested').length;
    }
  }

  function renderOrder(displayType) {
    const count = calcOrders(tableData, displayType);
    if (count === 0) {
      return (
        <div className="order-display zero">
          <h4>0</h4>
          <p>{displayType} orders</p>
        </div>
      );
    }
    return (
      <div className={`order-display ${displayType}`}>
        <h4>{count}</h4>
        <p>{displayType} orders</p>
      </div>
    );
  }

  if (tableData.session) {
    return (
      <div className="table-card">
        <div className="table-header">
          <FAIcon icon={faEllipsisH} clickFunc={endSession} />
          <h3>Table {tableData.tableNo}</h3>
          <div className="notifications">
            {calcOrders(tableData, 'requests') ? (
              <FAIcon icon={faExclamationCircle} iconClass="fa-icon" />
            ) : (
              ''
            )}
          </div>
        </div>

        <div className="table-body">
          {tableData.session.orders ? (
            <div className="table-row">
              {renderOrder('completed')}
              {renderOrder('in-progress')}
              {renderOrder('requests')}
            </div>
          ) : (
            ''
          )}
          <div className="table-row">
            <div />
            <FAIcon icon={faExpand} clickFunc={() => setExpandedTable(tableData.tableNo)} />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="table-card">
      <div className="table-header">
        <div />
        <h3 className="inactive">Table {tableData.tableNo}</h3>
        <div />
      </div>
      <FAIcon
        iconClass="plus-button"
        clickFunc={createSession}
        divClass="plus-button-wrapper"
        icon={faPlus}
      />
    </div>
  );
}

TableCard.propTypes = {
  tableData: PropTypes.object,
  getRestaurantData: PropTypes.func,
  setExpandedTable: PropTypes.func,
};

export default TableCard;
