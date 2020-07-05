import React, { Component,createRef } from "react";
import "./index.css";
import moment from 'moment';
// import { BrowserRouter as Router,
//   Switch,
//   Route,
//   Link} from "react-router-dom";

class TableRows extends Component {
  li = createRef();
  constructor(props) {
    super(props);
    this.state = { 
      newsfeed: props.feed,
      index:props.index
   }; 
  }

  static getDerivedStateFromProps(props){
    return {
      newsfeed: props.feed
    }
  }

  getDate(date){
    return moment(new Date(date)).fromNow().toString();
  }

  hideNews(event){
    console.log(event.target)
    console.log(event.target.name)  
    this.state.rows.splice(event.target.name,1);
    this.setState({rows:this.state.newsFeed});
  }

  upVote(event){
    console.log(this.li.current.id)
    console.log(event.target.name)  
  }

  render() {
        const feed = this.state.newsfeed;
        const index = this.state.index;
        return <tr key={index} id={index} ref={this.li}>
          <td className="text-center">{feed.num_comments}</td>
          <td className="text-center">{feed.points}</td>
          <td className="text-center cursor-pointer"><svg onClick={this.upVote.bind(this)} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-triangle-fill arrow-color" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M7.022 1.566a1.13 1.13 0 0 1 1.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767L7.022 1.566z"/>
          </svg></td>
          <td >
            <a className="news-feed" href={feed.url}>{feed.story_title || feed.title}</a>
            <span className="news-feed-details">
              <a className="news-feed-details" href={new URL(feed.url).origin}>({new URL(feed.url).origin}) </a> | by
              <span className="fontweight-and-color"> {feed.author} </span>
              <span> {this.getDate(feed.created_at.toString())}</span> [ 
              <button className="fontweight-and-color hide-button cursor-pointer" name={index} onClick={this.hideNews.bind(this)}> hide </button>]
            </span>
          </td>
        </tr>
  }
}

export default TableRows;
