import React from 'react';
import materialCodes from '../../helpers/material_codes';
import {element, rarity} from '../../helpers/type';

export default ({materials}) => {
    const materialsArr = materials.rows[0].rows;

    const materialsList = materialsArr.map((material, i) => {
        const materialRule = materialCodes.filter(m => m.code === material.code)[0];
        const {name, type, grade} = materialRule;

        const materialType = element(type);
        const rarityClass = rarity(grade);

        return (
            <div className="inventory-card" key={i}>
                <img 
                    className={rarityClass}
                    src={materialType} 
                    alt="avatar" 
                    style={{width: '8rem', height: '8rem', padding: '1rem'}}
                />
                <p className="name">{name}</p>
            </div>
        )
    })
        
    return (
        <div className="section">
            <h3>Materials</h3>
            <div className="inventory">
                {materialsList}
            </div>
        </div>
    )
}