import React, { Component } from 'react';
import LocalStorageService from '../localStorageService'

const prefix_key = "schedule"

class ScheduleService {
    
    static save(client) {
        let list = ScheduleService.findAll()
        if(client.id){
            LocalStorageService.deleteData(prefix_key, client.id)
        } else {
            let nextId = ScheduleService.getNextId()
            client.id = nextId;
        }
        LocalStorageService.saveDataArray(prefix_key, client)
    }

    static delete(id){
        LocalStorageService.deleteData(prefix_key, id)
    }

    static findAll() {
        return LocalStorageService.getData(prefix_key)
    }

    static findOne(id) {
        return LocalStorageService.getData(prefix_key).filter(c => c.id == id)[0]
    }

    static findByInactive(inactive) {
        let list = LocalStorageService.getData(prefix_key) || []
        return list.filter(c => c.active !== inactive)
    }

    static findByDateAndClient(date, client){
        console.log("date", date)
        let list = LocalStorageService.getData(prefix_key) || []
        console.log("list", list)
        return date 
            ? list.filter(s => (!date || (new Date(s.date).getDay() == new Date(date).getDay() && new Date(s.date).getMonth() == new Date(date).getMonth()))
            && (!client || s.client == client))
            : list
        }

    static getNextId() {
        let listClients = LocalStorageService.getData(prefix_key) || []
        let listIds = listClients.map(c => c.id)
        let lastId = Math.max(...listIds)
        return listIds[0] ? lastId + 1 : 1
    }

    static getListHoursByEmployee(employee) {
        let allHours = this.generateListHours(8, 12, 2).concat(this.generateListHours(14, 18, 2))
        console.log("AQUI", employee.schedules);
        if(employee.schedules != null && employee.schedules.length > 0){
            let scheduleHours = employee.schedules.map(s => parseInt(s.hour.substr(0,2)))
            console.log(scheduleHours)
            scheduleHours.forEach(s => {
                let index = allHours.indexOf(s);
                if (index > -1) {
                    allHours.splice(index, 1);
                }
            })
        }
        return allHours
    }

    static generateListHours(init, final, interval) {
        let result = []
        for (let i = init; i <= final; i = i + interval) {
            result.push(i);
        }
        return result;
    }

}

export default ScheduleService