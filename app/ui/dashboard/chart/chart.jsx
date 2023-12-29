"use client"

import styles from './chart.module.css'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: "Sun",
    applicants: 400,
    interviews: 240,
  },
  {
    name: "Mon",
    applicants: 300,
    interviews: 138,
  },
  {
    name: "Tue",
    applicants: 200,
    interviews: 300,
  },
  {
    name: "Wed",
    applicants: 280,
    interviews: 308,
  },
  {
    name: "Thu",
    applicants: 190,
    interviews: 400,
  },
  {
    name: "Fri",
    applicants: 290,
    interviews: 380,
  },
  {
    name: "Sat",
    applicants: 390,
    interviews: 430,
  },
];

const Chart = () => {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Weekly Recap</h4>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip contentStyle={{background:"white", border:"none"}}/>
          <Legend />
          <Line type="monotone" dataKey="applicants" stroke="blue" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="interviews" stroke="purple" strokeDasharray="3 4 5 2" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart