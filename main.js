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
var mainComponent = new Vue({//ГЛАВНЫЙ компонент - Главное меню
    el: '#main-component',
	data:{
        id: -1,//по этому полю можно опред авторизован ли чел, если -1 то нет иначк авторизован

        login: '',
        pass: '',
        group: '',
        typePers: '-1',

        txt: 0,

		curentView: 'MainMenu'//МЕНЯЕТСЯ ПРЕДСТВЛЕНИЕ (СОСТОЯНИЕ)
	},
	methods:{
		SwitchView: function(view){//МЕНЯЕТ ПРЕДСТВЛЕНИЕ (СОСТОЯНИЕ)
			this.curentView = view;
        },
        SignIn: function(){//ВХОД по логину
            let isValidLogin = getDataFromDB(`SELECT count(*) FROM authorization WHERE login='${this.login}' AND password = '${this.pass}'`);
            if(isValidLogin["0"]["count(*)"] > 0){
                this.id = getDataFromDB(`SELECT id FROM authorization WHERE login='${this.login}'`)["0"]["id"];
                alert("Авторизация  не пройдена");
            }else{
                this.id = -1;
                alert("Авторизация пройдена");
            }
        },
        SignUp: function() {//Регистрация по логину
            if(this.login == '') {alert("Вы не ввели логин, пожалуйста, заполните соответствующее поле"); return;}
            if(this.pass == '') {alert("Вы не ввели пароль, пожалуйста, заполните соответствующее поле"); return;}
            if(this.typePers == -1){alert("Вы не выбрали тип пользователя"); return;}
            if(this.group == '') {alert("Поле группа, осталось пустым, пожалуйста. заполните его");return;}
            let isValidLogin = getDataFromDB(`SELECT count(*) FROM authorization WHERE login='${this.login}'`);
            if(isValidLogin["0"]["count(*)"] > 0){ alert("Такой логин уже занят, придумайте другой"); return; }
            this.id = insertDataInDB(`INSERT INTO authorization (     login,        password,        id_type_person,     \`group\`     ) VALUES \
                                                     ('${this.login}', '${this.login}',  '${this.typePers}','${this.group}' )`);
            alert("Вы зарегистрированы");
        },
        SignOut: function() {
            this.id = -1;
            this.login = '';
            this.pass = '';
            this.group = '';
            this.typePers = '-1';
            alert("Вы вышли");
        }
    }
});

//анкетирование
Vue.component('cliker1', {
	data: function () {
	  return {
		count: 0
	  }
    },
	template: '#cliker1-tmp'
})
//конфг тестов
Vue.component('cliker2', {
	data: function () {
	  return {
		count: 0
	  }
	},
	methods:{
		exit: function(){
			this.$emit('exit','MainMenu');
		}
	},
	template: '#cliker2-tmp'
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

