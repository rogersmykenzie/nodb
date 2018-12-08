import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Header from './Components/Header';
import SiteDescription from './Components/SiteDescription';
import UserInput from './Components/UserInput'
import CardArea from './Components/CardArea';

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
      requestedType: ''
    }
  }
  handleSubmit = () => {
    if(this.state.selectValue === "Issue") {
      let arr = this.state.issues.filter((val, i, arr) => {
        return val["Name"].toLowerCase().includes(this.state.searchValue.toLowerCase());
      })
      this.setState({requestedIssues: arr});
    } else if(this.state.selectValue === 'Symptom') {
      let arr = this.state.symptoms.filter((val, i, arr) => {
        return val["Name"].toLowerCase().includes(this.state.searchValue.toLowerCase());
      })
      this.setState({requestedSymptoms: arr});
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
  render() {
    console.log(this.state.issues)
    return (
      <div>
        <Header />
        <SiteDescription />
        <UserInput handleSelectValue={this.handleSelectValue} handleSearchValue={this.handleSearchValue} handleSubmit={this.handleSubmit}/>
        <CardArea requestedIssues={this.state.requestedIssues} requestedSymptoms={this.state.requestedSymptoms} requestedType={this.state.selectValue}/>
      </div>
    );
  }
}

export default App;
