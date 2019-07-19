import React, { Component } from 'react'
import FromInput from '../BLFormInput';
import { Form } from 'antd';
export default class Index extends Component {  

    render() {
        const { modal, payload} = this.props;
        if (payload.isShow) {
            return(
                <div>
                    {/* 实例化表单 */}
                    {
                        modal.map((item, i) => {
                            return <FromInput modal={item}/>;
                        })
                    }
                </div>
            );
        }else {
            return null;
        }

    }      
}
