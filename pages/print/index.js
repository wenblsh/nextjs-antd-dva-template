import React, { Component } from 'react'
import apiTool from '../../command/apiTool';
import LODOP from './util/Lodop';

export default class Test1 extends Component {

    printMessage = () => {

    }

    render() {
        return (
        <div>
            <button onClick={this.printMessage}>测试调用打印机</button>
        </div>
        )
    }
}
