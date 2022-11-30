
let width = "fit-content"
let height = "fit-content"
let lifeTime = 5000
let padding = 10+'px'
let notifications = []
let animationSpeed = 500
let maxStack = 8
let stack = [0,0,0,0]
for (let i = 0; i < maxStack; i++) {
    stack[i] = 0
    
}
console.log(stack)
function spawnMessage(title, message,options) {
    let obj = { el: null, stackPos: maxStack*2, killed: false }
    let popupBody = document.createElement('div')

   
    if(!options)options = {}
    popupBody.setAttribute('class',options.class??('notification '+(notifications.length+1)))
    popupBody.style.backgroundColor = options?.bg??"#fff"
    popupBody.style.position = "fixed"

    let titleEl = document.createElement('h2')
    let messageEl = document.createElement('p')

    titleEl.innerText = title
    messageEl.innerText = message
    popupBody.appendChild(titleEl)
    popupBody.appendChild(messageEl)
    popupBody.style.opacity = 0
    popupBody.style.transition = "all "+animationSpeed+"ms"
    popupBody.style.padding = padding
    obj.el = popupBody
    notifications.push(obj)
    document.body.appendChild(popupBody)

    setTimeout(() => {
        popupBody.style.opacity = 1
    }, 1);
    popupBody.style.left = (window.visualViewport.width - popupBody.offsetWidth) + 'px'
    popupBody.style.top = (window.visualViewport.height - popupBody.offsetHeight * obj.stackPos) + 'px'
    setTimeout(() => {
        popupBody.style.opacity = 0
        setTimeout(() => {
            popupBody.remove()
            stack[obj.stackPos] = 0
            obj.killed = true
        }, animationSpeed);
    }, options?.lifetime ?? lifeTime);
}

const thread = setInterval(() => {
    let freeCandidate = 999

    notifications.sort((a, b) => a.stackPos - b.stackPos).forEach((each) => {
        if (!each || each.killed) {
            each = null;
            return
        }
        for (let i = 1; i <= stack.length; i++) {
            if (stack[i] == 0) {
                freeCandidate = i
                if (each.stackPos > freeCandidate) {
                    stack[each.stackPos] = 0
                    each.stackPos = freeCandidate
                    stack[freeCandidate] = 1
                    each.el.style.top = (window.visualViewport.height - each.el.offsetHeight * freeCandidate) + 'px'
                }
                break
            }
        }
        return
    })
}, 13);