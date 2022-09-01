// calendarRefresher -->
//     calendarRefresher() ->
//         * refreshes the contents of the calendar so that it is reverted to its original state
//         * after function call, calendar is ready to be refilled with the new provided data

function calendarRefresher() {

    let boxes = document.getElementsByTagName('td')

    for (let box of boxes) {
        box.classList.remove('active')
        box.classList.remove('grayedOut')
        box.innerHTML = ''
    }

    calendarEventListenerRemover()
}

function calendarEventListenerRemover() {
    let old_calendar = document.getElementById("calendar")
    let new_calendar = old_calendar.cloneNode(true)
    old_calendar.parentNode.replaceChild(new_calendar, old_calendar)
}

function calendarRemoveActiveDay() {

    let activeDayElement = document.getElementsByClassName('active')
    activeDayElement = activeDayElement.item(0)
    activeDayElement.classList.remove('active')
}