document.addEventListener("mousemove", (event) => {
    let x = event.clientX;
    let y = event.clientY;
    const textbox = document.getElementById('textbox');
    textbox.style.left = x + 'px';
    textbox.style.top = y + 'px';
    const textbox2 = document.getElementById('textbox2');
    textbox2.style.left = x + 'px';
    textbox2.style.top = y + 'px';
    const textbox3 = document.getElementById('textbox3');
    textbox3.style.left = x + 'px';
    textbox3.style.top = y + 'px';
});