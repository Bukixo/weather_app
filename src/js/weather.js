angular
  .module('WeatherApp', [])
  .controller('WeatherCtrl', WeatherCtrl);


WeatherCtrl.$inject = ['$http'];
function WeatherCtrl($http) {
  const vm = this;
  vm.toggle = false;
  console.log(vm.addCity, vm.addCode);
  vm.addCity = 'lagos';
  vm.addCode = 'ng';


  vm.addNewCity = addNewCity;

  function addNewCity() {
    console.log('the city:', vm.addCity, 'the code: ',vm.addCode, 'this text:', this.text);
    console.log('hello');

    weatherIndex(vm.addCity, vm.addCity);
  }

  function weatherIndex() {
    $http.get(`http://api.openweathermap.org/data/2.5/forecast?q=${vm.addCity},${vm.addCode}&appid=a9e0ecbc5f24b77be8c521d121b1ba6c`)
      .then((res) => {
        console.log(res.data);
        vm.all = [];
        vm.all = [];
        vm.description = [];
        vm.city = [];
        vm.dayTime = [];
        vm.temp = [];

        function getInfo(){
          for (let i = 0; i < res.data.list.length; i++) {
            if (i % 4 === 0) {
              const info = res.data.list[`${i}`];
              vm.all.push(info);
              const description = res.data.list[`${i}`].weather[0].description;
              vm.description.push(description);
              const day = res.data.list[`${i}`].dt_txt;
              vm.dayTime.push(day);
              const temp = res.data.list[`${i}`].main.temp;
              const c = Math.ceil(temp - 273.15);
              vm.temp.push(c);
            }
          }
        }

        getInfo();

        console.log('the temp',vm.dayTime);

        vm.city = res.data.city.name;


      });
  }
}
