export function weapon(code){
    if(100 < code && code < 200){
        return "/images/items/sword-96.png"
    } else if(200 < code && code < 300){
        return "/images/items/axe-96.png"
    } else if(300 < code && code < 400){
        return "/images/items/bow-96.png"
    } else if(400 < code && code < 500){
        return "/images/items/staff-96.png"
    } else if(500 < code && code < 600){
        return "/images/items/leather-armor-96.png"
    } else if(600 < code && code < 700){
        return "/images/items/plate-armor-96.png"
    } else if(700 < code && code < 800){
        return "/images/items/ring-96.png"
    } else if(800 < code && code < 900){
        return "/images/items/amulet-96.png"
    } 
}

export function element(type){
    switch(type){
        case 1:
            return "/images/materials/nature-96.png"
        case 2:
            return "/images/materials/iron-96.png"
        case 3:
            return "/images/materials/bone-96.png"
        case 4:
            return "/images/materials/leather-96.png"
        case 5:
            return "/images/materials/mineral-96.png"
        default: 
            return "/images/materials/nature-96.png"
    }
}

export function rarity(grade){
    switch(grade){
        case 1:
            return "normal";
        case 2:
            return "rare";
        case 3:
            return "unique";
        case 4:
            return "legendary";
        case 5:
            return "ancient";
        case 6:
            return "chaos";
        default: 
            return "normal";
    }
}

export function avatar(type){
    switch(type){
        case 1:
            return "/images/knights/knight-96.png";
        case 2: 
            return "/images/knights/archers-96.png";
        case 3: 
            return "/images/knights/witch-96.png";
        default:
            return "/images/knights/knight-96.png";
    }
}