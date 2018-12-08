import React, { Component } from 'react'
import Card from './Card';
import axios from 'axios';

export default class CardArea extends Component {
    constructor() {
        super();
        this.state = {
            content: null,
            currGender: null,
            reqSymptoms: null,
            year: null,
            currData: null
        }
    }

    // handleProposed = (id) => {
    //     axios.get(`/api/symptom?symptoms=${id}&gender=${this.state.currGender}&year=${this.state.year}`)
    //         .then(response => {

    //         })
    // }
    render() {
        let requestedIssues = null;
        let requestedSymptoms = this.state.reqSymptoms;
        let input = null;
        {if (this.props.requestedType === 'Issue') {
            requestedIssues = this.props.requestedIssues.map((val, i, arr) => {
                console.log(val.ID + " " + val.Name)
                return (
                <Card id={val.ID} name={val.Name} key={val.ID} type={this.props.requestedType}/>
                )
            })
        } 
        else if(this.props.requestedType === 'Symptom') {
                input = (
                    <div>
                        <select onChange={e => this.setState({currGender: e.target.value})}>
                            {this.state.currGender === null ? <option value='default'>Pick Birth Gender</option> : null}
                            <option value='male'>Male</option>
                            <option value='female'>Female</option>
                        </select>
                        <input className='query-input' placeholder='Birth Year e.g. 1990' onChange={e => this.setState({year: e.target.value})}></input>
                    </div>
                )
                requestedSymptoms = this.props.requestedSymptoms.map(val => {
                    return(
                        <Card key={val.ID} name={val.Name} handleProposed={this.handleProposed}/>
                    )
                })
            }
        }   
        return(
            <div className='query-select'>
                {input}
                <div className='card-area'>
                    {requestedIssues}
                    {requestedSymptoms}
                </div>
            </div>
        )
    }
}