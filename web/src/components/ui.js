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

export var Paginator = (props) => (
    <div className="clearfix">
        <div className="pull-right">
            {props.disablePrevious
                ? 'Anterior'
                : <button className="btn btn-link" onClick={props.onPrevious}>Anterior</button>}
            {props.disableNext
                ? 'Próximo'
                : <button className="btn btn-link" onClick={props.onNext}>Próximo</button>}
        </div>
    </div>
);