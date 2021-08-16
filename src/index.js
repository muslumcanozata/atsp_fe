import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AlertState from './contexts/alertContext/alertState';
import DBState from './contexts/dbContext/dbState';
import TablesState from './contexts/tableContext/tablesState';

ReactDOM.render(
  <AlertState>
    <DBState>
      <TablesState>
        <App />
      </TablesState>
    </DBState>
  </AlertState>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
