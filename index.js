function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(array) {
    return array.map(arr => {
        return createEmployeeRecord(arr);
    })
}

function createTimeInEvent(emp, time) {
    let [date, hour] = time.split(" ");
    emp.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    })
    return emp;
}

function createTimeOutEvent(emp, time) {
    let [date, hour] = time.split(" ");
    emp.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    })
    return emp;
}

function hoursWorkedOnDate(emp, date) {
    let timeIn = emp.timeInEvents.find(e => {return e.date === date})
    let timeOut = emp.timeOutEvents.find(e => {return e.date === date})
    let hoursWorked = (timeOut.hour - timeIn.hour)/100
    return hoursWorked;
}

function wagesEarnedOnDate(emp,date) {
    let hoursWorked = hoursWorkedOnDate(emp, date);
    let payWage = emp.payPerHour;
    return payWage * hoursWorked;
}

function allWagesFor(emp) {
    let datesWorked = emp.timeInEvents.map(e => {
        return e.date;
    })
    let wages = datesWorked.reduce((acc, date) => {
        return acc + wagesEarnedOnDate(emp, date)
    },0)
    return wages;
}

function calculatePayroll(employees) {
    let payRoll = employees.reduce((acc, emp) => {
        return acc + allWagesFor(emp);
    }, 0)
    return payRoll;
}

function findEmployeeByFirstName(employees, firstName) {
    return employees.find(emp => {
        return emp.firstName === firstName;
    })
}