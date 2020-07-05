import React, { Component } from "react";
import "./index.css";
import moment from 'moment';
// import { BrowserRouter as Router,
//   Switch,
//   Route,
//   Link} from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch("http://hn.algolia.com/api/v1/search_by_date?tags=front_page&page=0")
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            this.setState({ apiResponse: data })
        })
  }

  componentDidMount() {
    this.callAPI();
  }

  getDate(date){
    return moment(new Date(date)).fromNow().toString();
  }

  renderTableData() {
    if(this.state.apiResponse){
        const newsFeed = this.state.apiResponse.hits;
        return newsFeed.map((feed,index)=>{
          return <tr key={index}>
            <td className="text-center">{feed.num_comments}</td>
            <td className="text-center">{feed.points}</td>
            <td className="text-center"><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-triangle-fill arrow-color" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M7.022 1.566a1.13 1.13 0 0 1 1.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767L7.022 1.566z"/>
            </svg></td>
            <td >
              <span>{feed.story_title || feed.title}</span>
              <span className="news-feed-details">
                <a className="news-feed-details" href={feed.url}>({new URL(feed.url).origin}) </a> | by
                <span className="fontweight-and-color"> {feed.author} </span>
                <span> {this.getDate(feed.created_at.toString())}</span> [ 
                <span className="fontweight-and-color"> hide </span>]
              </span>
            </td>
          </tr>
        })
      }
  }

  render() {
        return (
          <table className="table table-striped">
            <thead className="thead-color">
              <tr>
                <th style={{width:'10%'}}>Comments</th>
                <th style={{width:'15%'}}>Vote Counts</th>
                <th style={{width:'10%'}}>UpVote</th>
                <th style={{width:'75%'}}>NewsDetail</th>
              </tr>
            </thead>
            <tbody>
              {this.renderTableData()}
            </tbody>
          </table>

        ) 
  }
}

export default App;
