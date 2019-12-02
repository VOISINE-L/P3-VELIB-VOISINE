//constructor appelé sur Div_resa dans app.js
class ReservationManager {
  constructor(reservation_box_id) {
    this.reservation_box_id = reservation_box_id
    this.station = undefined;
    this.surname = undefined;
    this.name = undefined;
    this.EndReservation = undefined;
    this.firmBox = undefined; //ex DivForm
    this.firm = undefined; // signature
    this.userFormContainer = document.getElementById(reservation_box_id) // ex divResa
    this.userForm = document.getElementById("form2") // ex form2
    this.addListener();
  }

  // addlistener pour faire apparaître le canvas, déclaré dans App.js L 25
  addListener() {

    this.userForm.addEventListener("submit", (e) => {
      e.preventDefault()
      let name = this.userForm.elements.prenom_utilisateur.value
      let surname = this.userForm.elements.nom_utilisateur.value
      console.log("surname", surname)
      console.log("name", name)
      if (surname.length > 0 && name.length > 0) {
        this.firmBox = new Firm(this.reservation_box_id)
      }

    })
  }
}
