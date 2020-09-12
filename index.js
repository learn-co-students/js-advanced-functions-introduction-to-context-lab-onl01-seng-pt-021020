// Your code here

function createEmployeeRecord(record) {
    return {
        firstName: record[0],
        familyName: record[1],
        title: record[2],
        payPerHour: record[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

function createEmployeeRecords(array) {
    return array.map(record => createEmployeeRecord(record))
}

function createTimeInEvent(record, time) {
    let [date, hour] = time.split(' ')

    record.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    })
    return record
}

function createTimeOutEvent(record, time) {
    let [date, hour] = time.split(' ')

    record.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    })
    return record
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

function allWagesFor(employee) {
    let availableDates = employee.timeInEvents.map(function(e){
        return e.date
    })
    let wages = availableDates.reduce(function(record, d){
        return record + wagesEarnedOnDate(employee, d) 
    }, 0)

    return wages
}

function calculatePayroll(employees) {
    return employees.reduce(function(employee, record) {
        return employee + allWagesFor(record)
    }, 0)
}

function findEmployeeByFirstName(employee, firstName) {
    return employee.find(function(record){
        return record.firstName === firstName
      })
}