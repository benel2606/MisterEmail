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
    getCurrentLocation,
    getLoggedUser,
    getFilterFromSearchParams,
    countUnreadEmails
}

const STORAGE_KEY = 'mails'

_createMails()

async function query(filterBy,sortBy) {
    console.log("filterBy",filterBy)
    console.log("sort",sortBy)
    try {
        let emails = await storageService.query(STORAGE_KEY)
        if (filterBy) {
            let {txt,status}=filterBy
            emails = emails.filter(email => email.subject.toLowerCase().includes(txt.toLowerCase()) ||
            email.body.toLowerCase().includes(txt.toLowerCase())||email.fromName.toLowerCase().includes(txt.toLowerCase()))

            if (status.includes('inbox')) {
                emails = emails.filter(email => email.folder=='inbox')
             }
            if (status.includes('starred')) {
                emails = emails.filter(email => (email.isStarred)&&(!email.removedAt))
             }
            if (status.includes('sent')) {
                emails = emails.filter(email => email.folder=='sent')
            }
            if (status.includes('all-mail')) {
                emails = emails.filter(email => !email.removedAt)
            }
            if (status.includes('trash')) {
                emails = emails.filter(email => email.removedAt)
            }
            if (sortBy) {
                if (sortBy.sort==='date'){
                    emails=sortBy.direct?emails.sort((a,b)=>b.sentAt-a.sentAt):emails=emails.sort((a,b)=>a.sentAt-b.sentAt)
                }
                if (sortBy.sort==='read'){
                    emails=sortBy.direct?emails.sort((a,b)=>a.isRead-b.isRead):emails.sort((a,b)=>b.isRead-a.isRead)
                }
                if (sortBy.sort==='starred'){
                    emails=sortBy.direct?emails.sort((a,b)=>b.isStarred-a.isStarred):emails.sort((a,b)=>a.isStarred-b.isStarred)
                }
            }
        }
        return emails
    }catch (error) {
    console.log('error:', error)
    throw error
}
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

function createMail(fromEmail='',toEmail='',fromName='',toName='',subject = '', body = '', isRead = false, isStarred=false, sentAt=null, removedAt=null,folder='') {
    return {
        fromEmail,
        toEmail,
        fromName,
        toName,
        subject,
        body,
        isRead,
        isStarred,
        sentAt,
        removedAt,
        folder
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
                "sentAt": 1702121830000,
                "folder":"inbox",
                "removedAt":null
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
                "sentAt": 1692681843000,
                "folder":"sent",
                "removedAt":null
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
                "sentAt": 1701695441000,
                "folder":"inbox",
                "removedAt":null
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
                "sentAt": 1738635793000,
                "folder":"sent",
                "removedAt":null
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
                "sentAt": 1727177520000,
                "folder":"inbox",
                "removedAt":null
            }
        ]
        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}

function getDefaultFilter() {
    return {
        txt:"",
        status:""
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

  function getLoggedUser() {
        return { email: 'benel2606@gmail.com', fullname: 'Benel Aharon' }

}
function getFilterFromSearchParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        filterBy[field] = searchParams.get(field) || ''
    }
    return filterBy
}
function countUnreadEmails(emails) {
    const unreadEmails = {}
    const Unread = emails.filter(email =>email.isRead === false);
    unreadEmails.allMail = Unread.filter(email => !email.removedAt ).length || 0;
    unreadEmails.inbox = Unread.filter(email => email.folder ==="inbox" ).length || 0;
    unreadEmails.sent = Unread.filter(email => email.folder ==="sent" ).length || 0;
    unreadEmails.starred = Unread.filter(email => email.isStarred && !email.removedAt).length || 0;
    unreadEmails.trash = Unread.filter(email => email.removedAt ).length || 0;
    return unreadEmails;
}