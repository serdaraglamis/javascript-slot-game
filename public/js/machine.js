import Statics from './statics';

export default class SlotMachine {
    constructor() {
        this.playButton = document.querySelector('.play-button');
        this.machineElement = document.querySelector('.machine');
        this.winTextElement = document.querySelector('.winType');
        this.bonusTextElement = document.querySelector('#bonusType');
        this.bonusAvailable = false;

        this.addMachineListeners()
    }

    addMachineListeners() {
        this.playButton.addEventListener('click', () => {
            this.disablePlayButton(true);
            this.setInnerText(this.winTextElement, 'Wait for your chance!');
            this.changeClassList(this.machineElement, 'stop', 'remove');
            Statics.getJSON('/server/outcome', (success) => {
                this.calculateSlots(success);
            }, (error) => {
                console.log("Error", error);
                alert('There is an error while fetching data');
            });
        });
    }

    checkBonusContent(data) {
        if(!data.bonus) {
            this.setClassName(this.bonusTextElement, '');
            this.bonusAvailable = false;
        } else {
            this.bonusAvailable = true;
        }
    }

    determineWinType(type) {
        switch (type) {
            case 2:
                return 'Small Win';
                break;
            case 3:
                return 'Big Win';
                break;
            default:
                return 'No Win';
                break;
        }
    }

    calculateSlots(data) {
        let winType = this.determineWinType(data.type);
        this.checkBonusContent(data);
        Object.keys(Statics.slots).map((objectKey, index) => {
            let element = Statics.slots[objectKey];
            this.setClassName(element, '');
            this.changeClassList(element,`selected-${data.results[index]}` , 'add')
        });
        this.writeResults(winType, data);
    }

    writeResults(winType, data) {
        setTimeout(() => {
            this.setInnerText(this.winTextElement, winType);
            this.changeClassList(this.machineElement, 'stop', 'add');
            if(this.bonusAvailable) {
                this.setBonusTexts();
                setTimeout(()=> {
                    this.setInProgressBonusTexts();
                    setTimeout(()=> {
                        this.calculateSlots(data.bonus);
                    }, 2000);
                }, 3000);
            } else {
                this.disablePlayButton(false);
            }
        }, 1200);
    }

    setBonusTexts() {
        this.setInnerText(this.bonusTextElement, 'You Have Bonus');
        this.setClassName(this.bonusTextElement, 'active');
    }

    setInProgressBonusTexts() {
        this.setInnerText(this.winTextElement, 'Bonus Turn!');
        this.changeClassList(this.machineElement, 'stop', 'remove');
    }

    disablePlayButton(value) {
        this.playButton.disabled = value;
    }

    setInnerText(element, text) {
        element.innerText = text;
    }

    setClassName(element, className) {
        element.className = className;
    }

    changeClassList(element, name, type) {
        if(type === 'add') {
            element.classList.add(name);
        } else if (type === 'remove') {
            element.classList.remove(name);
        }
    }
}