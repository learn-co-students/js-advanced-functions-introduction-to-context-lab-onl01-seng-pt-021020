// Your code here
let createEmployeeRecord = (array) => {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

let createEmployeeRecords = (array) => {
    return array.map(obj => {
        return createEmployeeRecord(obj)
    });
}

let createTimeInEvent = (employee, timeStamp) => {
    let [date, hour] = timeStamp.split(" ")

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    });

    return employee;
}

let createTimeOutEvent = (employee, timeStamp) => {
    let [date, hour] = timeStamp.split(" ")

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    });

    return employee;
}

let hoursWorkedOnDate = (employee, workDate) => {
    let inEvent = employee.timeInEvents.find(e => {
        return e.date === workDate
    });
    let outEvent = employee.timeOutEvents.find(e => {
        return e.date === workDate
    });

    return (outEvent.hour - inEvent.hour) / 100

}

let wagesEarnedOnDate = (employee, workDate) => {
    let wagesEarned = hoursWorkedOnDate(employee, workDate) * employee.payPerHour;

    return parseFloat(wagesEarned.toString());
}

let allWagesFor = (employee) => {
    let datesWorked = employee.timeInEvents.map(e => {
        return e.date
    });

    let payable = datesWorked.reduce((memo, date) => {
        return memo + wagesEarnedOnDate(employee, date)
    }, 0);

    return payable;
}

let calculatePayroll = (employees) => {
    return employees.reduce((memo, empRecord) => {
        return memo + allWagesFor(empRecord)
    }, 0);
}

let findEmployeeByFirstName = (srcArray, firstName) => {
    return srcArray.find(rec => {
        return rec.firstName === firstName
    });
}