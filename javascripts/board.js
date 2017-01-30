class Board {
  constructor(){
    this.positions = [["O", "O", "O", "O", "O", "O"],["O", "O", "O", "O", "O", "O"],["O", "O", "O", "O", "O", "O"],["O", "O", "O", "O", "O", "O"],["O", "O", "O", "O", "O", "O"],["O", "O", "O", "O", "O", "O"],["O", "O", "O", "O", "O", "O"]]
  }

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
