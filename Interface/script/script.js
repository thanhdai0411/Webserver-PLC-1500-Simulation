const btnStart = document.querySelector('.btn_start');
const btnStop = document.querySelector('.btn_stop');
const btnResetCounter = document.querySelector('.btn_reset');

const counterProduct = document.querySelector('#counter_product');

const valueAxesX = document.querySelector('#value_x');
const valueAxesZ = document.querySelector('#value_z');

const valueBTNap = document.querySelector('#value_bt_nap');
const valueCBNap = document.querySelector('#value_cb_nap');
const valueBTDe = document.querySelector('#value_bt_de');
const valueCBDe = document.querySelector('#value_cb_de');
const valueBCHNap = document.querySelector('#value_bch_nap');
const valueBCHDe = document.querySelector('#value_bch_de');
const valueBtDem = document.querySelector('#value_bt_dem');
const valueCBDem = document.querySelector('#value_cb_dem');

const btNap = document.querySelector('#bt_nap');
const cbNap = document.querySelector('#cb_nap');
const btDe = document.querySelector('#bt_de');
const cbDe = document.querySelector('#cb_de');
const cbDem = document.querySelector('#cb_dem');
const btDem = document.querySelector('#bt_dem');

const systemState = document.querySelector('.state_system1');

const controlTag = (tag, value) => {
    url = 'tag.html';
    let name = `${tag}`;
    sdata = encodeURI(name) + '=' + value;
    $.post(url, sdata, function (result2) {});
};

const coverDataGetToNumber = (data) => {
    const result = data.split(':')[1].replaceAll('"', '');
    return result;
};

const getValueTag = (IO, field) => {
    $.get(`${IO}`, function (result) {
        let counter = coverDataGetToNumber(result);
        field.innerHTML = counter;
    });
};

const addClassElement = (element, add, remove) => {
    element.classList.add(`${add}`);
    element.classList.remove(`${remove}`);
};

const removeClassElement = (element, add, remove) => {
    element.classList.add(`${remove}`);
    element.classList.remove(`${add}`);
};

const stateActuator = (IO, element, add = 'state_actuator_on', remove = 'state_actuator_off') => {
    $.get(`${IO}`, function (result) {
        let value = coverDataGetToNumber(result);
        if (value == '1') {
            addClassElement(element, `${add}`, `${remove}`);
        } else {
            removeClassElement(element, `${add}`, `${remove}`);
        }
    });
};

const stateActuatorImg = (IO, element) => {
    $.get(`${IO}`, function (result) {
        let value = coverDataGetToNumber(result);
        if (value == '1') {
            element.src = './img/conveyor-belt-2.webp';
        } else {
            element.src = './img/conveyor-belt-2_off.png';
        }
    });
};

const stateSensorImg = (IO, element) => {
    $.get(`${IO}`, function (result) {
        let value = coverDataGetToNumber(result);
        if (value == '1') {
            element.src = './img/sensor.png';
        } else {
            element.src = './img/sensor_off.png';
        }
    });
};

// ============================

$(document).ready(function () {
    setInterval(function () {
        getValueTag('IOCounter.html', counterProduct);
        getValueTag('IOCBX.html', valueAxesX);
        getValueTag('IOCBZ.html', valueAxesZ);

        stateActuator('IOStartLight.html', systemState, 'state_on', 'state_off');

        stateActuator('IOBTNap.html', valueBTNap);
        stateActuator('IOCBNap.html', valueCBNap);
        stateActuator('IOBTDe.html', valueBTDe);
        stateActuator('IOCBDe.html', valueCBDe);

        stateActuator('IOBCHNap.html', valueBCHNap);
        stateActuator('IOBCHDe.html', valueBCHDe);

        stateActuator('IOBTDem.html', valueBtDem);
        stateActuator('IOCBDem.html', valueCBDem);

        //

        stateActuatorImg('IOBTNap.html', btNap);
        stateSensorImg('IOCBNap.html', cbNap);

        stateActuatorImg('IOBTDe.html', btDe);
        stateSensorImg('IOCBDe.html', cbDe);

        stateSensorImg('IOCBDem.html', cbDem);
        stateActuatorImg('IOBTDem.html', btDem);
    }, 500);
});

// start
btnStart.onmousedown = () => {
    controlTag('"start"', 1);
};

btnStart.onmouseup = () => {
    controlTag('"start"', 0);
};

// stop
btnStop.onmousedown = () => {
    controlTag('"stop"', 1);
};

btnStop.onmouseup = () => {
    controlTag('"stop"', 0);
};

// reset counter

btnResetCounter.onmousedown = () => {
    controlTag('"reset"', 1);
};

btnResetCounter.onmouseup = () => {
    controlTag('"reset"', 0);
};
