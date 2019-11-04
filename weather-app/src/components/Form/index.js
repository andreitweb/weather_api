import React from 'react';
import PropTypes from 'prop-types';

import './styles.css'

const MAX_DAYS = 16;

function Form(props) {

    const onSubmitHandler = (event) => {
        event.preventDefault();
        const city = event.target.elements['city_name'].value;
        const days = event.target.elements['count_days'].value;
        props.onSubmit(city, days);
    };

    return (
        <form className='weather-form form' onSubmit={onSubmitHandler}>
            <div className='form-group'>
                <label htmlFor="city_name">Enter city name:</label>
                <input type="text" name='city_name' id='city_name' className='form-control'/>
            </div>
            <div className='form-group'>
                <label htmlFor="count_days">Enter count days:</label>
                <select name='count_days' id='count_days' className='custom-select' defaultValue={MAX_DAYS}>
                    {[...new Array(MAX_DAYS)].map((day, index)=>(
                        <option value={index+1} key={index+1}>{index+1}</option>
                    ))}
                </select>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

Form.propTypes = {
    onSubmit: PropTypes.func,
};

export default Form;