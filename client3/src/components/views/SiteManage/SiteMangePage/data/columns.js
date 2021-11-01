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
    title: '이름',
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
    title: '국가',
    dataIndex: 'country',
    key: '3',
    sorter: {
      compare: (a, b) => a.country.localeCompare(b.country),
      multiple: 3,
    },
    width: 80,
    align: 'center',
    responsive: ['lg'],
  },
  {
    title: '주소',
    dataIndex: 'address',
    key: '3',
    sorter: {
      compare: (a, b) => a.address.localeCompare(b.address),
      multiple: 3,
    },
    width: 120,
    align: 'center',
  },
  {
    title: '연락처',
    dataIndex: 'phone',
    key: '3',
    sorter: {
      compare: (a, b) => a.phone.localeCompare(b.phone),
      multiple: 3,
    },
    width: 100,
    align: 'center',
  },
];

export default columns;
