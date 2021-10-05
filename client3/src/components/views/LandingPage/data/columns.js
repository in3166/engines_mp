const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    sorter: {
      compare: (a, b) => a.id.localeCompare(b.id),
      multiple: 1,
    },
    minwidth: 100,
    align: 'center',
  },
  {
    title: '이름',
    dataIndex: 'name',
    sorter: {
      compare: (a, b) => a.name.localeCompare(b.name),
      multiple: 2,
    },
    minwidth: 100,
    align: 'center',
    responsive: ['sm'],
  },
  {
    title: 'Email',
    dataIndex: 'email',
    sorter: {
      compare: (a, b) => a.email.localeCompare(b.email),
      multiple: 3,
    },
    width: 250,
    align: 'center',
    responsive: ['md'],
  },
  {
    title: '부서',
    dataIndex: 'department',
    sorter: {
      compare: (a, b) => a.depart.localeCompare(b.depart),
      multiple: 3,
    },
    width: 100,
    align: 'center',
    responsive: ['md'],
  },
  {
    title: '직급',
    dataIndex: 'position',
    sorter: {
      compare: (a, b) => a.position.localeCompare(b.position),
      multiple: 3,
    },
    width: 100,
    align: 'center',
    responsive: ['md'],
  },
  {
    title: '권한',
    dataIndex: 'role',
    filters: [
      { text: '일반 사용자', value: '일반 사용자' },
      { text: '전문가', value: '전문가' },
      { text: '엔지니어', value: '엔지니어' },
    ],
    onFilter: (value, record) => {
      return record.role.indexOf(value) === 0;
    },
    minwidth: 100,
    align: 'center',
  },
];

export default columns;
