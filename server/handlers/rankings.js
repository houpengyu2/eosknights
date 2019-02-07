const {getScope, getTable} = require('../helpers/cleos');
const BigNumber = require('bignumber.js');
const {modules:eos} = require('eosjs');
const {sleep} = require('../helpers/sleep');


function floorHighLow(a,b) {
	return b.maxfloor - a.maxfloor;
}

function revenueHighLow(a,b) {
    const first = Number(a.selling.split(" ")[0]);
    const second = Number(b.selling.split(" ")[0]);
	return second - first;
}


const limit = 200;
let lower_bound = 0;
let players = [];
let revenue = [];
let floorRankings = [];
let revenueRankings = [];

async function queryChain(){
    players = []
    revenue = [];
    
    try {
        let player_count = await getScope("eosknightsio", "player")
            .then(res => (res.rows[0].count))

        let revenue_count = await getScope("eosknightsio", "revenue")
            .then(res => (res.rows[0].count))

        
        // TOP FLOOR

        console.log("downloading floor info...")
        while(players.length < player_count){
            let temp_players = await getTable("eosknightsio", "eosknightsio", "player", lower_bound, limit);
            let len = temp_players.rows.length;
            let lastAccount = temp_players.rows[len-1].owner;
            let encodedAccount = new BigNumber(eos.format.encodeName(lastAccount, false))
            lower_bound =  encodedAccount.plus(1).toString();
            players = [...players, ...temp_players.rows];
            sleep(1);
        }
        
        lower_bound = 0;
        console.log("player count:", player_count);
        console.log("player entries:", players.length);
        
        floorRankings = [];
        floorRankings = players.sort(floorHighLow).slice(0, 100);
        

        // TOP REVENUE
        
        console.log("downloading revenue info...")
        while(revenue.length < revenue_count){
            let temp_revenue = await getTable("eosknightsio", "eosknightsio", "revenue", lower_bound, limit);
            let len = temp_revenue.rows.length;
            let lastAccount = temp_revenue.rows[len-1].owner;
            let encodedAccount = new BigNumber(eos.format.encodeName(lastAccount, false))
            lower_bound =  encodedAccount.plus(1).toString();
            revenue = [...revenue, ...temp_revenue.rows];
            sleep(1);
        }
        
        lower_bound = 0;
        console.log("revenue count:", revenue_count);
        console.log("revenue entries:", revenue.length);
        
        revenueRankings = [];
        revenueRankings = revenue
                .filter(o => (o.owner !== "askforrefund" && o.owner !== "whitehatguys"))
                .sort(revenueHighLow).slice(0, 100);
                
    } catch (error) {
        console.log("failed to fetch new rankings")
    }
}

queryChain();
setInterval(queryChain, 14400000); //4hr



exports.getRankings = async function(req, res, next){
    while(floorRankings.length === 0 || revenueRankings.length === 0){
        // to stall time during rankings update 
    }

    const floors = floorRankings.map(f => ({owner: f.owner, maxfloor: f.maxfloor}))
    const revenue = revenueRankings.map(r => {
        const sellValue = Number(r.selling.split(" ")[0])
        return {
            owner: r.owner, 
            revenue: sellValue
        }
    })

    return res.status(200).json({floors, revenue})
}


