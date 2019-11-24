class ReservationManager {
  constructor(reservation_box_id) {
  this.reservation_box_id = reservation_box_id
    this.station = undefined;
    this.surname = undefined;
    this.name = undefined;
    this.EndReservation = undefined; // heure de fin de  reservation
    this.firmBox = undefined;//ex DivForm
    this.firm = undefined;// signature
    this.userFormContainer = document.getElementById(reservation_box_id)// ex divResa
    this.userForm = document.getElementById("form2") // ex form2
    this.addListener;
  }
  addListener() {
      let submit = document.getElementById("submit")
      submit.addEventListener("click",(e)=> {
        e.preventDefault()
      let name = this.userform.elements.prenom_utilisateur.value
      let surname = this.userForm.elements.nom_utilisateur.value
      console.log("surname", surname)
      console.log("name", name)
      if ( surname.length>0 && name.length>0){
        this.firmBox = new Firm( this.reservation_box_id)
      }



    })
        }
      }
