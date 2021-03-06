import React from "react";
import { Button, Select } from "antd";
import findHP from '../Helpers/findHP';

const {Option} = Select;
function AbilityButtons ({props}){
    const {selectedChampion, enemyChampion, levels, setLevels, setEnemyCurrentHP} = props
    let arr = []
    for(let i= 0; i<18; i++){
        arr.push(i+1);
    }
    console.log(arr);
    const handleEnemyChange=(level)=>{
        let newLevels = {...levels}
        newLevels.enemyChampion=level;
        setLevels(newLevels)
        setEnemyCurrentHP(findHP(enemyChampion, newLevels));
    }
    const handleChampionChange=(level)=>{
        let newLevels = {...levels}
        newLevels.selectedChampion=level;
        setLevels(newLevels)
    }
    return(<div>
        <div>Enemy {enemyChampion.name} Levels:
        <Select defaultValue={levels.enemyChampion} onChange={handleEnemyChange}>
            {arr.map((e,num)=>{
                console.log('inside map')
                return(<Option value={(num+1)}>{(num+1)}</Option>)
            })}
        </Select>
        </div>
        
        <div>Your Champion {selectedChampion.name} Levels:
        <Select defaultValue={levels.selectedChampion} onChange={handleChampionChange}>
            {arr.map((e,num)=>{
                return(<Option value={num+1}>{num+1}</Option>)
            })}
        </Select>
        </div>
    </div>);
}
export default AbilityButtons;