/* ----------
 * ТИПА API К СЕРВЕРУ
 * ----------
 */
function getDataFromDB(sqlquery){//делает sql запрос к серверу и отдает данные в формате json
    var request = new XMLHttpRequest();
    var json;
    request.open("GET", "get_data_from_db.php?" + "sql="+sqlquery+';', false);
    function responceLoad() {
        if (request.readyState == 4) {
            var status = request.status;
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
/* ----------
 * SPA НА VUE
 * ----------
 */
new Vue({//ГЛАВНЫЙ компонент - Главное меню
    el: '#main-component',
	data:{
        id: -1,//по этому полю можно опред авторизован ли чел, если -1 то нет иначк авторизован

        login: 'none',
        pass: 'none',
        group: 'none',
        typePers: 'none',

		curentView: 'MainMenu'//МЕНЯЕТСЯ ПРЕДСТВЛЕНИЕ (СОСТОЯНИЕ)
	},
	methods:{
		SwitchView: function(view){//МЕНЯЕТ ПРЕДСТВЛЕНИЕ (СОСТОЯНИЕ)
			this.curentView = view;
        },
        SignIn: function(){//ВХОД по логину
            let isValidLogin = getDataFromDB(`SELECT count(*) FROM authorization WHERE login='${this.login}' AND password = '${this.pass}'`);
            if(isValidLogin["0"]["count(*)"] > 0){
                this.id = getDataFromDB(`SELECT id FROM authorization WHERE login='${this.login}'`);
            }else{
                this.id = -1;
            }
        },
        SignUp: function() {//Регистрация по логину
            
        },
        SignOut: function() {

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

