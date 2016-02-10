angular.module('web.app').controller('appCtrl', function () {
  var self = this;

  self.tabs = [
    {title: 'Dashboard', url: 'dashboard'},
    {title: 'Contact Us', url: 'contactus'}
  ];
});