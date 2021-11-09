import React, { useState, useEffect } from 'react';
import { Modal, Form, Collapse, message, Pagination, Input, Radio } from 'antd';
import PropTypes from 'prop-types';
import axios from 'axios';
import './AddEngine.css';
import { useDispatch } from 'react-redux';
import { addSiteEngine } from '../../../../../_actions/site_actions';

const { Panel } = Collapse;

function AddEngine(props) {
  const { ShowAddEngine, setShowAddEngine, site, getSites } = props;

  const [Engines, setEngines] = useState([]);
  const [current, setcurrent] = useState(1);
  const [minIndex, setminIndex] = useState(0);
  const [maxIndex, setmaxIndex] = useState(0);
  const [plainOptions, setplainOptions] = useState(0);

  // check box value
  const [RadioValue, setRadioValue] = useState(0);
  const [indeterminate, setIndeterminate] = useState(true);
  const [pageSize, setPageSize] = useState(5);

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  // 모든 엔진 목록
  const getEngines = () => {
    axios
      .get('/api/engines/getAllEngines')
      .then(res => {
        if (res.data.success) {
          setEngines(res.data.engines);
          setmaxIndex(pageSize);
          setplainOptions(res.data.engines?.map(data2 => data2._id));
        } else {
          message.error(`[Error]: ${res.data.err}`);
        }
      })
      .catch(err => {
        message.error(`[Error]: ${err}`);
      });
  };

  const useMountEffect = fun => {
    useEffect(fun, []);
  };

  useMountEffect(getEngines);

  // 수정 모달 OK 버튼 - redux
  const modalOnOk = engine => {
    if (!RadioValue.length) {
      message.error('부품을 선택하세요.');
    } else {
      const body = {
        engineId: RadioValue,
        id: engine?.id,
        site: site._id,
      };
      console.log('body: ', body);

      dispatch(addSiteEngine(body))
        .then(res => {
          if (res.payload.success) {
            message.success('엔진이 추가되었습니다.');
          } else {
            message.error(res.payload.message);
          }
        })
        .catch(err => {
          message.error(`[Error]: ${err}`);
        })
        .finally(() => {
          getSites();
          setShowAddEngine(false);
        });
    }
  };
  // 페이지네이션
  const handleChange = page => {
    setcurrent(page);
    setminIndex((page - 1) * pageSize);
    setmaxIndex(page * pageSize);
  };

  // 페이지네이션
  const sizeChagne = (cur, size) => {
    setPageSize(size);
    setcurrent(cur);
    setminIndex((cur - 1) * size);
  };

  useEffect(() => {
    setmaxIndex(current * pageSize);
  }, [RadioValue, current, indeterminate, pageSize]);

  // 체크 박스 선택 시
  const onChange = e => {
    setRadioValue(e.target.value);
    setIndeterminate(!!e.length && e.length < plainOptions.length);
  };

  return (
    <Modal
      title="엔진 추가"
      width="80%"
      visible={ShowAddEngine}
      onOk={form.submit}
      onCancel={() => setShowAddEngine(false)}
      style={{ top: 170 }}
      destroyOnClose
    >
      <Form
        {...{ labelCol: { span: 6 }, wrapperCol: { span: 14 } }}
        name="userinfo-change"
        id="updateForm"
        form={form}
        onFinish={modalOnOk}
        preserve={false}
      >
        <Form.Item label="부품">
          <Radio.Group
            value={RadioValue}
            onChange={onChange}
            className={['ant-checkbox-group']}
          >
            {Engines?.map(
              (data, index) =>
                index >= minIndex &&
                index < maxIndex && (
                  /* eslint no-underscore-dangle: 0 */
                  <Radio value={data._id} key={data.name}>
                    <Collapse defaultActiveKey={['1']}>
                      <Panel
                        showArrow={false}
                        header={data?.name}
                        key={data?.name}
                      >
                        <p>ID: {data?.id}</p>
                        <p>기본 수명: {data?.defaultLifespan}</p>
                      </Panel>
                    </Collapse>
                  </Radio>
                ),
            )}
          </Radio.Group>
          <Pagination
            showQuickJumper
            showSizeChanger
            pageSize={pageSize}
            current={current}
            total={Engines.length}
            onChange={handleChange}
            pageSizeOptions={['5', '10', '20', '50', '100']}
            onShowSizeChange={sizeChagne}
            style={{ bottom: '0px', textAlign: 'center' }}
            size="small"
          />
        </Form.Item>

        <Form.Item
          name="id"
          label="ID"
          rules={[
            { required: true, message: 'Please input this field!' },
            {
              type: 'string',
              min: 5,
              message: 'Please input at least 5 characters.',
            },
          ]}
        >
          <Input name="id" id="id" type="text" className="input_num" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

AddEngine.propTypes = {
  ShowAddEngine: PropTypes.bool.isRequired,
  setShowAddEngine: PropTypes.func.isRequired,
  getSites: PropTypes.func.isRequired,
  site: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default AddEngine;
