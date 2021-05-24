const datas = (date, x, a) => {
  const xLength = x.length;
  a.forEach(() => {
    x.push(null);
    date.push('predict');
  });

  for (let i = 0; i < xLength; i += 1) {
    a.unshift(null);
  }

  return {
    chartData: {
      labels: date,
      datasets: [
        {
          label: 'Observed Data',
          data: [...x],
          fill: false,
          backgroundColor: 'rgba(75,192,192,0.2)',
          borderColor: 'rgba(75,192,192,1)',
        },
        {
          label: 'Predicted Data',
          data: [...a],
          fill: false,
          backgroundColor: 'rgba(211, 7, 61, 0.603)',
          borderColor: 'rgba(211, 7, 61, 0.603)',
        },
      ],
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,
      // tooltips 사용시
      tooltips: {
        enabled: true,
        mode: 'nearest',
        position: 'average',
        intersect: false,
      },
      scales: {
        xAxes: [
          {
            //   position: "top", //default는 bottom
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Step',
              fontFamily: 'Montserrat',
              fontColor: 'black',
            },
            ticks: {
              // beginAtZero: true,
              maxTicksLimit: 50, // x축에 표시할 최대 눈금 수
            },
          },
        ],
        yAxes: [
          {
            display: true,
            //   padding: 10,
            scaleLabel: {
              display: true,
              labelString: 'data',
              fontFamily: 'Montserrat',
              fontColor: 'black',
            },
            ticks: {
              beginAtZero: false,
              stepSize: 0.2,
              min: 505,
              max: 508,
              // y축 scale 값에 % 붙이기 위해 사용
              callback(value) {
                return `${value}`;
              },
            },
          },
        ],
      },
    },

    legend: {
      display: true,
      labels: {
        fontColor: 'black',
      },
      position: 'top', // label를 넣어주지 않으면 position이 먹히지 않음
    },
  };
};

export default datas;
