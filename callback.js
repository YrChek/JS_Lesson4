const readline = require('readline');

const fs = require('fs');

const rl = readline.createInterface(process.stdin, process.stdout);

let number = Math.round(Math.random() * 100);

let bolean = false;

let count = 1;

let response = 'Старт игры';

const randoms =(cb) => {
  if (bolean) {
    console.log('Попытка №', count);
  };
  bolean = false;
  cb();
};

const quest = (text, cb) => {
  rl.question(text, cb);
};

const exit = (reply, cb) => {
  console.log('Вы ввели ', reply);
  if (reply === 'q') {
    rl.close();
    return
  }
  cb();
};

const numberControl = (reply, cb) => {
  if (!(reply / 1 + 1)) {
    response = 'Вы ввели не число.'
    console.log(response);
    start('Введите число, либо нажмите "q" для выхода. \n');
  } else {
    cb();
  }
};

const minValue = (reply, cb) => {
  reply = reply / 1
  if (reply < number) {
    response = 'Ваше число меньше искомого'
    bolean = true;
    count++;
    console.log(response);
    start('Введите большее число \n');
  } else {
  cb();
  }
};

const maxValue = (reply, cb) => {
  reply = reply / 1;
  if (reply > number) {
    response = 'Ваше число больше искомого'
    bolean = true;
    count++;
    console.log(response);
    start('Введите меньшее число \n');
  } else {
    cb();
  }
};

const victory = (reply) => {
  reply = reply / 1;
  let resp;
  if (number === reply) {
    response = `Поздравляю! Вы с попытки №${count} отгадали число!`
    bolean = false;
    console.log(response);
    count = 1;
    number = Math.round(Math.random() * 100);
  }
  start('Желаете продолжить? Наберите число, либо нажмите "q", для выхода. \n');
};

const write = (record, cb) => {
  fs.writeFile('file.log', `${record}\n`, {flag: 'a+'}, cb);
}

function start(text) {
  randoms(() => {
    write(response, () => {
      quest(text, (cmd) => {
        write(text, () => {
          write(cmd, () => {
            exit(cmd, () => {
              numberControl(cmd, () => {
                minValue(cmd, () => {
                  maxValue(cmd, () => {
                    victory(cmd)
                  })
                })
              })
            })
          })
        })
      })
    })
  })
}

start('Введите любое число от 0 до 100 \n')