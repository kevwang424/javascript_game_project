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
    //whatever position we get back from the dropper we need to find the column
    let columnToDrop = $(`#column-${colIndex}`)

    //re-assigning the 'O' to the players piece
    columnToDrop.get(0).childNodes[0].innerHTML = player

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
    this.turnCount ++
    return this.dropRow.indexOf(this.token)
  }

  updateCurrentPlayer(position){
    $(`#hidden-column-${position}`).get(0).childNodes[0].nodeValue = this.currentPlayer(this.turnCount)
    this.dropRow[position] = this.token
  }

  render(){
    this.initialToken()
    this.dropRow.forEach(function(hiddenRow, i){
      $('#board').append(`<div class = "hidden-column" id = "hidden-column-${i}">${hiddenRow}</div>`)
    })
    this.eventHandlers()
  }

  eventHandlers(){

    $(document).on('keydown', function(e){
      if(e.which == 39){
        this.moveRight()
      }
      else if (e.which == 37){
        this.moveLeft()
      }
      else if (e.which == 32){
        var position = this.dropToken()
        //have to hold the player that dropped the piece before it's changed so i can pass to board
        var player = this.token
        this.updateCurrentPlayer(position)
        // we need to pass the index into the board and the player who dropped the piece
        this.board.placePiece(position, player)
      }
    }.bind(this))
  }

}



class ConnectFour {
///return value of   @dropper.token

  constructor(){
    this.board = new Board()
    this.dropper = new Dropper(this.board)
  }

  render(){
    this.dropper.render()
    this.board.render()
  }
  //logic for finding four in a row

  //logic to see what player is first

  //check for win


}
