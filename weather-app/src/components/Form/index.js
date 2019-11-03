import React from 'react';
import debounce from 'lodash/debounce';

import './styles.css';

const DADATA_Key = '1e20133e0ad033c1fa13940edaa51f56552366a6';
const DADATA_URL = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
const MIN_VALUE_LENGTH = 2;
const MAX_COUNT_DATA = 6;

class Form extends React.PureComponent{
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            allCountries: false,
        };

        this.loadDataDebounde = debounce(this.loadData, 500);
    }

    inputHandler = (event)=>{
        const value = event.target.value;
        value.length >= MIN_VALUE_LENGTH && this.loadDataDebounde(value);
    };

    loadData = (value) => {
        fetch(DADATA_URL, {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Token ${DADATA_Key}`
            },
            body: JSON.stringify({
                'query': value,
                'count': MAX_COUNT_DATA,
                'from_bound': { 'value': 'city' },
                'to_bound': { 'value': 'city' },
                'locations': [
                    {
                        'country': this.state.allCountries ? '*' : 'Россия',
                    }
                ]
            })
        })
        .then(response=>response.json())
        .then(response => {
            console.log(response);
            this.setState({
                data: response.suggestions,
            })
        })
        .catch(err => {
            console.log(err);
        });
    };

    get cities() {
        return this.state.data.map((city)=>city.value);
    }

    render() {
        return (
            <div>
                <div className='form-group'>
                    <label htmlFor='city_name'>Введите город:</label>
                    <input
                        type='text'
                        name='city_name'
                        className='form-control'
                        onChange={this.inputHandler}/>
                </div>
                <div>
                    {this.cities.map((city, index)=>{
                        return <div className='item' key={index}>{city}</div>
                    })}
                </div>
            </div>
        );
    }
}

export default Form;