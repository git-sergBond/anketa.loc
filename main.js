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
       
       СТРУКТУРА ПРОГРАММЫ:
       1 .::. КОММЕНТАРИИ
       2 .::. API
       3 .::. МАТЕМАТИКА
       4 .::. ФУНКЦИИ ДЛЯ РАБОТЫ С БД И СТРУКТУРАМИ ДАННЫХ
       5 .::. КОРЕНЬ САЙТА ИЛИ ГЛАВНЫЙ КОМПОНЕНТ

       РАЗРАБОТЧИК: Бондаренко Сергей Сергеевич
       ВЕРСТАЛЬЩИКИ: Алексей, Артем 
       ДАТА РЕАЛИЗАЦИИ 1й версии: 03:06 28.05.2018

*/
//                                                  .
//                                                .:::.
//                                            .::.  1  .::.
//                                          .::..::. .::..::.
/*
Срочно:
Сделать более правильный юзер интерфейс для создания и удаления теста
(но это не недостаток)починить несходство новых id для теста и id у правил 
выстовить в функцию проверку существования теста
*/

/*
Не срочно:
1 добавить перезапись UPDATE в анкетировании, или возможность повторного тестирования, при одном и томже прохождении теста
2 считывание типов пользователей и типов вопросов из бд в лист боксы
3 не работает clearData из дочернего компонета //143 
4 //236 строка
5 восстановить целостность БД после всех копирований
*/

/*
Желательно:
1 добавить сверху название теста
2 добавить сортировку по номеру в конфигураторе и тестировании
*/
//                                                  .
//                                                .:::.
//                                            .::.  2  .::.
//                                          .::..::. .::..::.
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
//                                                  .
//                                                .:::.
//                                            .::.  3  .::.
//                                          .::..::. .::..::.
/* ----------
 * ЗДЕСЬ ВСЯ МАТЕМАТИКА
 * ----------
 */
/*
 *VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
 *                 -=ФАЗИФИКАЦИЯ=-
 * ФУНЦИЯ РАБОТАЕТ НА ФОРМЕ СОЦИОЛОГ И ВЫДАЕТ МАССИВ
 * ВХОДНЫХ ДАННЫХ + РАСЧЕТНЫЕ
 *VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
 */
function rasch_on_sociolog(id_test) {
    let tmpMas = getDataFromDB("SELECT * FROM rules, questions WHERE questions.id = rules.id_questions  AND questions.id_test = " + id_test);
    tmpMas.forEach(row => {
        let percent = -1;
        let avg = -1;

        let question_id = row["id_questions"];
        let sql_get_count_answed_on_question = function (id_question) {
            return `select count(*) from res_testing where id_question = ${id_question}`;
        }
        let all_cnt = getDataFromDB(sql_get_count_answed_on_question(question_id))["0"]["count(*)"];

        let type_quest = row["id_type"];



        let sql_get_count_answed_yes = function (id_question) {
            return `select count(*) from res_testing where id_question = ${id_question} AND  answer = 1`;
        }
        let sql_get_avg_answed_2_to_5 = function (id_question) {
            return `select  AVG(answer) from res_testing where id_question = ${id_question}`;
        }

        if (Number(type_quest) == 1) //если это + - то считаем %
        {
            let cnt_yes = getDataFromDB(sql_get_count_answed_yes(question_id))["0"]["count(*)"];;
            percent = (Number(cnt_yes) * 100.0) / Number(all_cnt);
            row.percent_or_avg = (Math.round(percent * 100) / 100);
            row.procent = true;
        }
        else //если это 2..5 то считаем среднее
        {
            avg = getDataFromDB(sql_get_avg_answed_2_to_5(question_id))["0"]["AVG(answer)"];
            row.percent_or_avg = (Math.round(avg * 100) / 100);
            row.procent = false;
        }

        let suhu = row.percent_or_avg;
        let s_rendah = -1;
        let s_sedang = -1;
        let s_tinggi = -1;
        //низкий
        if (suhu < row.a) s_rendah = 1;
        if (suhu >= row.a && suhu <= row.d) s_rendah = (row.d - suhu) / (row.d - row.a);
        if (suhu > row.a) s_rendah = 0;
        row.itog_niz = Math.round(s_rendah * 1000) / 1000;
        // средний
        if (suhu < row.b) s_sedang = 0;
        if (suhu >= row.b && suhu <= row.d) s_sedang = (suhu - row.b) / (row.d - row.b);
        if (suhu >= row.d && suhu <= row.f) s_sedang = 1;
        if (suhu >= row.f && suhu <= row.h) s_sedang = (row.h - suhu) / (row.h - row.f);
        if (suhu > row.h) s_sedang = 0;
        row.itog_sred = Math.round(s_sedang * 1000) / 1000;
        //высокий 
        if (suhu < row.e) s_tinggi = 0;
        if (suhu >= row.e && suhu <= row.h) s_tinggi = (suhu - row.e) / (row.h - row.e);
        if (suhu > row.h) s_tinggi = 1;
        row.itog_vys = Math.round(s_tinggi * 1000) / 1000;
    });
    return tmpMas;
}
/*
 *VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
 *             -=ВЫВОДЫ+ДЕФАЗИФИКАЦИЯ=-
 * ФУНЦИЯ РАБОТАЕТ НА ФОРМЕ ДЕФАЗИФИКАЦИЯ И ВЫДАЕТ МАССИВ
 * ВХОДНЫХ ДАННЫХ + РАСЧЕТНЫЕ
 *VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
 */
function rasch_on_defazification(id_test){
    let defaz = [];//(подзаключение)
    let sociolog_rasch = rasch_on_sociolog(id_test);
    let load_rules = get_data_from_CONF_RULES_TABLE(id_test);
    //РАСЧЕТ ВЫВОДОВ
    load_rules.forEach(rule => {
        let out = {
            conclusion: rule.conclusion,
            procent_defazific: -1,
            power: []
        }
        rule.power.forEach(power_row => {
            //РАСЧЕТ ВЫВОДОВ
            let A = -1, B = -1, C = -1;//считы с социолога по правилу сред низ выс
            A = getFromSociologTable_B_i(Number(power_row.id_A), Number(power_row.A_val), sociolog_rasch);
            B = getFromSociologTable_B_i(Number(power_row.id_B), Number(power_row.B_val), sociolog_rasch);
            C = getFromSociologTable_B_i(Number(power_row.id_C), Number(power_row.C_val), sociolog_rasch);
           
            let stepen_istinnosti = -1;
            let activisatia = -1;
            switch (Number(power_row.type_condition)) {//Defazing(1)
                case 1:// A & B & C
                    stepen_istinnosti = Math.min(A, Math.min(B, C));
                    break;
                case 2:// A & B || C
                    stepen_istinnosti = Math.min(A, Math.max(B, C));
                    break;
                case 3://A || B & C
                    stepen_istinnosti = Math.min(Math.max(A, B), C);
                    break;
                case 4://A || B || C
                    stepen_istinnosti = Math.max(A, Math.max(B, C));
                    break;
                case 5://A & B
                    stepen_istinnosti = Math.min(A, B);
                    break;
                case 6://A || B
                    stepen_istinnosti = Math.max(A, B);
                    break;
                default:
                    //MessageBox.Show("Данное условие пока не поддерживается Defazing(1)");
                    break;
            } 
            activisatia  = stepen_istinnosti * power_row.kof;
            out.power.push({
                type_power: power_row.type_condition,
                stepen_istinnosti: stepen_istinnosti,
                activisatia: activisatia
            });
        }); 
        //РАСЧЕТ ДЕФАЗИФИКАЦИЯ
        let akkN = -1, akkS = -1, akkV = -1;

        //ТУТ НУЖНО ИСПРАВИТЬ ОШИБКУ КОГДА НЕ СОВПАДАЕТ НУМЕРАЦИЯ И НИЗ И  СРЕДНИЙ
        //236
        akkN = Number(out.power[0].activisatia);
        akkS = Number(out.power[1].activisatia);
        akkV = Number(out.power[2].activisatia);

        let def = (((Number(rule.a) + Number(rule.c)  ) * akkN) + ((Number(rule.b) + Number(rule.d) + Number(rule.f) + Number(rule.g)  ) * akkS  ) + ((Number(rule.e) +  Number(rule.h)) * akkV)) / ((akkN * 2) + (akkS * 4) + (akkV * 2));

        if ((akkN * 2 + akkS * 4 + akkS * 2) == 0) {
            //MessageBox.Show("Не число /0");
        }
        out.procent_defazific = Math.round(def*1000)/1000;
        defaz.push(out);
    });
    return defaz;
}

function getFromSociologTable_B_i(i/*Номер вопроса(строки)*/, j/*выбор из {низкий|средний|высокий} кофициент (столбец)*/, soc) {
    //берет данные о расчитанном значении Bi с формы Социолога
    let Bi = -1;
    soc.forEach(soc_row => {
        if(soc_row.id == i){
            if (j == 1) Bi = soc_row.itog_niz;//низкий
            else if (j == 2) Bi = soc_row.itog_sred;//средний
            else if (j == 3) Bi = soc_row.itog_vys;//высокий
        }
    });
    //console.log(`${i} - ${j} = ${Bi}`);
    return Bi;
}
//                                                  .
//                                                .:::.
//                                            .::.  4  .::.
//                                          .::..::. .::..::.
/* --------------------------------------------------
 * УДОБНОСТИ ДЛЯ ЛОГИКИ И ОБРАЩЕНИЯМ К БД
 * --------------------------------------------------
 */
/*
 *VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
 *             -=ВЫВОДЫ+ДЕФАЗИФИКАЦИЯ=-
 * ФУНЦИЯ РАБОТАЕТ НА ФОРМЕ ДЕФАЗИФИКАЦИЯ И ВЫДАЕТ МАССИВ
 * ВХОДНЫХ ДАННЫХ + РАСЧЕТНЫЕ
 *VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
 */
function get_data_from_CONF_RULES_TABLE(id_test) {
    let rules = [];
    let tmp = getDataFromDB(`SELECT * FROM conf_rules WHERE id_test = ${id_test} ORDER BY num_rule`);
    for (let i = 0; i < tmp.length - 1; i += 3) {
        let high = tmp[i];
        let medium = tmp[i + 1];
        let low = tmp[i + 2];
        let out = {
            num: high.num_rule,
            conclusion: high.conclusion,
            a: high.a, b: high.b, c: high.c, d: high.d,
            e: high.e, f: high.f, g: high.g, h: high.h,
            power: [
                {
                    type_kof: high.type_kof,
                    id: high.id,
                    kof: high.kof,
                    type_condition: high.type_kof,
                    id_A: high.id_A, A_val: high.id_A_val,
                    id_B: high.id_B, B_val: high.id_B_val,
                    id_C: high.id_C, C_val: high.id_C_val
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
                    type_kof: low.type_kof,
                    id: low.id,
                    kof: low.kof,
                    type_condition: low.type_kof,
                    id_A: low.id_A, A_val: low.id_A_val,
                    id_B: low.id_B, B_val: low.id_B_val,
                    id_C: low.id_C, C_val: low.id_C_val
                }
            ]
        }
        rules.push(out);
    }
    return rules;
}
//                                                  .
//                                                .:::.
//                                            .::.  5  .::.
//                                          .::..::. .::..::.
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
        /*
         *************************
         *   КОНФИГУРАТОР ПРАВИЛ
         ************************
         */
        'KonfRules': {
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

                    this.rules = get_data_from_CONF_RULES_TABLE(this.id_test);
                    this.numPagination = 0;
                    
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
                        if (el.indicatorNew == 'new') {
                            let tmp_sql = `INSERT INTO conf_rules (id_test, conclusion, num_rule, a,b,c, d, e, f, g, h, type_kof,kof, id_type, id_A, id_B, id_C, id_A_val, id_B_val, id_C_val) VALUES \
                            (${this.id_test}, '${el.conclusion}', ${el.num}, \
                                ${el.a}, ${el.b}, ${el.c}, ${el.d},\
                                ${el.e}, ${el.f}, ${el.g}, ${el.h}`;
                            let sql_power = function (pow) {
                                return `, ${pow.type_kof}, ${pow.kof}, ${pow.type_condition}, \ 
                                 ${pow.id_A},${pow.id_B},${pow.id_C}, \
                                 ${pow.A_val},${pow.B_val},${pow.C_val})`;
                            }
                            el.power.forEach(el1 => {
                                let tmp_id = insertDataInDB(tmp_sql + sql_power(el1));
                                el1.id = tmp_id;
                                if (tmp_id == -1) {
                                    alert('Ошибка вставки'); return;
                                }
                            });
                            el.indicatorNew = 'inserted';
                        } else {
                            let tmp_sql = `UPDATE conf_rules SET conclusion= '${el.conclusion}', num_rule = ${el.num}, \
                                a = ${el.a}, b = ${el.b}, c = ${el.c}, d = ${el.d},\
                                e = ${el.e}, f = ${el.f}, g = ${el.g}, h = ${el.h}`;
                            let sql_power = function (pow) {
                                return `, type_kof = ${pow.type_kof}, kof = ${pow.kof}, \
                                id_type = ${pow.type_condition}, \ 
                                id_A = ${pow.id_A}, id_A_val = ${pow.A_val},\
                                id_B = ${pow.id_B}, id_B_val = ${pow.B_val},\
                                id_C = ${pow.id_C}, id_C_val = ${pow.C_val} \
                                WHERE id = ${pow.id}`;
                            }
                            el.power.forEach(el1 => {
                                if (insertDataInDB(tmp_sql + sql_power(el1)) == -1) {
                                    alert('Ошибка обновления'); return;
                                }
                            });
                        }
                    });
                    let errDel = false;
                    this.del_rules.forEach(id_del => {
                        if (id_del != 'new') {
                            let sql = "DELETE FROM conf_rules WHERE id = " + id_del;
                            let id = insertDataInDB(sql);
                            if (id == -1) { alert('Ошибка удаления'); errDel = true; return; }
                        }
                    });
                    if (!errDel) this.del_rules = [];
                },
                addRule: function () {
                    let out = {
                        indicatorNew: 'new',
                        num: Number(this.rules[this.rules.length - 1].num) + 1,
                        conclusion: '',
                        a: 0, b: 0, c: 0, d: 0,
                        e: 0, f: 0, g: 0, h: 0,
                        power: [
                            {
                                type_kof: 1,
                                id: 'none',
                                kof: 0,
                                type_condition: 0,
                                id_A: 0, A_val: 0,
                                id_B: 0, B_val: 0,
                                id_C: 0, C_val: 0
                            },
                            {
                                type_kof: 2,
                                id: 'none',
                                kof: 0,
                                type_condition: 0,
                                id_A: 0, A_val: 0,
                                id_B: 0, B_val: 0,
                                id_C: 0, C_val: 0
                            },
                            {
                                type_kof: 3,
                                id: 'none',
                                kof: 0,
                                type_condition: 0,
                                id_A: 0, A_val: 0,
                                id_B: 0, B_val: 0,
                                id_C: 0, C_val: 0
                            }
                        ]
                    }
                    this.rules.push(out);
                    this.listPage(this.rules.length - 1);
                },
                delRule: function () {
                    this.rules[this.numPagination].power.forEach(el => {
                        this.del_rules.push(el.id);
                    });
                    this.rules.splice(this.numPagination, 1);
                    for (let index = this.numPagination; index < this.rules.length; index++) {
                        this.rules[index].num--;
                    }
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
            components: {
                'forpowertabs': {
                    name: 'forpowertabs',
                    props: ['powerprop', 'idtestprop'],
                    data: function () {
                        return {
                            lingvoVars: getDataFromDB('SELECT id, name FROM rules WHERE id_tests = ' + this.idtestprop),
                            power: [{ id: 1, name: 'Низкий' }, { id: 2, name: 'Средний' }, { id: 3, name: 'Высокий' }],
                            condition: [{ id: 1, name: 'A & B & C' }, { id: 2, name: 'A & (B || C)' }, { id: 3, name: '(A & B) || C' }, { id: 4, name: 'A || B || C' }, { id: 5, name: 'A & B' }, { id: 6, name: 'A || B' }]
                        }
                    },
                    template: '#forpowertabs-tmp'
                }
            },
            template: '#KonfRules-tmp'
        },
        /*
         ********************
         *   ЭКСПЕРТ
         ********************
         */
        'Expert': {
            name: 'Expert',
            template: '#expert-tmp',
            data: function () {
                return {
                    id_test: '',
                    panel: 0,
                    rules: []
                }
            },
            methods: {
                loadVars: function(){
                    if (this.id_test == '') return;
                    let isValidTest = getDataFromDB(`SELECT count(*) FROM tests WHERE id=${this.id_test}`);
                    if (isValidTest["0"]["count(*)"] == 0) { alert('Такого теста не существует, выберите другой тест'); return; }
                    this.panel = 1;
                    this.rules = [];
                    this.rules = getDataFromDB(`SELECT * FROM rules WHERE id_tests = ${this.id_test}`);
                }, 
                save: function(){
                    let sql_update = function(id,name,a,b,c,d,e,f,g,h){
                        return `update rules set name='${name}', a ='${a}', b ='${b}',  c ='${c}', d ='${d}', e ='${e}', f ='${f}',   g ='${g}', h ='${h}' WHERE id='${id}'`;
                    }
                    let id;
                    this.rules.forEach(el => {
                        let sql = sql_update(el.id,el.name,el.a,el.b,el.c,el.d,el.e,el.f,el.g,el.h);
                        console.log(sql);
                        id = insertDataInDB(sql);
                        if(id == -1) {alert('Ошибка обновления'); return;}
                    });
                },
                openOther: function(){
                    this.rules = [];
                    this.panel = 0;
                    id_test = '';
                },
                exit: function () {
                    this.$emit('exit', 'MainMenu');
                }
            }
        },
        /*
         ********************
         *   СОЦИОЛОГ
         ********************
         */
        'Sociolog': {
            template: '#sociolog-tmp',
            data: function () {
                return {
                    panel: 0, //верхняя панель скрывается по этому параметру
                    id_test: "",
                    fazification: []
                }
            },
            methods:
                {
                    loadVars: function () {
                        if (this.id_test == "") return;
                        let isValidTest = getDataFromDB(
                            `SELECT count(*) FROM tests WHERE id=${this.id_test}`
                        );
                        if (isValidTest["0"]["count(*)"] == 0) {
                            alert("Такого теста не существует, выберите другой тест");
                            return;
                        }

                        this.fazification = rasch_on_sociolog(this.id_test);
                        this.panel = 1;
                    },
                    openOther: function(){
                        this.fazification = [];
                        this.panel = 0;
                        id_test = '';
                    },
                    exit: function () {
                        this.$emit("exit", "MainMenu");
                    }
                }
        },
        /*
        *******************
        *  ДЕФАЗИФИКАЦИЯ
        *******************
        */
        'Defazification': {
            template: '#defazification-tmp',
            data: function(){
                return {
                    panel: 0,
                    id_test: '',
                    defaz: [],
                    debug: []
                }
            },
            methods: {
                loadVars: function(){
                    if (this.id_test == '') return;
                    let isValidTest = getDataFromDB(`SELECT count(*) FROM tests WHERE id=${this.id_test}`);
                    if (isValidTest["0"]["count(*)"] == 0) { alert('Такого теста не существует, выберите другой тест'); return; }
                    this.defaz = rasch_on_defazification(this.id_test);
                    this.panel = 1;
                },
                openOther: function(){
                    this.defaz = [];
                    this.id_test = '';
                    this.panel = 0;
                },
                exit: function () {
                    this.$emit('exit', 'MainMenu');
                }
            }
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