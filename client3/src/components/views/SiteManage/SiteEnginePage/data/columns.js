const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: '1',
    sorter: {
      compare: (a, b) => a.id.localeCompare(b.id),
      multiple: 1,
    },
    width: 50,
    align: 'center',
  },
  {
    title: '엔진 ID',
    dataIndex: ['engine', 'id'],
    key: '1',
    sorter: {
      compare: (a, b) => a.id.localeCompare(b.id),
      multiple: 1,
    },
    width: 50,
    align: 'center',
  },
  {
    title: '엔진 이름',
    dataIndex: ['engine', 'name'],
    key: '2',
    sorter: {
      compare: (a, b) => a.name.localeCompare(b.name),
      multiple: 2,
    },
    width: 60,
    align: 'center',
    responsive: ['md'],
  },
  {
    title: '기본 수명',
    dataIndex: ['engine', 'defaultLifespan'],
    key: '3',
    sorter: {
      compare: (a, b) => a.defaultLifsspan.localeCompare(b.defaultLifsspan),
      multiple: 3,
    },
    width: 80,
    align: 'center',
    responsive: ['lg'],
  },
];

export default columns;
