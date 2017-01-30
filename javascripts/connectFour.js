class ConnectFour {

  constructor(){
    this.board = new Board()
    this.dropper = new Dropper(this.board)
  }

  render(){
    this.dropper.render(this.checkVerticalWin.bind(this), this.checkHorizontalWin.bind(this), this.checkDiagonalWin.bind(this))
    this.board.render()
  }


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
          var answer = confirm(`${player} has vertical win!\n Do you want to start a new game?`)
          if (answer == true){
            window.location.reload()
          }
        }
      }
    }

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
        var answer = confirm(`${player} has horizontal win!\n Do you want to start a new game?`)
        if (answer == true){
          window.location.reload()
        }
      }
    }

    var topRows = [columns[0][0],columns[1][0],columns[2][0],columns[3][0],columns[4][0],columns[5][0],columns[6][0]]
    if (topRows.every(function(element){
    return element != "O"})){
      alert('No player won the game.\nStarting a new game.')
      window.location.reload()
    }

  }


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
        var answer = confirm(`${player} has diagonal win!\n Do you want to start a new game?`)
        if (answer == true){
          window.location.reload()
        }
      }
    }
  }
}
