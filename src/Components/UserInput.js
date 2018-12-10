import React, { Component } from 'react';

const UserInput = (props) => {
    return (
        <div className='search-container'>
            <select onChange={(e) => props.handleSelectValue(e.target.value)}>
                <option value='Issue'>Issue</option>
                <option value='Symptom'>Symptom</option>
            </select>
            <input className='search-field' placeholder='Search' onKeyPress={e => e.key === 'Enter' ? props.handleSubmit() : null} onChange={e => props.handleSearchValue(e.target.value)}></input>
            <button className='search-submit' onClick={props.handleSubmit}>Search</button>
        </div>
    )
}

export default UserInput;

//CONVERT TO FUNCTIONAL COMPONENT THIS DOESNT HAVE STATE