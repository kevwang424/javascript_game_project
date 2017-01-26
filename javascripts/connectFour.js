class ConnectFour {

  constructor(){
    this.board = new Board()
    this.dropper = new Dropper()
    this.turnCount = 0
  }

  render(){
    this.dropper.render()
    this.board.render()

  }
  //logic for finding four in a row

  //logic to see what player is first
  currentPlayer(){
    if (this.turnCount % 2 === 0){
      return "Re"
    }
    else {
      return "Bl"
    }
  }

  //check for win


}
