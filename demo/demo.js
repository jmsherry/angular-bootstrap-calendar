'use strict';

angular
  .module('demo', ['mwl.calendar', 'ui.bootstrap', 'ngTouch', 'ngAnimate'])
  .constant('moment', window.moment)
  .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$log', 'moment'];

  function MainCtrl($log, moment) {

    var vm = this;

    //These variables MUST be set as a minimum for the calendar to work
    vm.calendarView = 'month';
    vm.calendarDay = new Date();
    vm.meals = [{}, {}, {}];
    //vm.canAdd = vm.meals > 0;

    vm.events = [
      {
        title: 'An event',
        type: 'warning',
        startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
        endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
        draggable: true,
        resizable: true
      }, {
        title: '<i class="glyphicon glyphicon-asterisk"></i> <span class="text-primary">Another event</span>, with a <i>html</i> title',
        type: 'info',
        startsAt: moment().subtract(1, 'day').toDate(),
        endsAt: moment().add(5, 'days').toDate(),
        draggable: true,
        resizable: true
      }, {
        title: 'This is a really long event title that occurs on every year',
        type: 'important',
        startsAt: moment().startOf('day').add(7, 'hours').toDate(),
        endsAt: moment().startOf('day').add(19, 'hours').toDate(),
        recursOn: 'year',
        draggable: true,
        resizable: true
      }
    ];

    function toggleMeals(){
      $log.log('toggleCanAdd called!');
      if(vm.meals.length){
        vm.meals = [];
      } else {
        vm.meals = [{id:1}, {id: 2}, {id: 3}];
      }
      //vm.canAdd = !vm.canAdd;

    }

        vm.toggleMeals = toggleMeals;

    function showModal(action, event) {
      $modal.open({
        templateUrl: 'modalContent.html',
        controller: function() {
          var vm = this;
          vm.action = action;
          vm.event = event;
        },
        controllerAs: 'vm'
      });
    }



    vm.eventClicked = function(event) {
      //showModal('Clicked', event);
    };

    vm.eventEdited = function(event) {
      showModal('Edited', event);
    };

    vm.eventDeleted = function(event) {
      showModal('Deleted', event);
    };

    vm.eventTimesChanged = function(event) {
      showModal('Dropped or resized', event);
    };

    vm.toggle = function($event, field, event) {
      $event.preventDefault();
      $event.stopPropagation();
      event[field] = !event[field];
    };

    vm.addClicked = function(event) {
      $log.log('yes');
      showModal('addClicked', event);
    };

  }
