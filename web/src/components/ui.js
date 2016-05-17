/**
 * Created by lucas on 03/05/16.
 */
import React from 'react';
export var LoadingSpinner = () => (
    <div className="spinner">
        <div className="rect1"></div>
        <div className="rect2"></div>
        <div className="rect3"></div>
        <div className="rect4"></div>
        <div className="rect5"></div>
    </div>
);

export var Paginator = (props) => {
    let disablePrev = props.page <= 1;
    let disableNext = props.page >= props.maxPage;
    return (
        <div className="clearfix">
            <div className="pull-right">
                <span className="right-margin">Exibindo página {props.page} de {props.maxPage}.</span>
                {disablePrev
                    ? ''
                    : <button className="btn btn-link" onClick={props.onPrevious}>Anterior</button>}
                {disableNext
                    ? ''
                    : <button className="btn btn-link" onClick={props.onNext}>Próximo</button>}
            </div>
        </div>
    )
};