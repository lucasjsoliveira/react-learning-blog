/**
 * Created by lucas on 03/05/16.
 */
import React from 'react';
import {observer} from 'mobx-react';
import {Pagination} from 'antd';
export var LoadingSpinner = () => (
    <div className="spinner">
        <div className="rect1"></div>
        <div className="rect2"></div>
        <div className="rect3"></div>
        <div className="rect4"></div>
        <div className="rect5"></div>
    </div>
);

export var Paginator = observer((props) => {
    let {store} = props;
    return (
        <div className="clearfix">
            <div className="pull-right">
                <Pagination current={store.page} pageSize={store.pageSize} defaultCurrent={1}
                            showTotal={(total, range) => `${range[0]}-${range[1]} de ${total} registros`}
                            total={store.count} onChange={(p) => store.goTo(p)}/>
            </div>
        </div>
    )
});