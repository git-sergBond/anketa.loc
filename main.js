/*
 -=САЙТ ДЛЯ ПРОВЕДЕНИЯ Online АНКЕТИРОВАНИЯ=-
        
   -=АЛГОРИТМ: Мамдани, нечеткая логика=-
        
              -=карта сайта=-
        корень--> МЕНЮ + АВТОРИЗАЦИЯ
                1---> АНКЕТИРОВАНИЕ
                2---> КОНФИГУРАТОР ТЕСТОВ
                3---> КОНФИГУРАТОР ПРАВИЛ
                4---> ФОРМА ЭКСПЕРТА
                5---> ФОРМА СОЦИОЛОГА
                6---> ДЕФАЗИФИКАЦИЯ И ВЫВОДЫ

            -=права доступа=-
       1 - доступно студентам
       2, 3, 5, 6 - доступно социологу
       5 - доступно социологу                  
*/

/*
Срочно:
*/

/*
Не срочно:
1 добавить перезапись UPDATE в анкетировании, или возможность повторного тестирования, при одном и томже прохождении теста
2 считывание типов пользователей и типов вопросов из бд в лист боксы
3 не работает clearData из дочернего компонета //143 
*/

/*
Желательно:
1 добавить сверху название теста
2 добавить сортировку по номеру в конфигураторе и тестировании
*/

/* ----------
 * ТИПА API К СЕРВЕРУ
 * ----------
 */
function getDataFromDB(sqlquery){//делает sql запрос к серверу и отдает данные в формате json
    let request = new XMLHttpRequest();
    let json;
    request.open("GET", "get_data_from_db.php?" + "sql="+sqlquery+';', false);
    function responceLoad() {
        if (request.readyState == 4) {
            let status = request.status;
            if (status == 200) {
                json = JSON.parse(request.responseText);
            } else {
                document.write("Ответ сервера " + request.statusText);
            }
        }
    }
    request.onload = responceLoad;
    request.send();
    return json;
}
function insertDataInDB(sqlquery){//делает sql INSERT в БД и возвращает номер последней вставленной записи
    let request = new XMLHttpRequest();
    let txt;
    request.open("GET", "insert_data_in_db.php?" + "sql="+sqlquery+';', false);
    function responceLoad() {
        if (request.readyState == 4) {
            let status = request.status;
            if (status == 200) {
                txt = request.responseText;
            } else {
                document.write("Ответ сервера " + request.statusText);
            }
        }
    }
    request.onload = responceLoad;
    request.send();
    return txt;
}
/* ----------
 * SPA НА VUE
 * ----------
 */
var mainComponent = new Vue({//ГЛАВНЫЙ компонент - ГЛАВНОЕ МЕНЮ + АВТОРИЗАЦИЯ
    el: '#main-component',
	data:{
        id: -1,//по этому полю можно опред авторизован ли чел, если -1 то нет иначк авторизован

        login: '',
        pass: '',
        group: '',
        typePers: -1,

        txt: 0,//вроде нигде больше не юзал, кроме проверки JSON

        curentView: 'MainMenu'//МЕНЯЕТСЯ ПРЕДСТВЛЕНИЕ (СОСТОЯНИЕ)
	},
	methods:{
		SwitchView: function(view){//МЕНЯЕТ ПРЕДСТВЛЕНИЕ (СОСТОЯНИЕ)
			this.curentView = view;
        },
        SignIn: function(){//ВХОД
            let isValidLogin = getDataFromDB(`SELECT count(*) FROM authorization WHERE login='${this.login}' AND password = '${this.pass}'`);
            if(isValidLogin["0"]["count(*)"] > 0){
                let tmp  = getDataFromDB(`SELECT * FROM authorization WHERE login='${this.login}'`);
                this.id = tmp["0"]["id"];
                this.typePers = tmp["0"]["id_type_person"];
                alert("Авторизация  пройдена");
            }else{
                this.id = -1;
                alert("Авторизация не пройдена");
            }
        },
        SignUp: function() {//РЕГИСТРАЦИЯ
            if(this.login == '') {alert("Вы не ввели логин, пожалуйста, заполните соответствующее поле"); return;}
            if(this.pass == '') {alert("Вы не ввели пароль, пожалуйста, заполните соответствующее поле"); return;}
            if(this.typePers == -1){alert("Вы не выбрали тип пользователя"); return;}
            if(this.group == '') {alert("Поле группа, осталось пустым, пожалуйста. заполните его");return;}
            let isValidLogin = getDataFromDB(`SELECT count(*) FROM authorization WHERE login='${this.login}'`);
            if(isValidLogin["0"]["count(*)"] > 0){ alert("Такой логин уже занят, придумайте другой"); return; }
            this.id = insertDataInDB(`INSERT INTO authorization (login, password, id_type_person, \`group\`) VALUES ('${this.login}', '${this.pass}', '${this.typePers}','${this.group}')`);
            alert("Вы зарегистрированы");
        },
        SignOut: function() {//РАЗЛОГИНИТЬСЯ
            this.clearData();
            alert("Вы вышли");
        },
        clearData: function(){
            this.id = -1;
            this.login = '';
            this.pass = '';
            this.group = '';
            this.typePers = '-1';
        }
    }
});
/*
 ********************
 *   АНКЕТИРОВАНИЕ
 ********************
 */
Vue.component('Anketirovanie', {
    data: function () {
        return {
            panel: 0,//верхняя панель скрывается по этому параметру
            id_test: '',
            questions: []
        }
    },
    methods: {
        loadTest: function () {
            if (this.id_test == '') return;
            let isValidTest = getDataFromDB(`SELECT count(*) FROM tests WHERE id=${this.id_test}`);
            if (isValidTest["0"]["count(*)"] == 0) { alert('Такого теста не существует, выберите другой тест'); return; }
            this.panel = 1;
            let tmp = getDataFromDB(`SELECT * FROM questions WHERE id_test = ${this.id_test}`);
            tmp.forEach(el => {
                if(el.id_type == 1) el.val = false;
                else if(el.id_type == 2) el.val = 5;
                else alert('Возможно ошибка в типе вопроса');
            });
            this.questions = tmp;
        },
        openOtherTest: function () {
            this.questions = [];
            this.panel = 0;
        },
        save: function () {
            let err = -1;
            this.questions.forEach(el => {
                let sql = "INSERT INTO `res_testing`(`id_pers`,`id_question`,`answer`) VALUES (" + mainComponent.id + "," + el.id + "," + el.val + ")";
                err = insertDataInDB(sql);
            });
            if(err == -1){  alert('Ошибка вставки данных'); return; }
            alert("Данные сохранены");
            mainComponent.clearData();//143
            this.exit();
        },
        exit: function () {
            this.$emit('exit', 'MainMenu');
        }
    },
    template: '#Anketirovanie-tmp'
})
/*
 *************************
 *   КОНФИГУРАТОР ТЕСТОВ
 *************************
 */

Vue.component('KonfTest', {
	data: function () {
	  return {
        panel: 0,//верхняя панель скрывается по этому параметру
        id_test: '',
        questions: [],
        delete_questions: []//набиваются id для удаления
	  }
	},
	methods:{
        loadTest: function () {
            if (this.id_test == '') return;
            let isValidTest = getDataFromDB(`SELECT count(*) FROM tests WHERE id=${this.id_test}`);
            if (isValidTest["0"]["count(*)"] == 0) { alert('Такого теста не существует, выберите другой тест'); return; }
            this.panel = 1;
            this.questions = getDataFromDB(`SELECT * FROM questions WHERE id_test = ${this.id_test}`);
        },
        openOtherTest: function(){
            this.questions = [];
            this.panel = 0;
        },
        addQuestion: function(){
            this.questions.push({id: 'new', id_test: this.id_test,  id_type: -1, number: -1, question: 'Введите формулировку вопроса'});
        },
        delQuestion: function(index){
            this.delete_questions.push(this.questions[index].id);
            this.questions.splice(index,1);
        },
        save: function(){
            console.log(this.questions);
            this.questions.forEach(el => {
                if(el.id == 'new'){
                    if(el.id_type == -1) {alert('Не был выбран тип вопроса'); return;}
                    let sql = `INSERT INTO questions (\`id_type\`, \`id_test\`, \`question\`) VALUES ( ${el.id_type}, ${el.id_test}, '${el.question}' )`;
                    let id = insertDataInDB(sql);
                    console.log(sql);
                    if(id == -1) {alert('Ошибка вставки'); return;}
                    el.id = id;
                }else{
                    let sql = "UPDATE questions SET " +
                        "id_type = " + el.id_type + ", " +
                        "question = '" + el.question + "'" +
                        "WHERE id = " + el.id;
                    let id = insertDataInDB(sql);
                    console.log(sql);
                    if(id == -1) {alert('Ошибка обновления'); return;}
                    
                }
            });
            let errDel = false;
            this.delete_questions.forEach(id_del => {
                if(id_del != 'new'){
                    let sql = "DELETE FROM questions WHERE id = " + id_del;
                    console.log(sql);
                    let id = insertDataInDB(sql);
                    if(id == -1) {alert('Ошибка удаления'); errDel = true; return;}
                }
            });
            if(!errDel) this.delete_questions = [];
        },
		exit: function(){
			this.$emit('exit','MainMenu');
        }
	},
	template: '#KonfTest-tmp'
})
/*
 *************************
 *   КОНФИГУРАТОР ПРАВИЛ
 *************************
 */


//считать с БД
Vue.component('authorizationRead',{
    data: function() {
        return{
             respons_db: []
        }
    },
    methods:{
		exit: function(){
			this.$emit('exit','MainMenu');
        },
        load: function(){
            this.respons_db = getDataFromDB('SELECT * FROM authorization')
        }
	},
	template: '#authorizationRead-tmp'
})

