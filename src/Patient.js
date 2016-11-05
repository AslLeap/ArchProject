class Patient
{
    Patient(medList, appointmentList, emergencyContact, name)
    {
        this.medList=medList;
        this.appointmentList=appointmentList;
        this.emergencyContact=emergencyContact;
        this.name=name;
    }

    getName() {
        return this.name;
    }

    getMedList() {
        return this.medList;
    }

    getAppointmentList() {
        return this.appointmentList;
    }

    getEmergencyContact() {
        return this.emergencyContact;
    }

    // setName(name) {
    //     this.name = name;
    // }
    //
    // setMedList(medList) {
    //     this.medList = medList;
    // }
    //
    // setAppointmentList(appList) {
    //     this.appointmentList = appList;
    // }
    //
    // setEmergencyContact(emCont) {
    //     this.emergencyContact = emCont;
    // }

    nextAppointment() {
         returnobj = appointmentList[0];
         appointmentList.shift();
         return returnobj;
    }

    addAppointment(newAppointment) {
        this.appointmentList.push(newAppointment);
    }
}
