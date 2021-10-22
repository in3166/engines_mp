import React, { useState, useEffect } from 'react';
import {
  Modal,
  Form,
  message,
  Collapse,
  Checkbox,
  Pagination,
  InputNumber,
  Divider,
} from 'antd';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { getAllParts } from '../../../../../../_actions/part_actions';
import { addEnginRequiredPart } from '../../../../../../_actions/engine_actions';

const pageSize = 5;

function RequiredPartAddModal(props) {
  const {
    ShowPartAdd,
    setShowPartAdd,
    EngineInfo,
    getEngines,
    setShowPartsModal,
  } = props;
  const [data, setdata] = useState([]);
  const [current, setcurrent] = useState(1);
  const [minIndex, setminIndex] = useState(0);
  const [maxIndex, setmaxIndex] = useState(0);
  const [plainOptions, setplainOptions] = useState(0);

  // check box value
  const [checkedList, setCheckedList] = useState([]);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  const dispatch = useDispatch();
  const { Panel } = Collapse;

  const [form] = Form.useForm();

  // 모든 부품 목록 보여주기
  const getParts = () => {
    dispatch(getAllParts())
      .then(res => {
        if (res.payload.success) {
          setdata(res.payload.parts);
          setmaxIndex(pageSize);
          setplainOptions(res.payload.parts?.map(data2 => data2._id));
        } else {
          message.error(`[Error]: ${res.payload.err}`);
        }
      })
      .catch(err => {
        message.error(`[Error]: ${err}`);
      });
  };

  const useMountEffect = fun => {
    useEffect(fun, []);
  };

  useMountEffect(getParts);

  // 수정 모달 OK 버튼 - redux
  const modalOnOk = part => {
    if (!checkedList.length) {
      message.error('부품을 선택하세요.');
    } else {
      const body = {
        partId: checkedList,
        number: part?.number,
        engine: EngineInfo._id,
      };

      dispatch(addEnginRequiredPart(body))
        .then(res => {
          if (res.payload.success) {
            message.success('필요 부품이 추가되었습니다.');
          } else {
            message.error(res.payload.message);
          }
        })
        .catch(err => {
          message.error(`[Error]: ${err}`);
        })
        .finally(() => {
          document.getElementById('number').value = '';
          getEngines();
          setShowPartAdd(false);
          setShowPartsModal(false);
        });
    }
  };

  const handleChange = page => {
    setcurrent(page);
    setminIndex((page - 1) * pageSize);
    setmaxIndex(page * pageSize);
  };

  // 체크 박스 선택 시
  const onChange = list => {
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
    <>
      {ShowPartAdd && (
        <Modal
          title="구성 부품 추가"
          width="80%"
          visible={ShowPartAdd}
          onOk={form.submit}
          onCancel={() => setShowPartAdd(false)}
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
              <Checkbox.Group value={checkedList} onChange={onChange}>
                {data?.map(
                  (data2, index) =>
                    index >= minIndex &&
                    index < maxIndex && (
                      /* eslint no-underscore-dangle: 0 */
                      <Checkbox value={data2._id} key={data2.id}>
                        <Collapse defaultActiveKey={['1']}>
                          <Panel
                            showArrow={false}
                            header={data2.name}
                            key={data2.id}
                          >
                            <p>Section.1: {data2.section1}</p>
                            <p>Section.2: {data2.section2}</p>
                            <p>가격: {data2.price}</p>
                            <p>수명: {data2.defaultLifespan}</p>
                            <p>설명: {data2.desc}</p>
                          </Panel>
                        </Collapse>
                      </Checkbox>
                    ),
                )}
              </Checkbox.Group>
              <Pagination
                pageSize={pageSize}
                current={current}
                total={data.length}
                onChange={handleChange}
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
      )}
    </>
  );
}

export default RequiredPartAddModal;

RequiredPartAddModal.propTypes = {
  ShowPartAdd: PropTypes.bool.isRequired,
  setShowPartAdd: PropTypes.func.isRequired,
  setShowPartsModal: PropTypes.func.isRequired,
  getEngines: PropTypes.func.isRequired,
  EngineInfo: PropTypes.objectOf(PropTypes.any).isRequired,
};
