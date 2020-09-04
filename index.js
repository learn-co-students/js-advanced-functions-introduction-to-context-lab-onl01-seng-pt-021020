// Your code here

function createEmployeeRecord(row) {
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployees(dataEmployees) {
    return dataEmployees.map(row => createEmployeeRecord(row))
}

function createTimeInEvent(employee, newEvent) {
    let [date, hour] = newEvent.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    })

    return employee
}

function createTimeOutEvent(employee, newEvent) {
    let [date, hour] = newEvent.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    })

    return employee
}

function hoursWorkedOnDate(employee, timeEvent) {
    let timeIn = employee.timeInEvents.find(function(e) {
        return e.date === timeEvent
    })

    let timeOut = employee.timeOutEvents.find(function(e){
        return e.date === timeEvent
    })

    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(employee, timeEvent) {
    let wage = hoursWorkedOnDate(employee, timeEvent) * employee.payPerHour

    return parseFloat(wage.toString())
}

function allWagesFor(employee) {
    let workDates = employee.timeInEvents.map(function(e) {
        return e.date
    })

    let wages = workDates.reduce(function(cRecord, day){
        return cRecord + wagesEarnedOnDate(employee, day)
    }, 0)

    return wages
}

function createEmployeeRecords(rec) {
    return rec.map(function(row) {
        return createEmployeeRecord(row)
    })
}

function findEmployeeByFirstName(employees, firstName) {
    return employees.find(function(employee) {
        return employee.firstName === firstName
    })
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce(function(emp, rec) {
        return emp + allWagesFor(rec)
    }, 0)
}