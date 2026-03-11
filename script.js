const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

let player = {
x:50,
y:150,
vy:0
}

let gravity = 1

let obstacle = {
x:500
}

function jump(){

if(player.y===150){
player.vy=-15
}

}

document.addEventListener("keydown",e=>{
if(e.code==="Space"){
jump()
}
})

function draw(){

ctx.clearRect(0,0,500,200)

player.vy += gravity
player.y += player.vy

if(player.y>150){
player.y=150
player.vy=0
}

ctx.font="40px Arial"
ctx.fillText("🧸",player.x,player.y)

obstacle.x -=5

ctx.fillText("🎂",obstacle.x,170)

if(obstacle.x<0){
obstacle.x=500
}

if(obstacle.x<80 && player.y>130){

alert("🎉 Level Complete!")
window.location.href="birthday.html"

}

requestAnimationFrame(draw)

}

draw()
