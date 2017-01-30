class Dropper {

  constructor(board){
    this.dropRow = ["_", "_", "_", "_", "_", "_", "_"]
    this.turnCount = 0
    this.token = this.currentPlayer(this.turnCount)
    this.board = board
  }

  initialToken(){
      this.dropRow[0] = this.token
  }

  currentPlayer(currentTurn){
    if (currentTurn % 2 === 0){
      this.token = "🐶"
      return "🐶"
    }
    else {
      this.token = "🐱"
      return "🐱"
    }
  }

  moveRight(){
    let position = this.dropRow.indexOf (this.token) //returns 0
    if (position < 6){
        this.dropRow[position] = "_"
        let newPosition = position + 1
        this.dropRow[newPosition] = this.token

        $(`#hidden-column-${newPosition}`).get(0).childNodes[0].nodeValue = this.token
        $(`#hidden-column-${position}`).get(0).childNodes[0].nodeValue = "_"
      }
  }

  moveLeft(){
    let position = this.dropRow.indexOf (this.token) //returns 0

    if (position > 0){
        this.dropRow[position] = "_"
        let newPosition = position - 1
        this.dropRow[newPosition] = this.token
        $(`#hidden-column-${newPosition}`).get(0).childNodes[0].nodeValue = this.token
        $(`#hidden-column-${position}`).get(0).childNodes[0].nodeValue = "_"
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

  render(verticalMethod, horizontalMethod, diagonalMethod){
    this.initialToken()
    this.dropRow.forEach(function(hiddenRow, i){
      $('#board').append(`<div class = "hidden-column" id = "hidden-column-${i}">${hiddenRow}</div>`)
    })
    this.eventHandlers(verticalMethod, horizontalMethod, diagonalMethod)
  }

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
          verticalMethod(position, player)
          horizontalMethod(undef, player)
          diagonalMethod(player, this.board.positions)
        } else {
          alert("Please select another column!")
        }
      }
    }.bind(this))
  }

}
