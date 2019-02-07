import React, {Component} from 'react';
import {getRankings} from '../../helpers/cleos';
import FloorItem from './FloorItem';
import RevenueItem from './RevenueItem';

class RankingsAll extends Component {
    constructor(props){
        super(props);
        this.state = {
            gotData: false,
            floors: [],
            revenue: [],
            isError: false,
            error: ""
        }
    }

    async componentDidMount(){
        try {
            const rankings = await getRankings();
            this.setState({
                gotData: true,
                floors: rankings.floors,
                revenue: rankings.revenue,
                isError: false,
                error: ""
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
        const {isError, error, gotData, floors, revenue} = this.state;

        let floorList = null
        let revenueList = null
        if(gotData){
            floorList = floors.map((f, i) => (
                <FloorItem
                    f={f}
                    key={i}
                ></FloorItem>
            ))    
            
            revenueList = revenue.map((r, i) => (
                <RevenueItem
                    r={r}
                    key={i}
                ></RevenueItem>
            ))
        }


        return (
            <div className="container">
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
                    <div className="rankings">
                        <div className="section-rank">
                            <h3>Top 10 by floor</h3>
                            <ol>
                                {floorList}
                            </ol>
                        </div>
                        <div className="section-rank">
                            <h3>Top 10 by revenue</h3>
                            <ol>
                                {revenueList}
                            </ol>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default RankingsAll;