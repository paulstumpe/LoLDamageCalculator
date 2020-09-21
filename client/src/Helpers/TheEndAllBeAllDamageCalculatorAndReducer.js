//need: selectedEnemyData, selectedOwnChampData, selected enemyItems, selectedEnemyRunes, selectedOwnItems, SelectedOwnRunes, levels 
const theEndAllBeAllDamageCalculatorAndReducer = (selectedEnemyData, 
    selectedEnemyItems, 
    selectedEnemyRunes, 
    selectedOwnChampData, 
    selectedOwnItems, 
    SelectedOwnRunes, 
    levels,
    selectedStartingHP,
    abilitiesArray)=>{
        //selected
        let myChamp= myChampCalculate(selectedOwnChampData, selectedOwnItems, SelectedOwnRunes, levels);
        let enemyChamp = myEnemyCalculate(selectedEnemyData, 
            selectedEnemyItems, 
            selectedEnemyRunes, levels, selectedStartingHP);
        //reduce abilities array
        let seed = selectedStartingHP
        let hpAfterCombo = abilitiesArray.reduce((total, currentAbility)=>{
            let abilitiesRankArray = currentAbility.damageProc.abilityRank;
            let abilityKey = currentAbility.skill;
            let abilityRank = levels[abilityKey];
            let abilityValues = abilitiesRankArray[abilityRank-1];
            let damageFromRatio = 0;
            if(abilityValues.ratioType==="ad"){
                damageFromRatio= (abilityValues.ratio/100)*myChamp.ad;
            } else if(abilityValues.ratioType==="ap"){
                damageFromRatio= (abilityValues.ratio/100)*myChamp.ap;
            }
            let premitigationDamage = abilityValues.base + damageFromRatio
            let postMitigationDamage 
            if(currentAbility.damageProc.damageType ==="magic"){
                if(enemyChamp.mr>=0){
                    let reduceIncomingDamageBy = (100)/(100+enemyChamp.mr)
                    postMitigationDamage=premitigationDamage*reduceIncomingDamageBy;
                } else {

                }
            } else if(currentAbility.damageProc.damageType ==="physical"){
                //check if armor is above zero
                if(enemyChamp.armor>=0){
                    let reduceIncomingDamageBy = (100)/(100+enemyChamp.armor)
                    postMitigationDamage=premitigationDamage*reduceIncomingDamageBy;
                } else {

                }
            } else if (currentAbility.damageProc.damageType === "true") {
                postMitigationDamage=premitigationDamage;
            }
            return total-postMitigationDamage;
        }, seed)

        return hpAfterCombo;
}

const myChampCalculate = (selectedOwnChampData, selectedOwnItems, SelectedOwnRunes, levels)=>{
    let myChamp = {};
    myChamp.ap = 100;
    let myLevel = levels.selectedChampion
    const {attackDamage, attackDamagePerLevel,}= selectedOwnChampData.baseStats
    myChamp.ad = attackDamage + attackDamagePerLevel * (myLevel-1)   
    return myChamp;
}
const myEnemyCalculate = (selectedEnemyData, 
    selectedEnemyItems, 
    selectedEnemyRunes, levels, selectedStartingHP)=>{

}
// abilityRank:[
//     {
//         base: 10,
//         ratio:20,
//         ratioType:'ad'
//     },
// levels {
//     Q:0,
//     W:0,
//     E:0,
//     R:0,
//     selectedChampion:1,
//     enemyChampion:1
//   }
// champData = {abilities: (5) [{…}, {…}, {…}, {…}, {…}]
// armor: 36
// attackDamage: 61.27
// attackRange: 125
// attackSpeed: 0.721
// baseStats: {hp: 582.52, hpPerLevel: 89, mp: 0, mpPerLevel: 0, moveSpeed: 345, …}
// blurb: "Utterly insane, unrepentantly homicidal, and horrifyingly purple, Dr. Mundo is what keeps many of Zaun's citizens indoors on particularly dark nights. This monosyllabic monstrosity seems to want nothing more than pain—both the giving of it, and the..."
// crit: 0
// hp: 582.52
// hpRegen: 8
// id: "DrMundo"
// image: {smallSquareSprite: "http://ddragon.leagueoflegends.com/cdn/10.19.1/img/champion/DrMundo.png", full: "DrMundo.png", sprite: "champion0.png", group: "champion", x: 144, …}
// info: {attack: 5, defense: 7, magic: 6, difficulty: 5}
// inventoryItemLimit: 6
// key: "36"
// moveSpeed: 345
// mp: 0
// mpRegen: 0
// name: "Dr. Mundo"
// partype: "None"
// spellBlock: 32.1
// tags: (2) ["Fighter", "Tank"]
// title: "the Madman of Zaun"
// _items: []}
export default theEndAllBeAllDamageCalculatorAndReducer;


const damageTypes = {
    Raw :{
        wikiName: "Raw damage"
    },
    periodic:{
        wikiName: "Default damage"
    },
    proc:{
        wikiName: "Proc damage"
    },
    reactive:{
        wikiName: "Reactive damage"
    },
    attack:{
        wikiName: "Basic damage"
    },
    spell:{
        wikiName: "Spell damage"
    },
    spellaoe:{
        wikiName: "Area damage" 
    },
    spellpersist:{
        wikiName: "Persistent damage "
    },
    pet:{
        wikiName: "Pet damage"
    },

    subTypes:{
        physical:"physical",
        magic: "magic",
        true: "true"
    },
    tags:[
        {critical:"critical"}
    ]
}

//some damage has critical tag

//character level
let damageProc={
    abilityRank:[
        {
            base: 10,
            ratio:20,
            ratioType:'ad'
        },
        {
            base: 10,
            ratio:20,
            ratioType:'ad'
        },
        {
            base: 10,
            ratio:20,
            ratioType:'ad'
        },
        {
            base: 10,
            ratio:20,
            ratioType:'ad'
        },
        {
            base: 10,
            ratio:20,
            ratioType:'ad'
        },
    ],
    damageType: "physical"
}

let ability = {
    castTime: 0.25,
    coolDown: (5) [8, 7, 7, 6, 6],
    cost: [50],
    costType: "mana",
    damageType: "Magic",
    description: "Active: Brand launches a fireball in the target direction that deals magic damage to the first enemy it hits.",
    descriptions: (2) ["Active: Brand launches a fireball in the target di…at deals magic damage to the first enemy it hits.", " Blaze: The target is also  stunned for 1.5 seconds."],
    flatDamage: (5) [80, 110, 140, 170, 200],
    icon: "Sear.png",
    icons: ["Sear.png"],
    isProjectile: "True",
    leveling: "Magic Damage:80 / 110 / 140 / 170 / 200 (+ 55% AP)",
    levelings: ["Magic Damage:80 / 110 / 140 / 170 / 200 (+ 55% AP)"],
    name: "Sear",
    damageProc: {
        abilityRank:[
            {
                base: 10,
                ratio:20,
                ratioType:'ad'
            },
            {
                base: 10,
                ratio:20,
                ratioType:'ad'
            },
            {
                base: 10,
                ratio:20,
                ratioType:'ad'
            },
            {
                base: 10,
                ratio:20,
                ratioType:'ad'
            },
            {
                base: 10,
                ratio:20,
                ratioType:'ad'
            },
        ],
        damageType: "physical"
    },
    skill: "Q",
}