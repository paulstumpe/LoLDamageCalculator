import { Progress, Avatar } from "antd";
import React from "react";
import findHP from "../Helpers/findHP";
function EnemyHP ({props}){
    const {selectedAbilities,
        enemyChampion,
        damageWithCurrentItems,
        damageWithOptimalItems, 
        levels,
        enemyCurrentHP
    } = props;
    const hpToPercent = (hp, outofHP)=>{
        console.log(hp/outofHP*100);
        return hp/outofHP*100
    }
    const maxHP = findHP(enemyChampion, levels)
    //todo add css tooltip hover
    return(<div style={{paddingRight: "60px"}}>
        Combo Damage
<div>{enemyChampion.name} LVL:{levels.enemyChampion}
<Avatar
                    size="large"
                    shape='square'
                    src={enemyChampion.image.smallSquareSprite}

                >{enemyChampion.name}</Avatar>
</div>
       <Progress
       strokeLinecap="square"
       strokeColor="lightGreen"
       percent={hpToPercent(enemyCurrentHP, maxHP)}
       trailColor="Black" 
       format={(percent, succesPercent)=>{
           console.log('ran formatting')
           return enemyCurrentHP-damageWithCurrentItems +"/" + findHP(enemyChampion, levels) +" HP"
       }}
       success={{ 
           percent: hpToPercent(damageWithCurrentItems, maxHP),
           strokeColor: "Red" 
        }}
       ></Progress>
       <div style={{fontSize:"10px"}}>
            <span style={{color:"Red"}}>Current Combo Damage : {damageWithCurrentItems} </span>
            <span style={{color:"green"}}>Current HP : {enemyCurrentHP} </span>
            <span style={{color:"black"}}>enemy Max HP : {maxHP}</span>
       </div>
        Combo Damage With Optimal Items
        <Progress
       strokeLinecap="square"
       strokeColor="lightGreen"
       percent={60}
       trailColor="Black" 
       success={{ 
           percent: 30,
           strokeColor: "Red" 
        }}
       ></Progress>
    </div>);
}
export default EnemyHP;