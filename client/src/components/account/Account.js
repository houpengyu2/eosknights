import React, {Component} from 'react';
import {getAccount, getTable} from '../../helpers/cleos';
import {modules as eos} from 'eosjs';
import BigNumber from 'bignumber.js'
import AccountDetails from './AccountDetails';
import Knights from './Knights';
import Items from './Items';
import Materials from './Materials';

class Account extends Component {
    constructor(props){
        super(props);
        this.state = {
            gotData: false,
            account: {},
            revenue: {},
            knights: {},
            items: {},
            materials: {},
            isError: false,
            error: ""
        }
    }

    async componentDidMount(){
        const {name} = this.props.match.params;
        const encodedName = new BigNumber(eos.format.encodeName(name, false))
        const lower = encodedName.toString();
        const upper = encodedName.plus(1).toString();

        try {
            // have to keep await otherwise res code is 429
            const account = await getAccount(name);
            const revenue = await getTable('eosknightsio', 'eosknightsio', 'revenue', lower, upper);
            const knights = await getTable('eosknightsio', 'eosknightsio', 'knight', lower, upper);
            const items = await getTable('eosknightsio', 'eosknightsio', 'item', lower, upper);
            const materials = await getTable('eosknightsio', 'eosknightsio', 'material', lower, upper);
            
            Promise.all([account, revenue, knights, items, materials])
                .then(() => {
                    if(knights.rows.length === 0) throw Error("This account has no knights");
                    this.setState({
                        gotData: true, 
                        account, 
                        revenue, 
                        knights, 
                        items, 
                        materials, 
                        isError: false, 
                        error: ""})
                })
                .catch(err => {
                    this.setState({
                        ...this.state,
                        isError: true,
                        error: err.message
                    })
                })
        } catch (error) {
            this.setState({
                ...this.state,
                isError: true,
                error: "Failed to connect to the node/server. Please try again later."
            })
        }
    }

    render(){
        const {isError, error, gotData, account, revenue, knights, items, materials} = this.state;
        
        return (
            <div >
                {((!gotData && !isError) && (
                    <div className="loading"></div>
                ))}
                {(isError && (
                    <div className="container">
                        <div className="error">
                            {error}
                        </div>
                    </div>
                ))}
                {((gotData && !isError) && (
                    <div className="container">
                        <AccountDetails account={account} revenue={revenue}></AccountDetails>
                        <Knights knights={knights}></Knights>
                        <Items items={items}></Items>
                        <Materials materials={materials}></Materials>
                    </div>
                ))}
            </div>
        )
    }
}

export default Account;