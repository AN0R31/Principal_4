//TODO: write description

function appointmentHandler(axiosResponse, date, location) {
    if (axiosResponse[0]) {
        clearAppointmentTitle()
        for (let axiosResponseElement of axiosResponse) {
            printAppointment(axiosResponseElement, date, location)
        }
    } else {
        clearAppointmentTitle()
        printNoAppointments()
    }
}

function handleJsonStringResponse(jsonStringResponse) {
    if (jsonStringResponse==='null') {
        customAlertSuccess('Appointment made successfully!')
    } else {
        customAlertError(jsonStringResponse)
    }
}

function printAppointment(appointment, date, location) {
    if(appointment.isGivenUserLoggedIn === true) {
        document.getElementById('profiles-ul').innerHTML += `<p class="p-delete" id="deleteAppointmentButton" onclick="axiosSendPostRequestToDeleteAppointments(`+appointment.id+`,`+`'`+date+`'`+`,`+location+`)">X</p>`
    }
    document.getElementById('profiles-ul').innerHTML +=
        `<div class="userProfile">`+
        `<img src="`+appointment.profile_picture+`" class="image-logo">`+
        `<ul>`+
        `<li><p class="p-username">`+appointment.name+`</p></li>`+
        `<li><p class="p-email">`+appointment.email+`</p></li>`+
        `<li><p class="p-location">`+appointment.country+', '+appointment.city+', '+appointment.address+`</p></li>`+
        `</ul>`+
        `</div>`
}

function printNoAppointments() {
    document.getElementById('profiles-ul').innerHTML =
        `<p id="emptyParagraphUsers" class="emptyParagraphUsers">Nothing planned today! &#128565</p>`
}

function clearAppointmentTitle() {
    document.getElementById('profiles-ul').innerHTML = ''
}