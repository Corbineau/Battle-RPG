


function Character(name, healthPoints, baseAttackPower, id, healthDiv) {
    this.charName = name;
    this.healthPoints = healthPoints;
    this.baseAttackPower = baseAttackPower;
    this.attackPower = baseAttackPower;
    this.id = id;
    this.healthDiv = healthDiv;
}

function Opponent(name, healthPoints, counterAttackPower, healthDiv) {
    this.charName = name;
    this.healthPoints = healthPoints;
    this.counterAttackPower = counterAttackPower;
    this.healthDiv = healthDiv;
}



var game = {
    gameOn: false,
    player: "",
    activeOpponent: "",
    availableOpponents: 3,
    oppHandle: "",
    resetChars: "",




    gameStart: function (charId, healthDiv) {
        //start the game
        this.gameOn = true;
        console.log(this.gameOn);
        this.resetChars = $("#charset").clone();
        //set the character; add constructor logic; move the image to the battlefield
        if (charId === "dw") {
            this.player = new Character("Dungeon World", 289, 30, charId, healthDiv);
            var charImg = $("#1w").detach();
            charImg.appendTo("#player");
        } else if (charId === "fate") {
            this.player = new Character("Fate", 520, 25, charId, healthDiv);
            var charImg = $("#3w").detach();
            charImg.appendTo("#player");
        } else if (charId === "paranoia") {
            this.player = new Character("Paranoia", 333, 45, charId, healthDiv);
            var charImg = $("#2w").detach();
            charImg.appendTo("#player");
        } else if (charId === "dnd") {
            this.player = new Character("Dungeons & Dragons", 751, 7, charId, healthDiv);
            var charImg = $("#4w").detach();
            charImg.appendTo("#player");
        }
        console.log(this.player);
        //change the game message to ask player to pick an opponent
        $("#charMessage").text("Choose your opponent.");

    },

    setOppponent: function (oppId, healthDiv) {
        //check to make sure the player hasn't clicked themselves.
        if (oppId != this.player.id) {
            //set the active opponent; add constructor logic
            if (oppId === "dw") {
                this.activeOpponent = new Opponent("Dungeon World", 289, 70, healthDiv);
                this.oppHandle = $("#1w").detach();
            } else if (oppId === "paranoia") {
                this.activeOpponent = new Opponent("Paranoia", 520, 30, healthDiv);
                this.oppHandle = $("#2w").detach();
            } else if (oppId === "fate") {
                this.activeOpponent = new Opponent("Fate", 333, 19, healthDiv);
                this.oppHandle = $("#3w").detach();
            } else if (oppId === "dnd") {
                this.activeOpponent = new Opponent("Dungeons & Dragons", 751, 50, healthDiv);
                this.oppHandle = $("#4w").detach();
            }

        }
        //move the opponent to the battlefield
        this.oppHandle.appendTo("#opponent");
        //reduce the number of available opponents
        this.availableOpponents--;
        console.log(this.activeOpponent, `you have ${this.availableOpponents} left to fight.`);
        //change the game message to ready for battle
        $("#charMessage").text("Get ready for battle!");
        //add the attack button
        if ((oppId != this.player.id) && (document.querySelectorAll("#attack").length < 1)) {
            $("#gameMessage").append("<button id='attack'>attack!</button>");
        }
    },

    //fight!
    combat: function () {
        //enemy takes damage
        this.activeOpponent.healthPoints = (this.activeOpponent.healthPoints - this.player.attackPower);
        //If the opponent isn't dead, they can counterattack; update everyone's health
        if (this.activeOpponent.healthPoints >= 0) {
            this.activeOpponent.healthDiv.text(`hp: ${this.activeOpponent.healthPoints}`);
            this.player.healthPoints = (this.player.healthPoints - this.activeOpponent.counterAttackPower);
            this.player.healthDiv.text(`hp: ${this.player.healthPoints}`);
            //update attack power only if the opponent isn't dead
            this.player.attackPower = (this.player.attackPower + this.player.baseAttackPower);
        } else if (this.activeOpponent.healthPoints <= 0) {
            //avoid showing overkill
            this.activeOpponent.healthDiv.text("hp: 0");
        }

        console.log(this.player.attackPower);
    },
    //checks for the end of combat, and whether the game is over
    combatCheck: function () {
        if (this.player.healthPoints <= 0) {
            this.activeOpponent = "";
            this.player.healthDiv.text("hp: 0");
            $("#attack").attr("id", "restart").text("restart");
            $("#charMessage").text("You have chosen... poorly. Click restart to try again.");
        } else if ((this.activeOpponent.healthPoints <= 0) && (this.availableOpponents > 0)) {
            $(this.oppHandle).detach();
            this.activeOpponent = "";
            this.oppHandle = "";
            $("#charMessage").text("You must choose... your next opponent.");
        } else if ((this.activeOpponent.healthPoints <= 0)) {
            $(this.oppHandle).detach();
            this.activeOpponent = "";
            this.oppHandle = "";
            $("#attack").attr("id", "restart").text("restart");
            $("#charMessage").text("You have chosen... wisely. Click restart to play again!");
        }
    },

    gameInit: function () {
        this.gameOn = false;
        this.player = "";
        this.availableOpponents = 3;
        $(".charWrap").detach();
        $("button").remove();
        $("#charset").replaceWith(this.resetChars);
        this.resetChars= "";
       //location.reload(true);
       $("#charMessage").text("Choose again. Choose Wisely.");

    },
}

$(document).ready(function () {


    //choose the player character
    $(document).on("click", ".character", function () {
        if (game.gameOn === false) {
            var charId = $(this).attr("id");
            var healthDiv = $(`#${$(this).siblings('.hp').attr('id')}`);
            console.log(charId);
            console.log(healthDiv);
            game.gameStart(charId, healthDiv);
            //choose the active opponent
        } else if (game.activeOpponent === "") {
            var oppId = $(this).attr("id");
            var healthDiv = $(`#${$(this).siblings('.hp').attr('id')}`);
            game.setOppponent(oppId, healthDiv);

        }
    });
    //combat clicker
    $(document).on("click", "#attack", function () {
        game.combat();
        game.combatCheck();
    });

    //restart game
    $(document).on("click", "#restart", function () {
        game.gameInit();
        console.log("resetting", game);
    });

    //let startState = $(document).clone(true);

})

