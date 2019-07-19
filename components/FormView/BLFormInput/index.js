import React, {Component} from 'react';
import { Input } from 'antd';
import '../index.less';

export default class Index extends Component {
    render() {
        const {modal} = this.props;
        return(
            <div className='input-container' key={modal.key}>
                <div className='form-input-title'>{modal.title}:</div>
                <Input 
                    id='form-input' 
                    defaultValue={modal.value}
                    disable={modal.disable} 
                    onChange={(event) => {
                        modal.value = event.target.value;
                    }}></Input>
            </div>
        );
    }
}