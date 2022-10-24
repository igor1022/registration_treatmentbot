const TelegramApi = require('node-telegram-bot-api');
const token = '5322783432:AAEyHVbJKxsQq8LiY4lSTOrq3RikIvnJ3qk';
const bot = new TelegramApi(token, {polling: true});
const axios = require('axios');
CHAT_ID = "-785368621"; 
const uri_api = `https://api.telegram.org/bot${ token }/sendMessage`;


let a, b, c, d, e, f, g, t, m, n, k, i, j, v;

// first question
const startRecord = async (chatId) => {
    await bot.sendMessage(chatId, 'Виберіть мову - Сделайте выбор языка', language);
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
            {text: '11.00', callback_data: '11'}],
            [{text: '12.00', callback_data: '12'}, {text: '13.00', callback_data: '13'}, 
            {text: '14.00', callback_data: '14'}],
            [{text: '15.00', callback_data: '15'}, 
            {text: '16.00', callback_data: '16'}],
            [{text: '17.00', callback_data: '17'}, {text: '18.00', callback_data: '18'}],
        ]
    })
};

let recordDay = {};

const recordDay_ru = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Понедельник', callback_data: 'Понедельник'}, {text: 'Вторник', callback_data: 'Вторник'}],
            [{text: 'Среда', callback_data: 'Среда'}, {text: 'Четверг', callback_data: 'Четверг'}],
            [{text: 'Пятница', callback_data: 'Пятница'}, {text: 'Суббота', callback_data: 'Суббота'}],
            [{text: 'Воскресенье', callback_data: 'Воскресенье'}],
        ]
    })
};


const recordDay_ukr = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Понеділок', callback_data: 'Понеділок'}, {text: 'Вівторок', callback_data: 'Вівторок'}],
            [{text: 'Середа', callback_data: 'Середа'}, {text: 'Четвер', callback_data: 'Четвер'}],
            [{text: `П'ятниця`, callback_data: `П'ятниця`}, {text: 'Субота', callback_data: 'Субота'}],
            [{text: 'Неділя', callback_data: 'Неділя'}],
        ]
    })
};

const language = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Українська', callback_data: 'ukr'},
             {text: 'Русский', callback_data: 'ru'},],
        ]
    })
}

const chat = [];
let marker = false;

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Почати'},
        {command: '/time', description: 'Графік роботи'},
        {command: '/address', description: 'Адреса клініки'},
        {command: '/items', description: 'Перелік хвороб'},
        {command: '/contacts', description: "Зв'язатися з консультантом"},
        {command: '/record', description: 'Записатися на консультацію'},
        {command: '/again', description: 'Повернутися на початок'}
    ]);

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
            await bot.sendMessage(chatId, 'Вітаємо Вас - Добро пожаловать');
            await bot.sendMessage(chatId, 'Виберіть будь ласка мову - Сделайте выбор языка', language);
            return;
        // 
        }
//Contacts reply        
        if (text === '/contacts') {
            marker = false;
            await bot.sendMessage(chatId, '@YevhenDudar');
            //в конфігу прописати ім'я телефон
            return bot.sendContact(chatId, '+380952185444', 'Адміністрація');
        }
        if (text === '/time') {
            marker = false;
            await bot.sendMessage(chatId, 'Ми працюємо з 08:00 – 16:00');
            //в конфігу прописати ім'я телефон
            //return bot.sendContact(chatId, ' ', ' ');
            return;
        }
        if (text === '/address') {
            marker = false;
            await bot.sendMessage(chatId, 'Ми знаходимося біля метро «Печерська» за адресою бульвар Лесі Українки, 26-Б, 2-е парадне (вхід), 6-й поверх, при виході з ліфта на ліво, офіс 645, на дверях написано зелений логотип «Резонанс»');
            return;
        }
        if (text === '/price') {
            marker = false;
            await bot.sendMessage(chatId, 'Лікування коштує згідно з прайсом на сайті https://rezonans.net.ua/ru/czeny/');
            return;
        }
        if (text === '/items') {
            marker = false;
            await bot.sendMessage(chatId, 'Перелік хвороб подивіться будь ласка на сайті https://rezonans.net.ua/ru/glavnaya/');
            return;
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
        }
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

let day;
let marker4 = false;
    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (Number(msg.data) >= 9 && Number(msg.data <= 18)) {
            //console.log(msg.from.username);
            await bot.sendMessage(chatId, `${e}, ${FIO}, ${f} ${day} ${msg.data}.00`);
            chat[1] = `${msg.data}.00`;
            chat[2] = `@${msg.from.username}`;
            chat[3] = FIO;
            chat[4] = day;
            //console.log(chat);
            axios.post(uri_api, {
                chat_id : CHAT_ID,
                parse_mode : 'html',
                text: `${chat[3]} ${chat[0]} ${chat[1]} ${chat[2]} ${chat[4]}`
            });
            //await bot.sendMessage(chatId, `${g}`);
            await bot.sendMessage(chatId, 'Yes/No', questions);
            day = msg.data;
            setTimeout(() => {
                if (msg.data === day && !marker4) {
                    bot.sendMessage(chatId, `${i} ${chat[3]}. ${j}`);
                    return;
                }
            }, 15000);
            return;
        }
        if (msg.data === 'ru') {
            recordOptions = recordOptions_ru;
            recordDay = recordDay_ru;
            e = 'Хорошо';
            f = 'Вы записаны на';
            g = 'У Вас остались еще вопросы?';
            a = 'Введите свой номер телефона из 7 цифр без +38';
            b = 'Хорошо, можете выбрать направление, которое Вас интересует';
            c = 'Выберите';
            d = 'Выберите время';
            t = 'Связь с оператором';
            g = 'Хорошо, Вы записаны на '; 
            m = 'Всего Вам найлучшего ';
            n = `Ждем Вас в нашей клинике хрономедицины`;
            k = 'Выберите день';
            i = 'Всего Вам найлучшего';
            j = 'Ждем Вас в нашей клинике хрономедицины';
            v = 'Пожалуйста, воспользуйтесь меню, которое находится внизу слева';
            questions = questions_ru;
            return bot.sendMessage(chatId, 'Введите пожалуйста свое имя фамилию и отчество');
        }  
        if (msg.data === 'ukr') {
            recordOptions = recordOptions_ukr;
            recordDay = recordDay_ukr;
            questions = questions_ukr;
            e = 'Добре';
            f = 'Ви записані на';
            g = 'У Вас залишились ще запитання?';
            a = 'Введіть свій номер телефону з 7 цифр без +38';
            b = 'Добре, можете вибрати напрямок, який Вас цікавить';
            c = 'Виберіть';
            d = 'Виберіть час';
            t = `Зв'язок з адміністрацією`;
            g = 'Добре Ви записані на ';
            m = 'Всього Вам найкращого ';
            n = `Чекаємо Вас в нашій клініці хрономедицини`;
            k = 'Виберіть день';
            i = 'Всього Вам найкращого';
            j = 'Чекаємо Вас в нашій клініці хрономедицини';
            v = 'Будь ласка скористуйтеся меню, яке знаходиться внизу зліва';
            return bot.sendMessage(chatId, `Введіть будь ласка своє ім'я прізвище та по батькові`);
        }    
        if (msg.data === 'yes') {
            await bot.sendMessage(chatId, `${t}`);
            await bot.sendMessage(chatId, '@YevhenDudar');
            return bot.sendContact(chatId, '+380952185444', 'Адміністрація');
        }  
        if (msg.data === 'no') {
            await bot.sendMessage(chatId, `${m}${chat[3]}. ${n}`);
            marker4 = true;
            return;
        }   
        if (msg.data === 'Понедельник' || msg.data === 'Вторник' || msg.data === 'Среда' || 
            msg.data === 'Четверг' || msg.data === 'Пятница' || msg.data === 'Суббота'
             ||  msg.data === 'Воскресенье') {
            await bot.sendMessage(chatId, `${g} ${msg.data}`);
            day = msg.data;
            await bot.sendMessage(chatId, `${d}`, recordTime);
            return;
        }

        if (msg.data === 'Понеділок' || msg.data === 'Вівторок' || msg.data === 'Середа' || 
            msg.data === 'Четвер' || msg.data === `П'ятниця` || msg.data === 'Субота'
             ||  msg.data === 'Неділя') {
            await bot.sendMessage(chatId, `${g} ${msg.data}`);
            day = msg.data;
            await bot.sendMessage(chatId, `${d}`, recordTime);
            return;
        }

        if (msg.data === 'consultation' || msg.data === 'diagnostics') {
            await bot.sendMessage(chatId, `${k}`, recordDay);
            return;
        }
        if (msg.data === 'information') {
            await bot.sendMessage(chatId, `${v}`);
            return;
        }

    })
}

start();

//Check if number
function input(phone) {
    //console.log(Number(phone));
    if(Number(phone) > 11111111 && Number(phone) < 389999999999) {
        return true;
    }
    return false;
}