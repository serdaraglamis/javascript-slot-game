(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _statics = require('./statics');

var _statics2 = _interopRequireDefault(_statics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SlotMachine = function () {
    function SlotMachine() {
        _classCallCheck(this, SlotMachine);

        this.playButton = document.querySelector('.play-button');
        this.machineElement = document.querySelector('.machine');
        this.winTextElement = document.querySelector('.winType');
        this.bonusTextElement = document.querySelector('#bonusType');
        this.bonusAvailable = false;

        this.addMachineListeners();
    }

    _createClass(SlotMachine, [{
        key: 'addMachineListeners',
        value: function addMachineListeners() {
            var _this = this;

            this.playButton.addEventListener('click', function () {
                _this.disablePlayButton(true);
                _this.setInnerText(_this.winTextElement, 'Wait for your chance!');
                _this.changeClassList(_this.machineElement, 'stop', 'remove');
                _statics2.default.getJSON('/server/outcome', function (success) {
                    _this.calculateSlots(success);
                }, function (error) {
                    console.log("Error", error);
                    alert('There is an error while fetching data');
                });
            });
        }
    }, {
        key: 'checkBonusContent',
        value: function checkBonusContent(data) {
            if (!data.bonus) {
                this.setClassName(this.bonusTextElement, '');
                this.bonusAvailable = false;
            } else {
                this.bonusAvailable = true;
            }
        }
    }, {
        key: 'determineWinType',
        value: function determineWinType(type) {
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
    }, {
        key: 'calculateSlots',
        value: function calculateSlots(data) {
            var _this2 = this;

            var winType = this.determineWinType(data.type);
            this.checkBonusContent(data);
            Object.keys(_statics2.default.slots).map(function (objectKey, index) {
                var element = _statics2.default.slots[objectKey];
                _this2.setClassName(element, '');
                _this2.changeClassList(element, 'selected-' + data.results[index], 'add');
            });
            this.writeResults(winType, data);
        }
    }, {
        key: 'writeResults',
        value: function writeResults(winType, data) {
            var _this3 = this;

            setTimeout(function () {
                _this3.setInnerText(_this3.winTextElement, winType);
                _this3.changeClassList(_this3.machineElement, 'stop', 'add');
                if (_this3.bonusAvailable) {
                    _this3.setBonusTexts();
                    setTimeout(function () {
                        _this3.setInProgressBonusTexts();
                        setTimeout(function () {
                            _this3.calculateSlots(data.bonus);
                        }, 2000);
                    }, 3000);
                } else {
                    _this3.disablePlayButton(false);
                }
            }, 1200);
        }
    }, {
        key: 'setBonusTexts',
        value: function setBonusTexts() {
            this.setInnerText(this.bonusTextElement, 'You Have Bonus');
            this.setClassName(this.bonusTextElement, 'active');
        }
    }, {
        key: 'setInProgressBonusTexts',
        value: function setInProgressBonusTexts() {
            this.setInnerText(this.winTextElement, 'Bonus Turn!');
            this.changeClassList(this.machineElement, 'stop', 'remove');
        }
    }, {
        key: 'disablePlayButton',
        value: function disablePlayButton(value) {
            this.playButton.disabled = value;
        }
    }, {
        key: 'setInnerText',
        value: function setInnerText(element, text) {
            element.innerText = text;
        }
    }, {
        key: 'setClassName',
        value: function setClassName(element, className) {
            element.className = className;
        }
    }, {
        key: 'changeClassList',
        value: function changeClassList(element, name, type) {
            if (type === 'add') {
                element.classList.add(name);
            } else if (type === 'remove') {
                element.classList.remove(name);
            }
        }
    }]);

    return SlotMachine;
}();

exports.default = SlotMachine;

},{"./statics":4}],2:[function(require,module,exports){
'use strict';

var _screen_checker = require('./screen_checker');

var _screen_checker2 = _interopRequireDefault(_screen_checker);

var _machine = require('./machine');

var _machine2 = _interopRequireDefault(_machine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _screen_checker2.default();

new _machine2.default();

},{"./machine":1,"./screen_checker":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ScreenChecker = function () {
    function ScreenChecker() {
        _classCallCheck(this, ScreenChecker);

        this.bodyElement = document.querySelector('body');
        this.checkScreenCondition();
        this.addScreenListener();
    }

    _createClass(ScreenChecker, [{
        key: 'checkScreenCondition',
        value: function checkScreenCondition() {
            if (window.innerHeight < 480) {
                console.log('Detected mobile landscape');
                this.bodyElement.classList.add('mobile-landscape');
            } else {
                this.bodyElement.className = '';
            }
        }
    }, {
        key: 'addScreenListener',
        value: function addScreenListener() {
            var _this = this;

            window.addEventListener("resize", function () {
                _this.checkScreenCondition();
            });
        }
    }]);

    return ScreenChecker;
}();

exports.default = ScreenChecker;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    getJSON: function getJSON(url, successHandler, errorHandler) {
        var xhr = typeof XMLHttpRequest != 'undefined' ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        xhr.open('get', url, true);
        xhr.onreadystatechange = function () {
            var status = void 0;
            var data = void 0;
            // https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
            if (xhr.readyState == 4) {
                // `DONE`
                status = xhr.status;
                if (status == 200) {
                    data = JSON.parse(xhr.responseText);
                    successHandler && successHandler(data);
                } else {
                    errorHandler && errorHandler(status);
                }
            }
        };
        xhr.send();
    },
    slots: {
        0: document.querySelector('#a'),
        1: document.querySelector('#b'),
        2: document.querySelector('#c')
    }
};

},{}]},{},[2]);
