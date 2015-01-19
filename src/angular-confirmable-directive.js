'use strict';

// NOTE: When 'disabled' (if used) is set to true, this will reset the state when 'disabled' is set back to false.

(function() {

  angular.module('angular-confirmable').directive(
    'confirmable', function($timeout) {
      return {
        restrict: 'E',
        transclude: true,
        scope: {
          'textBefore': '@?',
          'textAfter': '@?',
          'unconfirmedText': '@',
          'confirmingText': '@',
          'confirmedText': '@?',
          'resetDelay': '@?',
          'whenConfirmed': '&',
          'classes': '@?',
          'disabled': '=?'
        },
        template: '<span ng-click="handleClick($event)" ng-transclude></span>',
        link: function(scope, el, attr) {

          if (!scope.unconfirmedText) {
            throw new Error('Confirmable: unconfirmedText attribute was not defined and is required.');
          }

          if (!scope.confirmingText) {
            throw new Error('Confirmable: confirmingText attribute was not defined and is required.');
          }

          if (!scope.whenConfirmed()) {
            throw new Error('Confirmable: whenConfirmed action (function) was not defined and is required.');
          }

          var textBefore = scope.textBefore || '';
          var textAfter = scope.textAfter || '';

          var UNCONFIRMED = 'unconfirmed';
          var CONFIRMING = 'confirming';
          var CONFIRMED = 'confirmed';

          /* milliseconds */
          var REVERT_CONFIRM_DELAY = scope.resetDelay || 3000;

          var STATES = [UNCONFIRMED, CONFIRMING];

          if (scope.confirmedText) {
            STATES.push(CONFIRMED);
          }

          var INITIAL_STATE = STATES[0];
          var END_STATE = STATES[STATES.length - 1];

          var timer = null;
          var _state;

          var cancelEvent = function($event) {

            /* this blur event is only required for Firefox / Chrome to prevent sticky hover CSS after a click */
            var targetButton = el.find('button');
            targetButton.triggerHandler('blur');

            $event.preventDefault();
            $event.stopPropagation();

            return false;
          };

          // methods
          scope.resetToInitialState = function() {
            setState(INITIAL_STATE);
          };

          scope.handleClick = function($event) {

            if (scope.disabled) {
              return cancelEvent($event);
            }

            // times out to current state if no activity
            setTimerToRevertToState(getState());

            if (isState(UNCONFIRMED)) {
              setState(CONFIRMING);
              return cancelEvent($event);
            }
            else if (isState(CONFIRMING)) {

              unbindTimer();

              // don't toggle confirmed state if there is no text change required
              if (STATES.indexOf(CONFIRMED) > -1) {
                setState(CONFIRMED);
              }

              scope.whenConfirmed()($event);
            }
          };

          var isState = function(expectedState) {
            return getState() === expectedState;
          };

          var getState = function(expectedState) {
            return _state;
          };

          var setTimerToRevertToState = function(futureState) {

            unbindTimer();

            timer = $timeout(
              function() {
                setState(futureState);
              }, REVERT_CONFIRM_DELAY, true
            );
          };

          var unbindTimer = function() {
            if (timer) {
              $timeout.cancel(timer);
            }
          };

          var setState = function(state) {
            _state = state;
            el.attr('confirmable-state', state);

            var text = textBefore + scope[state + 'Text'] + textAfter;
            el.find('confirmable-outlet').html(text);
            return getState();
          };

          scope.$on(
            '$destroy', function() {
              unbindTimer();
            }
          );

          // initialisation
          setState(INITIAL_STATE);

          // if you disable a button for any reason, upon re-enabling it, it will reset to the initial button state
          scope.$watch(
            'disabled', function(newValue, oldValue) {

              var wasLoading = (oldValue === true);
              var isLoadingNow = (newValue === true);

              if (wasLoading && !isLoadingNow) {
                scope.resetToInitialState();
              }
            }
          );
        }
      };
    }
  );
}());
