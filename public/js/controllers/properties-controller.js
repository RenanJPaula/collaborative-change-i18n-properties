(function (angular) {
  'use strict'

  angular.module('app').controller('PropertiesController', controller)

  controller.$inject = ['$scope', 'PropertiesService']

  function controller ($scope, PropertiesService) {
    const vm = this

    vm.loadRecords = () => {
      PropertiesService.getAll().then((resp) => {
        vm.properties = resp.data
      })
    }

    vm.init = () => {
      vm.loadRecords()

      PropertiesService.onChangePropertie((data) => {
        vm.properties[data.groupName][data.propertieName][data.fileName] = data.value
        $scope.$digest()
      })

      PropertiesService.onConnect(() => {
        vm.loadRecords()
      })
    }

    vm.changePropertie = (groupName, propertieName, fileName, value) => {
      return PropertiesService.changePropertie(groupName, propertieName, fileName, value)
    }

    vm.getTranslateHeaderName = (translates) => {
      const _translateHeaderName = ['Propert Name']
      for (var name in translates) {
        _translateHeaderName.push(name)
      }
      return _translateHeaderName
    }
  }
})(window.angular)
