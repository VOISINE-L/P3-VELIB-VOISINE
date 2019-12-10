//constructor appelé sur Div_resa dans app.js
class ReservationManager {
  constructor(reservation_box_id) {
    this.reservation_box_id = reservation_box_id;
    this.nomStation = undefined;
    this.surname = undefined;
    this.address = undefined;
    this.name = undefined;
    this.EndReservation = undefined;
    this.firmBox = undefined; //ex DivForm
    this.firm = undefined; // signature
    this.userFormContainer = document.getElementById(reservation_box_id) // ex divResa
    this.userForm = document.getElementById("form2")
    this.intervalId = undefined;
    this.counterReservation = document.getElementById("compteurReservation")
    this.addressInfosResa = document.getElementById("adresseInfosresa")
    this.countDown = undefined;
    this.timeOut = undefined;
    this.stationChoisie = undefined;
      this.sectionInfosResa = document.getElementById("infosResa");
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
      if (this.surname.length > 0 && this.name.length > 0) {
        this.firmBox = new Firm(this.reservation_box_id)
        this.divForm.style.height = "460px";
        this.divForm.style.top = "calc(50% - 260px)"
        this.divResa.style.textAlign = "right"
      }
    })
    // addlistener pour écouter le canvas à l'aide de l'evenement personnalisé -firmedEvent déclaré dans firm
    document.addEventListener("firmedEvent", () => {
      //console.log("event ecouté")
          const blank = document.createElement("canvas");// creation d'un canvas vide, à comparer au canvas de mon appli
          blank.width = this.firmBox.canvas.width;
          blank.height = this.firmBox.canvas.height;
          if (blank.toDataURL() == this.firmBox.canvas.toDataURL()) {
            alert('Veuillez signer votre réservation'); // Message en cas de canvas vide
            //et dispatcher l'event firmedEvent
          } else {
            // on fait réapparaitre la div de confirmation de résa qui a été masquée en app.js ligne 2
              document.getElementById("infosResa").style.display = "block";
            // fonction pour déduire le temps écoulé et l'afficher dans la sectionInfosResa
            this.endReservation =  Date.now()+ 5000;
            this.timeOut = sessionStorage.setItem("timeOut", this.endReservation);
            //stocker le nom de la station choisie et l'heure de la résa
            sessionStorage.setItem("stationChoisie", this.nomStation)
            this.affichageSectionInfosResa();
            this.countdown();

            }
    });

  } //fermeture addlistener

  // Ceci enlève le canvas et  remet les formulaires details de la station et utilisateur à blanc
  resetForms(){
        document.getElementById("infosResa").style.display = "none";
        this.divResa.innerHTML="";
        this.divResa.style.textAlign = "center";
        this.divResa.appendChild(this.userForm);
        this.userForm.elements.prenom_utilisateur.value ="";
        this.userForm.elements.nom_utilisateur.value ="";
        // ces variables sont reprises de app.js aux lignes 71 et suivantes
        // A l'expiration du décompte, on vide également le formulaire de détail de la station
        adresse.textContent = ""
        places.textContent = ""
        velos.textContent = ""
        nomStation.textContent = ""

  }
   /*initialStateForms(){
        document.getElementById("infosResa").style.display = "none";
        this.divResa.innerHTML="";
        this.divResa.style.textAlign = "center";
        this.divResa.appendChild(this.userForm);
        this.surname;
        this.name;
        // A l'expiration du décompte, on vide également le formulaire de détail de la station
        //adresse.textContent = this.station.address;
        //places.textContent = param.placesDispo
        //velos.textContent = param.velosDispo
        //nomStation.textContent = param.nomStation
  }*/

  countdown() {
    //Rajout de 20mn à l'heure de début de réservation
    this.intervalId = setInterval(()=> { //	lance la function à executer chaque seconde
      var currentHour =Date.now();
      //Décompte de EndReservation (temps actuel + 20mn) - heure actuelle), ce qui fait 20 mn
      var decompte = Math.floor((sessionStorage.getItem("timeOut") - currentHour) / 1000);
      //console.log(decompte);
      if (decompte > 0) {
        //math floor pour renvoyer au plus grand entier issu du calcul
        var minutes = Math.floor(decompte % 3600 / 60);
        var seconds = Math.floor(decompte % 60);
        // pour rajouter un zéro lorsque le décompte devient un chiffre
        if (minutes < 10) {
          minutes = ("0" + minutes);
        }
        if (seconds < 10) {
          seconds = ("0" + seconds);
        }
        // ajout de ces informations dans la section HTML
        this.counterReservation.textContent = minutes + 'mn' + seconds + 's ';
      } else { //s'arrete à 0
      // Ceci vide la div de confirmation Résa lorsque le compteur est à 0 et affiche le message d'expiration
        this.clearReservation()
        this.resetForms()
        console.log("1")
        }
    }, 1000);
      //this.initialStateForms()
  }
  //faire réapparaître la div section infosResa etlui imputer les infos de la résa
  affichageSectionInfosResa() {
    document.getElementById("infosResa").style.display = "block";
    this.addressInfosResa.textContent = sessionStorage.getItem("stationChoisie")
  }

  //Pour ré-initialiser la div d'information de reservation  une fois le temps écoulé
  clearReservation() {
    console.log("2")

    this.sectionInfosResa.innerHTML = ""
    // on enlève le stockage des donnée et le décompte
    sessionStorage.removeItem("tempsEcoulé");
    sessionStorage.removeItem("stationChoisie");
    var messageExpiration = document.createElement("h2");
    this.sectionInfosResa.appendChild(messageExpiration)
    messageExpiration.textContent = "Votre réservation a expiré";
  }
}
