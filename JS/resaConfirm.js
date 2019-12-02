//constructor appelé sur Div_resa dans app.js
class ResaConfirm {
  constructor(parentid) {
    this.parent = document.getElementById(parentId);
    this.station = station.name
    this.surname = undefined;
    this.name = undefined;
    this.endReservation = undefined;
    this.counterReservation = document.getElementById("compteurReservation")
    this.addressInfosResa = document.getElementById("adresseInfosresa")
    this.countDown = undefined;
    var timeOut = undefined
    var stationChoisie = undefined;
    this.buttonCanvas = document.getElementById("set")
    this.addlistenerButtonCanvas()

  }

  //stocker le nom de la station choisie et l'heure de la résa
  addlistenerButtonCanvas() {
    console.log(toto)
    this.timeOut = sessionStorage.setItem("timeOut", this.endReservation);
    this.stationChoisie = sessionStorage.setItem("stationChoisie", this.station)
    document.getElementById("infosResa").style.display = "block";
    if (this.canvas.content === "") {
      alert('Veuillez signer votre réservation'); // Message en cas de canvas vide
    } else {
      this.buttonCanvas.addEventListener("click", function(e) {

        this.affichageSectionInfosResa().bind(this);
        this.countdown().bind(this);

      })
    }
  }
  // fonction pour déduire le temps écoulé et l'afficher dans la sectionInfosResa
  countdown = function() {
    //Rajout de 20mn à l'heure de début de réservation
    console.log("tata")
    this.intervalId = setInterval(function() { //	lance la function à executer chaque seconde
      var currentHour = new Date();
      var decompte = Math.floor((sessionStorage.getItem(this.timeOut) - currentHour.getTime()) / 1000);
      if (decompte > 0) {
        //% pour afficher des entiers
        var minutes = Math.floor(decompte % 3600 / 60);
        var seconds = Math.floor(decompte % 60);
        if (minutes < 10) {
          minutes = ("0" + minutes);
        }
        if (seconds < 10) {
          seconds = ("0" + seconds);
        }
        this.counterReservation.textContent = sessionStorage.getItem("timeOut") + minutes + 'mn' + secondes + 's ';
      } else { //s'arrete a 0
        this.clearReservation();

      }
    }, 1000);
  }
  affichageSectionInfosResa() {
    //faire réapparaître la div section infosResa etlui imputer les infos de la résa
    document.getElementById("infosResa").style.display = "block";
    this.station = station.name;
    this.addressInfosResa.textContent = sessionStorage.getItem("stationChoisie")
  }
  //Pour ré-initialiser une fois le temps écoulé
  clearReservation = function() {
    var sectionInfosResa = document.getElementById("infosResa");
    sectionInfosResa.innerHTML = ""
    var messageExpiration = document.createElement("h2");
    MessageExpiration.textContent = "Votre réservation a expiré";
    sectionInfosResa.appendChild(messageExpiration)
    // on enlève le stockage des donnée et le décompte
    sessionStorage.removeItem("tempsEcoulé");
    sessionStorage.removeItem("stationChoisie");
    clearInterval(this.countDown);
  }
  addlistenerButtonCanvas()
}
