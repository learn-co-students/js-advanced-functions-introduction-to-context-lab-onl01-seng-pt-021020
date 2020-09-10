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
        hour: dateStr.split(' ')[1].slice(0, 1),
        date: dateStr.split(' ')[0]
    })

    return emplObj
}
