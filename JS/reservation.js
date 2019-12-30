//constructor appelé sur Div_resa dans app.js
class ReservationManager {
  constructor(reservation_box_id) {
    this.reservation_box_id = reservation_box_id;
    this.nomStation = undefined;
    this.surname = undefined;
    this.name = undefined;
    this.address = undefined;
    this.EndReservation = undefined;// heure de fin de la reservation
    this.firmBox = undefined; //ex DivForm
    this.firm = undefined; // signature
    this.userFormContainer = document.getElementById(reservation_box_id) // ex divResa
    this.userForm = document.getElementById("form2")
    this.intervalId = undefined;
    this.counterReservation = document.getElementById("compteurReservation");
    this.addressInfosResa = document.getElementById("adresseInfosresa");
    this.timeOut = undefined;
    this.stationChoisie = undefined;
    this.localName=undefined;
    this.localSurname = undefined;
    this.sectionInfosResa = document.getElementById("infosResa");
    this.label = document.getElementById("label");
    this.addListener();
    //this.retrieveReservation();
  }

  // addlistener pour faire apparaître le canvas, déclaré dans App.js L 25
  addListener() {
    this.userForm.addEventListener("submit", (e)=> {
      this.divForm = document.getElementById("div_form");
      this.divResa = document.getElementById("div_resa");
      e.preventDefault();
      this.name = this.userForm.elements.prenom_utilisateur.value;
      this.surname = this.userForm.elements.nom_utilisateur.value;
      this.address = document.getElementById("adresse").textContent;
      // ajout des parametres du nom de la station
      //this.nomStation = document.getElementById("nomStation").textContent;
      // si les champs nom et prénom sont remplis, apparition du canvas
      if (this.surname.length > 0 && this.name.length > 0) {
        this.firmBox = new Firm(this.reservation_box_id)
        this.divForm.style.height = "460px";
        this.divForm.style.top = "calc(50% - 260px)";
        this.divResa.style.textAlign = "center";
      }
      //ceci vide la div de confirmationRésa lorsque le compteur est à 0
      document.addEventListener("timerEnded",this.clearReservation.bind(this))
      })
      //addlistener pour écouter le canvas à l'aide l'evènement personnalisé
      document.addEventListener("firmedEvent",()=>{
        this.setReservation()
      });
    }//fermeture addlisteners

// fonction pour remettre à zero les formulaires , appelée
    resetForms(){
           document.getElementById("infosResa").style.display = "none";
           this.divResa.innerHTML="";
           this.divResa.style.textAlign = "center";
           this.divResa.appendChild(this.userForm);
           this.userForm.elements.prenom_utilisateur.value ="";
           this.userForm.elements.nom_utilisateur.value ="";
           // ces variables sont reprises de app.js aux lignes 71 et suivantes
           // A l'expiration du décompte, on vide également le formulaire de détail de la station
           adresse.textContent = "";
           places.textContent = "";
           velos.textContent = "";
     };

    setReservation(){
      //console.log("event ecouté")
          const blank = document.createElement("canvas");// creation d'un canvas vide, à comparer au canvas de mon appli
          blank.width = this.firmBox.canvas.width;
          blank.height = this.firmBox.canvas.height;
          // rajout d'une condition pour obliger à selectionner un marqueur Leaflet
          if (adresse.textContent ===""){
            this.label.style.borderColor = "red";
            this.label.style.borderWidth = "2px";
            this.label.style.borderStyle = "solid";
            alert("N'oubliez pas de selectionner une station");
          }else{
            this.label.style.borderColor = "transparent";
          }// comparaison du canvas avec le canvas de reference blanc
          if (blank.toDataURL() === this.firmBox.canvas.toDataURL()) {
            alert("N'oubliez pas de signer votre réservation"); // Message en cas de canvas vide
          }else{
            localStorage.setItem("name", this.name);
            localStorage.setItem("surname", this.surname)
            // on fait réapparaitre la div de confirmation de résa qui a été masquée en app.js ligne 2
              document.getElementById("infosResa").style.display = "block";
            // fonction pour déduire le temps écoulé et l'afficher dans la sectionInfosResa
            this.endReservation =  Date.now()+ 5000;
              //stocker le nom de la station choisie et l'heure de fin de la résa
            this.timeOut = sessionStorage.setItem("timeOut", this.endReservation);
            this.stationChoisie = sessionStorage.setItem("stationChoisie", this.nomStation)
            //this.affichageSectionInfosResa();
            this.countdown();
            }
    }

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
        //this.addressInfosResa.textContent= sessionStorage.getItem("stationChoisie")
      } else { //s'arrete à 0, on dispache un customEvent et on l'ecoute dans les addListener
        // le contenu de timerEnded est defini ligne 46 comme étant la fonction clearReservation
          let event = new Event(timerEnded,{
          bubbles:true
          });
          document.dispatchEvent(event);
        }
    }, 1000);
  }
  //faire réapparaître la div section infosResa etlui imputer les infos de la résa


  //Pour ré-initialiser la div d'information de reservation  une fois le temps écoulé
  clearReservation() {
    //on clear pour cesser d'appeler le timer
    clearInterval(this.intervalId)
    this.sectionInfosResa.innerHTML = "";
    // on enlève le stockage des donnée et le décompte
    sessionStorage.removeItem("tempsEcoulé");
    sessionStorage.removeItem("stationChoisie");
    // on fait apparaître un message d'expiration
    var messageExpiration = document.createElement("h2");
    this.sectionInfosResa.appendChild(messageExpiration)
    messageExpiration;
    messageExpiration.textContent = "Votre réservation a expiré";
// Esnuite, on peut remettre les formulaires de résa  en dehors de l'intervalle que l'on a arrêté préalablement
    setTimeOut( ()=>{
      this.resetForms()
    },2000)
  }

  retrieveReservation(){
    //Mise en place d'une condition ternaire, voir si on a des elements dans le session storage
    this.nomStation = sessionStorage.getItem("stationChoisie")?sessionStorage.getItem("stationChoisie"):undefined;
   this.counterReservation= sessionStorage.getItem("timeOut")?sessionStorage.getItem("timeOut"): undefined
    this.surname = localStorage.getItem("surname")?localStorage.getItem("surname"):undefined;
    this.name = localStorage.getItem("name")?localStorage.getItem("name"):undefined;
if(this.surname!== undefined && this.name!==undefined){
  document.getElementById("prenom_utilisateur").value =this.surname;
  document.getElementById("nom_utilisateur").value = this.name;
}
if(this.nomStation!==undefined && this.counterReservation!==undefined){
  this.affichageSectionInfosResa()
}
  }

  affichageSectionInfosResa() {
    document.getElementById("infosResa").style.display = "block";
    this.addressInfosResa.textContent = sessionStorage.getItem("stationChoisie")
    this.compteurReservation.textContent = sessionStorage.getItem("timeOut");

  }


}
