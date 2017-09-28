export default class ScreenChecker {

    constructor() {
        this.bodyElement = document.querySelector('body');
        this.checkScreenCondition();
        this.addScreenListener();
    }

    checkScreenCondition() {
        if(window.innerHeight < 480){
            console.log('Detected mobile landscape');
            this.bodyElement.classList.add('mobile-landscape');
        } else {
            this.bodyElement.className = '';
        }
    }


    addScreenListener() {
        window.addEventListener("resize", ()=> {
            this.checkScreenCondition();
        });
    }
}