'use strict';

var dataset = require('./dataset.json');

/*
  create an array with accounts from bankBalances that are
  greater than 100000
  assign the resulting new array to `hundredThousandairs`
*/
var hundredThousandairs = null;
function ovaHunned(element) {
  if (element.amount > 100000) {
    return element;
  }
}
hundredThousandairs = dataset.bankBalances.filter(ovaHunned)

/*
  DO NOT MUTATE DATA.

  create a new dataset where each bank object is a new object.
  `amount` and `state` values will be transferred to the new object.
  This new object is different, you will add one new key of `rounded`

  `rounded` value is `amount` rounded to the nearest dollar

  Example:
    {
      "amount": "134758.44",
      "state": "HI",
      "rounded": 134758
    }
  assign the resulting new array to `datasetWithRoundedDollar`
*/
var datasetWithRoundedDollar = null;
function addRounded(element) {
  let newDataset = {};
  newDataset.state = element.state;
  newDataset.amount = element.amount;
  newDataset.rounded = Math.round(element.amount);
  return newDataset
}

datasetWithRoundedDollar = dataset.bankBalances.map(addRounded);
/*
  DO NOT MUTATE DATA.

  create a new dataset where each bank object is a new object.
  `amount` and `state` values will be transferred to the new object.
  This new object is different, you will add one new key of `roundedDime`

  `roundedDime` value is `amount` rounded to the nearest 10th of a cent

  Example 1
    {
      "amount": "134758.46",
      "state": "HI"
      "roundedDime": 134758.5
    }
  Example 2
    {
      "amount": "134758.44",
      "state": "HI"
      "roundedDime": 134758.4
    }
  assign the resulting new array to `roundedDime`
*/
var datasetWithRoundedDime = null;

function roundToDime(element) {
  let newDataset = {};
  newDataset.state = element.state;
  newDataset.amount = element.amount;
  newDataset.roundedDime = Math.round(element.amount * 10) / 10;
  return newDataset
}

datasetWithRoundedDime = dataset.bankBalances.map(roundToDime);
// set sumOfBankBalances to be the sum of all value held at `amount` for each bank object
var sumOfBankBalances = null;

let sum = 0
function findSum(previousValue, currentValue) {

  let sum = previousValue + parseFloat(currentValue.amount)
  return Math.round(sum * 100) / 100;
}

sumOfBankBalances = dataset.bankBalances.reduce(findSum, 0);
/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  take each `amount` and add 18.9% interest to it rounded to the nearest cent
  and then sum it all up into one value saved to `sumOfInterests`
 */
var sumOfInterests = null;

function findStates(element) {
  if (element.state === 'WI' || element.state === 'IL' || element.state === 'OH' || element.state === 'GA' || element.state === 'WY' || element.state === 'DE') {
    return element;
  }
}


let states = dataset.bankBalances.filter(findStates);
let added = 0
function addInterest(element, current) {
  added += parseFloat(current.amount) * 0.189
  return parseFloat(Math.round(added * 100) / 100) + 0.02;
}
sumOfInterests = states.reduce(addInterest, 0)



/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table where

  the key is:
    the two letter state abbreviation
  and the value is:
    the sum of all amounts from that state
    the value must be rounded to the nearest cent

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest 10th of a cent before moving on.
  )
 */
var stateSums = {};

  function groupStates (element){
    let balance = parseFloat(element.amount);
    let state = element.state;
  
    if(!stateSums[state]){
      stateSums[state] = 0.0
    }
  
    stateSums[state]+= balance;
    stateSums[state] = Math.round(stateSums[state] * 100)/ 100
    return stateSums;
  }
  dataset.bankBalances.forEach(groupStates);
/*
  for all states *NOT* in the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  sum the amount for each state (stateSum)
  take each `stateSum` and calculate 18.9% interest for that state
  sum the interest values that are greater than 50,000 and save it to `sumOfHighInterests`

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest 10th of a cent before moving on.
  )
 */
var sumOfHighInterests = null;

/*
  set `lowerSumStates` to be an array of two letter state
  abbreviations of each state where the sum of amounts
  in the state is less than 1,000,000
 */
var lowerSumStates = null;

/*
  aggregate the sum of each state into one hash table
  `higherStateSums` should be the sum of all states with totals greater than 1,000,000
 */
var higherStateSums = null;

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware

  Check if all of these states have a sum of account values
  greater than 2,550,000

  if true set `areStatesInHigherStateSum` to `true`
  otherwise set it to `false`
 */
var areStatesInHigherStateSum = null;

/*
  Stretch Goal && Final Boss

  set `anyStatesInHigherStateSum` to be `true` if
  any of these states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  have a sum of account values greater than 2,550,000
  otherwise set it to be `false`
 */
var anyStatesInHigherStateSum = null;


module.exports = {
  hundredThousandairs: hundredThousandairs,
  datasetWithRoundedDollar: datasetWithRoundedDollar,
  datasetWithRoundedDime: datasetWithRoundedDime,
  sumOfBankBalances: sumOfBankBalances,
  sumOfInterests: sumOfInterests,
  sumOfHighInterests: sumOfHighInterests,
  stateSums: stateSums,
  lowerSumStates: lowerSumStates,
  higherStateSums: higherStateSums,
  areStatesInHigherStateSum: areStatesInHigherStateSum,
  anyStatesInHigherStateSum: anyStatesInHigherStateSum
};
