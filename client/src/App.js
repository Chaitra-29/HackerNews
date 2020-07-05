import React, { Component,createRef } from "react";
import "./index.css";
import moment from 'moment';
// import { BrowserRouter as Router,
//   Switch,
//   Route,
//   Link } from "react-router-dom";

class App extends Component {
  tr = createRef();
  constructor(props) {
    super(props);
    this.state = { 
      apiResponse: "",
      newsFeed:"",
      page:"" 
    };
  }

  callAPI(pgNum) {
    fetch("http://hn.algolia.com/api/v1/search_by_date?tags=front_page&page="+ pgNum)
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            this.setState({ apiResponse: data,
              newsFeed:data.hits,
              page:pgNum })
        })
  }

  previous(){
    this.props.history.goBack();
    this.callAPI(Number(this.props.match.params.id)-1)
  }

  next(){
    const nextPage = Number(this.props.match.params.id)+1;
    this.props.history.push(nextPage+'')
    this.callAPI(nextPage)
  }

  componentDidMount() {
    this.callAPI(this.props.match.params.id);
  }

  getDate(date){
    return moment(new Date(date)).fromNow().toString();
  }

  hideNews(event){
    let hide = {
      index:event.target.id
    }
    let hidefeeds = this.getLocalStorage("hidefeeds");
    hidefeeds.push(hide)
    this.setLocalStorage("hidefeeds",hidefeeds)
    this.state.newsFeed.splice(event.target.id,1);
    this.setState({newsFeed:this.state.newsFeed});
  }

  getLocalStorage(itemName){
    return JSON.parse(localStorage.getItem(itemName))
  }

  setLocalStorage(itemName,item){
    localStorage.setItem(itemName,JSON.stringify(item));
  }

  upVote(event){
    const selectedIndex = event.target.id;
    let upvotes = this.getLocalStorage("upvotes");
    let isPresent = upvotes.findIndex((feed)=>{
      return selectedIndex === feed.index
    });
    console.log(this.state.newsFeed[selectedIndex])
    if(isPresent === -1){
      console.log(this.state.newsFeed[selectedIndex])
      const feed = this.state.newsFeed[selectedIndex];
      if(feed) {
        feed.points++;
        let upvote = {
          index:selectedIndex,
          points:feed.points
        }
        upvotes.push(upvote);
        this.setLocalStorage("upvotes",upvotes)
        this.setState({newsFeed:this.state.newsFeed}); 
      }
    }
  }


  renderTableData() {
    if(this.state.apiResponse){
        return this.state.newsFeed.map((feed,index)=>{
          return <tr key={index} ref={this.tr}>
            <td className="text-center">{feed.num_comments}</td>
            <td className="text-center">{feed.points}</td>
            <td className="text-center"><button className  ="no-border-outline cursor-pointer" id={index}  onClick={this.upVote.bind(this)}>
              <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-triangle-fill arrow-color" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M7.022 1.566a1.13 1.13 0 0 1 1.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767L7.022 1.566z"/>
              </svg>
            </button>
            </td>
            <td >
              <a className="news-feed" href={feed.url}>{feed.story_title || feed.title} </a>
              <span className="news-feed-details">
                <a className="news-feed-details" href={feed.url !== null ? new URL(feed.url).origin : ""}>{feed.url !== null ? '('+ new URL(feed.url).origin+')': "" }</a> | by 
                <span className="fontweight-and-color"> {feed.author} </span>
                <span> {this.getDate(feed.created_at.toString())}</span> [ 
                <span className="fontweight-and-color no-border-outline cursor-pointer" id={index} onClick={this.hideNews.bind(this)}> hide </span>]
              </span>
            </td>
          </tr>
        })
      }
  }

  render() {
        return (
          <div>
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
            <button className ="no-border-outline cursor-pointer" onClick={this.previous.bind(this)} style = {this.state.page == 0  ? {display:"none"} : undefined}>Previous</button>
            <button className ="no-border-outline cursor-pointer" onClick={this.next.bind(this)} style = {this.state.page == this.state.apiResponse.nbPages-1 ? {display:"none"} : undefined}>Next</button>
          </div>
        ) 
  }
}

export default App;
