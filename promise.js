const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

let number = Math.round(Math.random() * 100);

let response;

let bolean = false;

let count = 1;

const randoms =(cb) => {
    const promise = new Promise((resolve) => {
        if (bolean) {
            console.log('Попытка №', count);
          };
          bolean = false;
          resolve ()
    })
    return promise
  };

const quest = (text) => {
    const promise = new Promise((resolve) => {
        rl.question(text, (cmd) => {
            response = cmd; 
            resolve ()
        });
    });
    return promise
};

const exit = (reply) => {
    const promise = new Promise((resolve) => {
        console.log('Вы ввели ', reply);
        if (reply === 'q') {
            console.log('Игра остановлена')
            rl.close();
            return
        } else {
            resolve ()
        }
    });
    return promise
};

const numberControl = (reply) => {
    const promise = new Promise((resolve, rejects) => {
        if (!(reply / 1 + 1)) {
            response = 'Это не число.'
            console.log(response);
            rejects ('Введите число, либо нажмите "q" для выхода. \n');
        } else {
            resolve ();
          }
    });
    return promise
  };

const minValue = (reply) => {
    const promise = new Promise((resolve, rejects) => {
        reply = reply / 1
        if (reply < number) {
            response = 'Ваше число меньше искомого'
            bolean = true;
            count++;
            console.log(response);
            rejects ('Введите большее число \n');
        } else {
            resolve();
        }
    });
    return promise
};

const maxValue = (reply) => {
    const promise = new Promise((resolve, rejects) => {
        reply = reply / 1;
        if (reply > number) {
            response = 'Ваше число больше искомого'
            bolean = true;
            count++;
            console.log(response);
            rejects ('Введите меньшее число \n');
        } else {
            resolve();
        }
    })
    return promise
};

const victory = () => {
    const promise = new Promise((resolve) => {
        response = `Поздравляю! Вы с попытки № ${count} отгадали число!`
        bolean = false;
        console.log(response);
        count = 1;
        number = Math.round(Math.random() * 100);
        resolve ();
    })
};

function start(text) {
    randoms()
        .then(() => {
            return quest(text)
        })
        .then((data) => {
            return 
        })
        .then(() => {
            return exit(response)
        })
        .then(() => {
            return numberControl(response)
        })
        .then(() => {
            return minValue(response)
        })
        .then(() => {
            return maxValue(response)
        })
        .then(() => {
            return victory()
        })
        .then(() => {
            return start('Желаете продолжить? Наберите число, либо нажмите "q", для выхода. \n')
        })
        .catch((resp) => {
            start(resp)
        })
}
start('Введите число \n')