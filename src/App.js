import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Header from './Components/Header';
import SiteDescription from './Components/SiteDescription';
import UserInput from './Components/UserInput'
import CardAreaIssues from './Components/CardAreaIssues';
import CardAreaSymptoms from './Components/CardAreaSymptoms'

class App extends Component {
  constructor() {
    super();
    this.state = {
      issues: [],
      symptoms: [],
      selectValue: 'Issue',
      searchValue: '',
      requestedIssues: [],
      requestedSymptoms: [],
      requestedType: 'Issue',
      timeMet: false,
      loadText: 'Loading.'
    }
  }

  handleSubmit = () => {
    if(this.state.selectValue === "Issue") {
      let arr = this.state.issues.filter((val, i, arr) => {
        return val["Name"].toLowerCase().includes(this.state.searchValue.toLowerCase());
      })
      this.setState({requestedIssues: arr, requestedType: 'Issue'});
    } else if(this.state.selectValue === 'Symptom') {
      let arr = this.state.symptoms.filter((val, i, arr) => {
        return val["Name"].toLowerCase().includes(this.state.searchValue.toLowerCase());
      })
      this.setState({requestedSymptoms: arr, requestedType: 'Symptom'});
    }
  }

  handleSelectValue = (val) => {
    this.setState({selectValue: val});
  }

  handleSearchValue = (val) => {
    this.setState({searchValue: val});
  }

  componentDidMount() {
    axios.get('/api/issues').then(response => {
      this.setState({issues: response.data})
    })
    axios.get('/api/symptoms').then(response => {
      this.setState({symptoms: response.data});
    })
  }
  //   let i = 0;
  //   while(true) {
  //     if(!this.state.timeMet) {
  //       if(i%20 === 0) {
  //         this.setState({loadText: this.state.loadText+'.'})
  //       }
  //     } else {
  //       break;
  //     }
  //   }

  render() {
    return (
      <div>
        {!this.state.timeMet ? setTimeout(() => this.setState({timeMet: true}), 2000) : null}
        {!this.state.timeMet ? <div className='loading-screen'><p>Loading...</p></div> : null}
        {this.state.timeMet ? <Header /> : null}
        {this.state.timeMet ? <SiteDescription /> : null}
        {this.state.timeMet ? <UserInput handleSelectValue={this.handleSelectValue} handleSearchValue={this.handleSearchValue} handleSubmit={this.handleSubmit} /> : null}
        {this.state.requestedType === 'Issue' ? <CardAreaIssues type={this.state.requestedType} reqIssues={this.state.requestedIssues}/> : null}
        {this.state.requestedType === 'Symptom' ? <CardAreaSymptoms reqSymptoms={this.state.requestedSymptoms}/> : null}
      </div>
    )
  }
}

export default App;
