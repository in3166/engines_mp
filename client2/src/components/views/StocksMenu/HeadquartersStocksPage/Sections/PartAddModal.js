import React, { useEffect, useState } from 'react';
import {
  Modal,
  Form,
  message,
  Collapse,
  Radio,
  Pagination,
  InputNumber,
} from 'antd';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { getAllParts } from '../../../../../_actions/part_actions';
import { addSitePart } from '../../../../../_actions/site_actions';

const pageSize = 5;

function PartAddModal(props) {
  const { showAddConfirm, setshowAddConfirm, Sites, reload } = props;

  const [RadioValue, setRadioValue] = useState(0);

  const [data, setdata] = useState([]);
  const [current, setcurrent] = useState(1);
  const [minIndex, setminIndex] = useState(0);
  const [maxIndex, setmaxIndex] = useState(0);

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
        } else {
          message.error(res.payload.err);
        }
      })
      .catch(err => {
        message.error(err);
      });
  };

  const useMountEffect = fun => {
    useEffect(fun, []);
  };

  useMountEffect(getParts);

  // 수정 모달 OK 버튼 - redux
  const modalOnOk = part => {
    const body = {
      id: RadioValue,
      stock: part?.stock,
      site: Sites.id,
    };

    dispatch(addSitePart(body))
      .then(res => {
        if (res.payload.success) {
          message.success('부품이 추가되었습니다.');
        } else {
          message.error(res.payload.message);
        }
      })
      .catch(err => {
        message.error(`[Error]: ${err}`);
      })
      .finally(() => {
        document.getElementById('stock').value = '';
        reload();
        setshowAddConfirm(false);
      });

    // form.resetFields();
  };

  // const onFinishFailed = errorInfo => {
  //   console.log('Failed:', errorInfo);
  //   form.resetFields();
  // };

  const handleChange = page => {
    setcurrent(page);
    setminIndex((page - 1) * pageSize);
    setmaxIndex(page * pageSize);
  };

  const onChange = e => {
    console.log('radio checked', e.target.value);
    setRadioValue(e.target.value);
  };

  return (
    <Modal
      title="부품 추가"
      style={{ top: 200 }}
      visible={showAddConfirm}
      onOk={form.submit}
      onCancel={() => setshowAddConfirm(false)}
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
          <Radio.Group value={RadioValue} onChange={onChange}>
            {data?.map(
              (data2, index) =>
                index >= minIndex &&
                index < maxIndex && (
                  /* eslint no-underscore-dangle: 0 */
                  <Radio value={data2._id} key={data2.id}>
                    <Collapse defaultActiveKey={['1']}>
                      <Panel
                        showArrow={false}
                        header={data2.name}
                        key={data2.id}
                      >
                        <p>ID: {data2.id}</p>
                        <p>가격: {data2.price}</p>
                        <p>수명: {data2.defaultLifespan}</p>
                        <p>설명: {data2.desc}</p>
                      </Panel>
                    </Collapse>
                  </Radio>
                ),
            )}
          </Radio.Group>
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
          name="stock"
          label="재고"
          rules={[{ required: true, message: 'Please input this field!' }]}
        >
          <InputNumber
            name="stock"
            id="stock"
            type="number"
            className="input_num"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default PartAddModal;

PartAddModal.propTypes = {
  showAddConfirm: PropTypes.bool.isRequired,
  setshowAddConfirm: PropTypes.func.isRequired,
  reload: PropTypes.func.isRequired,
  Sites: PropTypes.objectOf(PropTypes.any).isRequired,
};
