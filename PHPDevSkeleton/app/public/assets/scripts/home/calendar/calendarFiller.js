//TODO: write description

function calendarFiller(date, activeDay=1)
{
    let boxes = document.getElementsByTagName('td')

    let day = date.day()
    let month = date.month()
    let year = date.year()

    let startOfMonth = date.startOf('month').day()
    let daysInMonth = date.endOf('month').format('D')

    let startOfPreviousMonth = date.subtract(1, "month").endOf('month').format('D')

    let iterationCounter = 1
    let dayCounter = 1
    let grayBoxesCounter = 0;

    for (let box of boxes) {
        if (iterationCounter >= startOfMonth && iterationCounter <= daysInMonth) {

            box.innerHTML = dayCounter.toString()

            if (activeDay === dayCounter) {
                box.classList.add('active')
            }

            dayCounter++
        } else {
            grayBoxesCounter++

            box.classList.add('grayedOut')

            if (iterationCounter < startOfMonth){
                box.innerHTML = startOfPreviousMonth - startOfMonth + grayBoxesCounter + 1
            } else if (iterationCounter > daysInMonth) {
                box.innerHTML = iterationCounter - daysInMonth
            }
        }
        iterationCounter++
    }

    console.log(day, month, year, startOfMonth, daysInMonth)
}