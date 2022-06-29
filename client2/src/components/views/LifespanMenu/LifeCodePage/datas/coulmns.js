const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    sorter: {
      compare: (a, b) => a.id.localeCompare(b.id),
      multiple: 1,
    },
    width: 100,
    minWidth: 10,
    align: 'center',
  },
  {
    title: '이름',
    dataIndex: 'name',
    sorter: {
      compare: (a, b) => a.name.localeCompare(b.name),
      multiple: 2,
    },
    width: 160,
    minWidth: 10,
    align: 'center',
    responsive: ['sm'],
  },
  {
    title: '설명',
    dataIndex: 'desc',
    sorter: {
      compare: (a, b) => a.desc.localeCompare(b.desc),
      multiple: 3,
    },
    width: 240,
    minWidth: 10,
    align: 'center',
    responsive: ['md'],
  },
  {
    title: '기본 수명',
    dataIndex: 'lifespan',
    sorter: {
      compare: (a, b) => a - b,
      multiple: 3,
    },
    width: 110,
    minWidth: 10,
    align: 'center',
  },
];

export default columns;
