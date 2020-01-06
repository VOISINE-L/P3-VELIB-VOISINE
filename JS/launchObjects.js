let icone = L.icon ({
iconUrl: 'images_sliders/png/leaf-orange.png',
//shadowUrl: 'leaf-shadow.png',
iconSize:     [26, 26], // size of the icon
iconAnchor:   [13,26], // point of the icon which will correspond to marker's location
popupAnchor:  [0,-26], // point from which the popup should open relative to the iconAnchor
})

//instanciation de la carte
let map = new Map("carte", [43.600000, 1.433333],icone);
map.setMarkersFromApi("https://api.jcdecaux.com/vls/v1/stations?contract=toulouse&apiKey=1ebef17bde5413d6ad199afa6cffac6cee46aa37")
