import React from 'react';
import {toLocaleString} from '../../helpers/format';
import {avatar} from '../../helpers/type';

export default ({knights}) => {
    const knightsArr = knights.rows[0].rows;

    const knightsList = knightsArr.map((k, i) => (
        <div className="knights-card" key={i}>
            <img 
                src={avatar(k.type)} 
                alt="avatar" 
                style={{width: '8rem', height: '8rem', padding: '1rem'}}/>
            <p>
                <span className="desc">Level: </span>
                {k.level}
            </p>
            <p>
                <span className="desc">Kill Count: </span>
                {toLocaleString(k.kill_count)}
            </p>
            <p>
                <span className="desc">Attack: </span>
                {toLocaleString(k.attack)}
            </p>
            <p>
                <span className="desc">Defense: </span>
                {toLocaleString(k.defense)}
            </p>
            <p>
                <span className="desc">Hp: </span>
                {toLocaleString(k.hp)}
            </p>
            <p>
                <span className="desc">Luck: </span>
                {toLocaleString(k.luck)}
            </p>
        </div>
    ))

    return (
        <div className="section">
            <h3>Knights</h3>
            <div className="knights">
                {knightsList}
            </div>
        </div>
    )
}