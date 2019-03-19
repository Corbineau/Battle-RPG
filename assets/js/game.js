function character(name, healthPoints, attackPower, counterAttackPower) {
    this.charName = name;
    this.healthPoints = healthPoints;
    this.attackPower = attackPower;
    this.counterAttackPower = counterAttackPower;
}

var game = {
    gameOn: false,
    player: "",
    activeOpponent: "",

    gameStart: function() {
        this.gameOn = true;
        this.player = new character();
        //change the game message to ask player to pick asn opponent

    },

    setOppponent: function() {

    },

    gameInit: function() {
        this.gameOn = false;
    },
}

$(document).ready(function(){

    $(".character").on("click", function(){
        if(game.gameOn === false) {
            game.gameStart();
        } else if(game.activeOpponent === "") {
            //run game method that sets the opponent
        } else {
            //run the combat method
            //check for combat end
        }
    })

})

