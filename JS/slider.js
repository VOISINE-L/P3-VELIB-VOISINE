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


class Slider {
  constructor(objets, container) {
    this.objets = objets;
    this.initial = true;
    this.indice;
    this.divChevron1 = document.createElement("div");
    this.divChevron2 = document.createElement("div");
    this.sequence;
    this.pause = true;
    this.image;
    this.container = document.getElementById(container);
    this.init();

  }

  ajouter(objet) {
    this.container.innerHTML = "";
    let figureCarousel = document.createElement("figure");
    figureCarousel.id = "image_carousel"
    this.divChevron1.id = "chevron1";
    this.divChevron1.fontStyle = "chevron1";
    this.divChevron1.className = "fas fa-chevron-left"
    this.divChevron2.id = "chevron2"
    this.divChevron2.fontStyle = "fontawesome"
    this.divChevron2.className = "fas fa-chevron-right";
    let imageCarousel = document.createElement("img");
    imageCarousel.src = objet.image;
    let figcaptionCarousel = document.createElement("figcaption");
    figcaptionCarousel.id = "boite";
    let spanCarousel = document.createElement("span");
    spanCarousel.classList.add = "arrow.box"; // VOIR CE PROBLEME D ARROW BOX
    let titreCarousel = document.createElement("h1")
    titreCarousel.id = "titre_carousel";
    titreCarousel.textContent = objet.titre;
    let texteCarousel = document.createElement("p");
    texteCarousel.id = "texte_carousel";
    texteCarousel.textContent = objet.texte;
    this.container.appendChild(figureCarousel);
    figureCarousel.appendChild(this.divChevron1);
    figureCarousel.appendChild(this.divChevron2);
    figureCarousel.appendChild(imageCarousel);
    figureCarousel.appendChild(figcaptionCarousel);
    figcaptionCarousel.appendChild(spanCarousel);
    figcaptionCarousel.appendChild(titreCarousel);
    figcaptionCarousel.appendChild(texteCarousel);
    this.initial = false;
  }

  init() {
    if (this.initial === true) {
      this.indice = 0;
    }
      // passe en paramètre les objets créés par la methode ajouter par leur indice
      this.ajouter(this.objets[this.indice]);
      // met en place un interval pour lancer le slider toute les 5 s
      this.lancerAutoSlider();
      // met en place les commandes sur les flèches et le clavier
      this.addlisteners()


  }

  avancerSlider() {
    // augmente l'indice jusque la fin du tableau
    if ((this.indice >= 0) && (this.indice < this.objets.length - 1)) {
      this.indice++;
      //this.ajouter(this.objets[this.indice].image, this.objets[this.indice].titre, this.objets[this.indice].texte)
      //sinon remet l'indice à 0
    } else {
      this.indice = 0;
      //this.ajouter(this.objets[this.indice].image, this.objets[this.indice].titre, this.objets[this.indice].texte)
    }
    //appelle la methode ajouter et lui passe tous les items du tableau
    this.ajouter(this.objets[this.indice])
  }

  reculerSlider() {
    // reduit l'indice jusque la fin du tableau
    if ((this.indice > 0) && (this.indice <= this.objets.length - 1)) {
      this.indice--;
      // alternatif: this.ajouter(this.objets[this.indice].image, this.objets[this.indice].titre, this.objets[this.indice].texte);
      // sinon passe au dernier item du tableau
    } else {
      this.indice = this.objets.length - 1;
      //this.ajouter(this.objets[this.indice].image, this.objets[this.indice].titre, this.objets[this.indice].texte)
    }
      //appelle la methode ajouter et lui passe tous les items du tableau
    this.ajouter(this.objets[this.indice]);
  }

  lancerAutoSlider() {
    this.sequence = setInterval(this.avancerSlider.bind(this), 5000);
  }

  stopperAutoSlider() {
    clearInterval(this.sequence);
  }

  addlisteners() {
    this.divChevron2.addEventListener("click", (e) => {
      this.avancerSlider();
    })
    this.divChevron1.addEventListener("click", (e) => {
      this.reculerSlider();
    });
    window.addEventListener("keydown", (e) => {

      switch (e.code) {
        case "ArrowLeft":
          this.reculerSlider()
          break;
        case "ArrowRight":
          this.avancerSlider();
          break;
        case "ArrowDown":
          this.reculerSlider()
          break;
        case "ArrowUp":
          this.avancerSlider()
          break;
        case "Space":
        // si
          if (this.pause === true) {
            this.stopperAutoSlider()
            this.pause = false;
            //sinon, si j'ai pause === false,
          } else {
            this.pause = true;
            this.lancerAutoSlider()
          }
          break;
      }
    });
  }
}
//on instancie le slider
let slider = new Slider(carousel, "container_carousel");
