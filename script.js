window.onload = function(){

const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

canvas.width = 400
canvas.height = 200

let player = {
x:50,
y:150,
vy:0
}

let gravity = 1

let obstacle = {
x:400
}

let clouds = [
{x:50,y:40},
{x:200,y:60},
{x:320,y:30}
]

let frame = 0

function jump(){

if(player.y >=150){
player.vy = -12
}

}

document.addEventListener("touchstart", jump)
document.addEventListener("click", jump)

function drawClouds(){

ctx.font="40px Arial"

clouds.forEach(c=>{

ctx.fillText("☁️",c.x,c.y)

c.x -= 1

if(c.x < -50){
c.x = 420
}

})

}

function drawTeddy(){

ctx.font="40px Arial"

if(frame % 20 < 10){
ctx.fillText("🧸",player.x,player.y)
}else{
ctx.fillText("🐻",player.x,player.y)
}

}

function update(){

ctx.clearRect(0,0,canvas.width,canvas.height)

drawClouds()

player.vy += gravity
player.y += player.vy

if(player.y > 150){
player.y = 150
player.vy = 0
}

drawTeddy()

obstacle.x -= 4

ctx.font="35px Arial"
ctx.fillText("🎂",obstacle.x,170)

if(obstacle.x < -20){
obstacle.x = 400
}

if(obstacle.x < 80 && player.y > 130){

alert("🎉 Level Complete!")
window.location.href="birthday.html"

}

frame++

requestAnimationFrame(update)

}

update()

}
