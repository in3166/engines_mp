const repairCol = [
  {
    title: '부품 이름',
    dataIndex: ['part', 'name'],
    sorter: {
      compare: (a, b) => a.part.name.localeCompare(b.part.name),
      multiple: 2,
    },
    width: 100,
    align: 'center',
  },
  {
    title: '상태',
    dataIndex: 'status',
    sorter: {
      compare: (a, b) => a.status - b.status,
      multiple: 5,
    },
    width: 100,
    render: value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    align: 'center',
  },
  {
    title: '날짜',
    dataIndex: 'date',
    sorter: {
      compare: (a, b) => a.date.localeCompare(b.date),
      multiple: 3,
    },
    width: 200,
    responsive: ['lg'],
    align: 'center',
  },
];

export default repairCol;
