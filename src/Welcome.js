import React, { Component } from 'react';

class Welcome extends Component {
    navigate() {
        this.props.history.push('0')
    }

    render() {
        return (
            <div className='jumbotron jumbotron-fluid'>
                <div className='container'>
                    <h1 className='display-4'>HackerNews!</h1>
                    <button class="btn dark-orange-color btn-lg" onClick={this.navigate.bind(this)}>News</button>
                </div>
            </div>
        );
    }
}
export default Welcome;