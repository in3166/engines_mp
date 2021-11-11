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
  {
    title: '권한',
    dataIndex: 'role',
    key: '3',
    sorter: {
      compare: (a, b) => a.role.localeCompare(b.role),
      multiple: 3,
    },
    width: 100,
    align: 'center',
    render: v => {
      console.log(v);
      if (v === 2) return '전문가 권한';
      if (v === 3) return '엔지니어 권한';
      return '일반 사용자 권한';
    },
  },
];

export default columns;
