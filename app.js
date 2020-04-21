const canvas = document.querySelector("#js-canvas"),
        ctx = canvas.getContext("2d"),
        colors = document.querySelectorAll(".js-colors"),
        range = document.querySelector("#js-range"),
        mode = document.querySelector("#js-mode"),
        saveBtn = document.querySelector("#js-save");

const DEFAULT_COLOR = "2c2c2c"        
let painting = false;
let filling = false;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = DEFAULT_COLOR;
ctx.fillStyle = DEFAULT_COLOR;
ctx.lineWidth = 2.5;
// canvas의 pixel과 css상의 pixel에 차이가 있다
canvas.width = 550;
canvas.height = 550;      
function stopPainting(){
    painting = false;
}
function startPainting(){
    painting = true;
}
function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;

    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    }else{
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}
function onMouseLeave(event){
    stopPainting();
}
function onMouseDown(event){
    startPainting();
}
function onMouseUp(event){
    stopPainting();
}
function handleColorChange(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}
function handleRangeChange(event){
    const size = event.target.value
    ctx.lineWidth = size;
}
function handleModeChange(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    }else{
        filling = true;
        mode.innerText = "Paint"
    }
}
function handleCanvasClick(){
    if(filling === true){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}
function handelCMClick(event){
    event.preventDefault();
}
function handleSaveClick(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS_Image";
    link.click();
}
function init(){
    if(canvas){
        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mouseleave", stopPainting);
        canvas.addEventListener("mousedown", startPainting);
        canvas.addEventListener("mouseup", onMouseUp);
        canvas.addEventListener("click", handleCanvasClick);
        canvas.addEventListener("contextmenu", handelCMClick);
    }
    if(colors){
        colors.forEach(color => color.addEventListener("click", handleColorChange))
    }
    if(range){
        range.addEventListener("input", handleRangeChange);
    }
    if(mode){
       mode.addEventListener("click", handleModeChange); 
    }
    if(saveBtn){
        saveBtn.addEventListener("click", handleSaveClick);
    }
}
init();