const data = [
  {
    labels: ['경고', '정상', '주의'],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  },
  {
    labels: ['경고', '정상', '주의'],
    datasets: [
      {
        data: [30, 270, 90],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  },
  {
    labels: ['경고', '정상', '주의'],
    datasets: [
      {
        data: [15, 250, 190],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  },
  {
    labels: ['경고', '정상', '주의'],
    datasets: [
      {
        data: [150, 100, 250],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  },
];

const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'First dataset',
      data: [33, 53, 85, 41, 44, 65],
      fill: true,
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
    },
    {
      label: 'Second dataset',
      data: [33, 25, 35, 51, 54, 76],
      fill: false,
      borderColor: '#742774',
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  tooltips: {
    enabled: true,
    mode: 'nearest',
    position: 'average',
    intersect: false,
  },
  scales: {
    xAxes: [
      {
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Step',
          fontFamily: 'Montserrat',
          fontColor: 'black',
        },
        ticks: {
          maxTicksLimit: 10, // x축에 표시할 최대 눈금 수
        },
      },
    ],
    yAxes: [
      {
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Coverage',
          fontFamily: 'Montserrat',
          fontColor: 'black',
        },
        ticks: {
          beginAtZero: true,
          stepSize: 20,
          min: 0,
          max: 100,
          callback(value) {
            return `${value}%`;
          },
        },
      },
    ],
  },
};

const legend = {
  display: true,
  labels: {
    fontColor: 'black',
  },
  position: 'top', // label를 넣어주지 않으면 position이 먹히지 않음
};

export { data, chartData, options, legend };
