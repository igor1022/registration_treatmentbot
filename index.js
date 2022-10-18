const express = require('express');
const TelegramApi = require('node-telegram-bot-api');
const token = '5775566569:AAHOOy2wUS_idAAoTRwCcUCUT-T2_GA_Dmo';
const bot = new TelegramApi(token, {polling: true});
const server = express();
const PORT = process.env.PORT || 3000;
server.use(express.static('./public'));
server.set('view engine', 'ejs');
server.set('views', './views');
const axios = require('axios');
CHAT_ID = "-785368621";

const uri_api = `https://api.telegram.org/bot${ token }/sendMessage`;


const recordOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Консультация', callback_data: 'consultation'},
             {text: 'Диангостика', callback_data: 'diagnostics'},
             {text: 'Информация', callback_data: 'information'}],
        ]
    })
}

const questions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Да', callback_data: 'yes'},
             {text: 'Нет', callback_data: 'no'},],
        ]
    })
}

const recordTime = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: '9.00', callback_data: '9'}, {text: '10.00', callback_data: '10'}, 
            {text: '14.00', callback_data: '11'}],
            [{text: '12.00', callback_data: '12'}, {text: '13.00', callback_data: '13'}, 
            {text: '14.00', callback_data: '11'}],
            [{text: '14.00', callback_data: '14'}, {text: '15.00', callback_data: '15'}, 
            {text: '16.00', callback_data: '16'}],
            [{text: '17.00', callback_data: '17'}, {text: '18.00', callback_data: '18'}],
        ]
    })
}


const startRecord = async (chatId) => {
    await bot.sendMessage(chatId, 'Напишите пожалуйста Ваше имя фамилию и отчество');
}

const chat = [];
let marker = false;

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Начать'},
        {command: '/contacts', description: 'Контакты нашего консультанта'},
        {command: '/record', description: 'Запись на консультацию'},
        {command: '/again', description: 'Начать заново'}
    ])
    
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
    
        if(text === '/start') {
            marker = false;
            await bot.sendMessage(chatId, 'Добро пожаловать');
            return bot.sendMessage(chatId, 'Введите пожалуйста свое имя фамилию и отчество');
        }
        if (text === '/contacts') {
            marker = false;
            //return bot.sendMessage(chatId, '@igorgagarin');
            //return bot.sendContact(chatId, '@igorgagarin')
            await bot.sendMessage(chatId, '@igorgagarin');
            return bot.sendContact(chatId, '+380956430546', 'Igor');
        }

        if (text === '/record') {
            marker = false;
            return startRecord(chatId);
        }

        if (text === '/again') {
            marker = false;
            return startRecord(chatId);
        }

        if (input(text)) {
            marker = false;
            bot.sendMessage(chatId, 'Хорошо, можете выбрать направление, которое Вас интересует');
            marker = true;
            chat[0] = text;
        }

        if (calculateTheWords(text) >= 2) {
            bot.sendMessage(chatId, 'Введите свой номер телефона из 7 цифр без +38');
            let nIntervId = setInterval(() => {
                if (marker) {
                    bot.sendMessage(chatId, 'Выберите', recordOptions);
                    clearInterval(nIntervId);
                };
            }, 2000);
        }
    })
    
    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (Number(msg.data) >= 9 && Number(msg.data <= 18)) {
            //console.log(msg.from.username);
            await bot.sendMessage(chatId, `Хорошо, Вы записаны на ${msg.data}.00`);
            chat[1] = `${msg.data}.00`;
            chat[2] = `@${msg.from.username}`;
            //console.log(chat);
            axios.post(uri_api, {
                chat_id : CHAT_ID,
                parse_mode : 'html',
                text: `${chat[0]} ${chat[1]} ${chat[2]}`
            })
            await bot.sendMessage(chatId, 'У Вас остались еще вопросы?');
            await bot.sendMessage(chatId, 'Yes/No', questions);
            return;
        }
        if (msg.data === 'yes') {
            await bot.sendMessage(chatId, 'Связь с оператором');
            await bot.sendMessage(chatId, '@igorgagarin');
            return bot.sendContact(chatId, '+380956430546', 'Igor');
        }  
        if (msg.data === 'no') {
            return;
        }   
        if (msg.data === 'consultation' || msg.data === 'diagnostics' || msg.data === 'information') {
            await bot.sendMessage(chatId, 'Выберите время', recordTime);
        }

    })
}

start();


function calculateTheWords(message) {
  
    const splitMessage = message.split(" ");
    const wordsNumber = splitMessage.length;
    return(wordsNumber);
 }

function input(phone) {
    //console.log(Number(phone));
    if(Number(phone) > 11111111 && Number(phone) < 389999999999) {
        return true;
    }
    return false;
}

server.use('/', (req, res, next) => {
    res.render('main');
});


server.use('*', (req, res) => {
    res.render('not_found');
})

server.listen(PORT);

