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
        this.mousePos = { x: 0, y: 0 };
        this.lastPos = this.mousePos;
        this.divResa = document.getElementById("div_resa")
        this.buttonCanvas = document.createElement("button")
        this.buttonCanvas.id = "set"
        this.buttonCanvas.textContent = "Envoyer votre demande"
        this.divResa.appendChild(this.buttonCanvas);
        this.divResa.style.display = "block"
        this.addListeners()
    }
    setUpCanvas() {

        let canvas = document.createElement("canvas");
        canvas.style.backgroundColor = "white";
        canvas.style.width = "500px"
        canvas.style.height = "150px";
        canvas.id = "canvas";

        return canvas; //cf ligne 5


    }
    getMousePos(canvasDom, mouseEvent) {
        let rect = canvasDom.getBoundingClientRect();
        return {
            x: mouseEvent.clientX - rect.left,
            y: mouseEvent.clientY - rect.top
        }
    }
    // fonction flechées car si fonction anonyme le this devient l'event et non plus l'objet( garder le contexte de l'objet)
    addListeners() {

        this.canvas.addEventListener("mousedown", (e) => {
            this.drawing = true;
            this.lastPos = this.getMousePos(this.canvas, e); // la position rectifiée en x et y de la souris
        }, false);


        this.canvas.addEventListener("mouseup", () => { // arrêt du dessin
            this.drawing = false;
        }, false);


        this.canvas.addEventListener("mousemove", (e) => { //mousepos devient la lastPos
            //pas besoin du drawing
            this.mousePos = this.getMousePos(this.canvas, e);
        }, false);

        window.requestAnimFrame = (function(callback) { // le callback est le drawloop
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimaitonFrame ||
                function(callback) { // fonction sur l'event
                    window.setTimeout(callback, 1000 / 60);
                };
        })();
        this.drawLoop();
    }

    // Draw to the canvas
    renderCanvas() {
        if (this.drawing) {
            this.ctx.moveTo(this.lastPos.x, this.lastPos.y); //deplace le pointeur à la last Posx et Y , recuperé au Mouse down
            this.ctx.lineTo(this.mousePos.x, this.mousePos.y); //  fait une ligne jusqu'aux coordonnées du point mousePoslors mousemove
            this.ctx.stroke(); //trace le contour
            this.lastPos = this.mousePos; //mousePos est le lastPos du mouseDown
        }
    }
    drawLoop() {
        requestAnimFrame(this.drawLoop.bind(this));
        this.renderCanvas();
    };
}
