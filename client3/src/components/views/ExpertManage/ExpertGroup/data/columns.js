const columns = [
  {
    title: '그룹 ID',
    dataIndex: 'id',
    key: '1',
    sorter: {
      compare: (a, b) => a.id.localeCompare(b.id),
      multiple: 1,
    },
    width: 60,
    align: 'center',
  },
  {
    title: '그룹명',
    dataIndex: 'name',
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
    title: '설명',
    dataIndex: 'desc',
    key: '3',
    sorter: {
      compare: (a, b) => a.desc.localeCompare(b.desc),
      multiple: 3,
    },
    width: 100,
    align: 'center',
  },
];

export default columns;
