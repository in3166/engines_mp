const columns = [
  {
    title: 'Section.1',
    dataIndex: 'section1',
    sorter: {
      compare: (a, b) => a.section1.localeCompare(b.section1),
      multiple: 1,
    },
    width: 90,
    align: 'center',
    responsive: ['lg'],
  },
  {
    title: 'Section.2',
    dataIndex: 'section2',
    sorter: {
      compare: (a, b) => a.section2.localeCompare(b.section2),
      multiple: 2,
    },
    width: 90,
    align: 'center',
    responsive: ['lg'],
  },
  {
    title: '이름',
    dataIndex: 'name',
    sorter: {
      compare: (a, b) => a.name.localeCompare(b.name),
      multiple: 2,
    },
    width: 160,
    align: 'center',
  },
  {
    title: '실수명',
    dataIndex: 'actualLifespan',
    sorter: {
      compare: (a, b) => a.actualLifespan - b.actualLifespan,
      multiple: 5,
    },
    width: 100,
    align: 'center',
    render: value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
  },
];

export default columns;
