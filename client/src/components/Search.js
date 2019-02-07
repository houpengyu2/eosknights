import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            account: ''
        }
    }

    handleChange = (e) => {
        this.setState({account: e.target.value})
    }

    keyPress = (e) => {
        if(e.keyCode === 13){
            const account = this.state.account;
            this.setState({account: ''});
            const origin = window.location.origin;
            window.location.assign(`${origin}/account/${account}`);
        }
    }

    render(){
        return (
            <div className='header'>
                <Link to="/">
                    <h1>EOSKNIGHTS EXPLORER</h1>
                </Link>
                <input 
                    className='input'
                    type='text'
                    placeholder='enter account'
                    value={this.state.account}
                    onChange={this.handleChange}
                    onKeyDown={this.keyPress}
                />
            </div>
        )
    }
}

export default Search;