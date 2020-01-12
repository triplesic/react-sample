import React from 'react';
import numeral from 'numeral';
import {select_default} from '../lang/th-lang'

export function renderCheckbox({ input, displayLabel }) {
    return (
        <div className="form-group">
            <label className="mt-checkbox">
                <input
                    type="checkbox"
                    disabled={false}
                    checked={input.value}
                    {...input} /> {displayLabel}
                <span></span>
            </label>
        </div>
    );
}

export function renderInputField(field) {
    const { meta: { touched, error } } = field;
    const formClassNm = `form-group ${touched && error ? 'has-danger' : ''}`;
    return (
        <div className={formClassNm}>
            <label className="app-font-color">{field.displayLabel}</label>
            <input
                className="form-control"
                type={field.type}
                maxLength={field.maxLength || 10}
                disabled={field.disabled || false}
                step="any"
                {...field.input}
            />
            <div className="form-control-feedback">
                {touched ? error : ''}
            </div>
        </div>
    );
}


export function renderDropdownField(field) {
    const { meta: { touched, error} } = field;
    const formClassNm = `form-group ${touched && error ? 'has-danger' : ''}`;
    if ( field.data.length == 0 )
        return <div></div>
    let options = _.map(field.data, e => {
        return <option key={e.id} value={e.id}>{e.name}</option>
    })
    return (
        <div className={formClassNm}>
            <label className="app-font-color">{field.displayLabel}</label>
            <select 
                value={field.input.value}
                className="form-control"
                {...field.input}>
                <option value=''>{select_default}</option>
                {options}
            </select>
            <div className="form-control-feedback">
                {touched ? error : ''}
            </div>
        </div>
    );
}

export function renderInputTextAreaField(field){
    const { meta: { touched, error } } = field;
    const formClassNm = `form-group ${touched && error ? 'has-danger' : ''}`;
    return (
        <div className={formClassNm}>
            <label className="app-font-color">{field.displayLabel}</label>
            <textarea
                className="form-control"
                type={field.type}
                maxLength={field.maxLength || 50}
                {...field.input}
            />
            <div className="form-control-feedback">
                {touched ? error : ''}
            </div>
        </div>
    );
}

export function normalizeNum(value, previousValue) {
    if (!value) {
        return value
    }
    const onlyNums = value.replace(/[^0-9]/g, '');
    return onlyNums;
}