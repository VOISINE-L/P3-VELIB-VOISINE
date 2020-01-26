// Pour eviter à la div de confirmation de résa d'apparaître avant le listener sur le bouton Canvas
document.getElementById("infosResa").style.display = "none";

class Map {
  constructor(mapId, mapCenter) {
  //Les paramètres sont la div de rattachement et les coordonnées GPS du centre de la ville choisie.
    this.carte = this.setMap(mapId, mapCenter);
    this.clusters = L.markerClusterGroup();
    //this.icone = icone;
    this.form = document.getElementById("form1");
    this.form2 = document.getElementById("form2")
    this.divResa = document.getElementById("div_resa");
    this.divSectionCarte = document.getElementById("section_carte");
    this.divForm = document.getElementById("div_form");
    this.fermeture = document.createElement("div");
    this.imageFermeture = document.createElement("img");
    this.messageFermeture = document.createElement("button");
    this.reservationManager = new ReservationManager("div_resa");

  }
  //Fonction pour déclarer et afficher la carte
  setMap(mapId, mapCenter) {
    var carte = L.map(mapId).setView(mapCenter, 13);
    // ajout de tuiles sur la carte
    L.tileLayer(' http://www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png', {
      minZoom: 12,
      maxZoom: 17,
      attribution: '&copy; Openstreetmap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(carte);
    return carte
  }
  //Fonction pour afficher les marqueurs d'après l'API JC DECAUX
  setMarkersFromApi(url) {
    ajaxGet(url, (callback) => {
      console.log(callback)
      // creation d'un tableau du paramètre stations
      let stations = JSON.parse(callback)
      console.log(stations)
      // recuperation du tableau JC DECAUX
      // création d'une variable marqueur
      for (const station of stations) {
        let marqueur = this.creerMarqueurCarte(station);
        //on récupère le marqueur pour la méthode addlistenersCarte Les marqueurs se créent
        this.addlistenersCarte(marqueur)
      }
    });
  }

  // cette methode definit les marqueurs attribués à chaque item du tableau JSON
  creerMarqueurCarte(station) {

    // atribution d'une icone
    this.status = station.status;
    let marqueurUrl;
    if (station.status === "OPEN"&& station.available_bikes>0) {
      marqueurUrl = 'images_sliders/png/leaf-orange.png'
    }else {
      marqueurUrl = 'images_sliders/png/leaf-red.png'
    };
    var marqueurCarte = L.marker([station.position.lat, station.position.lng], {
      icon: L.icon({
        iconUrl: marqueurUrl,
        shadowUrl:'images_sliders/png/leaf-shadow.png',
        shadowSize:   [50, 64], // size of the shadow
        iconSize: [26, 26],
        iconAnchor: [13, 26],
        popupAnchor: [0, -26],
      })
    })
// attribtion d'une place dans la div de reservation
    marqueurCarte.nomStation = station.name;
    marqueurCarte.velosDispo = station.available_bikes;
    marqueurCarte.placesDispo = station.available_bike_stands
    marqueurCarte.adresseStation = station.address;
    marqueurCarte.bindPopup(("<p>" + station.name + "</p>") + ("<p>" + station.status + "</p>")).openPopup();
    this.clusters.addLayer(marqueurCarte); // ajout des marqueurs au groupe clusters
    this.carte.addLayer(this.clusters);
    return marqueurCarte;
  }


  //Peu importe le paramètre, il sera défini au moment de l'appel de cette fonction, ici ligne 32
  addlistenersCarte(param) {
    let places = document.getElementById("places")
    let velos = document.getElementById("velos")
    let adresse = document.getElementById("adresse")
    let nomStation = document.getElementById("nomStation")

    // Adresse.text content devient marqueurCarte.adresseStation = station.address par passage de paramètre en ligne 44
    param.addEventListener("click", () => {
      adresse.textContent = param.adresseStation;
      places.textContent = param.placesDispo;
      velos.textContent = param.velosDispo;
      nomStation.textContent = param.nomStation;
      this.divForm.style.height = "460px"
      //GESTION DES ELEMENTS DE MESSAGE EN CAS DE STATION FERMEE OU VELO INDISPO
      if (this.status !== "OPEN" ||param.velosDispo === 0) {
        this.divSectionCarte.style.height = "auto";
        this.divForm.style.height = "590px";
        this.fermeture.id = "form3";
        this.imageFermeture.src = "images_sliders/png/chien-carlin.png";
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
          nomStation.textContent = "";
        }) // FERMETURE ADDLISTENERS MESSAGE FERMETURE
      } else { //appel de la procédure de réservation ligne 18
        this.reservationManager;
      }
    })
  }
}
