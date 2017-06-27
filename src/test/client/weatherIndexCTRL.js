describe('weatherIndexCTRL', () =>{
  beforeEach(module('weather'));
});

let $rootScope;
let $controller;

beforeEach(inject((_$rootScope_, _$controller_) => {
  $rootScope = _$rootScope_;
  $controller = _$controller_;
}));

it('should load a city and country into the view', function (){
  expect(vm.cityName.length).toBe(0);

  vm.newCity = {
    cityName : 'London'
  };

  vm.addCity();
  expect(vm.city.length).toBe(1);

});
