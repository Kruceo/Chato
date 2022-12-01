let test = createNotificationCore()
test.animationSpeed = 1000
let test2 = createNotificationCore()
test.animationSpeed = 250
test.lifeTime = 10000
test.pos = 300
let el = document.createElement('a')
el.innerText = "click no link parceiro"
el.href = "http://home.kruceo.com"
document.querySelector('button').addEventListener("click",(e)=>
{   
    test.spawnMessage('10 Segundos','10000ms')
    test2.spawnElement(el,{bg:'red'})
})