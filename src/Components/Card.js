import React, { Component } from 'react'
import axios from 'axios';

export default class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            showInputsOne: false,
            gender: null,
            year: null,
            currText: '',
            toggle: false,
            buttonName: 'Get More Details',
            type: this.props.type
        }
    }

    handleDetails = () => {
        // axios.get(`/api/issue?symptoms=${this.state.id}&gender=#${this.state.gender}&year=${this.state.year}`)
        //     .then(response=> {

        //     })
        if(this.state.toggle === false) {
            axios.get(`/api/issue/${this.props.id}`)
            .then(response => {
                this.setState({currText: response.data});
                console.log(response)
            })
            this.setState({toggle: true, buttonName: 'Hide Details'});
        } else {
            this.setState({toggle: false, buttonName: 'Get More Details'});
        }
    }

    handleCauses = () => {
        if(this.state.toggle === false) {
            
        }
    }
    render() {
        return(
            <div className='issue-card'>
                {this.props.type === 'Issue' ? <div>
                <p>{this.props.name}</p>
                <button onClick={this.handleDetails}>{this.state.buttonName}</button>
                {this.state.toggle ? <p>{this.state.currText}</p>: null}
                </div> : 
            
                <div>
                    <p>{this.props.name}</p>
                    <button onClick={() => this.props.handleProposed(this.props.key)}>Find Similar Symptoms</button>
                </div>
                }
            </div>
        )


            // this.props.type ==='Issue' ? (<div className='issue-card'>
            //     <p>{this.props.name}</p>
            //     <button onClick={this.handleDetails}>{this.state.buttonName}</button>
            //      {this.state.toggle ? <p>{this.state.currText}</p>}): null}


                {/* {this.state.showInputsOne ? 
                <>
                    <br />
                    <select onChange={(e) => this.setState({gender: e.target.value})}>
                        <option value='birthGender'>Birth Gender:</option>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                    </select>
                    <input placeholder='Birth Year:' onChange={(e) => this.setState({})}></input>
                    <br />
                    <button className='give-gender-and-year' onClick={this.handleCauses}>Submit</button>
                </>
            : null} */}
    }
}