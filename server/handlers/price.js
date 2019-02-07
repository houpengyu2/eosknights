const apiCall = require('../helpers/api');
const {getTable} = require('../helpers/cleos');
const {precisionRound} = require('../helpers/round');

const URL = 'https://api.hitbtc.com/api/2/public/ticker/eosusd';

exports.getPrices = async function(req, res, next){
    let ramPrice = getTable("eosio", "eosio", "rammarket")
        .then(response => {
            const quote = Number(response.rows[0].quote.balance.split(" ")[0]);
            const base = Number(response.rows[0].base.balance.split(" ")[0]);
            const ram = precisionRound((quote/base * 1024), 4);
            return ram;
        })

    let eosPrice = apiCall("get", URL)
        .then(response => JSON.parse(response))
        .then(response => precisionRound(Number(response.last), 2))
    
    Promise.all([ramPrice, eosPrice])
        .then((resp) => res.status(200).json({ram: resp[0], eos: resp[1]}))
        .catch((err) => {
            return next(err)
        })
}