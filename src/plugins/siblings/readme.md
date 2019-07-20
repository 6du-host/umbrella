## .siblings()

Get the siblings of all of the _ with an optional filter

```js
.siblings(selector);
```


### Parameters

`selector`: a string containing a selector that _ must pass or a function that return a boolean. See [.filter()](#selector) for a better explanation



### Return

`u`: returns an instance of Umbrella JS with the new siblings as _



### Examples

Get the all the siblings of the hovered `<li>`

```js
u("li:hover").siblings('li:first-child');
```

Get all the siblings

```js
u("li").siblings();
```



### Related

[.parent()](#parent) get all of the direct parents

[.find()](#find) get all of the descendants of the matched _

[.closest()](#closest) get the first ascendant that matches the selector

[.children()](#closest) get the direct children of all of the _ with an optional filter
