class ReservationManager {
  constructor(reservation_box_id) {
    this.reservation_box_id = reservation_box_id
    this.station = undefined;
    this.surname = undefined;
    this.name = undefined;
    this.EndReservation = undefined;
    this.firmBox = undefined;
    this.firm = undefined;
    this.userFormContainer = document.getElementById(reservation_box_id)
    this.userForm = document.getElementById("form2") // ex form2
    this.addListeners;
  }
  addListeners() {
    let submit = document.getElementById("submit")
    submit.addEventListener("click", (e) => {
      e.preventDefault()
      let surname = this.userForm.elements.prenom_utilisateur.value;
      let name = this.userForm.elements.nom_utilisateur.value;
      console.log("surname", surname)
      console.log("name", name)
      this.divForm.style.height = "460px";
      this.divForm.style.top = "calc(50% - 260px)"
      this.divResa.style.textAlign = "right";
      if (surname.length > 0 && name.length > 0) {
        this.firmBox = new Firm(this.reservation_box_id);
      }


    })


  }
}
