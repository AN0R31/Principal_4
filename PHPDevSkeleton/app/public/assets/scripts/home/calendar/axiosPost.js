//TODO: write description

function axiosSendPostRequestToSetAppointment(date, location) {
    const data = new FormData()
    data.set('date', date)
    data.set('location_id', location)
    axios.post(
        '/setAppointment',
        data,
    ).then(function (response) {
        handleJsonStringResponse(response.data)
        axiosSendPostRequestToGetAppointments(date, location)
    });
}

function axiosSendPostRequestToGetAppointments(date, location) {
    const data = new FormData()
    data.set('date', date)
    data.set('location_id', location)
    axios.post(
        '/getAppointments',
        data,
    ).then(function (response) {
        appointmentHandler(response.data, date, location)
    });
}

function axiosSendPostRequestToDeleteAppointments(id, date, location) {
    const data = new FormData()
    data.set('id', id)
    axios.post(
        '/deleteAppointment',
        data,
    ).then(function (response) {
        if (response.data.status === 'null') {
            axiosSendPostRequestToGetAppointments(date, location)
            customAlertSuccess('Appointment deleted successfully!')
        } else {
            customAlertError(response.data)
        }
    });
}