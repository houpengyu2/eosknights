import React from 'react';
import {Link} from 'react-router-dom';
import FloorItem from './FloorItem';
import RevenueItem from './RevenueItem';

export default ({floors, revenue}) => {
    const floorList = floors.slice(0, 10).map((f, i) => (
        <FloorItem
            f={f}
            key={i}
        ></FloorItem>
    ))    
    
    const revenueList = revenue.slice(0, 10).map((r, i) => (
        <RevenueItem
            r={r}
            key={i}
        ></RevenueItem>
    ))

    return (
        <div className="rankings">
            <div className="section-rank">
                <h3>Top 10 by floor</h3>
                <ol>
                    {floorList}
                </ol>
                <div className="view">
                    <Link to="/rankings">view more</Link>
                </div>
            </div>
            <div className="section-rank">
                <h3>Top 10 by revenue</h3>
                <ol>
                    {revenueList}
                </ol>
                <div className="view">
                    <Link to="/rankings">view more</Link>
                </div>
            </div>
        </div>
    )
}