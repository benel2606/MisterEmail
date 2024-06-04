import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const emailService = {
    query,
    save,
    remove,
    getById,
    createMail,
    getDefaultFilter,
    update,
    formattedDate,
    getCurrentLocation
}

const STORAGE_KEY = 'mails'

_createMails()

async function query(filter) {
    let emails = await storageService.query(STORAGE_KEY)
    if (filter) {
        var {value}  = filter.filterBy
        var currentLocation=filter.currentLocation

        emails = emails.filter(email => email.subject.toLowerCase().includes(value.toLowerCase()) ||
        email.body.toLowerCase().includes(value.toLowerCase())||email.fromName.toLowerCase().includes(value.toLowerCase()))

        if (currentLocation.includes('Starred')) {
            emails = emails.filter(email => email.isStarred)
        }
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

function update(mail) {
    return storageService.put(STORAGE_KEY, mail)
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
        const emails =[
            {
                "fromEmail": "sed.dolor@protonmail.ca",
                "toEmail": "iaculis.aliquet@icloud.ca",
                "fromName": "Lois Martinez",
                "toName": "Jolie Park",
                "id": "NVI51ZSU9HL",
                "subject": "nunc ullamcorper eu",
                "body": "neque. Sed eget lacus. Mauris non dui nec urna suscipit",
                "isStarred": false,
                "isRead": false,
                "sentAt": 1702121830000
            },
            {
                "fromEmail": "nibh.dolor@aol.edu",
                "toEmail": "sapien.cursus@aol.ca",
                "fromName": "Vincent Leon",
                "toName": "Palmer Webb",
                "id": "VSP54PED7PK",
                "subject": "aliquam",
                "body": "est mauris, rhoncus id, mollis nec, cursus a, enim. Suspendisse aliquet, sem ut cursus luctus, ipsum leo elementum sem, vitae aliquam eros turpis non enim. Mauris quis turpis vitae purus gravida sagittis. Duis gravida. Praesent eu nulla at sem molestie sodales. Mauris blandit enim",
                "isStarred": false,
                "isRead": true,
                "sentAt": 1692681843000
            },
            {
                "fromEmail": "non.lobortis@yahoo.org",
                "toEmail": "in.aliquet@aol.ca",
                "fromName": "Farrah Knight",
                "toName": "Fitzgerald Stone",
                "id": "MVP20PDF2PW",
                "subject": "Maecenas libero est",
                "body": "hendrerit id, ante. Nunc mauris sapien, cursus in, hendrerit consectetuer, cursus et, magna. Praesent interdum ligula eu enim. Etiam imperdiet dictum magna. Ut tincidunt orci quis lectus.",
                "isStarred": true,
                "isRead": false,
                "sentAt": 1701695441000
            },
            {
                "fromEmail": "lorem@aol.com",
                "toEmail": "ultrices@yahoo.com",
                "fromName": "Larissa Blake",
                "toName": "Keefe Rivers",
                "id": "UKJ83DNJ8HN",
                "subject": "Suspendisse aliquet",
                "body": "rutrum lorem ac risus. Morbi metus. Vivamus euismod urna. Nullam lobortis quam a felis ullamcorper viverra. Maecenas iaculis",
                "isStarred": true,
                "isRead": true,
                "sentAt": 1738635793000
            },
            {
                "fromEmail": "tortor@outlook.ca",
                "toEmail": "magna@hotmail.couk",
                "fromName": "Grady Randolph",
                "toName": "Sylvia Livingston",
                "id": "GXV52YYI6MT",
                "subject": "Aenean sed",
                "body": "sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu imperdiet ullamcorper. Duis at lacus. Quisque purus sapien, gravida non, sollicitudin a, malesuada id, erat. Etiam vestibulum",
                "isStarred": true,
                "isRead": false,
                "sentAt": 1727177520000
            }
        ]
        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}

function getDefaultFilter() {
    return {
        value:""
    }
}

function formattedDate(timestamp, fromComponent) {
    const date = new Date(timestamp)
    return fromComponent == "EmailPreview"
      ? date.toLocaleDateString()
      : date.toLocaleString()
  }

  function getCurrentLocation(location){
    let currentLocation = location.pathname.split("/").pop()
    return currentLocation === "" ? "inbox" : currentLocation
  }

