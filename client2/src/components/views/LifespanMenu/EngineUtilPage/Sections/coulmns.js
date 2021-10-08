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
    title: '이름',
    dataIndex: 'name',
    sorter: {
      compare: (a, b) => a.name.localeCompare(b.name),
      multiple: 2,
    },
    width: 100,
  },
  {
    title: '예상 수명',
    dataIndex: 'defaultLifespan',
    sorter: {
      compare: (a, b) => a.defaultLifespan - b.defaultLifespan,
      multiple: 5,
    },
    width: 100,
  },
  {
    title: '최근 수리 날짜',
    dataIndex: 'recentRepairDate',
    sorter: {
      compare: (a, b) => a.recentRepairDate.localeCompare(b.recentRepairDate),
      multiple: 3,
    },
    width: 200,
  },
];

const partCol = [
  {
    title: '부품 ID',
    dataIndex: ['part', 'id'],
    key: 'id2',
    sorter: {
      compare: (a, b) => a.part.id.localeCompare(b.part.id),
      multiple: 3,
    },
  },
  {
    title: '부품 이름',
    dataIndex: ['part', 'name'],
    key: 'name2',
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
    title: '필요 수량',
    dataIndex: 'requiredNumber',
    key: 'requiredNumber',
    sorter: {
      compare: (a, b) => a.requiredNumber - b.requiredNumber,
      multiple: 5,
    },
  },
];

export { engineCol, partCol };
