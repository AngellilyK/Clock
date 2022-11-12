"use strict";
const svgNS = "http://www.w3.org/2000/svg";
let date= new Date();

let lineSeconds = document.createElementNS(svgNS, "line");
let lineMinutes = document.createElementNS(svgNS, "line");
let lineHours = document.createElementNS(svgNS, "line");

let digitalClock = document.createElementNS(svgNS,"text");


function drawSVGElements() {

    const svg = document.getElementById("clock");

    const w = parseFloat(svg.getAttributeNS(null, "width"));
    const h = parseFloat(svg.getAttributeNS(null, "height"));

    let circle = document.createElementNS(svgNS,"circle");

    circle.setAttributeNS(null,"cx", w/2);
    circle.setAttributeNS(null,"cy", h/2);
    circle.setAttributeNS(null,"r", w > h ? h/2 : w/2);
    circle.setAttributeNS(null,"fill","pink");
    circle.setAttributeNS(null,"stroke","none");

    svg.append(circle);

    let angle=null;
    let radius = 150;
    for (let i=1; i<=12; i++){
        radius = 150;
        angle += 30;
        let angleRadians = angle/180*Math.PI;
        let circleNumber = document.createElementNS(svgNS,"circle");
        circleNumber.setAttributeNS(null,"cx", w/2+radius*Math.sin(angleRadians));
        circleNumber.setAttributeNS(null,"cy", h/2-radius*Math.cos(angleRadians));
        circleNumber.setAttributeNS(null,"r", "23");
        circleNumber.setAttributeNS(null,"fill","rgb(251, 242, 211)");
        circleNumber.setAttributeNS(null,"stroke","none");
        
        svg.append(circleNumber);

        let text = document.createElementNS(svgNS,"text");
        text.setAttributeNS(null,"x", w/2+radius*Math.sin(angleRadians));
        text.setAttributeNS(null,"y", h/2-radius*Math.cos(angleRadians)+8);
        text.setAttributeNS(null,"font-size", "22");
        text.setAttributeNS(null,"text-anchor", "middle");
        text.textContent= i;

        svg.append(text);
    }

    
    lineSeconds.setAttributeNS(null,"x1", w/2-20);
    lineSeconds.setAttributeNS(null,"y1", h/2);
    lineSeconds.setAttributeNS(null,"x2", w/2+radius+20);
    lineSeconds.setAttributeNS(null,"y2", h/2);
    lineSeconds.setAttributeNS(null,"stroke", "black");
    lineSeconds.setAttributeNS(null,"stroke-width", 3);
    lineSeconds.style.transformOrigin = '50% 50%';
    svg.append(lineSeconds);


    lineMinutes.setAttributeNS(null,"x1", w/2-20);
    lineMinutes.setAttributeNS(null,"y1", h/2);
    lineMinutes.setAttributeNS(null,"x2", w/2+radius);
    lineMinutes.setAttributeNS(null,"y2", h/2);
    lineMinutes.setAttributeNS(null,"stroke", "black");
    lineMinutes.setAttributeNS(null,"stroke-width", 5);
    lineMinutes.style.transformOrigin = '50% 50%';
    svg.append(lineMinutes);


    lineHours.setAttributeNS(null,"x1", w/2-20);
    lineHours.setAttributeNS(null,"y1", h/2);
    lineHours.setAttributeNS(null,"x2", w/2+radius-20);
    lineHours.setAttributeNS(null,"y2", h/2);
    lineHours.setAttributeNS(null,"stroke", "black");
    lineHours.setAttributeNS(null,"stroke-width", 7);
    lineHours.style.transformOrigin = '50% 50%';
    svg.append(lineHours);

    digitalClock.setAttribute('x', w/2);
    digitalClock.setAttribute('y', w/3);
    digitalClock.setAttribute('font-size', 22);
    digitalClock.setAttribute('text-anchor', 'middle');
    svg.append(digitalClock);
}

drawSVGElements();

let timer = setInterval(function tick(){
    let date= new Date();

    let seconds = (String(date.getSeconds()).length !== 2) ? '0' + date.getSeconds() : date.getSeconds();
    let minutes = (String(date.getMinutes()).length !== 2) ? '0' + date.getMinutes() : date.getMinutes();
    let hours = (String(date.getHours()).length !== 2) ? '0' + date.getHours() : date.getHours();

    let dateHour = 30*(date.getHours() + (1/60)*date.getMinutes());        
    lineHours.style.transform = "rotate(" + (dateHour - 90) + "deg)";
    let dateMin = 6*(date.getMinutes() + (1/60)*date.getSeconds());
    lineMinutes.style.transform = "rotate(" + (dateMin - 90) + "deg)";
    let dateSec = 6*date.getSeconds();
    lineSeconds.style.transform = "rotate(" + (dateSec - 90) + "deg)";
    digitalClock.textContent = `${hours} : ${minutes} : ${seconds}`;
}, 1020 - date.getMilliseconds());
