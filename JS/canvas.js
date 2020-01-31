class Firm {
  constructor(parentId) {
    this.parent = document.getElementById(parentId);
    this.parent.innerHTML = "";
    this.canvas = this.setUpCanvas() // appel de la création du canvas;
    this.parent.appendChild(this.canvas); //ajout au DOM
    this.ctx = this.canvas.getContext("2d"); // mise en place et parametrage du contexte pour dessiner
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 2;
    // Set up mouse events for drawing
    this.drawing; // Booleen pour indiquer si lon dessine ou pas
    this.mousePos = {x: 0,y: 0}; // une position initiale de souris
    this.lastPos = this.mousePos; //
    this.divResa = document.getElementById("div_resa")
    this.divResa.style.display = "block";
    this.setUpCanvasButton();
    this.addListeners() //  pour appeler les évènements liés à la souris
  }

  // Creation d'un bouton canvas et attribution d'un customEvent sur son click
  setUpCanvasButton() {
    this.buttonCanvas = document.createElement("button")
    this.buttonCanvas.id = "set";
    this.buttonCanvas.textContent = "Envoyer votre demande"
    this.divResa.appendChild(this.buttonCanvas);
    this.buttonCanvas.addEventListener("click", () => {
      let event = new Event("firmedEvent", {
        bubbles: true
      });
      document.dispatchEvent(event);
    });
  }

  setUpCanvas() {
    let canvas = document.createElement("canvas");
    canvas.style.backgroundColor = "white";
    canvas.width = 500;
    canvas.height = 150;
    canvas.id = "canvas";
    return canvas; //cf ligne 5
  }

  // obtenir la positon de la souris sur le canvas et non pas sur le client
  getMousePos(canvasDom, mouseEvent) {
    let rect = canvasDom.getBoundingClientRect();
    return {
      x: mouseEvent.clientX - rect.left,
      y: mouseEvent.clientY - rect.top
    }
  }

  // Etablit un cycle de fonctionnement, ne prend pas de données précise en référence
  // les données sont établies dans les addlisteners
  renderCanvas() {
    if (this.drawing) {
      // commence le tracé à partir coordonéées lastPos, soit le point de départ de chaque ligne
      this.ctx.moveTo(this.lastPos.x, this.lastPos.y);
      // definit la ligne
      this.ctx.stroke();
      // va tracer une ligne de lastPos à mousePos
      this.ctx.lineTo(this.mousePos.x, this.mousePos.y);
      //  le mouse Pos actuel en lastPos
      this.lastPos = this.mousePos;
    }
  }

  // Applique le rafraichissement à la methode Drawloop pour la fluidité d'éxécution du dessin sur le canvas
  drawLoop() {
    requestAnimFrame(this.drawLoop.bind(this));
    this.renderCanvas();
  };

  // fonctions flechées car si fonction anonyme le this devient l'event
  //et non plus l'objet( garder le contexte de l'objet)
  // au mouseDown, on commence à dessiner en prenant en compte getMousePos
  addListeners() {
    this.canvas.addEventListener("mousedown", (e) => {
      //debut du tracé
      this.drawing = true;
      //lastPos devient la mousePos
      //lastPos garde la dernière position de la souris
      this.lastPos = this.getMousePos(this.canvas, e);
    }, false)
    this.canvas.addEventListener("mousemove", (e) => {
      //pas besoin du drawing car c'est juste pour récuperer
      //le changement de coordonnées de la souris, qu'il y ait ou pas un drawing en cours
      this.mousePos = this.getMousePos(this.canvas, e);
    }, false);
    this.canvas.addEventListener("mouseup", (e) => {
      // arrêt du dessin
      this.drawing = false;
    }, false);

    // sert à écrire sur le canvas selon un sequençage fluide sur differents navigateurs
    // notifie une animation et lui spécifie
    //une fonction de mise à jour de l'animation en callbabck
    window.requestAnimFrame = (function(callback) {
      return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimaitonFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
    })();
    this.drawLoop();
  };
}
