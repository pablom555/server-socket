const socket = io();

socket.on('connect', () => {
    console.log('The connection is active')
})

socket.on('disconnect', () => {
    console.log('The connection is not active')
})

const button = document.querySelector('button');
const labelNewTicket = document.querySelector('#lblNuevoTicket');

button.addEventListener('click', () => {
    
    socket.emit('nextTicket', null, function (newTicket)  {
        labelNewTicket.innerText = newTicket
    });
})

socket.on('lastTicket', (data) => {
    labelNewTicket.innerText = data.lastTicket
})