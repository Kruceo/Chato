# Chato

## Introduction

Chato is an easily customizable and practical pop-up notification generator.

## Instalation

```console
$ npm install kruceo/chato
```


<br><br>
# Getting Started

## Initializing a instance

Chato works with a instance core that you can create with a single function, like this:
```js
const mySpawner = createNotificationCore()
```

This takes care of the management, styling and mechanics of all your notifications.
<br><br><br>
## **spawnMessage** Function

This function spawn a notification preset with title and message

```js
mySpawner.spawnMessage("This is a title!","This is a message!)
```

spawnMessage can be filled with 3 arguments: (`Title(string | number)`, `Message(string | number)`,  `options(Object)`)
<br>
<br><br>
## **spawnElement** Function

This function spawn a notification with a custom element indexed.



```js
const myElement = document.createElement('a')
myElement.innerText = "Click here!"
myElement.href = "https://home.kruceo.com"

mySpawner.spawnElement(myElement)
```

spawnElement can be filled with 2 arguments: (`Element(element)`,  `options(Object)`)