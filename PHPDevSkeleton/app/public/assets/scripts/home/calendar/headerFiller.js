//TODO: write description

function headerFiller(date)
{
    let monthHeader = document.getElementById('monthHeader')

    monthHeader.innerHTML = date.format('MMMM') + ' ' + date.year()

    realTimeHeaderRefresher()
}

function realTimeHeaderRefresher()
{
    let realTimeHeader = document.getElementById('realTimeHeader')

    realTimeHeader.innerHTML = moment().format('h:mm:ss a')

    setInterval(function() {
        realTimeHeaderRefresher();
    }, 1000);
}