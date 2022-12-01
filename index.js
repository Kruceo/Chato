const width =         "fit-content"
const height =        "fit-content"
const lifeTime =      5000             
const padding =       10+'px'           
const notifications = []            
const animationSpeed = 500            
const maxStack =        8           
const stack =         [0,0,0,0]       
const pos = 'right'   
function createNotificationCore()
{
    let core = {
        pos,
        width,
        height,
        lifeTime,
        padding,
        notifications,
        animationSpeed,
        maxStack,
        stack,
        spawnMessage: (title,message,options)=>spawnMessage(title,message,options,core),
        thread: null    ,
    }
    for (let i = 0; i < core.maxStack; i++) {
        core.stack[i] = 0
        
    }
    const thread = setInterval(() => {
        let freeCandidate = 999
    
        core.notifications.sort((a, b) => a.stackPos - b.stackPos).forEach((each) => {
            if (!each || each.killed) {
                each = null;
                return
            }
            for (let i = 1; i <= core.stack.length; i++) {
                if (core.stack[i] == 0) {
                    freeCandidate = i
                    if (each.stackPos > freeCandidate) {
                        core.stack[each.stackPos] = 0
                        each.stackPos = freeCandidate
                        core.stack[freeCandidate] = 1
                        each.el.style.top = (window.visualViewport.height - each.el.offsetHeight * freeCandidate) + 'px'
                    }
                    break
                }
            }
            return
        })
    }, 13);

    core.thread = thread
    return core
}

function spawnMessage(title, message,options,core) {
    let obj = { el: null, stackPos: core.maxStack*2, killed: false }
    let popupBody = document.createElement('div')

    if(!options)options = {}
    popupBody.setAttribute('class',options.class??('notification '+(core.notifications.length+1)))
    popupBody.style.backgroundColor = options?.bg??"#fff"
    popupBody.style.position = "fixed"

    let titleEl = document.createElement('h2')
    let messageEl = document.createElement('p')

    titleEl.innerText = title
    messageEl.innerText = message
    popupBody.appendChild(titleEl)
    popupBody.appendChild(messageEl)
    popupBody.style.opacity = 0
    popupBody.style.transition = "all "+core.animationSpeed+"ms"
    popupBody.style.padding = core.padding
    obj.el = popupBody
    core.notifications.push(obj)
    document.body.appendChild(popupBody)

    setTimeout(() => {
        popupBody.style.opacity = 1
    }, 1);
    popupBody.style.left = (window.visualViewport.width - popupBody.offsetWidth) + 'px'
    popupBody.style.top = -200 + 'px'
    setTimeout(() => {
        popupBody.style.opacity = 0
        setTimeout(() => {
            popupBody.remove()
            core.stack[obj.stackPos] = 0
            obj.killed = true
        }, animationSpeed);
    }, options?.lifetime ?? core.lifeTime);
}

