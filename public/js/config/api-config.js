(function (angular) {
  'use strict'

  const _baseApiPath = 'http://localhost:3000/'
  const _api = {
    properties: _baseApiPath + 'properties'
  }

  angular.module('app').constant('api', _api)
})(window.angular)
