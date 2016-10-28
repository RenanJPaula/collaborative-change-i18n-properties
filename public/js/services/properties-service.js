
(function (angular, io) {
  'use strict'

  angular.module('app').service('PropertiesService', service)

  service.$inject = ['$http', 'api', '$q']

  function service ($http, api, $q) {
    const svc = this
    const socket = io()

    svc.getAll = () => {
      return $http.get(api.properties)
    }

    svc.changePropertie = (groupName, propertieName, fileName, value) => {
      socket.emit('changePropertie', { groupName, propertieName, fileName, value })
    }

    svc.onChangePropertie = (callback) => {
      socket.on('changePropertie', callback)
    }

    svc.onConnect = callback => {
      socket.on('connect', callback)
    }
  }
})(window.angular, window.io)
