function createEmployeeRecord(emplData) {
    return {
        firstName: emplData[0],
        familyName: emplData[1],
        title: emplData[2],
        payPerHour: emplData[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(emplsData) {
    return emplsData.map(createEmployeeRecord)
}

function createTimeInEvent(emplObj, dateStr) {
    emplObj.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(dateStr.split(' ')[1]),
        date: dateStr.split(' ')[0]
    })

    return emplObj
}

function createTimeOutEvent(emplObj, dateStr) {
    emplObj.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(dateStr.split(' ')[1]),
        date: dateStr.split(' ')[0]
    })

    return emplObj
}

function hoursWorkedOnDate(emplObj, dateStr) {
    const timeIn = emplObj.timeInEvents.find(timeInEvent => timeInEvent.date === dateStr).hour
    const timeOut = emplObj.timeOutEvents.find(timeOutEvent => timeOutEvent.date === dateStr).hour
    
    return (timeOut - timeIn) / 100
}

function wagesEarnedOnDate(emplObj, dateStr) {
    return hoursWorkedOnDate(emplObj, dateStr) * emplObj.payPerHour
}

function allWagesFor(emplObj) {
    const dates = emplObj.timeInEvents.map(timeInEvent => timeInEvent.date)
    
    return dates.map(date => wagesEarnedOnDate(emplObj, date)).reduce((total, wage) => total + wage)
}

function calculatePayroll(emplObjsArr) {
  return emplObjsArr.map(emplObj => allWagesFor(emplObj)).reduce((total, wages) => total + wages)
}

function findEmployeeByFirstName(emplObjsArr, firstName) {
    return emplObjsArr.find(emplObj => emplObj.firstName === firstName)
}