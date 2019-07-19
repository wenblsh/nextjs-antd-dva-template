import React, { Component } from 'react';
import { Button } from 'antd';
import createDva from '../../command/createDva';
import apiTool from '../../command/apiTool';
import FormList from '../../components/FormView/BLFromList';
import './index.less';

class Index extends Component {

    constructor(props) {
        super(props);
        this.dataSource = [
            {
                type: 'register',
                name: 'form',
                isShow: true,
                data: [
                    {
                        name: 'registerPhone',
                        key: 1,
                        title: '手机号',
                        value: '',
                        disable: 'true',
                    }, {
                        name: 'registerVertify',
                        key: 2,
                        title: '验证码',
                        value: '',
                        disable: 'true',
                    }],
            },
            {
                type: 'login',
                name: 'form',
                isShow: false,
                data: [
                    {
                        name: 'loginPhone',
                        title: '手机号',
                        key: 1,
                        value: '',
                        disable: 'true',
                    }, {
                        name: 'loginPassword',
                        key: 2,
                        title: '密码',
                        value: '',
                        disable: 'true',
                    }],
            },
            {
                type: 'reset',
                name: 'form',
                isShow: false,
                data: [
                    {
                        name: 'resetPhone',
                        title: '手机号',
                        key: 1,
                        value: '',
                        disable: 'true',
                    }, {
                        name: 'resetOldPassword',
                        title: '旧密码',
                        key: 2,
                        value: '',
                        disable: 'true',
                    }, {
                        name: 'resetNewPassword',
                        title: '新密码',
                        key: 3,
                        value: '',
                        disable: 'true',
                    }],
            }];
        this.modelName = 'form0';
        this.modalArr = this.initModal();
    }

    onButtonClick(index) {
        apiTool.setValue(this, this.modelName, {payload:{isShow: false}})
        switch (index) {
            case 0:
                this.modelName = 'form0';
                break;
            case 1:
                this.modelName = 'form1';
                break;
            case 2:
                this.modelName = 'form2';
                break;
        }
        apiTool.setValue(this, this.modelName, {payload:{isShow: true}})
    }

    initModal = () => {
        return this.dataSource.map((modal, i) => {
            let payload = {isShow: modal.isShow}
            return createDva([modal.name + i])((props) => <FormList modal={modal.data} payload={payload} {...props}/>)
        });
    }

    renderModalArr = () => {
        return this.modalArr.map((e, i) => {
            const FormMoalView = e
            return <FormMoalView key={i} />
        })
    }

    onGetInputButtonClick() {
        console.log(this.dataSource);
    }

    // 方法功能待完善
    onClearButtonClick() {
        this.dataSource[0].data[0].value='';
    }

    render() {
        return (
            <div>
                {/* 渲染Button */}
                {/* {this.renderButtonArr()} */}
                <div className='type-container'>
                    <Button className='button' onClick={this.onButtonClick.bind(this, 0)}>注册</Button>
                    <Button className='button' onClick={this.onButtonClick.bind(this, 1)}>登录</Button>
                    <Button className='button' onClick={this.onButtonClick.bind(this, 2)}>忘记密码</Button>
                </div>

                {/* 渲染modal默认组件 */}
                {this.renderModalArr()}
                <Button onClick={this.onGetInputButtonClick.bind(this)}>获取输入数据</Button>

                {/* 方法内容待完善，清除数据方式待修改 */}
                {/* <Button onClick={this.onClearButtonClick.bind(this)}>删除所有输入数据</Button> */}
            </div>
        );
    }
}

export default createDva([])(Index)
