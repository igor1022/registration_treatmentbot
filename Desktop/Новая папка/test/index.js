const express = require('express');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const TelegramApi = require('node-telegram-bot-api');

const token = '5775566569:AAHOOy2wUS_idAAoTRwCcUCUT-T2_GA_Dmo';

const bot = new TelegramApi(token, {polling: true});

const server = express();

const PORT = process.env.PORT || 3000;

server.use(express.static('./public'));

server.set('view engine', 'ejs');
server.set('views', './views');



const test_email = process.env["test_email"];
const test_key = process.env["test_key"];

const creds = require('./secret.json');

async function accessSpreadsheet() {
    const doc = new GoogleSpreadsheet('1bQ8lAqerlxsu8fI594fGIpfRhi2gzA3MIsS996KvGCo');
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows(); // can pass in { limit, offset }

// read/write row values
    console.log(rows[0]);
    await sheet.loadCells('A1:E10'); // loads range of cells into local cache - DOES NOT RETURN THE CELLS
    console.log(sheet.cellStats); // total cells, loaded, how many non-empty
    const a1 = sheet.getCell(0, 0);
    console.log(a1.value);
}

//accessSpreadsheet();
/*
const chats = {};

const gameOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: '1', callback_data: '1'}, {text: '2', callback_data: '2'}, {text: '3', callback_data: '3'}],
            [{text: '4', callback_data: '4'}, {text: '5', callback_data: '5'}, {text: '6', callback_data: '6'}],
            [{text: '7', callback_data: '7'}, {text: '8', callback_data: '8'}, {text: '9', callback_data: '9'}],
            [{text: '0', callback_data: '0'}],
        ]
    })
}

const againOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Играть еще раз', callback_data: '/again'}],
        ]
    })
}

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'загадаю цифру от 0 до 9, а вы отгадайте');
    const randomNumber = Math.floor(Math.random() * 10);
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Отгадайте', gameOptions);
}

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Начальное приветствие'},
        {command: '/info', description: 'Получить информацию о пользователе'},
        {command: '/game', description: 'Игра отгадай цифру'}
    ])
    
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
    
        if(text === '/start') {
            return bot.sendMessage(chatId, 'Добро пожаловать');
        }
        if (text === '/info') {
            return bot.sendMessage(chatId, `Вас зовут ${msg.from.first_name} ${msg.from.last_name}`);
        }

        if (text === '/game') {
            return startGame(chatId);
        }
    
        return bot.sendMessage(chatId, 'Я вас не понимаю, попробуйте еще раз')
    })
    
    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === '/again') {
            return startGame(chatId);
        }
        if (data === chats[chatId]) {
            return bot.sendMessage(chatId, `Поздравляю Вы угадали цифру ${chats[chatId]}}`, againOptions);
        }
        return bot.sendMessage(chatId, `Вы не угадали, бот загадал цифру ${chats[chatId]}`, againOptions);
    })
}

start();
*/

function calculateTheWords(message) {

    const splitMessage = message.split(" ");
    const wordsNumber = splitMessage.length;

    console.log(wordsNumber);
    return(wordsNumber);
 }

 var options = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: 'Консультация', callback_data: 'consultation' }],
        [{ text: 'Диангостика', callback_data: 'diagnostics' }],
        [{ text: 'Информация', callback_data: 'information' }]
      ]
    })
  };

 
const run = () => {
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
    
        console.log(msg.text);
        if (msg.text === '/start') {
            await bot.sendMessage(chatId, 'Добрый день');
            await bot.sendMessage(chatId, 'Напишите пожалуйста свое имя фамилию и отчество');
        }
        if (calculateTheWords(`${msg.text}`) === 3) {
            await bot.sendMessage(chatId, `Очень приятно ${msg.text}`);
            await bot.sendMessage(chatId, `Выберите пожалуйста что Вы хотите`);
            await bot.sendMessage(msg.chat.id, "answer.", options);
        }
        
        bot.on('callback_query', function onCallbackQuery(callbackQuery) {
            const action = callbackQuery.data;
            const msg = callbackQuery.message;
            console.log(msg.chat.id);
            const opts = {
            chat_id: msg.chat.id,
            message_id: msg.message_id,
            };
            let text;
        
            if (action === 'consultation') {
            text = 'Консультация';
            }
            if (action === 'diagnostics') {
                text = 'Диагностика';
            }
            if (action === 'information') {
                text = 'Информация';
            }
            console.log(text);
            bot.sendMessage(423871593, text);
        });
        return;
    })
}

run();

server.use('/', (req, res, next) => {
    res.render('main');
});


server.use('*', (req, res) => {
    res.render('not_found');
})

server.listen(PORT);

