//constructor appelé sur Div_resa dans app.js
class ReservationManager {
  constructor(reservation_box_id) {//instancié sur la div_resa en map.js, ligne 17 du constructor
    this.reservation_box_id = reservation_box_id;
    this.nomStation = undefined;
    this.surname = undefined;
    this.name = undefined;
    this.address = undefined;
    this.EndReservation = undefined; // Heure de fin de la reservation
    this.firmBox = undefined; //Ex DivForm
    this.firm = undefined; // Signature
    this.userFormContainer = document.getElementById(reservation_box_id); // Ex divResa
    this.userForm = document.getElementById("form2");
    this.intervalId = undefined;
    this.counterReservation = document.getElementById("compteurReservation");
    this.addressInfosResa = document.getElementById("adresseInfosresa");
    this.timeOut = undefined;
    this.stationChoisie = undefined;
    this.sectionInfosResa = document.getElementById("infosResa");
    this.label = document.getElementById("label");
    this.countdown;
    this.divResa = document.getElementById("div_resa");
    this.addListener();
    // appelé dès le début pour pouvoir vérifier la présence d'une résa en cours dans l'API WEBSTORAGE
    this.retrieveReservation();
  }
  // addlistener pour faire apparaître le canvas et écouter les evenements
  addListener() {
    this.userForm.addEventListener("submit", (e) => {
      this.divForm = document.getElementById("div_form");
      this.divResa = document.getElementById("div_resa");
      e.preventDefault();
      this.name = this.userForm.elements.prenom_utilisateur.value;
      this.surname = this.userForm.elements.nom_utilisateur.value;
      // si les champs nom et prénom sont remplis, apparition du canvas
      if (this.surname.length > 0 && this.name.length > 0) {
        //declenchement du canvas, instancié avec le gestionnaire de réservation  en map L17.
        this.firmBox = new Firm(this.reservation_box_id);
        this.divForm.style.height = "460px";
        this.divForm.style.top = "calc(50% - 260px)";
        this.divResa.style.textAlign = "center";
      } else {
        this.userForm.elements.prenom_utilisateur.style.backgroundColor = "red";
        this.userForm.elements.nom_utilisateur.style.backgroundColor = "red";
      }
    })// Fermeture du submit sur le form2
      //Evenement pour vider la div de confirmationRésa lorsque le compteur est à 0
    document.addEventListener("timerEnded", this.clearReservation.bind(this));
    //evènements pour écouter le canvas à l'aide l'evènement personnalisé créé dans
    // le fichier canvas .js, dans le setUpButtonCAnvas
    document.addEventListener("firmedEvent", () => {
      this.setReservation();
    });
  } //Fermeture addlisteners

  setReservation() {
    // Creation d'un canvas vide, à comparer au canvas de mon appli, ligne 74
    const blank = document.createElement("canvas");
    blank.width = this.firmBox.canvas.width;
    blank.height = this.firmBox.canvas.height;
    // rajout d'une condition pour obliger à selectionner un marqueur Leaflet
    let adresseOk = false;
    if (adresse.textContent === "") {
      this.label.style.borderColor = "red";
      this.label.style.borderWidth = "2px";
      this.label.style.borderStyle = "solid";
      alert("N'oubliez pas de selectionner une station");
    } else {
      adresseOk = true;
      this.label.style.borderColor = "transparent";
    } // Comparaison du canvas avec le canvas de reference blanc
    // Les canvas sont mis sous forme d'url de données pour être comparés.
    if (blank.toDataURL() !== this.firmBox.canvas.toDataURL() && adresseOk) {
      this.firmBox.buttonCanvas.style.display = "none";
      localStorage.setItem("name", this.name);
      localStorage.setItem("surname", this.surname);
      //On fait réapparaitre la div de confirmation de résa qui a été masquée en map.js ligne 2
      document.getElementById("infosResa").style.display = "block";
      // Fonction pour déduire le temps écoulé et l'afficher dans la sectionInfosResa
      this.endReservation = Date.now() + 1200000;
      //Stocker le nom de la station choisie et l'heure de fin de la résa
      this.timeOut = sessionStorage.setItem("timeOut", this.endReservation);
      this.nomStation = document.getElementById("nomStation").textContent;
      this.stationChoisie = sessionStorage.setItem("stationChoisie", this.nomStation)
      this.countdown();
      // Message en cas de canvas vide
    } else if (adresseOk) {
      alert("N'oubliez pas de signer votre réservation");
    }
    document.getElementById("annulation").addEventListener("click", () => {
      this.clearReservation()
    })
  }
  // Fonction pour remettre à zero les formulaires , appelée dans clearReservation
  resetForms() {
    document.getElementById("infosResa").style.display = "none";
    // enlever le canvas de la divResa
    this.divResa.innerHTML = "";
    this.divResa.style.textAlign = "center";
    //remettre le formulaire qui contient les champs nom et prénom
    this.divResa.appendChild(this.userForm);
    this.userForm.elements.prenom_utilisateur.value = "";
    this.userForm.elements.nom_utilisateur.value = "";
    // ces variables sont reprises de map.js aux lignes 71 et suivantes
    // A l'expiration du décompte, on vide également le formulaire de détail de la station
    nomStation.textContent = ""
    adresse.textContent = "";
    places.textContent = "";
    velos.textContent = "";
    //this.messageExpiration.textContent = "";
  };

  countdown() {
    //Rajout de 20mn à l'heure de début de réservation
    this.intervalId = setInterval(() => { //	lance la function à éxécuter chaque seconde
      //var currentHour = Date.now();
      // Affichage de la soustraction de la date enregistrée dans le local storage - la date au moment de l’exécution de la fonction
      //et le fait de lui avoir rajouté 1200000 secondes permet un compteur de temps relatif de 20mn.
      //en divisant par 1000, on met l'unité en secondes
      var decompte = Math.floor((sessionStorage.getItem("timeOut") - Date.now()) / 1000);
      if (decompte > 0) {
        //math floor pour renvoyer au plus grand entier issu du calcul
        // du reste de la divison du décompte en secondes par 3600, le tout divisé par 60 pour mettre en minutes
        var minutes = Math.floor(decompte % 3600/60);
        var seconds = Math.floor(decompte % 60);
        // pour rajouter un zéro lorsque le décompte devient un chiffre
        if (minutes < 10) {
          minutes = ("0" + minutes);
        }
        if (seconds < 10) {
          seconds = ("0" + seconds);
        }
        // Ajout de ces informations dans la section HTML
        this.counterReservation.textContent = minutes + 'mn' + seconds + 's ';
        this.addressInfosResa.textContent = sessionStorage.getItem("stationChoisie")
      } else { //s'arrete à 0, on dispache un customEvent et on l'ecoute dans les addListener
        // le contenu de timerEnded est defini ligne 49 comme étant la fonction clearReservation
        let event = new Event("timerEnded", {
          bubbles: true,
        });
        document.dispatchEvent(event);
      }
    }, 60);
  }

  clearReservation() {
    this.sectionInfosResa.style.display = "none";
    //On clear intervalId pour cesser d'appeler le timer
    this.intervalId = clearInterval(this.intervalId);
    // on enlève le stockage des données et le décompte
    sessionStorage.removeItem("timeOut");
    sessionStorage.removeItem("stationChoisie");
    this.surname = localStorage.getItem("surname") ? localStorage.getItem("surname") : "";
    this.name = localStorage.getItem("name") ? localStorage.getItem("name") : "";
    this.timeOut = sessionStorage.getItem("timeOut") ? sessionStorage.getItem("timeOut") : undefined;
    // Ensuite, on peut remettre les formulaires de résa  en dehors de l'intervalle que l'on a arrêté préalablement
    setTimeout(() => {
      this.resetForms()
    }, 2000)
  }

  retrieveReservation() {
    //Mise en place d'une condition ternaire, voir si on a des elements dans le session storage, sinon vaut undefined
    this.timeOut = sessionStorage.getItem("timeOut") ? sessionStorage.getItem("timeOut") : undefined;
    this.nomStation = sessionStorage.getItem("stationChoisie") ? sessionStorage.getItem("stationChoisie") : undefined;
    this.surname = localStorage.getItem("surname") ? localStorage.getItem("surname") : undefined;
    this.name = localStorage.getItem("name") ? localStorage.getItem("name") : undefined;
    if (this.surname !== undefined && this.name !== undefined) {
      document.getElementById("prenom_utilisateur").value = this.surname;
      document.getElementById("nom_utilisateur").value = this.name;
    }
    if (this.nomStation !== undefined && this.counterReservation !== undefined) {
      this.affichageSectionInfosResa();
    }
  }

  affichageSectionInfosResa() {
    document.getElementById("infosResa").style.display = "block";
    this.addressInfosResa.textContent = sessionStorage.getItem("stationChoisie");
    this.countdown();
    document.getElementById("annulation").addEventListener("click", () => {
      this.clearReservation()
    })
  }
}
