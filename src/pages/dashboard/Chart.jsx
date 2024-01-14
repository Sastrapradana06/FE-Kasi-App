import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'Augustus',
  'September',
  'October',
  'November',
  'December',
];

const getRandomData = () => labels.map(() => Math.floor(Math.random() * 12000000)); 

const data = {
  labels,
  datasets: [
    {
      label: 'Transaksi Masuk',
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 1,
      // data: [5000, 6000, 4500, 7000, 8000, 6000, ],
      data: getRandomData(),
    },
    {
      label: 'Transaksi Keluar',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 2,
      // data: [3000, 4000, 3500, 4500, 10000, 4000],
      data: getRandomData(),
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};


export default function Chart() {
  return <Bar options={options} data={data} className=' max-h-[450px] min-w-[100%]'/>;
}