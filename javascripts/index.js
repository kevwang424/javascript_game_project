$(document).ready(function(){
  let game = new ConnectFour()
  game.render()
})


class Board {
  constructor(){
    this.positions = [["O", "O", "O", "O", "O", "O"],["O", "O", "O", "O", "O", "O"],["O", "O", "O", "O", "O", "O"],["O", "O", "O", "O", "O", "O"],["O", "O", "O", "O", "O", "O"],["O", "O", "O", "O", "O", "O"],["O", "O", "O", "O", "O", "O"]]
  }

  //create the board and also initialize the dropper on the first

  render(){
    this.positions.forEach(function(row, i){
      $(`#hidden-column-${i}`).append(`<div class = "column" id = "column-${i}"></div>`)
      row.forEach(function(position, j){
        $(`#column-${i}`).append(`<div class= "position" id="${i}-${j}">${position}</div>`)
      })
    })
  }

  placePiece(colIndex, player){

    let columnToDrop = $(`#column-${colIndex}`)
    let indexOfChild = this.checkPosition(colIndex)

    if(indexOfChild != undefined){
      columnToDrop.get(0).childNodes[indexOfChild].innerHTML = player
      this.positions[colIndex][indexOfChild] = player
      }
    return indexOfChild
  }

  checkPosition(columnCheck){

    var pos
    $.each(this.positions[columnCheck],function(i,position){
      if (position == 'O'){
        pos = i
      }
    })
    return pos
  }

}

class Dropper {

  constructor(board){
    this.dropRow = ["H", "H", "H", "H", "H", "H", "H"]
    this.turnCount = 0
    this.token = this.currentPlayer(this.turnCount)
    this.board = board
  }

  initialToken(){
      this.dropRow[0] = this.token
  }

  currentPlayer(currentTurn){
    if (currentTurn % 2 === 0){
      this.token = "P1"
      return "P1"
    }
    else {
      this.token = "P2"
      return "P2"
    }
  }

  moveRight(){
    let position = this.dropRow.indexOf (this.token) //returns 0
    if (position < 6){
        this.dropRow[position] = "H"
        let newPosition = position + 1
        this.dropRow[newPosition] = this.token

        $(`#hidden-column-${newPosition}`).get(0).childNodes[0].nodeValue = this.token
        $(`#hidden-column-${position}`).get(0).childNodes[0].nodeValue = "H"
      }
  }

  moveLeft(){
    let position = this.dropRow.indexOf (this.token) //returns 0

    if (position > 0){
        this.dropRow[position] = "H"
        let newPosition = position - 1
        this.dropRow[newPosition] = this.token
        $(`#hidden-column-${newPosition}`).get(0).childNodes[0].nodeValue = this.token
        $(`#hidden-column-${position}`).get(0).childNodes[0].nodeValue = "H"
      }
  }

  dropToken(){
    return this.dropRow.indexOf(this.token)
  }

  updateCurrentPlayer(position){
    this.turnCount ++
    $(`#hidden-column-${position}`).get(0).childNodes[0].nodeValue = this.currentPlayer(this.turnCount)
    this.dropRow[position] = this.token
  }

  //render will now take in a method that will be a callback to the connectFour class
  //in the end there may be 3 callback methods it will take in to pass into eventHandlers
  render(verticalMethod, horizontalMethod, diagonalMethod){
    this.initialToken()
    this.dropRow.forEach(function(hiddenRow, i){
      $('#board').append(`<div class = "hidden-column" id = "hidden-column-${i}">${hiddenRow}</div>`)
    })
    //this method needs to be used in the eventHandlers after the spacebar has been pressed and token dropped
    this.eventHandlers(verticalMethod, horizontalMethod, diagonalMethod)
  }

  //now I need to set the callback
  eventHandlers(verticalMethod, horizontalMethod, diagonalMethod){

    $(document).on('keydown', function(e){
      if(e.which == 39){
        this.moveRight()
      }
      else if (e.which == 37){
        this.moveLeft()
      }
      else if (e.which == 32){
        var position = this.dropToken()

        var player = this.token
        var undef = this.board.placePiece(position, player)

        if (undef != undefined){
          this.updateCurrentPlayer(position)
          //this callback takes in the column index AND the player token
          verticalMethod(position, player)
          horizontalMethod(undef, player)
          //need to pass in player to check and the current board positions
          diagonalMethod(player, this.board.positions)
        } else {
          alert("Please select another column!")
        }
      }

    }.bind(this))
  }

}



class ConnectFour {

  constructor(){
    this.board = new Board()
    this.dropper = new Dropper(this.board)
  }

  render(){
    //passing this function as a callback into dropper class
    this.dropper.render(this.checkVerticalWin.bind(this), this.checkHorizontalWin.bind(this), this.checkDiagonalWin.bind(this))
    this.board.render()
  }

  //this method is passed into the Dropper class when it's rendered. I needed to bind it or else it'll lose the 'this'
  //it will take in the index that the dropper was on when space was clicked AND the player token that it was on
  checkVerticalWin(columnIndex, playerToken){
    var count = 0
    var player = playerToken
    //this is looking at only the column that was taken in
    var column = this.board.positions[columnIndex]

    for (var i = 0; i < 6; i++){
        if (column[i] == player && count < 3){
          count = count + 1
        }
        else if (column[i] != player){
          player = column[i]
          count = 1
        }
        else if (count == 3 && player != "O"){
          alert(`${player} has vertical win!`)
          //need to end the game
        }
      }
    }

  //takes in the row so i know which row to check since it is the same index across all columns
  checkHorizontalWin(rowIndex, playerToken){
    var count = 0
    var player = playerToken
    var columns = this.board.positions

    for (var i = 0; i < 7; i++){
      if (columns[i][rowIndex] == player && count < 3){
        count = count + 1
      }
      else if (columns[i][rowIndex] != player){
        player = columns[i][rowIndex]
        count = 1
      }
      else if (count == 3 && player != "O"){
        alert(`${player} has horizontal win!`)
      }
    }
  }


  //need to know the column and row to begin checking as well as the player token
  checkDiagonalWin(playerToken){
    var player = playerToken

    var diagonalMoves =
    //diagonals this way \
    [[this.board.positions[0][2], this.board.positions[1][3], this.board.positions[2][4], this.board.positions[3][5]],
    [this.board.positions[0][1], this.board.positions[1][2], this.board.positions[2][3], this.board.positions[3][4]],
    [this.board.positions[1][2], this.board.positions[2][3], this.board.positions[3][4], this.board.positions[4][5]],
    [this.board.positions[0][0], this.board.positions[1][1], this.board.positions[2][2], this.board.positions[3][3]],
    [this.board.positions[1][1], this.board.positions[2][2], this.board.positions[3][3], this.board.positions[4][4]],
    [this.board.positions[2][2], this.board.positions[3][3], this.board.positions[4][4], this.board.positions[5][5]],
    [this.board.positions[1][0], this.board.positions[2][1], this.board.positions[3][2], this.board.positions[4][3]],
    [this.board.positions[2][1], this.board.positions[3][2], this.board.positions[4][3], this.board.positions[5][4]],
    [this.board.positions[3][2], this.board.positions[4][3], this.board.positions[5][4], this.board.positions[6][5]],
    [this.board.positions[2][0], this.board.positions[3][1], this.board.positions[4][2], this.board.positions[5][3]],
    [this.board.positions[3][1], this.board.positions[4][2], this.board.positions[5][3], this.board.positions[6][4]],
    [this.board.positions[3][0], this.board.positions[4][1], this.board.positions[5][2], this.board.positions[6][3]],
    // diagonals this way /
    [this.board.positions[3][0], this.board.positions[2][1], this.board.positions[1][2], this.board.positions[0][3]],
    [this.board.positions[4][0], this.board.positions[3][1], this.board.positions[2][2], this.board.positions[1][3]],
    [this.board.positions[3][1], this.board.positions[2][2], this.board.positions[1][3], this.board.positions[0][4]],
    [this.board.positions[5][0], this.board.positions[4][1], this.board.positions[3][2], this.board.positions[2][3]],
    [this.board.positions[4][1], this.board.positions[3][2], this.board.positions[2][3], this.board.positions[1][4]],
    [this.board.positions[3][2], this.board.positions[2][3], this.board.positions[1][4], this.board.positions[0][5]],
    [this.board.positions[6][0], this.board.positions[5][1], this.board.positions[4][2], this.board.positions[3][3]],
    [this.board.positions[5][1], this.board.positions[4][2], this.board.positions[3][3], this.board.positions[2][4]],
    [this.board.positions[4][2], this.board.positions[3][3], this.board.positions[2][4], this.board.positions[1][5]],
    [this.board.positions[6][1], this.board.positions[5][2], this.board.positions[4][3], this.board.positions[3][4]],
    [this.board.positions[5][2], this.board.positions[4][3], this.board.positions[3][4], this.board.positions[2][5]],
    [this.board.positions[6][2], this.board.positions[5][3], this.board.positions[4][4], this.board.positions[3][5]]];



    function same(element){
      return element == player
    }

    for (var i = 0; i < diagonalMoves.length; i++){
      if (diagonalMoves[i].every(same)){
        alert(`${player} has diagonal win!`)
      }
    }
  }


}
