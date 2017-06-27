angular
  .module('WeatherApp', [])
  .controller('WeatherCtrl', WeatherCtrl);


WeatherCtrl.$inject = ['$http'];
function WeatherCtrl($http) {
  const vm = this;

//vm.addCity and vm.addCode refers to the template literals inside the get request. addCity() is a function that binds the the user input with template literal, therefore user is able to change location. This is done by incuding a ngModel. The two template literals, which essentially is the ngModel - so the user input, is then passed into the weatherIndex() which runs the get request.
  vm.addCity = '';
  vm.addCode = '';

  vm.addNewCity = addNewCity;

  function addNewCity() {
    weatherIndex(vm.addCity, vm.addCity);
  }

//The weather index makes a call to the api which gets all the necessary information that's needed.
  function weatherIndex() {
    $http.get(`http://api.openweathermap.org/data/2.5/forecast?q=${vm.addCity},${vm.addCode}&appid=a9e0ecbc5f24b77be8c521d121b1ba6c`)
      .then((res) => {
        //These are the arrays that we can use in the front-end to display the json
        vm.all = [];
        //vm.description is going to hold the weather description
        vm.description = [];
        // holds the name of the city
        vm.city = [];
        // the day and time
        vm.dayTime = [];
        //the temperature
        vm.temp = [];


        // This function grabs all the necerssay information and pushes it into the aforementioned arrays that we've initialized.
        function getInfo(){
          for (let i = 0; i < res.data.list.length; i++) {
            if (i % 4 === 0) {
              const info = res.data.list[`${i}`];
              vm.all.push(info);
              const description = res.data.list[`${i}`].weather[0].description;
              vm.description.push(description);

              /* the reason why I pushed data into vm.temp and vm.dayTime is because i wanted to manipulate the json data and show that on the frontend. ie converting the temp which is in kelvin into celsius however, although I am able to console log it, I'm not able to print it on the front-end as the arrays I created. Thats why I commented it out for now */

              // const day = res.data.list[`${i}`].dt_txt;
              // vm.dayTime.push(day);
              // const temp = res.data.list[`${i}`].main.temp;
              // const c = Math.ceil(temp - 273.15);
              // vm.temp.push(c);
            }
          }
        }

        getInfo();

        console.log(vm.all);

        vm.city = res.data.city.name;


      });
  }
}
