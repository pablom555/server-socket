const socket = io();

socket.on('connect', () => {
    console.log('The connection is active')
})

socket.on('disconnect', () => {
    console.log('The connection is not active')
})

let params = (new URL(document.location)).searchParams;

if (!params.has('escritorio')) {
    window.location = 'index.html';
    throw new Error("The Desk es required")
}

const deskNumber = params.get('escritorio');

const titleDesk = document.querySelector('h1');
const button = document.querySelector('button');
const attendingTo = document.querySelector('h4 small');

titleDesk.innerText = `${titleDesk.innerText} ${deskNumber}`;

button.addEventListener('click', () => {

    socket.emit('assignTicket', {desk: deskNumber}, function (ticketAssigned) {

        if (ticketAssigned === 'There are not tickets') {
            alert('There are not tickets');
            attendingTo.innerText = 'There are not tickets';    
            return;
        }
        
        attendingTo.innerText = ticketAssigned.number;        
    });
})