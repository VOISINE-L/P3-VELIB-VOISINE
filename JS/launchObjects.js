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

//instanciation de la carte
let map = new Map("carte", [43.600000, 1.433333]);
map.setMarkersFromApi("https://api.jcdecaux.com/vls/v1/stations?contract=toulouse&apiKey=1ebef17bde5413d6ad199afa6cffac6cee46aa37")
