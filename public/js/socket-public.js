const socket = io();

socket.on('connect', () => {
    console.log('The connection is active')
})

socket.on('disconnect', () => {
    console.log('The connection is not active')
})

socket.on('lastTicket', (data) => {

    if (data.lastFourTickets.length > 0) {

        data.lastFourTickets.forEach((ticket, i) => {
            
            lblTickets[i].innerText = ticket.number;
            lblEscritorios[i].innerText = ticket.desk;
        })
    }

})

socket.on('lastFourTickets', (data) => {

    if (data.lastFourTickets.length > 0) {

        data.lastFourTickets.forEach((ticket, i) => {

            lblTickets[i].innerText = ticket.number;
            lblEscritorios[i].innerText = ticket.desk;
        })
    }

    // Play audio
    let audio = new Audio('audio/new-ticket.mp3');
    audio.play();
})

const lblTicket1 = document.querySelector('#lblTicket1');
const lblEscritorio1 = document.querySelector('#lblEscritorio1');

const lblTicket2 = document.querySelector('#lblTicket2');
const lblEscritorio2 = document.querySelector('#lblEscritorio2');

const lblTicket3 = document.querySelector('#lblTicket3');
const lblEscritorio3 = document.querySelector('#lblEscritorio3');

const lblTicket4 = document.querySelector('#lblTicket4');
const lblEscritorio4 = document.querySelector('#lblEscritorio4');

let lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
let lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];





