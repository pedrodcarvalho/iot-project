import { useEffect, useState } from 'react';

import { useTheme } from '@mui/material/styles';

import ReactApexChart from 'react-apexcharts';

import axios from 'axios';

const barChartOptions = {
  chart: {
    type: 'bar',
    height: 365,
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      columnWidth: '45%',
      borderRadius: 4
    }
  },
  dataLabels: {
    enabled: false
  },
  xaxis: {
    categories: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    show: false
  },
  grid: {
    show: false
  }
};

const MonthlyBarChart = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [presence, setPresence] = useState({
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0
  });

  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const info = theme.palette.info.light;

  const [series, setSeries] = useState([
    {
      name: 'Present Stuents',
      data: [presence.monday, presence.tuesday, presence.wednesday, presence.thursday, presence.friday, 0, 0]
    }
  ]);

  useEffect(() => {
    setSeries((prevState) => ([
      {
        ...prevState[0],
        data: [presence.monday, presence.tuesday, presence.wednesday, presence.thursday, presence.friday, 0, 0]
      }
    ]));
  }, [presence]);

  const [options, setOptions] = useState(barChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [info],
      xaxis: {
        labels: {
          style: {
            colors: [secondary, secondary, secondary, secondary, secondary, secondary, secondary]
          }
        }
      },
      tooltip: {
        theme: 'light'
      }
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [primary, info, secondary]);

  const fetchPresenceData = async () => {
    try {
      setToken(localStorage.getItem('token'));

      await axios.get('http://localhost:5000/get-attendance', {
        headers: {
          Authorization: token
        }
      })
        .then((res) => {
          res.data.map((entry) => {
            entry.students.map((attendance) => {
              if (new Date(attendance.time).getDay() === 1) {
                setPresence((prevState) => ({
                  ...prevState,
                  monday: prevState.monday + 1
                }));
              }
              else if (new Date(attendance.time).getDay() === 2) {
                setPresence((prevState) => ({
                  ...prevState,
                  tuesday: prevState.tuesday + 1
                }));
              }
              else if (new Date(attendance.time).getDay() === 3) {
                setPresence((prevState) => ({
                  ...prevState,
                  wednesday: prevState.wednesday + 1
                }));
              }
              else if (new Date(attendance.time).getDay() === 4) {
                setPresence((prevState) => ({
                  ...prevState,
                  thursday: prevState.thursday + 1
                }));
              }
              else if (new Date(attendance.time).getDay() === 5) {
                setPresence((prevState) => ({
                  ...prevState,
                  friday: prevState.friday + 1
                }));
              }
            });
          });
        });
    }
    catch (err) {
      window.location.href = `/error?message=${err.message}`;
    }
  };

  useEffect(() => {
    fetchPresenceData();
  }, []);

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="bar" height={365} />
    </div>
  );
};

export default MonthlyBarChart;
