function character() {
    this.charName = name;
    this.healthPoints = healthPoints;
    this.attackPower = attackPower;
    this.counterAttackPower = counterAttackPower;
}

var game = {
    gameOn: false,
    player: "",
    activeOpponent: "",

    gameStart: $(".character").on("click", function() {
        var gameObject = this;
        gameObject.gameOn = true;
        console.log(gameObject.gameOn);

    }),
}