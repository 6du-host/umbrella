## .not()

Remove known _ from _

```js
.not('a')
.not(u('a'))
.not(function(node){ return Math.random() > 0.5; })
```


### Parameters

`not`: it can be two things (in order):
  - CSS selector that each of the _ must **not** match to stay
  - Instance of Umbrella with the element to remove
  - Function that returns `true` to remove the element. It accepts **one parameter**, and the context of `this` is the instance of Umbrella so methods like `this.slice()` are available

```js
.not(function(node){
  // your code
});
```



### Examples

```html
<ul class="menu">
    <li><a class="active">Menu item 1</a></li>
    <li><a>Menu item 2</a></li>
    <li><a>Menu item 3</a></li>
</ul>
```

Get only the non-active links on paragraphs

```js
var nonactive_links = u('.menu a').not('.active');
```

Get all of the active:

```js
active_links = u('.menu a').not(nonactive_links);
```


### Related

[.is()](#is) check whether one or more of the _ is of one type

[.filter()](#filter) Remove unwanted _
