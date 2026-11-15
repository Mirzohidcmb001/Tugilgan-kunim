
// 19-NOYABR 2026, SOAT 00:00
const deadline = new Date(2026, 10, 19, 0, 0, 0);

function updateTimer() {
    const now = new Date();
    const difference = deadline - now;

    const days = document.getElementById("days");
    const hours = document.getElementById("hours");
    const minutes = document.getElementById("minutes");
    const seconds = document.getElementById("seconds");
    const expired = document.getElementById("expired");

    if (difference <= 0) {
        days.textContent = "00";
        hours.textContent = "00";
        minutes.textContent = "00";
        seconds.textContent = "00";

        expired.textContent = "🎉 TUG'ILGAN KUN BOSHLANDI!";

        return;
    }

    const d = Math.floor(difference / 86400000);
    const h = Math.floor((difference % 86400000) / 3600000);
    const m = Math.floor((difference % 3600000) / 60000);
    const s = Math.floor((difference % 60000) / 1000);

    days.textContent = String(d).padStart(2, "0");
    hours.textContent = String(h).padStart(2, "0");
    minutes.textContent = String(m).padStart(2, "0");
    seconds.textContent = String(s).padStart(2, "0");
}

updateTimer();
setInterval(updateTimer, 1000);


// SOVG'A QUTISI
function openGift() {
    const message = document.getElementById("message");

    message.style.display = "block";

    document.getElementById("giftBox").textContent = "🎉";

    message.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

    celebrate();
}


// KONFETTI
function celebrate() {
    const canvas = document.getElementById("confetti");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = [
        "#ff4ecd",
        "#ffd166",
        "#ffffff",
        "#a855f7",
        "#00f5d4",
        "#ff8fab"
    ];

    let particles = [];

    for (let i = 0; i < 180; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: -Math.random() * canvas.height,
            size: Math.random() * 8 + 3,
            speed: Math.random() * 5 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360
        });
    }

    let frame = 0;

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation * Math.PI / 180);

            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);

            ctx.restore();

            p.y += p.speed;
            p.x += Math.sin(p.y / 20);
            p.rotation += 3;
        });

        frame++;

        if (frame < 180) {
            requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    animate();
}


// UCHUVCHI SHARLAR
const emojis = ["🎈", "🎉", "✨", "🎊", "💜"];

for (let i = 0; i < 15; i++) {
    const balloon = document.createElement("div");

    balloon.className = "balloon";
    balloon.textContent = emojis[i % emojis.length];

    balloon.style.left = Math.random() * 100 + "%";
    balloon.style.animationDelay = Math.random() * 12 + "s";
    balloon.style.animationDuration = (9 + Math.random() * 8) + "s";

    document.body.appendChild(balloon);
}


// OYNANI O'ZGARTIRGANDA HAM HISOBLAGICHNI YANGILASH
document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
        updateTimer();
    }
});

window.addEventListener("resize", () => {
    const canvas = document.getElementById("confetti");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
