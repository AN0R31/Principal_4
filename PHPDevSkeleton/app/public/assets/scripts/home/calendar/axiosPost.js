//TODO: write description

function axiosSendPostRequestToSetAppointment(date, location) {
    const data = new FormData()
    data.set('date', date)
    data.set('location_id', location)
    // data.set('_token', document.querySelector('meta[name=csrfToken]').content);
    axios.post(
        '/setAppointment',
        data,
    ).then(function (response) {
        return response.data
    });
}

function axiosSendPostRequestToGetAppointments(date, location) {
    const data = new FormData()
    data.set('date', date)
    data.set('location_id', location)
    // data.set('_token', document.querySelector('meta[name=csrfToken]').content);
    axios.post(
        '/getAppointments',
        data,
    ).then(function (response) {
        return response.data
    });
}