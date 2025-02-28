const canvas = document.querySelector('canvas');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var c = canvas.getContext('2d');

var mouse = {
    x: undefined,
    y: undefined
}

var colors = [
    '#025E73',
    '#011F26',
    '#A5A692',
    '#BFB78F',
    '#F2A71B'
]

window.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
})

function circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colors[Math.floor(Math.random() * colors.length)];

    this.draw = function() {
        c.beginPath();
        c.strokeStyle = this.color;
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.stroke();
    }

    this.nextFrame = function() {
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
    
        if(this.y + this.radius > innerHeight || this.y - radius < 0) {
            this.dy = -this.dy;
        }
    
        this.x += this.dx;
        this.y += this.dy;

        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) this.radius = this.minRadius * 6;
        else if(this.radius > this.minRadius) this.radius -= 1;

        this.draw();
    }

}

var circles = []

for(var i = 0; i < 800; i++) {
    var radius = Math.random() * 6 + 2;
    var x = Math.random() * (canvas.width - radius * 2) + radius;
    var y = Math.random() * (canvas.height - radius * 2) + radius;
    var dx = (Math.random() > 0.5 ? 1 : -1);
    var dy = (Math.random() > 0.5 ? 1 : -1);
    circles.push(new circle(x, y, dx, dy, radius));
}




function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    circles.forEach(circle => {
        circle.nextFrame();
    });
}

animate();