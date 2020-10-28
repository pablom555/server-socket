const { io } = require('../server');
const { TicketControl } = require('./../classes/ticketControl');

let ticketControl = new TicketControl();


io.on('connection', (client) => {

    console.log('The connection is active')

    client.on('disconnect', () => {
        console.log('The connection is not active')
    });

    client.emit('lastTicket', { 
        lastTicket: ticketControl.getLastTicket(),
        lastFourTickets: ticketControl.getLastFourTickets()
    })

    //Listen 'nextTicket'
    client.on('nextTicket', (data, callBack) => {
        
        let newTicketControl = ticketControl.next();
        
        callBack(newTicketControl);

    });

    //Listen 'assignTicket'
    client.on('assignTicket', (data, callBack) => {
         
        if (!data.desk) {
            return callBack({
                err: true,
                message: 'The desk is required'
            })            
        }

        let ticketAssigned = ticketControl.assignTicket(data.desk)

        callBack(ticketAssigned); 

        client.broadcast.emit('lastFourTickets', { lastFourTickets: ticketControl.getLastFourTickets() })

    })

});