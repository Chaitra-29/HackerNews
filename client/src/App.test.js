import React from 'react';
import App from './App';
import { render,screen } from "@testing-library/react";
import { configure,shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
afterEach(() => {
  
});
test('renders column headers', () => {
  render(<App match={{ params: { id: 0 } }}  />);
  const comments = screen.getByText(/Comments/i);
  const voteCounts = screen.getByText(/Vote Counts/i);
  const upVote = screen.getByText(/UpVote/i);
  const newsDetails = screen.getByText(/News Details/i);
  expect(comments).toBeInTheDocument();
  expect(voteCounts).toBeInTheDocument();
  expect(upVote).toBeInTheDocument();
  expect(newsDetails).toBeInTheDocument();
});

test('componentDidMount and callAPI are called' , () => {
  const componentDidMount = jest.spyOn(App.prototype, 'componentDidMount');
  const callAPI = jest.spyOn(App.prototype, 'callAPI');
  render(<App match={{ params: { id: 0 } }}  />);
  expect(componentDidMount).toHaveBeenCalledTimes(1);
  expect(callAPI).toHaveBeenCalledTimes(1);
});
const response = {
  hits:[{
    "created_at": "2020-07-05T10:44:30.000Z",
    "title": null,
    "url": null,
    "author": "gas9S9zw3P9c",
    "points": null,
    "story_text": null,
    "comment_text": "Not myself, but I know someone who was making a living from betting on horse racing. It&#x27;s not that different from &quot;gambling&quot; in the stock market. The same principles apply. You need some kind of egde, which often is 1. Data or 2. Market Access, less often the statistical model. Better data beats better models, and modeling is commoditized. Also, you need a pretty decent bankroll so that you can handle the volatility.",
    "num_comments": null,
    "story_id": 23737460,
    "story_title": "Ask HN: Who Earns a Living of Betting?",
    "story_url": null,
    "parent_id": 23737460,
    "created_at_i": 1593945870,
    "_tags": [
        "comment",
        "author_gas9S9zw3P9c",
        "story_23737460"
    ],
    "objectID": "23737785",
    "_highlightResult": {
        "author": {
            "value": "gas9S9zw3P9c",
            "matchLevel": "none",
            "matchedWords": []
        },
        "comment_text": {
            "value": "Not myself, but I know someone who was making a living from betting on horse racing. It's not that different from &quot;gambling&quot; in the stock market. The same principles apply. You need some kind of egde, which often is 1. Data or 2. Market Access, less often the statistical model. Better data beats better models, and modeling is commoditized. Also, you need a pretty decent bankroll so that you can handle the volatility.",
            "matchLevel": "none",
            "matchedWords": []
        },
        "story_title": {
            "value": "Ask HN: Who Earns a Living of Betting?",
            "matchLevel": "none",
            "matchedWords": []
        },
        "nbHits": 21999276,
        "page": 0,
        "nbPages": 34,
        "hitsPerPage": 30,
    }
},]
}
test('fetch api' , () => {
  const upvotes = jest.spyOn(App.prototype, 'getLocalStorage').mockImplementation(() => []); 
  const mockJsonPromise = Promise.resolve(response);
  const mockFetchPromise = Promise.resolve({
    json: () => mockJsonPromise,
  });
  jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); 
  const wrapper = shallow(<App match={{ params: { id: 0 } }} />); 
  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith('http://hn.algolia.com/api/v1/search_by_date?tags=front_page&hitsPerPage=10&page=0');
});

test('previous and next button' , () => {
  const goBack = jest.fn();
  const push = jest.fn();
  const wrapper = shallow(<App match={{ params: { id: 0 } }} history={{goBack: goBack, push:push}} />);
  expect(wrapper.find('button').at(0).simulate('click'));
  expect(goBack).toHaveBeenCalledTimes(1);
  expect(wrapper.find('button').at(1).simulate('click'));
  expect(push).toHaveBeenCalledTimes(1);
});