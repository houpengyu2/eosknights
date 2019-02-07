import React from 'react';
import {Link} from 'react-router-dom';
import {toLocaleString} from '../../helpers/format';

export default ({f}) => (
    <Link to={`/account/${f.owner}`}>
        <li className="floor-item">
            <div className="rank-flex">
                <div className="rank-item owner">
                    {f.owner}: 
                </div>
                <div className="rank-item">
                    {toLocaleString(f.maxfloor)}
                </div>
            </div>
        </li>
    </Link>
)