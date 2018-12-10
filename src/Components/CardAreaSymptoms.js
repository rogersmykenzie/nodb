import React, { Component } from 'react';
import SymptomCard from './SymptomCard';
import axios from 'axios';

export default class CardAreaSymptoms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSymptoms: [],
            toggle: true,
            gender: null,
            year: null,
            receivedDiagnosis: null,
            toggleCheck: true
        }
    }
    handleCheckboxes = (id) => {
        if(this.state.selectedSymptoms.includes(id)) {
            let arr = [...this.state.selectedSymptoms];
            arr.splice(arr.indexOf(id),1);
            this.setState({selectedSymptoms: arr});
        } else {
            this.setState({selectedSymptoms: [...this.state.selectedSymptoms, id]});
        }
    }

    render() {
        let comps = this.props.reqSymptoms.map(val => {
            return <SymptomCard name={val.Name} id={val.ID} key={val.ID} handleCheckboxes={this.handleCheckboxes}/>
        })

        if(!this.state.toggle && this.state.toggleCheck) {
                let symptoms = this.state.selectedSymptoms.reduce((acc, val) => {
                return acc + ',' + val;
            })
            axios.get(`/api/diagnosis?symptoms=${symptoms}&gender=${this.state.gender}&year=${this.state.year}`)
            .then(response => {
                this.setState({receivedDiagnosis: response.data, toggleCheck: false});
            })
        }
        let arr = [];
        if(this.state.receivedDiagnosis) {
                arr = this.state.receivedDiagnosis.map(val => {
                return <div className='diagnosis-container'><div className='diagnosis'><p className='diagnosis-name'>You have {val.Issue.Name}</p><p>{val.Issue.Accuracy}%<br />Chance of Accuracy.</p><p>What Kind of Specialist do you Need: {val.Specialisation[0].Name}</p></div></div>
            })
        }
        return(
            <>
                <div>
                    {this.state.toggle ? comps 
                    : null}
                </div>
                {this.state.toggle ? <select className='select'onChange={e => this.setState({gender: e.target.value})}>
                    <option>Select Birth Gender</option>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                </select> : null}
                {this.state.toggle ? <input className='birth-year' placeholder='Birth Year e.g. 1998' onChange={e => this.setState({year: e.target.value})}></input> : null}
                <br /><br />
                <div className='button-symptoms-area-container'>
                    {this.state.toggle ? <button className='symptoms-area-submit' onClick={() => this.state.toggle ? this.setState({toggle: false}) : this.setState({toggle: true, toggleCheck: true})}>Find Possible Causes</button> : null }
                </div>
                {this.state.receivedDiagnosis ? arr : null};
            </>
        )
    }
}