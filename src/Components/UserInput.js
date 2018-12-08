import React, { Component } from 'react';

export default class UserInput extends Component {
    render() {
        return (
            <div className='search-container'>
                <select onChange={(e) => this.props.handleSelectValue(e.target.value)}>
                    <option value='Issue'>Issue</option>
                    <option value='Symptom'>Symptom</option>
                </select>
                <input className='search-field' placeholder='Search' onChange={e => this.props.handleSearchValue(e.target.value)}></input>
                <button className='search-submit' onClick={this.props.handleSubmit}>Search</button>
            </div>
        )
    }
}