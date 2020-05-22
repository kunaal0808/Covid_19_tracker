import React , { useState, useEffect,} from 'react';
import {Pie} from "react-chartjs-2"
import { fetchDailyData } from '../../api';

import styles from './PieChart.module.css';

const Piece = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState({});
  useEffect(() => {
    const fetchMyAPI = async () => {
      const initialDailyData = await fetchDailyData();
      setDailyData(initialDailyData);
    };
    fetchMyAPI();
  }, []);

  const PieChart = (
    confirmed ? (
      <Pie
        data={{
          labels: ['Number of active cases', 'Recovered', 'Deaths'],
          datasets: [
            {
              label: 'People',
              backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
              data: [confirmed.value-recovered.value-deaths.value, recovered.value, deaths.value],
            },
          ],
        }}
        options={{
          legend: { display: false },
          title: { display: true, text: `Pie Representation`}
        }}
      />
    ) : null
  );

  return (
    <div className={styles.container}>
      {PieChart}
    </div>
  );
};

export default Piece;