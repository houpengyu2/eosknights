import React from 'react';
import {toLocaleString, precisionRound, prepNum} from '../../helpers/format';

export default ({account, revenue}) => {
    const {
        account_name, 
        core_liquid_balance,
        cpu_limit,
        net_limit,
        ram_quota,
        ram_usage,
        self_delegated_bandwidth,
    } = account;

    // Balance calculations
    let bandwidth = {};
    if(self_delegated_bandwidth == null){
        bandwidth = {
            cpu_weight: "0 EOS",
            net_weight: "0 EOS"
        }
    } else {
        bandwidth = self_delegated_bandwidth
    }
    const {cpu_weight="0 ", net_weight="0 "} = bandwidth;
    const cpu = Number(cpu_weight.split(" ")[0]);
    const net = Number(net_weight.split(" ")[0]);
    const staked = cpu + net;
    const available = Number(core_liquid_balance.split(" ")[0]);
    const total = staked + available;
    const totalFinal = prepNum(total); 
    const stakedFinal = prepNum(staked);
    const availableFinal = prepNum(available);

    // Resource calculations
    const {used:cpu_used, available:cpu_available} = cpu_limit;
    const {used:net_used, available:net_available} = net_limit;
    const cpuWidth = `${cpu_used/cpu_available * 100}%`
    const netWidth = `${net_used/net_available * 100}%`
    const ramWidth = `${ram_usage/ram_quota * 100}%`
    const cpuStats = `${toLocaleString(Math.round(cpu_used / 1000))} ms / ${toLocaleString(Math.round(cpu_available / 1000))} ms`;
    const netStats = `${toLocaleString(Math.round(net_used / 1000))} ms / ${toLocaleString(Math.round(net_available / 1000))} ms`;
    const ramStats = `${precisionRound((ram_usage / 1024), 2)} kb / ${precisionRound((ram_quota / 1024), 2)} kb`;

    // P/L calculations
    const {selling, spending, buying} = revenue.rows[0];
    const sellValue = selling.split(" ")[0];
    const spendValue = spending.split(" ")[0];
    const buyValue = buying.split(" ")[0];
    const profit = sellValue - spendValue - buyValue;
    const profitFinal = prepNum(profit);
    const sellValueFinal = prepNum(sellValue);

    return (
        <div className="section">
            <h3>Account</h3>
            <div className="element">
                <div className="element-card balances">
                    <p><span className="desc">Account:</span> {account_name}</p>
                    <p><span className="desc">Total Balance:</span> {totalFinal}</p>
                    <p><span className="desc">Staked Balance:</span> {stakedFinal}</p>
                    <p><span className="desc">Available Balance:</span> {availableFinal}</p>
                </div>
                <div className="element-card balances">
                    <p><span className="desc">Profit:</span> {profitFinal}</p>
                    <p><span className="desc">Sell Value:</span> {sellValueFinal}</p>
                    <p><span className="desc">Buy Value:</span> {buyValue}</p>
                    <p><span className="desc">Spend Value:</span> {spendValue}</p>
                </div>
                <div className="element-card">
                    <p className="resource-label"><span className="desc">CPU:</span> {cpuStats}</p>
                    <div className="progress progress-bar" >
                        <div className="progress progress-current" style={{width: cpuWidth}}></div>
                    </div>
                    <p className="resource-label"><span className="desc">NET:</span> {netStats}</p>
                    <div className="progress progress-bar" >
                        <div className="progress progress-current" style={{width: netWidth}}></div>
                    </div>
                    <p className="resource-label"><span className="desc">RAM:</span> {ramStats}</p>
                    <div className="progress progress-bar" >
                        <div className="progress progress-current" style={{width: ramWidth}}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}