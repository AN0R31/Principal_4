//TODO: write description

function fetchGivenDateAsReadyToSendFormat(year, month, day) {
    return year+'-'+Number(Number(month)+1)+'-'+day
}

function dayTitlesFiller(calendar_type) {
    let dayTitlesToFill = fetchDayTitlesArrayByGivenParameter(calendar_type)
    let dayTitles = document.getElementsByTagName('th')
    let counter = 0;
    for (let dayTitle of dayTitles) {
        dayTitle.innerHTML = dayTitlesToFill[counter]
        counter++
    }
}

function fetchDayTitlesArrayByGivenParameter(calendar_type) {
    if (Number(calendar_type)===0){
        return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    }
    return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
}