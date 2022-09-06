//TODO: write description

function calendarFiller(date, calendar_style, activeDay = 1) {
    let boxes = document.getElementsByTagName('td')

    let day = date.format('D')
    let month = date.month()
    let year = date.year()

    let startOfMonth = date.startOf('month').day()+1
    let daysInMonth = date.endOf('month').format('D')
    let startOfPreviousMonth = date.subtract(1, "month").endOf('month').format('D')

    let iterationCounter = 1
    let dayCounter = 1
    let grayBoxesCounter = 0

    // dayTitlesFiller(calendar_style)

    axiosSendPostRequestToGetAppointments(fetchGivenDateAsReadyToSendFormat(year, month, activeDay), 1)

    for (let box of boxes) {
        if (iterationCounter >= startOfMonth && iterationCounter - grayBoxesCounter <= daysInMonth) {

            box.innerHTML = dayCounter.toString()

            box.setAttribute('data-date', year + '-' + Number(month + 1) + '-' + dayCounter)

            if (activeDay === dayCounter) {
                box.classList.add('active')
            }

            box.addEventListener("click", ev => {
                calendarRemoveActiveDay()
                box.classList.add('active')

                let location = document.getElementById('locations').value
                axiosSendPostRequestToGetAppointments(fetchGivenDateAsReadyToSendFormat(year, month, box.innerHTML), location)
            })

            dayCounter++

        } else {
            grayBoxesCounter++

            box.classList.add('grayedOut')

            if (iterationCounter < startOfMonth) {
                box.innerHTML = startOfPreviousMonth - startOfMonth + grayBoxesCounter + 1
            } else if (iterationCounter > daysInMonth) {
                box.innerHTML = iterationCounter - daysInMonth - startOfMonth + 1
            }
        }

        iterationCounter++
    }
}