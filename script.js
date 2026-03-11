function cutCake() {
    const cake = document.querySelector('.cake');
    cake.innerHTML = "🍰"; // Changes to a slice
    alert("Yum! Jaggu just ate a slice! 🎂✨");
    startFireworks(); // Trigger celebration!
}

function openGift() {
    const gift = document.querySelector('.gift');
    gift.innerHTML = "💎"; // Or 💍 or 🧸
    alert("A special shiny gem for a special topper! 🎁💖");
    
    // Play music if it was blocked by browser
    const music = document.getElementById('bgMusic');
    music.play().catch(() => console.log("User needs to interact first"));
}

// Simple Fireworks for Mobile performance
function startFireworks() {
    const canvas = document.getElementById('fireworks');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    for(let i=0; i<50; i++) {
        particles.push({
            x: canvas.width/2,
            y: canvas.height/2,
            vx: Math.random()*10 - 5,
            vy: Math.random()*10 - 5,
            color: `hsl(${Math.random()*360}, 100%, 70%)`
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.1; // gravity
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 3, 0, Math.PI*2);
            ctx.fill();
        });
        if(particles[0].y < canvas.height) requestAnimationFrame(animate);
    }
    animate();
}
