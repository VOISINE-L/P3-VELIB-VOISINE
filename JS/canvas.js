class Firm {
  constructor(parentId) {
    this.parent = document.getElementById(parentId);
    this.parent.innerHTML = "";
    this.canvas = this.setUpCanvas();
    this.parent.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 2;
    // Set up mouse events for drawing
    this.drawing = false;
    this.mousePos = {x: 0,y: 0};
    this.lastPos = this.mousePos;
    this.divResa = document.getElementById("div_resa")
    this.divResa.style.display = "block";
    this.setUpCanvasButton();
    this.addListeners()
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

  // obtenir la positon de la souris sur le canvas et non pas sur la page
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
      // commence le tracé à partir coordonéées lastPos,
      // soit le point de départ de chaque ligne
      this.ctx.moveTo(this.lastPos.x, this.lastPos.y);
       //trace la ligne
      this.ctx.stroke();
      // va tracer une ligne de lastPos à mousePos
      this.ctx.lineTo(this.mousePos.x, this.mousePos.y);
      //  le mouse Pos actuel en lastPos
      this.lastPos = this.mousePos;
    }
  }

  // pour la fluidité d'éxécution du dessin sur le canvas
  // fonction qui s'appelle elle même et qui est mise en oeuvre
  //par la méthode du navigateur requestAnimationFrame
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
      //lastPos est la position rectifiée de la souris
      this.lastPos = this.getMousePos(this.canvas, e);
    },false)

    // actualise en permanence la position de la souris en fonction de son déplacement
    //le getMousePos devient le mousePos et non plus le lastPos
  this.canvas.addEventListener("mousemove", (e) => {
      //pas besoin du drawing car c'est juste pour récuperer
      //le changement de coordonnées de la souris, qui'il y ait ou pas un drawing en cours
      this.mousePos = this.getMousePos(this.canvas, e);
    }, false);

    this.canvas.addEventListener("mouseup", () => {
      // arrêt du dessin
      this.drawing = false;
    }, false);
  // sert à écrire sur le canvas selon un sequençage fluide sur differents navigateurs
  // notifie une animation et lui spécifie
  //une fonction de mise à jour de l'animation  et prend en argument un callbabck
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

    // Applique le rafraichissement à la methode Drawloop
    this.drawLoop();
  };

}
