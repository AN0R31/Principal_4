//TODO: write description

function setSelectors(date, location = 1) {

    let locationSelector = document.getElementById('locations')

    let monthSelector = document.getElementById('months')

    let yearSelector = document.getElementById('years')

    searchInSelectorAndSelectGiven(locationSelector, 1)

    searchInSelectorAndSelectGiven(monthSelector, date.month())

    searchInSelectorAndSelectGiven(yearSelector, date.year())

    monthSelector.addEventListener("click", ev => {
        let newDate = yearSelector.value+'-'+Number(Number(monthSelector.value)+1)+'-'+1
        newDate = moment(newDate)
        calendarRefresher()
        headerFiller(newDate)
        calendarFiller(newDate)
    })

    yearSelector.addEventListener("click", ev => {
        let newDate = yearSelector.value+'-'+Number(Number(monthSelector.value)+1)+'-'+1
        newDate = moment(newDate)
        calendarRefresher()
        headerFiller(newDate)
        calendarFiller(newDate)
    })
}

function setEventListeners() {
    let makeAppointmentButton = document.getElementById('makeAppointmentButton')
    let locationSelector = document.getElementById('locations')

    makeAppointmentButton.addEventListener("click", ev => {
        let day = document.getElementsByClassName('active').item(0).innerHTML
        let month = document.getElementById('months').value
        let year = document.getElementById('years').value

        let dateOfAppointment = fetchGivenDateAsReadyToSendFormat(year, month, day)

        let location = document.getElementById('locations').value
        axiosSendPostRequestToSetAppointment(dateOfAppointment, location)
    })

    locationSelector.addEventListener("click", ev => {
        let makeAppointmentButton = document.getElementById('makeAppointmentButton')
        let locationSelector = document.getElementById('locations')

        let day = document.getElementsByClassName('active').item(0).innerHTML
        let month = document.getElementById('months').value
        let year = document.getElementById('years').value

        let dateOfAppointment = fetchGivenDateAsReadyToSendFormat(year, month, day)

        let location = document.getElementById('locations').value
        axiosSendPostRequestToGetAppointments(dateOfAppointment, location)
    })
}

function searchInSelectorAndSelectGiven(selector, toSelect) {

    for (let selectorElement of selector) {

        if (Number(selectorElement.value) === toSelect) {

            selector.value = selectorElement.value
        }

    }
}