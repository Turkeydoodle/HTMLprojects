const canvas = document.getElementById('canvas');
const output = document.getElementById('output');
const button = document.getElementById('button');
const sortedoutput = document.getElementById('sortedoutput');
const displaybutton = document.getElementById('displaybutton');
const sortbutton = document.getElementById('sortbutton');
sortbutton.addEventListener('click', sort);
sortbutton.disabled = true;
button.addEventListener('click', createlist);
const ctx = canvas.getContext('2d');
let listsorted = false;
canvas.width = 485;
canvas.height = 500;
let list = [];
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
function createlist() {
    list = [];
    for (let i = 0; i < 24; i++) {
        let item = Math.floor(Math.random() * (50 - 0 + 1)) + 0;
        list.push(item);
    }
    output.innerHTML = list;
    draw('black', -1);
    sortbutton.disabled = false;
}
function draw(fillcolor, innum) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < list.length; i++) {
        const x = i * 20;
        const y = canvas.height - list[i] * 10;
        const width = 15;
        const height = list[i] * 10;
        if (i === innum) {
            ctx.fillStyle = fillcolor;
        } else {
            ctx.fillStyle = 'black';
        }
        ctx.fillRect(x, y, width, height);
    }
}
function displaylist() {
    draw('black', -1);
    sortedoutput.innerHTML = list;
}
async function sort(delay = 1000) {
    if (!list.length) return;
    sortbutton.disabled = true;
    draw('black', -1);
    do {
        listsorted = true;
        for (let i = 0; i < list.length - 1; i++) {
            if (list[i] > list[i + 1]) {
                let temp = list[i];
                list[i] = list[i + 1];
                list[i + 1] = temp;
                listsorted = false;
                draw('red', i);
                await sleep(delay);
            }
        }
    } while (!listsorted);
    draw('black', -1);
    sortedoutput.innerHTML = list;
    sortbutton.disabled = false;
}