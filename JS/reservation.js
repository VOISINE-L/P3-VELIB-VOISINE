class ReservationManager {
  constructor(reservation_box_id) {
    this.reservation_box_id = reservation_box_id
    this.station = undefined;
    this.surname = undefined;
    this.name = undefined;
    this.EndReservation = undefined;
    this.firmBox = undefined;// ex divForm
    this.firm = undefined;
    this.userFormContainer = document.getElementById(reservation_box_id)
    this.userForm = document.getElementById("form2") // ex form2
    this.addListener;
  }
  addListener() {
    let submit = document.getElementById("submit")
    submit.addEventListener("click", function(e){
      e.preventDefaults()

      let surname = this.userForm.elements.prenom_utilisateur.value;
      let name = this.userForm.elements.nom_utilisateur.value;
        this.firmBox = new Firm(this.reservation_box_id)
     console.log("surname", surname)
     console.log("name", name)
      //this.divForm.style.height = "460px";
      //this.divForm.style.top = "calc(50% - 260px)"
      //this.divResa.style.textAlign = "right";
      if ((surname.length > 0) && (name.length > 0)) {

      }


    })


  }
}
