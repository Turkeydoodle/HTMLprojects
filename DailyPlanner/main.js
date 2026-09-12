// Get input elements and button
let id = document.getElementById('inputdata');
let it = document.getElementById('inputtime');
let enter = document.getElementById('enter');

// Define valid time slots
const validTimes = [
    "0000", "0100", "0200", "0300", "0400", "0500", "0600", "0700",
    "0800", "0900", "1000", "1100", "1200", "1300", "1400", "1500",
    "1600", "1700", "1800", "1900", "2000", "2100", "2200", "2300"
];

// Create a map of time slot elements
const timeCells = {};
validTimes.forEach(time => {
    timeCells[time] = document.getElementById(time);
});

// Function to update the planner
function editPlan() {
    let data = id.value.trim();
    let time = it.value.trim().padStart(4, '0'); // Normalize input like '900' → '0900'

    if (data && time) {
        if (validTimes.includes(time)) {
            let cell = timeCells[time];
            if (cell) {
                cell.innerHTML = data;
                id.value = '';
                it.value = '';
            } else {
                alert('Time slot not found.');
            }
        } else {
            alert('Invalid time entered. Please use HHMM format like "1400".');
        }
    } else {
        alert('Please fill in both fields.');
    }
}

// Event listeners
enter.addEventListener('click', editPlan);
id.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        editPlan();
    }
});