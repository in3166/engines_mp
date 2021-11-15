const columns = [
  {
    title: 'Section.1',
    dataIndex: ['part', 'section1'],
    key: '1',
    minWidth: '0',
    sorter: {
      compare: (a, b) => a.part.section1.localeCompare(b.part.sction1),
      multiple: 3,
    },
  },
  {
    title: 'Section.2',
    dataIndex: ['part', 'section2'],
    key: '81',
    minWidth: '0',
    sorter: {
      compare: (a, b) => a.part.section2.localeCompare(b.part.sction2),
      multiple: 3,
    },
  },
  {
    title: '부품 이름',
    dataIndex: ['part', 'name'],
    key: '2',
    minWidth: '0',
    sorter: {
      compare: (a, b) => a.part.name.localeCompare(b.part.name),
      multiple: 3,
    },
  },
  {
    title: '기본 수명',
    dataIndex: ['part', 'defaultLifespan'],
    key: '3',
    minWidth: '0',
    sorter: {
      compare: (a, b) =>
        a.part.defaultLifespan.localeCompare(b.part.defaultLifespan),
      multiple: 3,
    },
  },
  {
    title: '예상 수명',
    dataIndex: ['part', 'expectLifespan'],
    key: '4',
    minWidth: '0',
    sorter: {
      compare: (a, b) => a.part.expectLifespan - b.part.expectLifespan,
      multiple: 3,
    },
    responsive: ['lg'],
  },
  {
    title: '실 수명',
    dataIndex: ['part', 'actualLifespan'],
    key: '5',
    minWidth: '0',
    sorter: {
      compare: (a, b) => a.part.actualLifespan - b.part.actualLifespan,
      multiple: 3,
    },
    responsive: ['lg'],
  },
];

export default columns;
