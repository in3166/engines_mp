const columns = [
  {
    title: 'Section.1',
    dataIndex: ['part', 'section1'],
    key: '1',
    sorter: {
      compare: (a, b) => a.part.section1.localeCompare(b.part.section1),
      multiple: 1,
    },
    width: 50,
    align: 'center',
  },
  {
    title: 'Section.2',
    dataIndex: ['part', 'section2'],
    key: '2',
    sorter: {
      compare: (a, b) => a.part.section2.localeCompare(b.part.section2),
      multiple: 2,
    },
    width: 60,
    align: 'center',
    responsive: ['md'],
  },
  {
    title: '이름',
    dataIndex: ['part', 'name'],
    key: '3',
    sorter: {
      compare: (a, b) => a.part.name.localeCompare(b.part.name),
      multiple: 3,
    },
    width: 80,
    align: 'center',
    responsive: ['lg'],
  },
  {
    title: '설명',
    dataIndex: ['part', 'desc'],
    key: '3',
    sorter: {
      compare: (a, b) => a.part.desc.localeCompare(b.part.desc),
      multiple: 3,
    },
    width: 80,
    align: 'center',
    responsive: ['xl'],
  },
  {
    title: '설명',
    dataIndex: ['part', 'desc'],
    key: '3',
    sorter: {
      compare: (a, b) => a.part.desc.localeCompare(b.part.desc),
      multiple: 3,
    },
    width: 80,
    align: 'center',
    responsive: ['xl'],
  },
  {
    title: '기본 수명',
    dataIndex: ['part', 'defaultLifespan'],
    key: '3',
    sorter: {
      compare: (a, b) =>
        a.part.defaultLifespan.localeCompare(b.part.defaultLifespan),
      multiple: 3,
    },
    width: 80,
    align: 'center',
    responsive: ['xl'],
  },
  {
    title: '기대 수명',
    dataIndex: ['part', 'expectLifespan'],
    key: '3',
    sorter: {
      compare: (a, b) =>
        a.part.expectLifespan.localeCompare(b.part.expectLifespan),
      multiple: 3,
    },
    width: 80,
    align: 'center',
    responsive: ['xl'],
  },
  {
    title: '실제 수명',
    dataIndex: ['part', 'desc'],
    key: '3',
    sorter: {
      compare: (a, b) =>
        a.part.actualLifespan.localeCompare(b.part.actualLifespan),
      multiple: 3,
    },
    width: 80,
    align: 'center',
    responsive: ['xl'],
  },
  {
    title: '필요 개수',
    dataIndex: 'requiredNumber',
    key: '3',
    sorter: {
      compare: (a, b) => a.requiredNumber.localeCompare(b.requiredNumber),
      multiple: 3,
    },
    width: 80,
    align: 'center',
    responsive: ['sm'],
  },
];

export default columns;
