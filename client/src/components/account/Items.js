import React from 'react';
import itemCodes from '../../helpers/item_codes';
import {weapon, rarity} from '../../helpers/type';

export default ({items}) => {
    const itemsArr = items.rows[0].rows;

    const itemsList = itemsArr.map((item, i) => {
        const itemRule = itemCodes.filter(w => w.code === item.code)[0];
        const {name, grade} = itemRule;

        const weaponType = weapon(item.code);
        const rarityClass = rarity(grade);

        return (
            <div className="inventory-card" key={i}>
                <img 
                    className={rarityClass}
                    src={weaponType}
                    alt="avatar" 
                    style={{width: '8rem', height: '8rem', padding: '1rem'}}
                />
                <p className="name">{name}</p>
                <p>Level: {item.level}</p>
            </div>
        )
    })
        
    return (
        <div className="section">
            <h3>Items</h3>
            <div className="inventory">
                {itemsList}
            </div>
        </div>
    )
}