import React, { useState } from 'react';
import {
  Layout,
  Breadcrumb,
  Button,
  Spin,
  Checkbox,
  Tabs,
  Row,
  Form,
  Table,
  Col,
} from 'antd';
// import axios from 'axios';
// import { Line } from 'react-chartjs-2';
// import datas from './Sections/datas';

const { Content } = Layout;
const CheckboxGroup = Checkbox.Group;
const plainOptions = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = ['Apple', 'Orange'];
const { TabPane } = Tabs;
const data = [
  {
    key: '1',
    name: 'a',
    chinese: 98,
    math: 60,
    english: 70,
  },
  {
    key: '2',
    name: 'ac',
    chinese: 98,
    math: 66,
    english: 89,
  },
  {
    key: '3',
    name: 'ab',
    chinese: 98,
    math: 90,
    english: 70,
  },
  {
    key: '4',
    name: 'd',
    chinese: 88,
    math: 99,
    english: 89,
  },
];

function PredictResultPage() {
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  const [selectedRowKey, setselectedRowKeys] = useState([]);

  const onSelectChange = selectedRowKeys => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    setselectedRowKeys(selectedRowKeys);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
        multiple: 1,
      },
      width: 100,
    },
    {
      title: 'Engine',
      dataIndex: 'chinese',
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 2,
      },
      width: 200,
    },
    {
      title: 'Description',
      dataIndex: 'math',
      sorter: {
        compare: (a, b) => a.math - b.math,
        multiple: 3,
      },
    },
    {
      title: '예상 수명',
      dataIndex: 'english',
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 4,
      },
      width: 200,
    },
  ];

  const rowSelection = {
    selectedRowKey,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_NONE,
      Table.SELECTION_INVERT,
    ],
  };
  const onChange = checkedList2 => {
    setCheckedList(checkedList2);
    setIndeterminate({
      indeterminate:
        !!checkedList2.length && checkedList2.length < plainOptions.length,
    });
    setCheckAll(checkedList2.length === plainOptions.length);
  };

  const onCheckAllChange = e => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const GoodFruitForm = () => (
    <Form>
      <Form.Item>
        <CheckboxGroup onChange={onChange} value={checkedList}>
          <Row>
            <Checkbox value="Apple">Apple</Checkbox>
          </Row>
          <Row>
            <Checkbox value="Pear">Pear</Checkbox>
          </Row>
          <Row>
            <Checkbox value="Orange">Orange</Checkbox>
          </Row>
          <Row>
            <Checkbox value="Orange">Orange</Checkbox>
          </Row>
          <Row>
            <Checkbox value="Orange">Orange</Checkbox>
          </Row>
          <Row>
            <Checkbox value="Orange">Orange</Checkbox>
          </Row>
          <Row>
            <Checkbox value="Orange">Orange</Checkbox>
          </Row>
          <Row>
            <Checkbox value="Orange">Orange</Checkbox>
          </Row>
          <Row>
            <Checkbox value="Orange">Orange</Checkbox>
          </Row>
          <Row>
            <Checkbox value="Orange">Orange</Checkbox>
          </Row>
          <Row>
            <Checkbox value="Orange">Orange</Checkbox>
          </Row>
          <Row>
            <Checkbox value="Orange">Orange</Checkbox>
          </Row>
          <Row>
            <Checkbox value="Orange">Orange</Checkbox>
          </Row>
          <Row>
            <Checkbox value="Orange">Orange</Checkbox>
          </Row>
          <Row>
            <Checkbox value="Orange">Orange</Checkbox>
          </Row>
          <Row>
            <Checkbox value="Orange">Orange</Checkbox>
          </Row>
          <Row>
            <Checkbox value="Orange">Orange</Checkbox>
          </Row>
          <Row>
            <Checkbox value="Orange">Orange</Checkbox>
          </Row>
          <Row>
            <Checkbox value="Orange">Orange</Checkbox>
          </Row>
          <Row>
            <Checkbox value="Orange">Orange</Checkbox>
          </Row>
          <Row>
            <Checkbox value="Orange">Orange</Checkbox>
          </Row>
          <Row>
            <Checkbox value="Orange">Orange</Checkbox>
          </Row>
          <Row>
            <Checkbox value="Orange">Orange</Checkbox>
          </Row>
          <Row>
            <Checkbox value="Orange">Orange</Checkbox>
          </Row>
          <Row>
            <Checkbox value="Orange">Orange</Checkbox>
          </Row>
          <Row>
            <Checkbox value="Orange">Orange</Checkbox>
          </Row>
          <Row>
            <Checkbox value="Orange">Orange</Checkbox>
          </Row>
        </CheckboxGroup>
      </Form.Item>
    </Form>
  );
  return (
    <Layout style={{ padding: '0 24px 24px', overflow: 'auto' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>예측 결과 분석</Breadcrumb.Item>
        <Breadcrumb.Item>기계 분석</Breadcrumb.Item>
      </Breadcrumb>
      <Spin spinning={false} tip="Loading..." size="large">
        <Content
          className="site-layout-background"
          style={{
            padding: 12,
            margin: 0,
            minHeight: 700,
            height: '100%',
            border: '1px solid',
          }}
        >
          <Tabs
            defaultActiveKey="1"
            size="large"
            style={{ background: 'white', padding: '0 20px 10px 20px' }}
          >
            <TabPane tab="Engine-1" key="1">
              <Row type="flex" justify="space-between" align="top">
                <Col span={4} order={4} style={{ height: '100%' }}>
                  <div
                    style={{
                      overflow: 'auto',
                      height: '300px',
                    }}
                  >
                    <div
                      style={{
                        borderBottom: '1px solid #E9E9E9',
                      }}
                    >
                      <Checkbox
                        indeterminate={indeterminate}
                        onChange={onCheckAllChange}
                        checked={checkAll}
                      >
                        Check all
                      </Checkbox>
                    </div>
                    <br />
                    {GoodFruitForm()}
                    <br />
                  </div>
                  <Button>조회</Button>
                </Col>

                <Col span={19} order={4}>
                  <Row>
                    Graph <br />
                    Graph Graph <br />
                    Graph Graph <br />
                    Graph Graph Graph <br />
                    Graph Graph Graph <br />
                    Graph Graph Graph Graph <br />
                    Graph Graph Graph <br />
                    Graph Graph Graph Graph <br />
                    Graph Graph Graph <br />
                    Graph
                  </Row>
                  <hr />
                  <Row>
                    <Table
                      rowSelection={rowSelection}
                      columns={columns}
                      dataSource={data}
                    />
                  </Row>
                </Col>
              </Row>
            </TabPane>
            <TabPane tab="Engine-2" key="2">
              <div>Engine-2</div>
            </TabPane>
            <TabPane tab="Engine-3" key="3">
              <div>Engine-3</div>
            </TabPane>
            <TabPane tab="Engine-4" key="4">
              <div>Engine-4</div>
            </TabPane>
          </Tabs>
        </Content>
      </Spin>
    </Layout>
  );
}

export default PredictResultPage;
