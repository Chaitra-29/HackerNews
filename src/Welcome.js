import React, { Component } from 'react';
import "./index.css";
class Welcome extends Component {
    navigate() {
        this.props.history.push('0')
    }

    render() {
        return (
            <div className='jumbotron jumbotron-no-margin'>
                <div className='container'>
                    <h1 className='display-4'>HackerNews!</h1>
                    <button className="btn dark-orange-color btn-lg" onClick={this.navigate.bind(this)}>Click</button>
                </div>
            </div>
        );
    }
}
export default Welcome;