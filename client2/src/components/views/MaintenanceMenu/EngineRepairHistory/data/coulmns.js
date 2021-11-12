const engineCol = [
  {
    title: 'ID',
    dataIndex: 'id',
    sorter: {
      compare: (a, b) => a.id.localeCompare(b.id),
      multiple: 1,
    },
    width: 100,
  },
  {
    title: '엔진 ID',
    dataIndex: ['engine', 'id'],
    sorter: {
      compare: (a, b) => a.id.localeCompare(b.id),
      multiple: 1,
    },
    width: 100,
  },
  {
    title: '엔진 이름',
    dataIndex: ['engine', 'name'],
    sorter: {
      compare: (a, b) => a.name.localeCompare(b.name),
      multiple: 2,
    },
    width: 100,
  },
  {
    title: '예상 수명',
    dataIndex: ['engine', 'defaultLifespan'],
    sorter: {
      compare: (a, b) => a.defaultLifespan - b.defaultLifespan,
      multiple: 5,
    },
    width: 100,
    render: value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
  },
  // {
  //   title: '최근 수리 날짜',
  //   dataIndex: ['engine', 'recentRepairDate'],
  //   sorter: {
  //     compare: (a, b) => a.recentRepairDate.localeCompare(b.recentRepairDate),
  //     multiple: 3,
  //   },
  //   width: 200,
  //   responsive: ['lg'],
  // },
];

const partCol = [
  {
    title: 'Section.1',
    dataIndex: ['part', 'section1'],
    key: 'section1',
    sorter: {
      compare: (a, b) => a.part.section1.localeCompare(b.part.section1),
      multiple: 3,
    },
  },
  {
    title: 'Section.2',
    dataIndex: ['part', 'section2'],
    key: 'section2',
    sorter: {
      compare: (a, b) => a.part.section2.localeCompare(b.part.section2),
      multiple: 3,
    },
  },
  {
    title: '이름',
    dataIndex: ['part', 'name'],
    key: 'name2',
    sorter: {
      compare: (a, b) => a.part.name.localeCompare(b.part.name),
      multiple: 3,
    },
  },
];

export { engineCol, partCol };
