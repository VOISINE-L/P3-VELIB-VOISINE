//constructor appelé sur Div_resa dans app.js
class ReservationManager {
  constructor(reservation_box_id) {
    this.reservation_box_id = reservation_box_id
    this.nomStation = undefined;
    this.surname = undefined;
    this.address = undefined;
    this.name = undefined
    this.nomStation = undefined;
    this.EndReservation = undefined;
    this.firmBox = undefined; //ex DivForm
    this.firm = undefined; // signature
    this.userFormContainer = document.getElementById(reservation_box_id) // ex divResa
    this.userForm = document.getElementById("form2") // ex form2
    this.counterReservation = document.getElementById("compteurReservation")
    this.addressInfosResa = document.getElementById("adresseInfosresa")
    this.countDown = undefined;
    var timeOut = undefined
    var stationChoisie = undefined;
    this.addListener();

  }

  // addlistener pour faire apparaître le canvas, déclaré dans App.js L 25
  addListener() {

    this.userForm.addEventListener("submit", (e) => {
      this.divForm = document.getElementById("div_form");
      this.divResa = document.getElementById("div_resa");
      e.preventDefault()
      this.name = this.userForm.elements.prenom_utilisateur.value;
      this.surname = this.userForm.elements.nom_utilisateur.value;
      this.address = document.getElementById("adresse").textContent;
      // ajout des parametres du nom de la station
      this.nomStation = document.getElementById("nomStation").textContent;
      console.log("surname", this.surname);
      console.log("name", this.name);
      console.log(this)
      if (this.surname.length > 0 && this.name.length > 0) {
        this.firmBox = new Firm(this.reservation_box_id)
        this.divForm.style.height = "460px";
        this.divForm.style.top = "calc(50% - 260px)"
        this.divResa.style.textAlign = "right"
      }
    })
  } //fermeture addlistener
  countdown() {
    //Rajout de 20mn à l'heure de début de réservation
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
  clearReservation() {
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

  document.addEventListener("firmedEvent", () => {
        const blank = document.createElement('canvas');
        if ((blank.width = canvas.width) && (blank.height = canvas.height)) {
          return canvas.toDataURL() === blank.toDataURL();
          alert('Veuillez signer votre réservation'); // Message en cas de canvas vide
          //et dispatcher l'event firm
        } else {
          // fonction pour déduire le temps écoulé et l'afficher dans la sectionInfosResa
          this.timeOut = sessionStorage.setItem("timeOut", this.endReservation);
          //stocker le nom de la station choisie et l'heure de la résa
          this.stationChoisie = sessionStorage.setItem("stationChoisie", this.station)
          document.getElementById("infosResa").style.display = "block";
          this.affichageSectionInfosResa().bind(this);
          this.countdown().bind(this);
          }

  }
}
