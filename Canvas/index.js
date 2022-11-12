const width= 400;
const height= 400;
let radius = 150;

function createClockContainer() {
    let container = document.querySelector('.container');

    let canvasClock = document.createElement('canvas');
    canvasClock.setAttribute('id', 'clock');
    canvasClock.width = width;
    canvasClock.height = height;
    container.append(canvasClock);
    return canvasClock.getContext("2d");
}

let ctx = createClockContainer();

function createClock() {
    ctx.beginPath();
    ctx.arc(width/2, height/2, 200, 0, Math.PI * 2, false);
    ctx.fillStyle = "pink";
    ctx.fill();
}

function createDialElements(){
    let angle=null;

    for (let i=1; i<=12; i++){
        radius = 150;
        angle += 30;
        let angleRadians = angle/180*Math.PI;
        ctx.fillStyle = "rgb(251, 242, 211)";
        ctx.beginPath();
        ctx.arc(width/2+radius*Math.sin(angleRadians),height/2-radius*Math.cos(angleRadians), 23, 0, 2*Math.PI);
        ctx.fill();

        let theString = i;
        ctx.font = "22px Georgia";
        ctx.fillStyle = "black";
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle'
        ctx.fillText(theString, width/2+radius*Math.sin(angleRadians), height/2-radius*Math.cos(angleRadians));
    }
}

function createDigitalClock(seconds, minutes, hours) {
    ctx.beginPath();
    ctx.font = `22px Arial`;
    ctx.fillStyle = 'black';
    ctx.fillText(`${hours} : ${minutes} : ${seconds}`, width/2, width/ 3);
}    
    
function createArrow (widthArrow, heightArrow, angle){
    let angleRadians = angle / 180 * Math.PI;
    let x1 = width/2 - 20 * Math.sin(angleRadians);
    let y1 =width/2+ 20 * Math.cos(angleRadians);
    let x2 = width/2 + heightArrow * Math.sin(angleRadians);
    let y2 = width/2 - heightArrow * Math.cos(angleRadians);


    ctx.beginPath();
    ctx.lineWidth = widthArrow;
    ctx.lineCap = 'round';
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = "black";
    ctx.stroke();
}

function updateTime() {
    let date= new Date();

    let seconds = (String(date.getSeconds()).length !== 2) ? '0' + date.getSeconds() : date.getSeconds();
    let minutes = (String(date.getMinutes()).length !== 2) ? '0' + date.getMinutes() : date.getMinutes();
    let hours = (String(date.getHours()).length !== 2) ? '0' + date.getHours() : date.getHours();


    createClock();
    createDialElements();
    createDigitalClock(seconds, minutes, hours);


    let dateHour = 30*(date.getHours() + (1/60)*date.getMinutes());        
    let dateMin = 6*(date.getMinutes() + (1/60)*date.getSeconds());
    let dateSec = 6*date.getSeconds();

    createArrow(3, radius+20, dateSec);
    createArrow(5, radius, dateMin);
    createArrow(7, radius-20, dateHour);

    setTimeout(updateTime, 1020 - date.getMilliseconds());
}

updateTime();