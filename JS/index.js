// on declare les diapos
let carousel = [{
    image: "images_sliders/grandes/image.jpg",
    titre: "ETAPE 1: ",
    texte: "Vous choisissez une station..."
  },
  {
    image: "images_sliders/grandes/image3.jpg",
    titre: "ETAPE 2: ",
    texte: "...une signature suffit pour bloquer votre réservation..."
  },
  {
    image: " images_sliders/grandes/1bis.jpg",
    titre: "ETAPE 3: ",
    texte: " ... ainsi un vélo vous attend durant 20 mn dans la station de votre choix!"
  },
  {
    image: "images_sliders/grandes/tandem.jpeg",
    titre: "ETAPE 4: ",
    texte: "Et ensuite, à vous la Vélo'Cité... tout simplement!"
  }
];
//on instancie le slider
let slider = new Slider(carousel, "container_carousel");
slider.init();
let icone = L.icon({
iconUrl: 'images_sliders/png/leaf-orange.png',
//shadowUrl: 'leaf-shadow.png',
iconSize:     [26, 26], // size of the icon
iconAnchor:   [13,26], // point of the icon which will correspond to marker's location
popupAnchor:  [0,-26], // point from which the popup should open relative to the iconAnchor
})
//appel de la carte
let app = new App("carte", [43.600000, 1.433333],icone);
app.setMarkersFromApi("https://api.jcdecaux.com/vls/v1/stations?contract=toulouse&apiKey=1ebef17bde5413d6ad199afa6cffac6cee46aa37")
