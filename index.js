// Your code here
function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    };
};

function createEmployeeRecords(array) {
     return array.map(createEmployeeRecord);
};

function createTimeInEvent(obj, timeStamp) {
    let DateTime = timeStamp.split(" ");
    obj.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(DateTime[1]),
        date: DateTime[0]
    });
    return obj;
};

function createTimeOutEvent(obj, timeStamp) {
    let DateTime = timeStamp.split(" ");
    obj.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(DateTime[1]),
        date: DateTime[0]
    });
    return obj;
};

function hoursWorkedOnDate(employee, date) {
    let timeIn = employee.timeInEvents.find(day => day.date === date);
    let timeOut = employee.timeOutEvents.find(day => day.date === date);
    return parseInt((timeOut.hour - timeIn.hour) / 100);
};

function wagesEarnedOnDate(employee, date) {
    return employee.payPerHour * hoursWorkedOnDate(employee, date);
}

function allWagesFor(employee) {
    let daysWorked = employee.timeInEvents.map(time => time.date);
    return daysWorked.reduce(function(acc, date) {
        return acc + wagesEarnedOnDate(employee, date);
    }, 0);
};

function calculatePayroll(array) {
    return array.reduce((acc, employee) => {
        return acc + allWagesFor(employee);
    }, 0);
};

function findEmployeeByFirstName(allEmployees, employee) {
    return allEmployees.find(x => {
        return x.firstName === employee;
    });
};