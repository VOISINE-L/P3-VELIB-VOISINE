
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
            this.ajouter(this.objets[this.indice]);
            this.lancerAutoSlider();
            this.addlisteners()

        }
    }

    avancerSlider() {
        if ((this.indice >= 0) && (this.indice < this.objets.length - 1)) {
            this.indice++;
            //this.ajouter(this.objets[this.indice].image, this.objets[this.indice].titre, this.objets[this.indice].texte)

        } else {
            this.indice = 0;
            //this.ajouter(this.objets[this.indice].image, this.objets[this.indice].titre, this.objets[this.indice].texte)

        }

        this.ajouter(this.objets[this.indice])
    }

    reculerSlider() {
        if ((this.indice > 0) && (this.indice <= this.objets.length - 1)) {
            this.indice--;
            //this.ajouter(this.objets[this.indice].image, this.objets[this.indice].titre, this.objets[this.indice].texte);
        } else {
            this.indice = this.objets.length - 1;
            //this.ajouter(this.objets[this.indice].image, this.objets[this.indice].titre, this.objets[this.indice].texte)
        }
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
                    if (this.pause === true) {
                        this.stopperAutoSlider()
                        this.pause = false;
                    } else {
                        this.pause = true;
                        clearInterval(this.sequence);
                        this.lancerAutoSlider()
                    }
                    break;

            }
        });

    }

}
