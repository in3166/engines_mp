const columns = [
  {
    title: 'Section.1',
    dataIndex: ['part', 'section1'],
    sorter: {
      compare: (a, b) => a.part.section1.localeCompare(b.part.section1),
      multiple: 1,
    },
    width: 100,
  },
  {
    title: 'Section.2',
    dataIndex: ['part', 'section2'],
    sorter: {
      compare: (a, b) => a.part.section2.localeCompare(b.part.section2),
      multiple: 1,
    },
    width: 100,
  },
  {
    title: '부품 이름',
    dataIndex: ['part', 'name'],
    sorter: {
      compare: (a, b) => a.part.name.localeCompare(b.part.name),
      multiple: 1,
    },
    width: 100,
  },
  {
    title: '기본 수명',
    dataIndex: ['part', 'defaultLifespan'],
    sorter: {
      compare: (a, b) =>
        a.part.defaultLifespan.localeCompare(b.part.defaultLifespan),
      multiple: 1,
    },
    width: 100,
  },
  {
    title: '정비 주기',
    dataIndex: ['part', 'maintenancePeriod'],
    sorter: {
      compare: (a, b) =>
        a.part.maintenancePeriod.localeCompare(b.part.maintenancePeriod),
      multiple: 1,
    },
    width: 100,
  },
];

export default columns;
