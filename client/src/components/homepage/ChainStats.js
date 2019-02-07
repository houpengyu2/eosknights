import React from 'react';
import {toLocaleString} from '../../helpers/format';

export default ({headBlock, irrBlock, bp, price}) => (
    <div className="section">
        <h3>Mainnet</h3>
        <div className="info">
            <div className="info-item">
                <i className="fas fa-project-diagram icon"></i>
                <h2>{bp}</h2>
                <p>BlockProducer</p>
            </div>
            <div className="info-item">
                <i className="fas fa-memory icon"></i>
                <h2>{`${price.ram} EOS/KB`}</h2>
                <p>Ram Price</p>
            </div>
            <div className="info-item">
                <i className="fas fa-dollar-sign icon"></i>
                <h2>{`$${price.eos}`}</h2>
                <p>EOS Price</p>
            </div>
            <div className="info-item">
                <i className="fas fa-link icon"></i>
                <h2>{toLocaleString(headBlock)}</h2>
                <p>Head Block</p>
            </div>
            <div className="info-item">
                <i className="fas fa-unlink icon"></i>
                <h2>{toLocaleString(irrBlock)}</h2>
                <p>Last Irreversible Block</p>
            </div>
        </div>
    </div>
)
