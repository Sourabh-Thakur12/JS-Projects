//!  functions of Slot Machine
//  1. Deposit Some Money.
//  2. Select the No. lines to bet on.
//  3. Collect Bet amount.
//  4. Spin the slot Machine. 
//  5. Check if user won. 
//  6. Give User their money. 
//  7. Play Again.

//  for taking input.
const prompt = require("prompt-sync")();

const ROWS = 3
const COLS = 3

const SYMBOLS_COUNT = {
    "A" : 2,
    "B" : 4,
    "C" : 6,
    "D" : 8
}
const SYMBOL_VALUES = {
    "A" : 5,
    "B" : 4,
    "C" : 3,
    "D" : 2
}

//  1. Deposit Some Money.
const Deposit = () =>{
    while (true) {
    const depositAmount = prompt("Deposit some cash to play: ");
    const depositAmountNumber = parseFloat(depositAmount);
    
    if (isNaN(depositAmountNumber) || depositAmountNumber<=0) {
        console.log("Invalid Deposit Amount. Try again");
    }else{
        return depositAmountNumber;
    }
}
}

//  2. Select the No. lines to bet on.
const getNumberOfLines = () =>{
    while (true) {
    const lines = prompt("Select Number of Lines to Bet on(1-3): ");
    const numberOfLines = parseFloat(lines);
    
    if (isNaN(numberOfLines) || numberOfLines<=0 || numberOfLines>3) {
        console.log("you Can only select upto 3 lines. Try again!");
    }else{
        return numberOfLines;
    }
}
}

//  3. Collect Bet amount.
const getBet = (balance, lines) => {
    const validBet = balance/lines;
    console.log("You can bet upto: " + validBet)
    while (true) {
        const bet = prompt("Place your bet per line: ");
        const numberBet = parseFloat(bet);
        if (isNaN(numberBet) || numberBet<=0 || numberBet> balance/lines ) {
            console.log("insufficient balance!");
        }else{
            return numberBet;
        }
    }
}

//  4. Spin the slot Machine.
const spin = () => {

    // adding elements to slot machine
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol)
        }
    }

    // randomising slot machine
    const reels = []
    for (let i = 0; i < COLS; i++) {
        reels.push([])
        const reelSymbols = [...symbols]
             for (let j = 0; j < ROWS; j++) {
                const randomIndex = Math.floor(Math.random() * reelSymbols.length)
                const selectedSymbol = reelSymbols[randomIndex]
                reels[i].push(selectedSymbol)
                reelSymbols.splice( randomIndex, 1)
             }
    }
    return reels;
}

// correctly ording rows 
const transpose = (reels) => {
      const rows = [];

      for (let i = 0; i < ROWS; i++) {
        rows.push([])
        for (let j = 0; j< COLS; j++) {
            rows[i].push(reels[j][i])
        }
      }
      return rows;
}

// designing the slotMachine
printMachine = (rows) => {
    for (const row of rows) {
        let rowString = ""
        for (const [i, symbol] of row.entries()) {
            rowString += symbol
            if (i != row.length - 1) {
                rowString += " | "   
            }
        }
        console.log(rowString)
    }
    return rows;
}

//  5. Check if user won.
const getWinnings = (rows, bet, lines) =>{
    let winnings = 0;

    for(let row = 0; row<lines; row++){
        const symbols = rows[row]
        let allSame = true

        for (const symbol of symbols) {           
            if (symbol != symbols[0]) {
                allSame = false
                break;
            }
        }

        if (allSame) {
            winnings += bet * SYMBOL_VALUES[symbols[0]]
        }
    }
    return winnings
}

//  6. Give User their money.
//  7. Play Again.
const game = () =>{
    let balance = Deposit();

    while(true){
        console.log("YOu have RS." + balance)
    const numberOfLines = getNumberOfLines();
    const bet = getBet(balance, numberOfLines);
    balance -= bet * numberOfLines
    const reels =spin();
    const rows = transpose(reels);
    printMachine(rows);
    const winnings = getWinnings(rows, bet, numberOfLines)
    balance += winnings
    console.log("You Won RS." + winnings.toString())

    if (balance <= 0) {
        console.log("Unfortunately you are broke")
        break;
    }
    const playAgain = prompt("DO you want to keep pushing your luck (y/n)?")
    if(playAgain != 'y') break;
    }
}
game();