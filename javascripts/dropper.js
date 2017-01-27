

//function to listen to right or left
//listen to reach to spacebar grab the column id and then changes the color of the token

class Dropper {

  constructor(){
    this.dropRow = ["H", "H", "H", "H", "H", "H", "H"]
    // this.token = "P"
  }

  // tokenPlace(this.dropRow){
  //     this.dropRow[0] = this.token
  // }

  render(){

    // tokenPlace(this.dropRow)

    this.dropRow.forEach(function(hiddenRow, i){
      $('#board').append(`<div class = "hidden-column" id = "hidden-column-${i}">${hiddenRow}</div>`)
    })
  }

  //return index of element
    //

}
