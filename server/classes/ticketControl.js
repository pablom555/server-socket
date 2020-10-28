const fs = require('fs');

class Ticket {

    constructor(number, desk) {
        this.number = number,
        this.desk = desk
    }
}

class TicketControl {

    constructor() {

        this.last = 0;
        this.today = new Date().getDate();
        this.pendingTickets = [];
        this.lastFourTickets = [];

        let data = require('./../data/data.json');

        if (data.today === this.today) {

            this.last = data.last;
            this.pendingTickets = data.pendingTickets;
            this.lastFourTickets = data.lastFourTickets;

        } else {
            this.resetCounter()
        }

    }

    resetCounter() {

        this.last = 0;
        this.pendingTickets = [];
        this.lastFourTickets = [];
        console.log('Ticket counter has been reset');

        this.saveFile();
    }

    next() {

        this.last += 1;
        let ticket = new Ticket(this.last, null);
        this.pendingTickets.push(ticket);

        this.saveFile();

        return `Ticket ${this.last}`;

    }

    getLastTicket() {
        return `Ticket ${this.last}`;
    }

    getLastFourTickets() {
        return this.lastFourTickets;
    }

    assignTicket(desk) {

        if (this.pendingTickets.length === 0) {
            return 'There are not tickets'
        }

        let assignedTicket = this.pendingTickets[0].number;
        this.pendingTickets.shift();

        let ticket = new Ticket(assignedTicket, desk);

        this.lastFourTickets.unshift(ticket); 

        // Delete the last element
        if (this.lastFourTickets.length > 4) {
            this.lastFourTickets.splice( -1, 1);
        }

        console.log('Las Four Tickets', this.lastFourTickets)

        this.saveFile();

        return ticket;

    }

    saveFile() {

        let jsonData = {
            last: this.last,
            today: this.today,
            pendingTickets: this.pendingTickets,
            lastFourTickets: this.lastFourTickets,
        }

        fs.writeFileSync('./server/data/data.json', JSON.stringify(jsonData));

        console.log('file data.json saved')
    }

}

module.exports = {
    TicketControl
}