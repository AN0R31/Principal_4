//TODO: write description

let date = moment()

axiosSendPostRequestToGetAppointments(fetchGivenDateAsReadyToSendFormat(date), 1)
setSelectors(date)
headerFiller(date)
realTimeHeaderRefresherFiller()
calendarFiller(date)