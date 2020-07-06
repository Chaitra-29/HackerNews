import React, { Component } from "react";
import {Chart} from 'react-google-charts';

const options = {
    legend:'none',
    chartArea: {width: '50%',height: '100%'},
    hAxis: {title: 'IDs'},
    vAxis: {title: 'Votes'}
  };

class LineChart extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          ids:props.ids,
          votes:props.votes
        };
      }

      static getDerivedStateFromProps(props){
        return { 
            ids:props.ids,
            votes:props.votes
          };
        
        }


      renderTableData() {
        if(this.state.ids && this.state.votes){
            let dataset = [];
            dataset.push(['IDs', 'Votes'])
            for(let i= 0; i < this.state.ids.length; i++){
                dataset.push([this.state.ids[i], this.state.votes[i]]);
            }
          return dataset
        }


      }

      render() {
        if(this.state.ids && this.state.votes){
            return <Chart chartType='LineChart' data={this.renderTableData()} options={options} rootProps={{'data-testid': '1'}} />
        }else{
            return <div />
        }
      }
}
export default LineChart;