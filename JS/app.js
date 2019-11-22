class App {
    /**
     *
     * @param {String} mapId
     * @param {Array[Double, Double]} mapCenter
     *
     * mapCenter is of [Latitud, Longitud]
     */
    constructor(mapId, mapCenter, icone){
        this.carte = this.setMap(mapId, mapCenter);
        this.clusters = L.markerClusterGroup();
        this.icone = icone;
        this.form = document.getElementById("form1")


    }
//Fonction pour déclarer la carte
    setMap(mapId, mapCenter){
        var carte = L.map(mapId).setView(mapCenter, 13);
        L.tileLayer(' http://www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png', {
      minZoom: 12,
      maxZoom: 17,
      attribution: '&copy; Openstreetmap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(carte);
        return carte
    }
//Fonction pour afficher les marqueurs
    setMarkersFromApi(url){
        ajaxGet(url, (callback)=> {
          //console.log(callback)
            let stations = JSON.parse(callback)
            for(const station of stations) {
                let marqueur= this.creerMarqueurCarte(station); //on récupère le marqueur pour la méthode addlistenersCarte Lesmarqueurs se créent
             this.addlistenersCarte(marqueur)
            }
        });
    }

creerMarqueurCarte(station) {
       var marqueurCarte = L.marker([station.position.lat, station.position.lng], { icon: this.icone }) //.addTo(this.carte)//INUTILE REDONDANT AVEC LIGNE 308
       marqueurCarte.velosDispo = station.available_bikes;
       marqueurCarte.placesDispo = station.available_bike_stands
       marqueurCarte.adresseStation = station.address;

       marqueurCarte.bindPopup(("<p>" + station.name + "</p>") + ("<p>" + station.status + "</p>")).openPopup();
       this.clusters.addLayer(marqueurCarte); // ajout des marqueurs au groupe clusters
       this.carte.addLayer(this.clusters);
       return marqueurCarte;
   }
//Peu importe le paramètre, il sera défini au moment d el'appel de cette fonction, ici ligne 32
addlistenersCarte(param) {
 let places = document.getElementById("places")
 let velos = document.getElementById("velos")
 let adresse = document.getElementById("adresse")

     param.addEventListener("click", () => {
       adresse.textContent = param.adresseStation
       places.textContent = param.placesDispo
       velos.textContent  = param.velosDispo
         //this.form.elements.velos.value = param.velosDispo
         //this.form.elements.adresse.value = param.adresseStation
         //GESTION DES ELEMENTS DE MESSAGE EN CAS DE STATION FERMEE OU VELO INDISPO
         if ((this.status === "OPEN") || (this.velosDispo === 0)) {
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


             this.messageFermeture.addEventListener("click", (e) => { // au click sur le bouton du message de station fermée,  on doit repartir sur les formulaires initiaux
                 this.form.style.display = "block";
                 this.divResa.innerHTML = "";
                 this.divResa.appendChild(this.form2);
                 this.divSectionCarte.style.height = "650px";
                 this.divForm.style.height = "400px";
                 this.form.elements.places.value = "";
                 this.form.elements.velos.value = "";
                 this.form.elements.adresse.value = "";

             }) // FERMETURE ADDLISTENERS MESSAGE FERMETURE

         } else { //APPEL DU CANVAS SIGNATURE

             submit.addEventListener("click", () => {
                 this.divForm.style.height = "460px";
                 this.divForm.style.top = "calc(50% - 260px)"
                 this.divResa.style.textAlign = "right"
                 const firm = new Firm("div_resa");
                 //marqueurCarte.removeEventListener("click")//? ne fonctionne pas
             })

         } //FERMETURE DU ELSE
     }) //FERMETURE ADDEVENTLISTENERS SUR MARQUEURCARTE
 }
}
