const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: '1',
    width: '10%',
    sorter: {
      compare: (a, b) => a.id.localeCompare(b.id),
      multiple: 3,
    },
  },
  {
    title: '엔진 이름',
    dataIndex: 'name',
    key: '2',
    width: '15%',
    sorter: {
      compare: (a, b) => a.name.localeCompare(b.name),
      multiple: 3,
    },
  },
  {
    title: '예상 수명(월)',
    dataIndex: 'defaultLifespan',
    key: '3',
    width: '20%',
    sorter: {
      compare: (a, b) => a.defaultLifespan.localeCompare(b.defaultLifespan),
      multiple: 3,
    },
  },
  {
    title: '최근 수리일',
    dataIndex: 'recentRepairDate',
    key: '4',
    width: '100',
    sorter: {
      compare: (a, b) => a.recentRepairDate - b.recentRepairDate,
      multiple: 3,
    },
  },
  {
    title: '점검 예정일',
    dataIndex: 'futureCheck',
    key: '4',
    width: '100',
    sorter: {
      compare: (a, b) => a.recentRepairDate - b.recentRepairDate,
      multiple: 3,
    },
  },
];

export default columns;
