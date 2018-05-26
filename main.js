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
Сделать более правильный юзер интерфейс для создания и удаления теста
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
    data: {
        id: -1,//по этому полю можно опред авторизован ли чел, если -1 то нет иначк авторизован

        login: '',
        pass: '',
        group: '',
        typePers: -1,

        txt: 0,//вроде нигде больше не юзал, кроме проверки JSON

        curentView: 'MainMenu'//МЕНЯЕТСЯ ПРЕДСТВЛЕНИЕ (СОСТОЯНИЕ)
    },
    methods: {
        SwitchView: function (view) {//МЕНЯЕТ ПРЕДСТВЛЕНИЕ (СОСТОЯНИЕ)
            this.curentView = view;
        },
        SignIn: function () {//ВХОД
            let isValidLogin = getDataFromDB(`SELECT count(*) FROM authorization WHERE login='${this.login}' AND password = '${this.pass}'`);
            if (isValidLogin["0"]["count(*)"] > 0) {
                let tmp = getDataFromDB(`SELECT * FROM authorization WHERE login='${this.login}'`);
                this.id = tmp["0"]["id"];
                this.typePers = tmp["0"]["id_type_person"];
                alert("Авторизация  пройдена");
            } else {
                this.id = -1;
                alert("Авторизация не пройдена");
            }
        },
        SignUp: function () {//РЕГИСТРАЦИЯ
            if (this.login == '') { alert("Вы не ввели логин, пожалуйста, заполните соответствующее поле"); return; }
            if (this.pass == '') { alert("Вы не ввели пароль, пожалуйста, заполните соответствующее поле"); return; }
            if (this.typePers == -1) { alert("Вы не выбрали тип пользователя"); return; }
            if (this.group == '') { alert("Поле группа, осталось пустым, пожалуйста. заполните его"); return; }
            let isValidLogin = getDataFromDB(`SELECT count(*) FROM authorization WHERE login='${this.login}'`);
            if (isValidLogin["0"]["count(*)"] > 0) { alert("Такой логин уже занят, придумайте другой"); return; }
            this.id = insertDataInDB(`INSERT INTO authorization (login, password, id_type_person, \`group\`) VALUES ('${this.login}', '${this.pass}', '${this.typePers}','${this.group}')`);
            alert("Вы зарегистрированы");
        },
        SignOut: function () {//РАЗЛОГИНИТЬСЯ
            this.clearData();
            alert("Вы вышли");
        },
        clearData: function () {
            this.id = -1;
            this.login = '';
            this.pass = '';
            this.group = '';
            this.typePers = '-1';
        }
    },
    components: {
        'KonfRules': {
            /*
             *************************
             *   КОНФИГУРАТОР ПРАВИЛ
             ************************
             */
            data: function () {
                return {
                    panel: 0,//верхняя панель скрывается по этому параметру
                    id_test: '',
                    curRule: null,
                    rules: [],
                    del_rules: [],
                    numPagination: -1//текущее правило на странице
                }
            },
            methods: {
                loadRules: function () {
                    if (this.id_test == '') return;
                    let isValidTest = getDataFromDB(`SELECT count(*) FROM tests WHERE id=${this.id_test}`);
                    if (isValidTest["0"]["count(*)"] == 0) { alert('Такого теста не существует, выберите другой тест'); return; }
                    this.panel = 1;

                    this.rules = [];
                    this.numPagination = -1;
                    let tmp = getDataFromDB(`SELECT * FROM conf_rules WHERE id_test = ${this.id_test} ORDER BY num_rule`);
                    for (let i = 0; i < tmp.length - 1; i += 3) {
                        let high = tmp[i];
                        let medium = tmp[i + 1];
                        let low = tmp[i + 2];
                        let out = {
                            num: high.num_rule,
                            conclusion: high.conclusion,
                            a: high.a,
                            b: high.b,
                            c: high.c,
                            d: high.d,
                            e: high.e,
                            f: high.f,
                            g: high.g,
                            h: high.h,
                            power: [
                                {
                                    type_kof: low.type_kof,
                                    id: low.id,
                                    kof: low.kof,
                                    type_condition: low.type_kof,
                                    id_A: low.id_A, A_val: low.id_A_val,
                                    id_B: low.id_B, B_val: low.id_B_val,
                                    id_C: low.id_C, C_val: low.id_C_val
                                },
                                {
                                    type_kof: medium.type_kof,
                                    id: medium.id,
                                    kof: medium.kof,
                                    type_condition: medium.type_kof,
                                    id_A: medium.id_A, A_val: medium.id_A_val,
                                    id_B: medium.id_B, B_val: medium.id_B_val,
                                    id_C: medium.id_C, C_val: medium.id_C_val
                                },
                                {
                                    type_kof: high.type_kof,
                                    id: high.id,
                                    kof: high.kof,
                                    type_condition: high.type_kof,
                                    id_A: high.id_A, A_val: high.id_A_val,
                                    id_B: high.id_B, B_val: high.id_B_val,
                                    id_C: high.id_C, C_val: high.id_C_val
                                }
                            ]
                        }
                        this.rules.push(out);
                    }
                    this.listPage(0);
                },
                openOtherRules: function () {
                    this.curRule = null;
                    this.rules = [];
                    this.del_rules = [];
                    this.numPagination = -1;
                    this.id_test = '';
                    this.panel = 0;
                },
                save: function () {
                    this.rules.forEach(el => {
                        if(el.indicatorNew == 'new'){
                            /*
                            if (el.id_type == -1) { alert('Не был выбран тип вопроса'); return; }
                            let sql = `INSERT INTO questions (\`id_type\`, \`id_test\`, \`question\`) VALUES ( ${el.id_type}, ${el.id_test}, '${el.question}' )`;
                            let id = insertDataInDB(sql);
                            if (id == -1) { alert('Ошибка вставки'); return; }
                            el.id = id;*/
                        } else {
                            let tmp_sql = `UPDATE conf_rules SET conclusion= '${el.conclusion}', num_rule = ${el.num}, \
                                a = ${el.a}, b = ${el.b}, c = ${el.c}, d = ${el.d},\
                                e = ${el.e}, f = ${el.f}, g = ${el.g}, h = ${el.h}`;
                            let sql_power = function(pow){
                                return `, type_kof = ${pow.type_kof}, kof = ${pow.kof}, \
                                id_type = ${pow.type_condition}, \ 
                                id_A = ${pow.id_A}, id_A_val = ${pow.A_val},\
                                id_B = ${pow.id_B}, id_B_val = ${pow.B_val},\
                                id_C = ${pow.id_C}, id_C_val = ${pow.C_val} \
                                WHERE id = ${pow.id}`; 
                            }
                            console.log(el);
                            console.log(el.power);
                            console.log(el.power[0]);
                            el.power.forEach(el1 => {
                                if (insertDataInDB(tmp_sql + sql_power(el1)) == -1) { 
                                    alert('Ошибка обновления'); return; }
                            });
                        }
                    });
                    /*
                    let errDel = false;
                    this.rules.forEach(id_del => {
                        if (id_del != 'new') {
                            let sql = "DELETE FROM questions WHERE id = " + id_del;
                            let id = insertDataInDB(sql);
                            if (id == -1) { alert('Ошибка удаления'); errDel = true; return; }
                        }
                    });
                    if (!errDel) this.delete_questions = [];*/
                },
                addRule: function () {
                    let out = {
                        indicatorNew: 'new',
                        num: 1,
                        conclusion: '',
                        a: 0,
                        b: 0,
                        c: 0,
                        d: 0,
                        e: 0,
                        f: 0,
                        g: 0,
                        h: 0,
                        high: {
                            kof: 0,
                            type_condition: 0,
                            id_A: 0, A_val: 0,
                            id_B: 0, B_val: 0,
                            id_C: 0, C_val: 0
                        },
                        medium: {
                            kof: 0,
                            type_condition: 0,
                            id_A: 0, A_val: 0,
                            id_B: 0, B_val: 0,
                            id_C: 0, C_val: 0
                        },
                        low: {
                            kof: 0,
                            type_condition: 0,
                            id_A: 0, A_val: 0,
                            id_B: 0, B_val: 0,
                            id_C: 0, C_val: 0
                        }
                    }
                    this.rules.push(out);
                    this.listPage(this.rules.length-1);
                },
                delRule: function () {
                    this.del_rules.push(this.rules[this.numPagination].id);
                    this.rules.splice(this.numPagination, 1);
                    if (this.numPagination == 0) {
                        this.rightPagination();
                    } else {
                        this.leftPagination();
                    }
                },
                listPage: function (n) {
                    this.curRule = this.rules[n];
                    this.numPagination = n;
                },
                leftPagination: function () {
                    if (this.numPagination > 0) this.listPage(this.numPagination - 1);
                },
                rightPagination: function () {
                    if (this.numPagination < this.rules.length - 1) this.listPage(this.numPagination + 1);
                },
                exit: function () {
                    this.$emit('exit', 'MainMenu');
                }
            },
            components:{
                'forpowertabs':{
                    name: 'forpowertabs',
                    props: ['powerprop','idtestprop'],
                    data: function(){
                        return {
                            lingvoVars: getDataFromDB('SELECT id, name FROM rules WHERE id_tests = ' + this.idtestprop),
                            power: [{ id: 1, name: 'Низкий' }, { id: 2, name: 'Средний' }, { id: 3, name: 'Высокий' }],
                            condition: [{id: 1, name: 'A & B & C'},{id: 2, name: 'A & (B || C)'},{id: 3, name: '(A & B) || C'},{id: 4, name: 'A || B || C'},{id: 5, name: 'A & B'},{id: 6, name: 'A || B'}]
                        }
                    },
                    template: '#forpowertabs-tmp'
                }
            },
            template: '#KonfRules-tmp'
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
            this.delete_questions = [];
            this.panel = 0;
            id_test = '';
        },
        addQuestion: function(){
            this.questions.push({id: 'new', id_test: this.id_test,  id_type: -1, number: -1, question: 'Введите формулировку вопроса'});
        },
        delQuestion: function(index){
            this.delete_questions.push(this.questions[index].id);
            this.questions.splice(index,1);
        },
        save: function(){
            this.questions.forEach(el => {
                if(el.id == 'new'){
                    if(el.id_type == -1) {alert('Не был выбран тип вопроса'); return;}
                    let sql = `INSERT INTO questions (\`id_type\`, \`id_test\`, \`question\`) VALUES ( ${el.id_type}, ${el.id_test}, '${el.question}' )`;
                    let id = insertDataInDB(sql);
                    if(id == -1) {alert('Ошибка вставки'); return;}
                    el.id = id;
                }else{
                    let sql = "UPDATE questions SET " +
                        "id_type = " + el.id_type + ", " +
                        "question = '" + el.question + "'" +
                        "WHERE id = " + el.id;
                    let id = insertDataInDB(sql);
                    if(id == -1) {alert('Ошибка обновления'); return;}
                    
                }
            });
            let errDel = false;
            this.delete_questions.forEach(id_del => {
                if(id_del != 'new'){
                    let sql = "DELETE FROM questions WHERE id = " + id_del;
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

