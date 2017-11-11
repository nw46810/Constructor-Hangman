 function Letter(letterPassedIntoFunction) {
    this.character = letterPassedIntoFunction;
    this.appear = false;
    this.chooseCharacterToDisplay = function(){
        if (this.appear === true){
            return this.character;
        }else{
            return " _ "
        }
    }
};

exports.Letter = Letter;