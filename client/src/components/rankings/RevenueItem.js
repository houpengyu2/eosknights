import React from 'react';
import {Link} from 'react-router-dom';
import {toLocaleString} from '../../helpers/format';

export default ({r}) => (
    <Link to={`/account/${r.owner}`}>
        <li className="floor-item">
            <div className="rank-flex">
                <div className="rank-item owner">
                    {r.owner}:
                </div>
                <div className="rank-item">
                    {`${toLocaleString(Math.round(r.revenue))} EOS`}
                </div>
            </div>
        </li>
    </Link>
)

