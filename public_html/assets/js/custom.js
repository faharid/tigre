function myJavascript() {

    const container = document.querySelector('.seats-container');
    const seats = document.querySelectorAll('.row .seat:not(.occupied)');
    const count = document.getElementById('count');
    const total = document.getElementById('total');

    console.log(seats);
    console.log(container);

}

//Update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

//Seat click event
container.addEventListener('onclick', e => {

    console.log('HOLA');

    if (e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
    }
    updateSelectedCount();
});



const abutton = document.querySelector('.aButton');
console.log(abutton);
abutton.addEventListener('onclick', e => {
});


function consoleHola() {
    console.log('HOLA');
}