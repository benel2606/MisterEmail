import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const emailService = {
    query,
    save,
    remove,
    getById,
    createMail,
    getDefaultFilter
}

const STORAGE_KEY = 'mails'

_createMails()

async function query(filterBy) {
    let emails = await storageService.query(STORAGE_KEY)
    if (filterBy) {
        var { value } = filterBy
        emails = emails.filter(email => email.subject.toLowerCase().includes(value.toLowerCase()) ||
        email.body.toLowerCase().includes(value.toLowerCase()))
    }
    return emails
}

function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}

function save(emailToSave) {
    if (emailToSave.id) {
        return storageService.put(STORAGE_KEY, emailToSave)
    } else {
        emailToSave.isOn = false
        return storageService.post(STORAGE_KEY, emailToSave)
    }
}

function createMail(subject = '', body = '', isRead = false, isStarred=false, sentAt=null, removedAt=null) {
    return {
        subject,
        body,
        isRead,
        isStarred,
        sentAt,
        removedAt
    }
}

function _createMails() {
    let emails = utilService.loadFromStorage(STORAGE_KEY)
    if (!emails || !emails.length) {
        const emails = [{ 
            id: 'e101',
            subject: 'Miss you!',
            body: 'Would love to catch up sometimes', 
            isRead: false, 
            isStarred: false, 
            sentAt : 1551133930594, 
            removedAt : null, //for later use from: 'momo@momo.com', to: 'user@appsus.com' 
        },
        {
            id: 'e102',
            subject: 'Hello!',
            body: 'How are you?', 
            isRead: false, 
            isStarred: false, 
            sentAt : 1551133930599, 
            removedAt : null, //for later use from: 'momo@momo.com', to: 'user@appsus.com' 
        }
    ]
        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}

function getDefaultFilter() {
    return {
        value:""
        //subject:'',
        // body:'',
        // isRead:'',
        // isStarred:'',
        // sentAt:'',
        // removedAt:''
    }
}



