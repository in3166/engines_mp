import React from 'react'
import { useForm } from 'react-hook-form';
import {Form,Button,message } from 'antd';
import { useDispatch } from "react-redux";
import {changeUser} from '../../../../_actions/user_actions'

function UserInfo(props) {

    const dispatch = useDispatch();
    const { register, formState: { errors }, handleSubmit } = useForm();

      const onSubmit = data => {
        let body ={
            id: props.userData.id,
            email: data.email,
            name: data.name
        }

        dispatch(changeUser(body))
        .then(res => {
            if (res.payload.success) {
                message.success('개인정보가 변경되었습니다.');
            } else {
                message.error('개인정보가 변경을 실패하였습니다. ',res.payload.err);
            }
          })
          .catch(err=>{
              alert("[Error]: "+err);
            })
    };
    
    return (
        <div>
            <Form {...props.layout} name="userinfo-change"  onFinish={handleSubmit(onSubmit)}>
                 <Form.Item label="ID">
                    <label className='userpage_label'>{props.userData.id}</label>
                </Form.Item>

                <Form.Item label="권한">
                    <label  className='userpage_label'>{props.userData.role === 0 ? '일반 사용자' : '관리자' }</label>
                </Form.Item>

                <Form.Item label="Email">
                       <input name="email" className="userpage_input" type="email" error={errors.email}  placeholder={props.userData.email} defaultValue={props.userData.email} {...register("email", { required: true, pattern: /^\S+@\S+$/i })}/>
                       {errors.email && <p className="form_p">This email field is required</p>}
                </Form.Item>

                <Form.Item label="이름">
                    <input
                         className="userpage_input"
                        {...register("name", { required: true, maxLength: 10 })}
                        placeholder={props.userData.name} defaultValue={props.userData.name}
                        name="name"/>
                    {errors.name && errors.name.type === "required" && <p className="form_p">This name field is required</p>}
                    {errors.name && errors.name.type === "maxLength" && <p className="form_p">Your input exceed maximum input</p>}
                </Form.Item>
                
                <Form.Item {...{ wrapperCol: {span: 14, offset: 4,}}}>
                    <Button type="primary" htmlType="submit">
                        저장
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default UserInfo
