import React, { Component } from 'react'
import axios from 'axios';

export default class SymptomCard extends Component {
    constructor(props) {
        super(props);
        this.state= {
            toggle: false,
            buttonText: 'Find Similar Symptoms',
            gender: null,
            year: null,
            receivedInfo: []
        }
    }
    handleClick = () => {
        if(!this.state.toggle) {
        this.setState({toggle: true, buttonText: 'Hide'});
        } else {
        this.setState({toggle: false, buttonText: 'Find Similar Symptoms'});
        }
    }
    handleGetClick = () => {
        axios.get(`/api/symptom?symptoms=${this.props.id}&gender=${this.state.gender}&year=${this.state.year}`)
            .then(response => {
                this.setState({receivedInfo: response.data});
            })
    }
    render() {
        return(
            <div className='symptom-container'>
                <div className='symptom-area'>
                    <input type='checkbox'  onChange={e => this.props.handleCheckboxes(this.props.id)}></input>
                    <p>{this.props.name}</p>
                    {/* {this.state.toggle ? <br /> : null}
                    {this.state.toggle ? <select onChange={e => this.setState({gender: e.target.value})}>
                        <option>Select Birth Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                    </select>
                    : null}
                    {this.state.toggle ? <input type='text' placeholder='Birth Year e.g. 1998' onChange={e => this.setState({year: e.target.value})}></input> : null}
                    {this.state.toggle ? <button onClick={this.handleGetClick}>Submit</button> : null}
                    {this.state.receivedInfo ? data1 : null*/}
                </div>
            </div>
        )
    }
}