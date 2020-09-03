// Your code here
function createEmployeeRecord(arr) {
  let newObj = {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  }
  return newObj
}

function createEmployeeRecords(arrays) {
  let newArr = arrays.map(arr => createEmployeeRecord(arr))
  return newArr
}

function createTimeInEvent(obj, timeStamp) {
  let [date, hour] = timeStamp.split(' ')
  obj.timeInEvents.push({ type: 'TimeIn', hour: parseInt(hour, 10), date: date })
  return obj
}

function createTimeOutEvent(obj, timeStamp) {
  let [date, hour] = timeStamp.split(' ')
  obj.timeOutEvents.push({ type: 'TimeOut', hour: parseInt(hour, 10), date: date })
  return obj
}

function hoursWorkedOnDate(obj, timeStamp) {
  let tIn = obj.timeInEvents.find(time => time.date === timeStamp)
  let tOut = obj.timeOutEvents.find(time => time.date === timeStamp)
  return (tOut.hour - tIn.hour) / 100
}

function wagesEarnedOnDate(obj, timeStamp) {
  let hoursWorked = hoursWorkedOnDate(obj, timeStamp)
  return hoursWorked * obj.payPerHour
}

function allWagesFor(obj) {
  let wages = obj.timeInEvents.map(time => wagesEarnedOnDate(obj, time.date))
  return wages.reduce((a, b) => a + b)

}

function calculatePayroll(array) {
  return array.reduce((accu, emp) => {
    return accu + allWagesFor(emp)
  }, 0)
}

function findEmployeeByFirstName(arr, name) {
  return arr.find(emp => emp.firstName == name)
}