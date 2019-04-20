import React, { Component } from 'react';

class LocalStorageService {

    static deleteData(name, id){
        var currentArray = LocalStorageService.getData(name) || []
        currentArray = currentArray.filter(a => a.id != id)
        localStorage.setItem(name, JSON.stringify(currentArray))
    }

    static saveDataArray(name, content) {
        var currentArray = LocalStorageService.getData(name) || []
        currentArray.push(content)
        localStorage.setItem(name, JSON.stringify(currentArray))
    }
    
    static saveDataObject(name, content) {
        localStorage.setItem(name, JSON.stringify(content))
    }

    static getData(name) {
        return JSON.parse(localStorage.getItem(name))
    }

}

export default LocalStorageService