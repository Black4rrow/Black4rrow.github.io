function toggleMenu() {
    const navbar = document.getElementById('navbar');
    const overlay = document.querySelector('.overlay');
    navbar.classList.toggle('active');
    overlay.classList.toggle('active');
}

function closeMenu() {
    const navbar = document.getElementById('navbar');
    const overlay = document.querySelector('.overlay');
    navbar.classList.remove('active');
    overlay.classList.remove('active');
}


const canvas = document.getElementById('gridCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const pointRadius = 1;
const spacing = 40;

function drawPoint(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, pointRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgb(79, 79, 79)';
    ctx.fill();
}

function drawGrid() {
    const rows = Math.ceil(canvas.height / spacing);
    const cols = Math.ceil(canvas.width / spacing);

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const xOffset = (row % 2 === 0) ? 0 : spacing / 2;
            const x = col * spacing + xOffset;
            const y = row * spacing;
            drawPoint(x, y);
        }
    }
}

//     window.addEventListener('resize', () => {
//         canvas.width = window.innerWidth;
//         canvas.height = window.innerHeight;
//         drawGrid();
//     });

// drawGrid();

