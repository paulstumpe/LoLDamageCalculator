import { Slider, Row, Col, InputNumber } from "antd";
import React from "react";
import findHP from "../Helpers/findHP"

function ChooseEnemyHPSlider ({props}){
    const {enemyChampion, setEnemyCurrentHP, enemyCurrentHP, levels} = props;
    const enemyMaxHP = findHP(enemyChampion, levels);
    const onChange=(value)=>{
        setEnemyCurrentHP(value);
    }
    return(<div>
        Choose Enemy Starting HP:
           <Row>
        <Col span={12}>
          <Slider
            min={1}
            max={enemyMaxHP}
            onChange={onChange}
            value={enemyCurrentHP}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={1}
            max={enemyMaxHP}
            style={{ margin: '0 16px' }}
            value={enemyCurrentHP}
            onChange={onChange}
          />
        </Col>
      </Row>
    </div>);
}
export default ChooseEnemyHPSlider;