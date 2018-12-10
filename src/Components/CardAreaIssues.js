import React, {Component} from 'react'
import IssueCard from './IssueCard'

export default class CardArea extends Component {
    
    render() {
        let comps = this.props.reqIssues.map(val => {
            return <IssueCard name={val.Name} key={val.ID} id={val.ID}/>
        })
        return(
            <div>
                {comps}
            </div>
        )
    }
}