const engineCol = [
  {
    title: '엔진 ID',
    dataIndex: 'id',
    sorter: {
      compare: (a, b) => a.id.localeCompare(b.id),
      multiple: 1,
    },
    width: 100,
  },
  {
    title: '엔진 이름',
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
  { title: '부품 ID', dataIndex: ['part', 'id'], key: 'id2' },
  { title: '부품 이름', dataIndex: ['part', 'name'], key: 'name2' },
  { title: '가격', dataIndex: ['part', 'price'], key: 'price' },
  {
    title: '설명',
    dataIndex: ['part', 'desc'],
    key: 'desc2',
  },
  {
    title: '예상 수명',
    dataIndex: ['part', 'defaultLifespan'],
    key: 'defaultLifespan',
  },
  { title: '필요 수량', dataIndex: 'requiredNumber', key: 'requiredNumber' },
];

export { engineCol, partCol };
