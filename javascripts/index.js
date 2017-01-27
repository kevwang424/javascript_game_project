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
    let indexOfChild = this.checkPosition(columnToDrop)
    if(indexOfChild != undefined){
      columnToDrop.get(0).childNodes[indexOfChild].innerHTML = player
      }
    return indexOfChild
  }

  checkPosition(columnCheck){

    var position

    $.each(columnCheck.children('.position'),function(i,positionDiv){
      if (positionDiv.innerHTML == 'O'){
        position = i
      }
    })
    return position
  }

}
//  var weNeedThisValue = this.checkPosition
//
//  if (weNeedThisValue != undefined)
// update token
// else
// nothing

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

  render(){
    this.initialToken()
    this.dropRow.forEach(function(hiddenRow, i){
      $('#board').append(`<div class = "hidden-column" id = "hidden-column-${i}">${hiddenRow}</div>`)
    })
    this.eventHandlers()
  }

  checkVerticalWin(column){
      var count = 0
      var player = this.token
      $.each($(`#column-${column}`).children('.position'),function(i,positionDiv){
        if (positionDiv.innerHTML == player && count < 3){
          count = count+1 
        }
        else if (positionDiv.innerHTML != player){
          player = positionDiv.innerHTML
          count = 0
        }
        else if (count == 3){
          alert("You WIN!")
        }
      })
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

        var player = this.token
        var undef = this.board.placePiece(position, player)

        if (undef != undefined){
          this.updateCurrentPlayer(position)

        } else {
          alert("Please select another column!")
        }
      }
      this.checkVerticalWin(position)
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



  checkHorizontalWin(){

  }

  //logic to see what player is first

  //check for win


}
