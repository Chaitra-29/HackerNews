import React, { Component } from "react";
import {Chart} from 'react-google-charts';

const options = {
    legend: 'none',
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
            dataset.push(['x', 'y'])
            this.state.ids.forEach((id) =>{
               this.state.votes.forEach((vote) => {
                dataset.push([id,vote])
              })
          })
          return dataset
        }


      }

      render() {
        return (
            <Chart chartType='LineChart' data={this.renderTableData()} options={options} rootProps={{'data-testid': '1'}} />
        );
      }
}
export default LineChart;