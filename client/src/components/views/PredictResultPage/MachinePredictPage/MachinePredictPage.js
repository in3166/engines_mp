import React, { useEffect, useState } from 'react';

import {
  Breadcrumb,
  Button,
  Spin,
  Tabs,
  Row,
  Table,
  message,
  Card,
  Select,
} from 'antd';
import { Line } from 'react-chartjs-2';
// import PropTypes from 'prop-types';
import { SendOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import datas2 from './data/datas2';
import columns from './data/columns';
import { getAllSites } from '../../../../_actions/site_actions';
import PredictModal from './Sections/PredictModal';

const { TabPane } = Tabs;

function randomRgba() {
  const o = Math.round;
  const r = Math.random;
  const s = 255;
  return `rgba(${o(r() * s)},${o(r() * s)},${o(r() * s)},${r().toFixed(1)})`;
}

function MachinePredictPage() {
  const dispatch = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [Render, setRender] = useState(false);
  const [LineDatas, setLineDatas] = useState({});
  const [loading, setLoading] = useState(false);
  const [Sites, setSites] = useState([]);
  const [ThisSite, setThisSite] = useState({});
  const [ShowModal, setShowModal] = useState(false);
  const [ThisPart, setThisPart] = useState({});
  // const { user } = props;
  // if (!user?.userData?.isAuth) {
  //   return null;
  // }

  // console.log('Sites: ', Sites);
  // console.log('ThisSite: ', ThisSite);

  const getAllSite = () => {
    setLineDatas(datas2.chartData);
    dispatch(getAllSites()).then(res => {
      setSites(res.payload.sites);
      setThisSite(res.payload.sites[0]);
    });
  };

  const useMountEffect = fun => {
    useEffect(fun, []);
  };
  useMountEffect(getAllSite);

  const updatePartsButton = part => {
    setShowModal(true);
    setThisPart(part);
    console.log(part);
  };
  const newCol = [
    {
      title: '분석',
      key: 'action',
      render: part => {
        return (
          <Button onClick={() => updatePartsButton(part)}>
            <SendOutlined />
          </Button>
        );
      },
      width: 70,
      align: 'center',
      responsive: ['sm'],
    },
  ];
  const col = [...columns, ...newCol];
  // const flaskReq = () => {
  //   setLoading(true);
  //   axios
  //     .get('/api/predict/engine1')
  //     .then(res => {
  //       if (res.data.success) {
  //         const { a, date, x } = res.data.data;
  //         const dataLine = datas(date, x, a);
  //         renderLine(dataLine);
  //         message.success('Success!');
  //       } else {
  //         // setLoading(false);
  //         message.error('결과를 가져오지 못했습니다.');
  //       }
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };

  const renderLine = dataLine => {
    setLineDatas(dataLine);
  };

  const showGraphClicKHandler = () => {
    setLoading(true);
    if (selectedRowKeys.length > 0) {
      const temp = {
        labels: ['', '', '', '', '', '', '', '', '', '', ''],
        datasets: [],
      };

      const tempLine = [];

      const max = 95;
      const min = 15;

      for (let j = 0; j < selectedRowKeys.length; j += 1) {
        const rand = [];
        for (let i = 0; i < 20; i += 1) {
          const randomNum = Math.random() * (max - min + 1) + min;
          const randomNumFloor = Math.floor(randomNum);
          rand.push(randomNumFloor);
        }

        const rgba = randomRgba();
        const tempDataset = {
          label: selectedRowKeys[j].part.name,
          fill: true,
          data: rand,
          backgroundColor: 'transparent',
          borderColor: rgba,
        };

        tempLine.push(tempDataset);
      }

      temp.datasets = tempLine;

      renderLine(temp);
      message.success('데이터 조회 완료');
      setRender(true);
    } else {
      setRender(false);
      message.warning('부품을 선택하세요.');
    }
    setLoading(false);
  };

  const onSelectChange = (a, selectedRowKeys2) => {
    setSelectedRowKeys(selectedRowKeys2);
  };

  const rowSelection = {
    selectedRowKeys: selectedRowKeys.map(v => v._id),
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_NONE,
      Table.SELECTION_INVERT,
    ],
  };

  const siteChangeHandler = v => {
    const thisTempSite = Sites.filter(a => a.id === v);
    setThisSite(...thisTempSite);
  };

  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>예측 결과 분석</Breadcrumb.Item>
        <Breadcrumb.Item>기계 분석</Breadcrumb.Item>
      </Breadcrumb>
      {Sites.length > 0 && (
        <Tabs
          defaultActiveKey="1"
          size="large"
          style={{ background: 'white', padding: '0 20px 10px 20px' }}
          onChange={() => {
            setRender(false);
            setSelectedRowKeys([]);
          }}
          tabBarExtraContent={{
            left: (
              <Select
                style={{ width: '100px', margin: '10px 20px 0px 0px' }}
                placeholder="Sites"
                defaultValue={Sites[0]?.id}
                onChange={v => siteChangeHandler(v)}
              >
                {Sites.map((v, i) => {
                  if (i === 0) {
                    return (
                      <Select.Option value={v.id} key={v.id}>
                        {v.name}
                      </Select.Option>
                    );
                  }
                  return (
                    <Select.Option value={v.id} key={v.id}>
                      {v.name}
                    </Select.Option>
                  );
                })}
              </Select>
            ),
          }}
        >
          {ThisSite?.engines?.length > 0 &&
            ThisSite?.engines?.map(v => {
              return (
                <TabPane tab={v.engine.name} key={v.id}>
                  <div>
                    <div style={{ padding: '5px 0px 0px 10px', float: 'left' }}>
                      <strong>기계 분석</strong>
                    </div>
                    <Button
                      onClick={showGraphClicKHandler}
                      disabled={loading}
                      style={{ float: 'right' }}
                    >
                      조회
                    </Button>
                  </div>
                  <br />
                  <br />
                  <Row type="flex" align="top" style={{ width: '100%' }}>
                    <Card
                      className="predictCard"
                      bordered
                      style={{ width: '100%', minHeight: 0 }}
                    >
                      <Spin spinning={loading} tip="Loading..." size="large">
                        {Render && (
                          <div style={{ minHeight: 300 }}>
                            <Line
                              data={LineDatas}
                              legend={datas2?.legend}
                              options={datas2?.options}
                            />
                          </div>
                        )}
                        {!Render && (
                          <div style={{ textAlign: 'center' }}>
                            부품을 선택하고 조회하세요.
                          </div>
                        )}
                      </Spin>
                    </Card>
                  </Row>
                  <hr />
                  <Row>
                    <Table
                      size="small"
                      rowSelection={rowSelection}
                      columns={col}
                      dataSource={v.engine.requiredParts}
                      style={{ width: '100%' }}
                      rowKey={a => {
                        // console.log(a);
                        return a._id;
                      }}
                    />
                    <PredictModal
                      ShowModal={ShowModal}
                      setShowModal={setShowModal}
                      site={ThisSite}
                      part={ThisPart}
                    />
                  </Row>
                </TabPane>
              );
            })}
        </Tabs>
      )}
    </>
  );
}

export default MachinePredictPage;

// PredictResultPage.propTypes = {
//   user: PropTypes.objectOf(PropTypes.object).isRequired,
// };
