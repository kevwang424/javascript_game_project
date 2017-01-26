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

}
