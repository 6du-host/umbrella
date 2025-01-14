## .closest()

Find the first ancestor that matches the selector for each node

```js
.closest(filter);
```


### Parameters

`filter`: a string containing a selector that _ must pass or a function that return a boolean. See [.filter()](#filter) for a better explanation



### Return

`u`: returns an instance of Umbrella JS with the new ancestors as _



### Examples

Get the ul of every li

```js
u("li").closest('ul');
```



### Related

[.find()](#find) get all of the descendants of the matched _

[.parent()](#parent) get all of the direct parents

[.children()](#children) get the direct children of all of the _ with an optional filter
