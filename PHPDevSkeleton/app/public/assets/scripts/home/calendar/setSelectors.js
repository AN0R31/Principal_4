//TODO: write description

function setSelectors(date, location = 1) {

    let locationSelector = document.getElementById('locations')

    let monthSelector = document.getElementById('months')

    let yearSelector = document.getElementById('years')

    searchInSelectorAndSelectGiven(locationSelector, 1)

    searchInSelectorAndSelectGiven(monthSelector, date.month())

    searchInSelectorAndSelectGiven(yearSelector, date.year())

    monthSelector.addEventListener("click", ev => {
        let newDate = yearSelector.value+'-'+monthSelector.value+'-'+1
        newDate = moment(newDate)
        calendarRefresher()
        calendarFiller(newDate)
        headerFiller(newDate)
    })

    yearSelector.addEventListener("click", ev => {
        let newDate = yearSelector.value+'-'+Number(Number(monthSelector.value)+1)+'-'+1
        newDate = moment(newDate)
        calendarRefresher()
        calendarFiller(newDate)
        headerFiller(newDate)
    })
}

function searchInSelectorAndSelectGiven(selector, toSelect) {

    for (let selectorElement of selector) {

        if (Number(selectorElement.value) === toSelect) {

            selector.value = selectorElement.value
        }

    }
}