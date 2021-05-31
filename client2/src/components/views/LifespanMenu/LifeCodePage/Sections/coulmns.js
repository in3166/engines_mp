const columns1 = [
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
    title: '부품 이름',
    dataIndex: 'name',
    sorter: {
      compare: (a, b) => a.name.localeCompare(b.name),
      multiple: 2,
    },
    width: 200,
  },
  {
    title: '설명',
    dataIndex: 'desc',
    sorter: {
      compare: (a, b) => a.desc.localeCompare(b.desc),
      multiple: 3,
    },
  },
  {
    title: '필요 수량',
    dataIndex: 'qu',
    sorter: {
      compare: (a, b) => a.qu - b.qu,
      multiple: 4,
    },
    width: 200,
  },
  {
    title: '예상 수명',
    dataIndex: 'lifespan',
    sorter: {
      compare: (a, b) => a.lifespan - b.lifespan,
      multiple: 5,
    },
    width: 200,
  },
];

const columns2 = [
  { title: 'ID', dataIndex: 'id2', key: 'id2' },
  { title: '자재 이름', dataIndex: 'name2', key: 'name2' },
  {
    title: '설명',
    dataIndex: 'desc2',
    key: 'desc2',
  },
  { title: '필요 수량', dataIndex: 'qu2', key: 'qu2' },
  { title: '예상 수명', dataIndex: 'lifespan2', key: 'lifespan2' },
];

export { columns1, columns2 };
