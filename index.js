const TelegramApi = require('node-telegram-bot-api');
const token = '5775566569:AAHOOy2wUS_idAAoTRwCcUCUT-T2_GA_Dmo';
const bot = new TelegramApi(token, {polling: true});
const axios = require('axios');
CHAT_ID = "-785368621"; 
const uri_api = `https://api.telegram.org/bot${ token }/sendMessage`;


let a, b, c, d, e, f, g, t;

// first question
const startRecord = async (chatId) => {
    await bot.sendMessage(chatId, 'Русский или Українська', language);
    return;
}

let recordOptions = {

};

const recordOptions_ru = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Консультация', callback_data: 'consultation'},
             {text: 'Диангостика', callback_data: 'diagnostics'},
             {text: 'Информация', callback_data: 'information'}],
        ]
    })
};
const recordOptions_ukr = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Консультація', callback_data: 'consultation'},
             {text: 'Діангостика', callback_data: 'diagnostics'},
             {text: 'Інформація', callback_data: 'information'}],
        ]
    })
};

let questions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Да', callback_data: 'yes'},
             {text: 'Нет', callback_data: 'no'},],
        ]
    })
}

const questions_ru = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Да', callback_data: 'yes'},
             {text: 'Нет', callback_data: 'no'},],
        ]
    })
}
const questions_ukr = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Так', callback_data: 'yes'},
             {text: 'Ні', callback_data: 'no'},],
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
};


const language = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Русский', callback_data: 'ru'},
             {text: 'Українська', callback_data: 'ukr'},],
        ]
    })
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

//save Name answer

let FIO;     

let marker1, marker2, marker3;

//bot react when writing
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
    
//Itaration ONE
        if(text === '/start') {
            marker = false;
            await bot.sendMessage(chatId, 'Добро пожаловать');
            await bot.sendMessage(chatId, 'Русский или Українська', language);
            return;
           // 
        }
//Contacts reply        
        if (text === '/contacts') {
            marker = false;
            await bot.sendMessage(chatId, '@igorgagarin');
            //в конфігу прописати ім'я телефон
            return bot.sendContact(chatId, '+380956430546', 'Igor');
        }

//Registration
        if (text === '/record') {
            marker = false;
            return startRecord(chatId);
        }

//Restart
        if (text === '/again') {
            marker = false;
            return startRecord(chatId);
        }//
        if (input(text)) {
            marker = false;
            bot.sendMessage(chatId, `${b}`);
            marker = true; //if have number
            chat[0] = text;
            return;
        }
        FIO = text; 
//Reaction on Any ather answer 
            bot.sendMessage(chatId, `${FIO}, ${a}`);
            let nIntervId = setInterval(() => {
//if have number              
                if (marker) {
                    bot.sendMessage(chatId, `${c}`, recordOptions);
                    clearInterval(nIntervId);
                };
            }, 2000);
    })


    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (Number(msg.data) >= 9 && Number(msg.data <= 18)) {
            //console.log(msg.from.username);
            await bot.sendMessage(chatId, `${e}, ${FIO}, ${f} ${msg.data}.00`);
            chat[1] = `${msg.data}.00`;
            chat[2] = `@${msg.from.username}`;
            chat[3] = FIO;
            //console.log(chat);
            axios.post(uri_api, {
                chat_id : CHAT_ID,
                //перевірити без нього
                parse_mode : 'html',
                text: `${chat[3]} ${chat[0]} ${chat[1]} ${chat[2]}`
            })
            await bot.sendMessage(chatId, `${g}`);
            await bot.sendMessage(chatId, 'Yes/No', questions);
            return;
        }
        if (msg.data === 'ru') {
            recordOptions = recordOptions_ru;
            e = 'Хорошо';
            f = 'Вы записаны на';
            g = 'У Вас остались еще вопросы?';
            a = 'Введите свой номер телефона из 7 цифр без +38';
            b = 'Хорошо, можете выбрать направление, которое Вас интересует';
            c = 'Выберите';
            d = 'Выберите время';
            t = 'Связь с оператором'
            questions = questions_ru;
            return bot.sendMessage(chatId, 'Введите пожалуйста свое имя фамилию и отчество');
        }  
        if (msg.data === 'ukr') {
            recordOptions = recordOptions_ukr;
            questions = questions_ukr;
            e = 'Добре';
            f = 'Ви записані на';
            g = 'У Вас залишились ще запитання?';
            a = 'Введіть свій номер телефону з 7 цифр без +38';
            b = 'Добре, можете вибрати напрямок, який Вас цікавить';
            c = 'Виберіть';
            d = 'Виберіть час';
            t = `Зв'язок з оператором`;
            return bot.sendMessage(chatId, `Введіть будь ласка своє ім'я фамілію та по-батькові`);
        }    
        if (msg.data === 'yes') {
            await bot.sendMessage(chatId, `${t}`);
            await bot.sendMessage(chatId, '@igorgagarin');
            return bot.sendContact(chatId, '+380956430546', 'Igor');
        }  
        if (msg.data === 'no') {
            return;
        }   
        if (msg.data === 'consultation' || msg.data === 'diagnostics' || msg.data === 'information') {
            await bot.sendMessage(chatId, `${d}`, recordTime);
        }

    })
}

start();


// function calculateTheWords(message) {
  
//     const splitMessage = message.split(' ');
//     const wordsNumber = splitMessage.length;
//     return(wordsNumber);
//  }

//Check if number
function input(phone) {
    //console.log(Number(phone));
    if(Number(phone) > 11111111 && Number(phone) < 389999999999) {
        return true;
    }
    return false;
}
