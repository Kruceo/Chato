let test = createNotificationCore()
test.animationSpeed = 1000
let test2 = createNotificationCore()
test.animationSpeed = 250
test.lifeTime = 10000
test.pos = 300
document.querySelector('button').addEventListener("click",(e)=>
{   
    test.spawnMessage('10 Segundos','10000ms')
    test2.spawnMessage('05 Segundos','5000ms',{bg:'red'})
})