//TODO: write description

function calendarFiller(date, activeDay=1)
{
    let boxes = document.getElementsByTagName('td')

    let day = date.format('D')
    let month = date.month()
    let year = date.year()

    let startOfMonth = date.startOf('month').day()
    let daysInMonth = date.endOf('month').format('D')
    let startOfPreviousMonth = date.subtract(1, "month").endOf('month').format('D')

    let iterationCounter = 1
    let dayCounter = 1
    let grayBoxesCounter = 0

    console.log(day, month, year, startOfMonth, daysInMonth)

    for (let box of boxes) {
        box.setAttribute('data-date', year+'-'+Number(month+1)+'-'+day)

        if (iterationCounter >= startOfMonth && iterationCounter-grayBoxesCounter <= daysInMonth) {

            box.innerHTML = dayCounter.toString()

            if (activeDay === dayCounter) {
                box.classList.add('active')
            }

            box.addEventListener("click", ev => {
                console.log('You clicked on ', box.innerHTML)
                calendarRemoveActiveDay()
                box.classList.add('active')
                axiosSendPostRequestToGetAppointments(fetchGivenDateAsReadyToSendFormat(year, month, box.innerHTML), 1)
            })

            dayCounter++
        } else {
            grayBoxesCounter++

            box.classList.add('grayedOut')

            if (iterationCounter < startOfMonth){
                box.innerHTML = startOfPreviousMonth - startOfMonth + grayBoxesCounter + 1
            } else if (iterationCounter > daysInMonth) {
                box.innerHTML = iterationCounter - daysInMonth - startOfMonth + 1
            }
        }

        iterationCounter++
    }
}