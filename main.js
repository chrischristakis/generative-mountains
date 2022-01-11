const canvas = document.getElementById("c");
let cw = canvas.width = window.innerWidth;
let ch = canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
const SLOPE_DELTA = 1.8;
const SLOPE_MAX = 3.5;
const GROUND = ch;

function rint(min, max) { return Math.random() * (max - min) + min; }

function draw(noOfMount) {
    let hue = rint(0, 360);
    let alpha = 1;
    for(let i = 0; i < noOfMount; i++) {
        hue = (hue + rint(-45, 45)) % 360;
        const MAX_HEIGHT = GROUND - (ch/noOfMount)*i;

        // True randomness would just produce noise. The trick is to alter the slope, not the positions.
        ctx.beginPath();
        ctx.moveTo(-1, GROUND);
        
        let slope = rint(-SLOPE_DELTA, SLOPE_DELTA);
        let height = rint(MAX_HEIGHT-100, MAX_HEIGHT);
        for(let x = 0; x < cw; x++) {
            slope += rint(-SLOPE_DELTA, SLOPE_DELTA);

            if(Math.abs(slope) > SLOPE_MAX)
                slope = SLOPE_MAX * Math.abs(slope)/slope;
            
            height += slope;
            if(height < MAX_HEIGHT) {
                slope *= -1;
                height = MAX_HEIGHT;
            }
            if(height > GROUND) {
                slope *= -1;
                height = GROUND;
            }

            ctx.lineTo(x, height)
        }

        const gradient = ctx.createLinearGradient(0, 0, cw, ch)
        gradient.addColorStop(0, `hsla(${hue}, 100%, 40%, ${alpha})`);
        gradient.addColorStop(1, `hsla(${(hue+rint(-63,63))%360}, 100%, 40%, ${alpha})`);
        alpha -= 1/noOfMount;

        ctx.fillStyle = gradient;
        ctx.strokeStyle = gradient;
        ctx.lineTo(cw, GROUND);
        ctx.stroke();
        ctx.closePath();
        ctx.fill();
    }
}
 
window.onmousedown = () => {
    ctx.clearRect(0, 0, cw, ch);
    draw(8);
}
draw(8);