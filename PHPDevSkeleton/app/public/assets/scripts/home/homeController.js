//TODO: write description

let date = moment()

let calendar_style = document.getElementById('calendar_style').innerHTML

setSelectors(date)
headerFiller(date)
realTimeHeaderRefresherFiller()
calendarFiller(date, calendar_style)
setEventListeners()
