import PropTypes from 'prop-types';
import React from 'react';

export function NumberItem(props) {
    return <button
        name={props.text}
        onClick={props.handleClick}
        className="button-logo"
        style={{background: props.disabled ? 'red' : 'green' }}>
        {props.text}
    </button>;
}

NumberItem.propTypes = {
    disabled: PropTypes.bool,
    text: PropTypes.string,
    handleClick: PropTypes.func
};