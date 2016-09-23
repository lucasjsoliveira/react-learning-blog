/**
 * Created by lucas on 03/05/16.
 */
import React from 'react';
import {observer} from 'mobx-react';
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
    let disablePrev = store.page <= 1;
    let disableNext = store.page >= store.maxPage;
    return (
        <div className="clearfix">
            <div className="pull-right">
                <span className="right-margin">Exibindo página {store.page} de {store.maxPages}.</span>
                {disablePrev
                    ? ''
                    : <button className="btn btn-link" onClick={() => store.previousPage()}>Anterior</button>}
                {disableNext
                    ? ''
                    : <button className="btn btn-link" onClick={() => store.nextPage()}>Próximo</button>}
            </div>
        </div>
    )
});