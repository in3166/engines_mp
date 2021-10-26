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
    key: 'name',
    sorter: {
      compare: (a, b) => a.part.name.localeCompare(b.part.name),
      multiple: 3,
    },
  },
  {
    title: '가격',
    dataIndex: ['part', 'price'],
    key: 'price',
    sorter: {
      compare: (a, b) => a.part.price - b.part.price,
      multiple: 5,
    },
  },
  {
    title: '설명',
    dataIndex: ['part', 'desc'],
    key: 'desc',
    sorter: {
      compare: (a, b) => a.part.desc.localeCompare(b.part.desc),
      multiple: 3,
    },
  },
  {
    title: '예상 수명',
    dataIndex: ['part', 'defaultLifespan'],
    key: 'defaultLifespan',
    sorter: {
      compare: (a, b) => a.part.defaultLifespan - b.part.defaultLifespan,
      multiple: 5,
    },
  },
  {
    title: '재고',
    dataIndex: 'stock',
    key: 'stock',
    sorter: {
      compare: (a, b) => a.stock - b.stock,
      multiple: 5,
    },
  },
];

export default partCol;
