import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {Divider, Row, Col} from 'antd';
import Grid from 'antd/lib/card/Grid';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import ComboSegment from './Components/ComboSegment';
import LeftWindow from './Components/LeftWindow';
import Axios from 'axios';
import findHP from './Helpers/findHP';

let ogStuff = {};
ogStuff = [
  {
    name: "dark binding",
    skill: "Q",
    flatDamage: [50]
  }, 
  {
    name: "tormented soil",
    skill: "W",
    flatDamage: [100]
  } 
];
function App() {
  const [championAbilities, setchampionAbilities] = useState(ogStuff);
  const [selectedAbilities, setSelectedAbilites] = useState([]);
  const [selectedChampion, setSelectedChampion]=useState({
    name:'no name',
    image: {smallSquareSprite:'stuff'}
  });
  const [enemyChampion, setEnemyChampion] = useState({
    name:'no name',
    baseStats:{
      hp: 300,
      hpPerLevel:10,
    },
    currentHP: 300,
    image:{
      smallSquareSprite: 'la'
    }
  })
  const [levels, setLevels] =useState({
    Q:0,
    W:0,
    E:0,
    R:0,
    selectedChampion:1,
    enemyChampion:1
  })
  const [enemyCurrentHP, setEnemyCurrentHP]= useState(200)

  useEffect(()=>{
    Axios.get(`/champion/caitlyn`)
      .then(({data})=>{
        let champData = data;
        console.log(champData.abilities)
        setchampionAbilities(champData.abilities)
        return Axios.get('/champion/ezreal')
      })
      .then(
        ({data})=>{
          setEnemyChampion(data);
        }
      )
  },[])
  const fetchAndSetSelectedChampion = async ({name})=>{
    let champion = await fetchChampion(name)
    setSelectedChampion(champion);
    setSelectedAbilites([]);
    setchampionAbilities(champion.abilities);
    console.log('champ',champion);
  }
  const fetchAndSetEnemyChampion = async({name})=>{
    let champion = await fetchChampion(name);
    console.log(enemyChampion);
    setEnemyChampion(champion);
    
    setEnemyCurrentHP(findHP(champion, levels));

  }
  const fetchChampion = async (name)=>{
    let {data} = await Axios.get(`/champion/${name}`)
    let champion = data;
    return champion;
  }
  return (
<div>
  <Row>
    <Col span="12">
        hello
        <LeftWindow props={{selectedChampion, fetchAndSetSelectedChampion, fetchAndSetEnemyChampion}}></LeftWindow>
        {/* {selectedAbilities[0] ? selectedAbilities[0].name : 'no selection'} */}
    </Col>
    <Col span="12">
      combo segment        
      <ComboSegment props={{championAbilities, selectedAbilities, setSelectedAbilites, selectedChampion,levels, setLevels, enemyChampion, setEnemyCurrentHP, enemyCurrentHP}}></ComboSegment>
    </Col>
  </Row>
</div>
  );
}

export default App;
