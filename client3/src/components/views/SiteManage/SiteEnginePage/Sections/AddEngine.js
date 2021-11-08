import React, { useState, useEffect } from 'react';
import {
  Modal,
  Form,
  Checkbox,
  InputNumber,
  Divider,
  Collapse,
  message,
  Pagination,
} from 'antd';
import PropTypes from 'prop-types';
import axios from 'axios';
import './AddEngine.css';

const { Panel } = Collapse;

function AddEngine(props) {
  const { ShowAddEngine, setShowAddEngine } = props;

  const [Engines, setEngines] = useState([]);
  const [current, setcurrent] = useState(1);
  const [minIndex, setminIndex] = useState(0);
  const [maxIndex, setmaxIndex] = useState(0);
  const [plainOptions, setplainOptions] = useState(0);

  // check box value
  const [checkedList, setCheckedList] = useState([]);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  const [pageSize, setPageSize] = useState(5);

  const [form] = Form.useForm();
  console.log('Engines: ', Engines);
  console.log('pageSize: ', pageSize);
  console.log('plainOptions: ', plainOptions);

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
  const modalOnOk = part => {
    if (!checkedList.length) {
      message.error('부품을 선택하세요.');
    } else {
      const body = {
        partId: checkedList,
        number: part?.number,
        // engine: EngineInfo._id,
      };
      console.log('body: ', body);
      //   dispatch(addEnginRequiredPart(body))
      //     .then(res => {
      //       if (res.payload.success) {
      //         message.success('필요 부품이 추가되었습니다.');
      //       } else {
      //         message.error(res.payload.message);
      //       }
      //     })
      //     .catch(err => {
      //       message.error(`[Error]: ${err}`);
      //     })
      //     .finally(() => {
      //       document.getElementById('number').value = '';
      //       // getEngines();
      //       setShowAddEngine(false);
      //     });
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
    console.log('checkedList', checkedList);
    console.log('indeterminate', indeterminate);
    setmaxIndex(current * pageSize);
    console.log('current', current, pageSize);
  }, [checkedList, current, indeterminate, pageSize]);

  // 체크 박스 선택 시
  const onChange = list => {
    console.log('chkec onchange list: ', list);
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = e => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  return (
    <Modal
      title="구성 부품 추가"
      width="80%"
      visible={ShowAddEngine}
      onOk={form.submit}
      onCancel={() => setShowAddEngine(false)}
      style={{ top: 170 }}
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
          <Checkbox
            indeterminate={indeterminate}
            onChange={onCheckAllChange}
            checked={checkAll}
          >
            Check all
          </Checkbox>
          <Divider />
          <Checkbox.Group
            value={checkedList}
            onChange={onChange}
            className={['ant-checkbox-group']}
          >
            {Engines?.map(
              (data, index) =>
                index >= minIndex &&
                index < maxIndex && (
                  /* eslint no-underscore-dangle: 0 */
                  <Checkbox value={data._id} key={data.name}>
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
                  </Checkbox>
                ),
            )}
          </Checkbox.Group>
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
          name="number"
          label="수량"
          rules={[{ required: true, message: 'Please input this field!' }]}
        >
          <InputNumber
            name="number"
            id="number"
            type="number"
            className="input_num"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

AddEngine.propTypes = {
  ShowAddEngine: PropTypes.bool.isRequired,
  setShowAddEngine: PropTypes.func.isRequired,
};

export default AddEngine;
