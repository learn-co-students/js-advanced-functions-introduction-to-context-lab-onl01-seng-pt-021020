// Your code here
function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arr) {
    return arr.map(element => { return createEmployeeRecord(element)})
}

function createTimeInEvent(employee, time) {
    let [date, hour] = time.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

function createTimeOutEvent(employee, time) {
    let [date, hour] = time.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

function hoursWorkedOnDate(employee, date) {
    let startDate = employee.timeInEvents.find(function(e){
        return e.date === date
    })

    let endDate = employee.timeOutEvents.find(function(e){
        return e.date === date
    })

    return (endDate.hour - startDate.hour) / 100
}

function wagesEarnedOnDate(employee, date) {
    let wage = hoursWorkedOnDate(employee, date)
        * employee.payPerHour
    return parseFloat(wage.toString())
}

function allWagesFor(employee){
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

function calculatePayroll(arr){
    return arr.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}

 function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(function(rec){
      return rec.firstName === firstName
    })
  }