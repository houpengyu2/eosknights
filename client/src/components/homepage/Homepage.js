import React, {Component} from 'react';
import {getInfo, getTable, getRankings} from '../../helpers/cleos';
import {getPrice} from '../../helpers/price';
import {toLocaleString} from '../../helpers/format';
import ChainStats from './ChainStats';
import GameStats from './GameStats';
import Rankings from '../rankings/Rankings';


class Homepage extends Component {
    constructor(props){
        super(props);
        this.state = {
            gotData: false,
            headBlock: "",
            irrBlock: "",
            bp: "",
            playerCount: "",
            tradingVol: "",
            floors: [],
            revenue: [],
            price: "",
            isError: false,
            error: ""
        }
    }

    async componentDidMount(){
        try {
            // need to use await to avoid http error code 429
            const chainInfo = await getInfo();
            const gameStats = await getTable('eosknightsio', 'eosknightsio', 'adminstate');
            const rankings = await getRankings();
            const price = await getPrice();
           
            Promise.all([chainInfo, gameStats, rankings, price])
                .then(() => {
                    this.setState({
                        gotData: true,
                        headBlock: chainInfo.head_block_num,
                        irrBlock: chainInfo.last_irreversible_block_num,
                        bp: chainInfo.head_block_producer,
                        playerCount: gameStats.rows[0].player_count,
                        tradingVol: gameStats.rows[0].tradingvol,
                        floors: rankings.floors,
                        revenue: rankings.revenue,
                        price,
                        isError: false,
                        error: ""
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

    render() {
        const {gotData, isError, error, headBlock, irrBlock, bp, playerCount, tradingVol, floors, revenue, price} = this.state;

        const vol = Math.round(Number(tradingVol.split(" ")[0]));
        const volFormatted = toLocaleString(vol);
        const marketVol = `${volFormatted} EOS`;

        return (
            <div>
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
                    <div className = "container">
                        <ChainStats 
                            headBlock={headBlock}
                            irrBlock={irrBlock} 
                            bp={bp}
                            price={price}
                        ></ChainStats>
                        <GameStats
                            playerCount={toLocaleString(playerCount)}
                            marketVol={marketVol}
                        ></GameStats>
                        <Rankings
                            floors={floors}
                            revenue={revenue}
                        ></Rankings>
                    </div>
                ))}
            </div>
        )
    }
}

export default Homepage;