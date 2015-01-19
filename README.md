# Angular Confirmable

An intuitive way to re-confirm user intentions using a single widget, and provide inline feedback without
confirm dialogs or flash messages.

Allows you to decorate a standard HTML button with 2 or 3 states, to allow the user to re-confirm their
intent again before performing a destructive or important operation.  Can also be used to simply confirm or
feedback an action to the user on the same button they clicked.  If you define it with 3 states, the directive
will reset the state back after a time period (configurable).

This behaviour allows you to conserve space on the current view, without taking the users attention away from
what they are currently actioning, and avoids distracting confirmation popups and flash messages.

Tested and can be used with / without JQuery / Bootstrap.


# Demo / Example

[Demo](http://rpocklin.github.io/angular-confirmable/example/index.html)


## Installation

1. Install the plugin into your Angular.js project, manually or via:

  `bower install angular-confirmable --save`

1. Include `angular-confirmable.css` in your app:

  `<link rel="stylesheet" href="bower_components/angular-confirmable/angular-confirmable.css" />`

1. Include `angular-confirmable.js` in your app:

  `<script src="bower_components/angular-confirmable/angular-confirmable.js"></script>`

1. Add `angular-confirmable` as a new module dependency in your angular app.

  `var myapp = angular.module('myapp', ['angular-confirmable']);`

1. Define a `<confirmable ...>` tag with matching open and closing tags.
1. Within the above open and closing tags, define a `<confirmable-outlet></confirmable-outlet>` which will mark
   where the dynamic text appears.  This allows the directive to be very flexible in what you wrap around it (ie. button / div / whatever).
1. Define the default (unconfirmed) text with `unconfirmed-text="Do something irreversable"`
1. Define the text to show after a single click (confirming) with `confirming-text="Are you sure?"`
1. Optionally, define the text to show after a confirmation click (confirmed) with `confirmed-text="Processing..."`
1. Define a function (on the target controller scope) to be called after confirmation: `when-confirmed='eraseData'`

Complete (minimal) example:

```html
  <confirmable when-confirmed="confirmed" unconfirmed-text="Don't press this button" confirming-text="Please don't click me again!">
    <button class="btn btn-default">
      <confirmable-outlet></confirmable-outlet>
    </button>

  </confirmable>
```


## Notes

- You can use either the SASS styles directly file under `/src` or the compiled CSS files, up to you :)
- You can use this directive for a either a re-confirmable action (3 states) or inline feedback (2 states) or both.
- You can wrap the text in brackets, or anything really using the following optional attributes: `text-before="("` and `text-after=")"`
- You can define the delay between reverting from `confirming` state to `default` state by specifying `reset-delay="1000"` (in milliseconds)
- `<confirmable>` tag supports `class="..."` and `disabled="true|false"` attributes an acts as you would assume.
- The attribute `confirmable-state` will change to either `unconfirmed`, `confirming` or `confirmed` which can be used
  for CSS class styles or watching on the `$scope` to trigger other effects.

- Specifically tested with the [angular-ladda](https://github.com/remotty/angular-ladda) directive in mind,
  so it is compatible with this applied to the same button.


## Running Locally

1. Checkout git repository locally: `git clone git@github.com:rpocklin/angular-confirmable.git`
1. `npm install`
1. `bower install`
1. `grunt serve`
1. View `http://localhost:9000/example/` in your browser to see the example.


## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Make your changes, run `grunt karma` to ensure all tests pass.  (Ideally add more tests!)
3. Commit your changes (`git commit -am 'Added some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request


## History

1.0.0 Initial release


## TODO

- Add some tests
- Move directive sanity checks to `compile()` method.
- More sophisticated examples, also one with `angular-ladda`.
- Allow the confirmed state to pass a promise which, when resolved, will show `completed-text="Processing Complete"`?

## License

Released under the MIT License. See the [LICENSE][license] file for further details.

[license]: https://github.com/rpocklin/angular-confirmable/blob/master/LICENSE
