class Timer {
    constructor(buttonSet, buttonReset,compteurId1, compteurId2) {
        this.boutonSet = document.getElementById(buttonSet);
        this.boutonReset = document.getElementById(buttonReset)
        this.compteurMin = document.getElementById(compteurId1);
        this.compteurSec = document.getElementById(compteurId2);
        this.intervalle = null;


    }

    decrementerCompteur() {

        var nbSecondes = Number(this.compteurSec.textContent);
        var nbMinutes = Number(this.compteurMin.textContent);


        if ((nbSecondes === 0) && (nbMinutes != 0)) {
            nbSecondes = 59;
            nbMinutes--;
        }
        else if (nbSecondes != 0) {
            nbSecondes--
        }
        if ((nbSecondes === 0) && (nbMinutes === 0)) {
            clearInterval(this.intervalle);

        }

            this.compteurMin.textContent = nbMinutes;
            this.compteurSec.textContent = nbSecondes;


        //this.compteurElt.textContent=compteur+1;
    }

    addListeners() {
        this.boutonSet.addEventListener("click", () => {
            this.intervalle = setInterval(this.decrementerCompteur.bind(this), 1000);

        });

    this.boutonReset.addEventListener("click", () => {
            clearInterval(this.intervalle);
            this.boutonSet.INNERHTML = ""
             this.compteurMin.textContent = "20";
            this.compteurSec.textContent = "00";
        });

    }
}


    var chrono = new Timer("set", "reset", "compteurMinutes", "compteurSecondes");
    chrono.addListeners();
