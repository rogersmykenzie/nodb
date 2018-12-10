import React, { Component } from 'react';
import axios from 'axios'
// import {
//     withRouter
// } from 'react-router-dom';

export default class IssueCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mediDetails: null,
            buttonText: 'Get Details',
            comments: [],
            addCommentText: '',
            locationData: '',
            url: '',
            toggleUrl: false
        }
    }

    handleClick = (id) => {
        if(this.state.mediDetails!== null) {
            this.setState({mediDetails: null});
        } else {
            axios.get(`/api/issue/${id}`)
                .then(response => {
                    this.setState({mediDetails: response.data})
                })
            }
                if(this.state.buttonText === 'Get Details') {
                    this.setState({buttonText: "Hide Details"});
                } else {
                    this.setState({buttonText: "Get Details"});
                }
        axios.get(`/api/comment/${id}`)
                .then(response => {
                    this.setState({comments: response.data});
                }).catch(err => console.log(err))
    }
    handleAddComment = () => {
        if(this.state.addCommentText.trim()) {
        axios.post(`/api/comment`, {id: this.props.id, user: 'User24601', comment: this.state.addCommentText})
            .then(response => {
                this.setState({comments: response.data});
            })
        }
    }
    handleLocation = (lat, long) => {
        let location = lat + ',' + long;
        axios.get(`/api/location/${location}`)
            .then(response => {
                let str = 'This Tweet came from ' + response.data[0].street + ', '
                + response.data[0].adminArea5 + ', '
                + response.data[0].adminArea4 + ', '
                + response.data[0].adminArea3 + ', '
                + response.data[0].adminArea1 + ', '
                + response.data[0].postalCode
                this.setState({locationData: str, url: response.data[0].mapUrl, toggleUrl: true});
                alert(str);
            })
    }
    render() {
        let data1 = this.state.comments.map(val => {
            return <div><p className='individual-comment'>{val.user}: {val.comment}</p><button className='location-button' onClick={() => this.handleLocation(val.lat, val.long)}>Get Data</button></div>
        })
        return(
            <>
                <div className='issue-card'>
                    <p className='issue-name'>{this.props.name}</p>
                    <button className='issue-button-1' onClick={() => this.handleClick(this.props.id)}>{this.state.buttonText}</button>
                    {this.state.mediDetails ? <span className='issue-p-container'><p className='issue-p'>{this.state.mediDetails}</p></span> : null}
                </div>
                {this.state.mediDetails ? this.state.toggleUrl ? <img onClick={() => this.setState({toggleUrl: false})}className='urlImage' src={this.state.url} /> : null : null}
                {this.state.mediDetails ? <div className='issue-comments-container'>
                {this.state.mediDetails ? <div className='issue-data'>Comments: <br/>{data1}</div> : null}
                {this.state.mediDetails ? <input className='issue-input' placeholder='Comment!' onChange={e => this.setState({addCommentText: e.target.value})}></input> : null}
                {this.state.mediDetails ? <button className='issue-button-2' onClick={this.handleAddComment}>Submit</button> : null}
                </div> : null}
            </>
        )
    }
}