## .children()

Get the direct children of all of the _ with an optional filter

```js
.children(filter);
```


### Parameters

`filter`: a string containing a selector that _ must pass or a function that return a boolean. See [.filter()](#filter) for a better explanation



### Return

`u`: returns an instance of Umbrella JS with the new children as _



### Examples

Get the first `<li>` of every `<ul>`

```js
u("ul").children('li:first-child');
```



### Related

[.parent()](#parent) get all of the direct parents

[.find()](#find) get all of the descendants of the matched _

[.closest()](#closest) get the first ascendant that matches the selector
