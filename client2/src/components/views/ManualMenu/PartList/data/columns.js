const columns = [
  {
    title: 'Section.1',
    dataIndex: 'section1',
    sorter: {
      compare: (a, b) => a.section1.localeCompare(b.section1),
      multiple: 1,
    },
    width: 10,
    align: 'center',
  },
  {
    title: 'Section.2',
    dataIndex: 'section2',
    sorter: {
      compare: (a, b) => a.section2.localeCompare(b.section2),
      multiple: 2,
    },
    width: 10,
    align: 'center',
  },
  {
    title: '이름',
    dataIndex: 'name',
    sorter: {
      compare: (a, b) => a.name.localeCompare(b.name),
      multiple: 2,
    },
    width: 200,
    align: 'center',
  },
  {
    title: '기본 수명',
    dataIndex: 'defaultLifespan',
    sorter: {
      compare: (a, b) => a.defaultLifespan - b.defaultLifespan,
      multiple: 4,
    },
    width: 80,
    align: 'center',
  },
  {
    title: '예측 수명',
    dataIndex: 'expectLifespan',
    sorter: {
      compare: (a, b) => a.expectLifespan - b.expectLifespan,
      multiple: 4,
    },
    width: 80,
    align: 'center',
  },
  {
    title: '실수명',
    dataIndex: 'actualLifespan',
    sorter: {
      compare: (a, b) => a.actualLifespan - b.actualLifespan,
      multiple: 5,
    },
    width: 80,
    align: 'center',
  },
  {
    title: '가격',
    dataIndex: 'price',
    sorter: {
      compare: (a, b) => a.price - b.price,
      multiple: 4,
    },
    width: 90,
    align: 'center',
  },
  {
    title: '설명',
    dataIndex: 'desc',
    sorter: {
      compare: (a, b) => a.desc.localeCompare(b.desc),
      multiple: 3,
    },
    responsive: ['xl'],
    align: 'center',
  },
];

export default columns;
