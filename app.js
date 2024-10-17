function newVehicle(icon, name, timer_m, maxamount){
    new vehicle(icon, name, timer_m, maxamount);
}

class vehicle {
    constructor(icon, name, timer_m, maxamount) {
        this.icon = icon || "img/tank.png";
        this.name = name || "vehicle";
        this.timer_m = timer_m || 10;
        this.maxamount = maxamount || 1;
        this.amount = this.maxamount;
        this.countdowns = [];
        this.intervals = []; // Store intervals here

        this.vehicleElement = document.createElement('div');
        this.vehicleElement.classList.add('template');
        this.vehicleElement.innerHTML = `
            <div class="template_field"><img src="${this.icon}" alt="vehicle_icon"></div>
            <div class="template_field text_field"><p>${this.name}</p></div>
            <div class="template_field number_field"><p id="timer">${this.timer_m + ":00"}</p></div>
            <div class="template_field number_field"><p id="amount">${this.amount}/${this.maxamount}</p></div>
            <div class="actions_menu"><button class="destroy_button action_button">Destroy</button><button class="delete_button action_button">Delete</button></div>
            `;

        document.getElementById('vehicle_div').appendChild(this.vehicleElement);

        this.vehicleElement.querySelector('.destroy_button').addEventListener('click', () => this.destroy());
        this.vehicleElement.querySelector('.delete_button').addEventListener('click', () => this.delete());
    }

    delete() {
        // Clear any running intervals when deleting
        this.clearTimers();
        this.vehicleElement.remove();
    }

    destroy() {
        if (this.amount > 0) {
            this.countdowns.push(this.timer_m * 60);
            this.startTimer();
            this.amount--;
            this.updateamount();
        }
    }

    startTimer() {
        this.timerElement = this.vehicleElement.querySelector('#timer');

        // Start a new interval for this instance
        const intervalId = setInterval(() => {
            this.countdowns.forEach((value, index) => {
                this.countdowns[index] = --value;
                if (index === 0) {
                    let minutesLeft = Math.floor(value / 60);
                    let secondsLeft = value % 60;
                    secondsLeft = secondsLeft < 10 ? '0' + secondsLeft : secondsLeft;
                    this.timerElement.innerHTML = minutesLeft + ":" + secondsLeft;
                }
                if (value == 0) {
                    this.timerElement.innerHTML = this.timer_m + ":00";
                    this.amount++;
                    this.countdowns.splice(index, 1);
                    this.updateamount();
                }
            });
        }, 1000);

        // Store the interval ID so we can clear it later
        this.intervals.push(intervalId);
    }

    clearTimers() {
        // Stop all intervals for this instance
        this.intervals.forEach(intervalId => clearInterval(intervalId));
        this.intervals = []; // Reset interval array
    }

    updateamount() {
        this.vehicleElement.querySelector('#amount').innerHTML = `<p id="amount">${this.amount}/${this.maxamount}</p>`;
    }
}