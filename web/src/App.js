import React from 'react';
import Navbar from './components/navbar';
import {Notifications} from './components/notification';
import {Row, Col} from 'antd';
// import DevTools from 'mobx-react-devtools';

export default class App extends React.Component {
    render() {
        // var devToolsPosition = {right: 5, bottom: 0};
        return (
            <div>
                {/*<DevTools position={devToolsPosition}/>*/}
                <Navbar path={this.props.location.pathname} />
                <Notifications />
                <Row>

                <Col span={20} offset={2}>{this.props.children}</Col>
                </Row>
            </div>
        )
    }
}