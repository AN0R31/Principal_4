//TODO: write description

function headerFiller(date)
{
    let monthHeader = document.getElementById('monthHeader')

    monthHeader.innerHTML = date.format('MMMM') + ' ' + date.year()
}

function realTimeHeaderRefresherFiller()
{
    let realTimeHeader = document.getElementById('realTimeHeader')

    realTimeHeader.innerHTML = moment().format('h:mm:ss a')

    setTimeout(function() {
        realTimeHeaderRefresherFiller()
    }, 1000);
}