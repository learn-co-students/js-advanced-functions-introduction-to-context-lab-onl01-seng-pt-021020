function createEmployeeRecord(employeeArray){
    return {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
};

function createEmployeeRecords(employeesArray){
    return employeesArray.map(function(emp){
        return createEmployeeRecord(emp)
    })
};

function createTimeInEvent(employeeRecord, dateStamp){
    let [date, hour] = dateStamp.split(' ')
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return employeeRecord
};

function createTimeOutEvent(employeeRecord, dateStamp){
    let [date, hour] = dateStamp.split(' ')
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return employeeRecord
};

function hoursWorkedOnDate(employeeRecord, dateStamp){
    let clockIn = employeeRecord.timeInEvents.find(function(e){
        return e.date === dateStamp
    })    
    let clockOut = employeeRecord.timeOutEvents.find(function(e){
        return e.date === dateStamp
    })
    return (clockOut.hour - clockIn.hour) / 100
};

function wagesEarnedOnDate(employeeRecord, dateStamp){
    let totalWage = hoursWorkedOnDate(employeeRecord, dateStamp) * employeeRecord.payPerHour
    return totalWage
};

function allWagesFor(employeeRecord){
    let eligibleDates = employeeRecord.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(total, date){
        return total + wagesEarnedOnDate(employeeRecord, date)
    }, 0)

    return payable
};

function findEmployeeByFirstName(employeeArray, firstName){
    return employeeArray.find(function(employee){
        return employee.firstName === firstName
    })
};

function calculatePayroll(employeeArray){
    return employeeArray.reduce(function(total, record){
        return total + allWagesFor(record)
    }, 0)
}