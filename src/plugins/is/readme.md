## .is()

Check whether any of the _ matches the selector

```js
.is('a')
.is(u('a'))
.is(function(){ return Math.random() > 0.5 })
```



### Parameters

`filter`: it can be two things:
  - CSS selector to check
  - Instance of Umbrella with the elements to check
  - Function that returns a boolean to check for each of the _. If one of them returns true, then the method `is()` returns true. It accepts two parameters, `node` and `index`, and the context of `this` is the instance of Umbrella so methods like `this.slice()` are available.



### Return

*boolean*: *true* if any of the _ matches the selector or the function returns true, false otherwise.



### Examples

Check if the current form needs to be validated

```js
u('form.subscribe').on('submit', function(e) {

  // Same as u('form.subscribe').hasClass('validate')
  if (u(e.target).is('.validate')) {
    validate();
  }

  // ...
});
```



### Related

[.filter()](#filter) remove unwanted _

[.not()](#not) remove all the _ that match the criteria
