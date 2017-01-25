class Board {
  constructor(){
    this.positions = ["O", "O", "O", "O", "O", "O", "O","O", "O", "O", "O", "O", "O", "O","O", "O", "O", "O", "O", "O", "O","O", "O", "O", "O", "O", "O", "O","O", "O", "O", "O", "O", "O", "O","O", "O", "O", "O", "O", "O", "O"]
  }

  render(){
    debugger
    this.positions.forEach(function(position, i){
      $('#board').append(`<div class="rectangle" id="${i}">${position}</div>`)
    })
  }

}
