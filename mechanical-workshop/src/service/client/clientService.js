
import LocalStorageService from '../localStorageService'

const prefix_key = "client"

class ClientService {
    
    static save(client) {
        let list = ClientService.findAll()
        if(client.id){
            LocalStorageService.deleteData(prefix_key, client.id)
        } else {
            let nextId = ClientService.getNextId()
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

    static getNextId() {
        let listClients = LocalStorageService.getData(prefix_key) || []
        let listIds = listClients.map(c => c.id)
        let lastId = Math.max(...listIds)
        return listIds[0] ? lastId + 1 : 1
    }

}

export default ClientService