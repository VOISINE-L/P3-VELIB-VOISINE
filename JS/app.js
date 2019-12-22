// Pour eviter à la div de confirmationde drésa d'apparaître avant le listener sur le bouton Canvas
document.getElementById("infosResa").style.display="none";

class App {
  /**
   *
   * @param {String} mapId
   * @param {Array[Double, Double]} mapCenter
   *
   * mapCenter is of [Latitud, Longitud]
   */
  constructor(mapId, mapCenter, icone) {
    this.carte = this.setMap(mapId, mapCenter);
    this.clusters = L.markerClusterGroup();
    this.icone = icone;
    this.form = document.getElementById("form1");
    this.form2 = document.getElementById("form2")
    this.divResa = document.getElementById("div_resa");
    this.divSectionCarte = document.getElementById("section_carte");
    this.divForm = document.getElementById("div_form");
    this.fermeture = document.createElement("div");
    this.imageFermeture = document.createElement("img");
    this.messageFermeture = document.createElement("button");
    this.reservationManager = new ReservationManager("div_resa");// on relie à Reservation.js, on appelle ligne 106

  }
  //Fonction pour déclarer la carte
  setMap(mapId, mapCenter) {
    var carte = L.map(mapId).setView(mapCenter, 13);
    L.tileLayer(' http://www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png', {
      minZoom: 12,
      maxZoom: 17,
      attribution: '&copy; Openstreetmap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(carte);
    return carte
  }
  //Fonction pour afficher les marqueurs
  setMarkersFromApi(url) {
    ajaxGet(url, (callback) => {
      //console.log(callback)
      let stations = JSON.parse(callback)
      for (const station of stations) {
        let marqueur = this.creerMarqueurCarte(station); //on récupère le marqueur pour la méthode addlistenersCarte Lesmarqueurs se créent
        this.addlistenersCarte(marqueur)
      }
    });
  }

  creerMarqueurCarte(station) {
    var marqueurCarte = L.marker([station.position.lat, station.position.lng], {
      icon: this.icone
    }) //.addTo(this.carte)//INUTILE REDONDANT AVEC LIGNE 308
    marqueurCarte.nomStation = station.name;
    marqueurCarte.velosDispo = station.available_bikes;
    marqueurCarte.placesDispo = station.available_bike_stands
    marqueurCarte.adresseStation = station.address;

    marqueurCarte.bindPopup(("<p>" + station.name + "</p>") + ("<p>" + station.status + "</p>")).openPopup();
    this.clusters.addLayer(marqueurCarte); // ajout des marqueurs au groupe clusters
    this.carte.addLayer(this.clusters);
    this.status = station.status;
    return marqueurCarte;
  }
  //Peu importe le paramètre, il sera défini au moment de l'appel de cette fonction, ici ligne 32
  addlistenersCarte(param) {
    let places = document.getElementById("places")
    let velos = document.getElementById("velos")
    let adresse = document.getElementById("adresse")
    let nomStation = document.getElementById("nomStation")

    param.addEventListener("click", () => {
      adresse.textContent = param.adresseStation
      places.textContent = param.placesDispo
      velos.textContent = param.velosDispo
      nomStation.textContent = param.nomStation;
      this.divForm.style.height = "460px"

      //GESTION DES ELEMENTS DE MESSAGE EN CAS DE STATION FERMEE OU VELO INDISPO
      if (this.status != "OPEN" || param.velosDispo === 0) {
        this.divSectionCarte.style.height = "auto";
        this.divForm.style.height = "auto";
        this.fermeture.id = "form3";
        this.imageFermeture.src = "images_sliders/png/chien-carlin.png";
        this.messageFermeture = document.createElement("button");
        this.messageFermeture.id = "messageFermeture"
        this.messageFermeture.textContent = "Choisir une station proche de celle ci"
        this.divResa.innerHTML = ""; // vidage de la divResa
        this.divResa.style.borderRadius = "20px";
        this.divResa.appendChild(this.fermeture); //mettre dans la div resa vide la div de fermeture
        this.fermeture.appendChild(this.imageFermeture) // la div contient une image (chien)
        this.fermeture.appendChild(this.messageFermeture); // la div ajoutée contient un message
        this.form.style.display = "none" // Le formulaire disparait

        this.messageFermeture.addEventListener("click", (e) => { // au click sur le bouton du message de station fermée,
          //on doit repartir sur les formulaires initiaux
          this.form.style.display = "block";
          this.divResa.innerHTML = "";
          this.divResa.appendChild(this.form2);
          this.divSectionCarte.style.height = "650px";
          this.divForm.style.height = "400px";

          places.textContent = "";
          velos.textContent = "";
          adresse.textContent = "";
          nomStation.textContent ="";
        }) // FERMETURE ADDLISTENERS MESSAGE FERMETURE
      } else { //APPEL DU CANVAS SIGNATURE
        this.reservationManager;

       }
    })
  }
}
