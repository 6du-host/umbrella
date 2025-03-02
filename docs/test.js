var expect = chai.expect;

// Whether or not to run the tests. When this is set to "false", then all of
// the tests for this function should fail
var work = true;

var wrap = function(cb){
  cb();
}

// Check whether or not the element has a class
// - cls: the classes that should be checked
// - negate: whether or not the class should be present
// - root: the element to check (defaults to "base")
// hasClass('bla', true, 'ul')
function hasClass(cls, negate, root) {
  root = root ? u(root) : base;
  u().args(cls).forEach(function(cl){
    expect(root.hasClass(cl)).to.equal(!negate);
  });
  return hasClass;
}

// Check that two objects are the same
// same({ a: 'hi' }, { a: 'hi' })
function same(a, b) {
  expect(a).to.deep.equal(b);
  return isFn;
}

// Chech whether or not something is a function
function isFn(fn) {
  expect(typeof fn).to.equal('function');
  return isFn;
}

// Quickly test the size of a selector and returns itself for chaining:
// size('.a', 2)('.b', 3)('.c', 1)
function size(sel, number) {
  expect(u(sel).length).to.equal(number);
  return size;
}

// Get a great list of classes for testing different configurations
function getListOfClasses(){

  return [
    // Strings
    { from: 'bla blu blo', it: 'a space-separated string' },
    { from: 'bla,blu,blo,', it: 'a comma-separated string' },
    { from: 'bla, blu, blo, ', it: 'a comma and space separated string' },
    { from: 'bla\n\tblu\n\tblo\n\t', it: 'a whitespace-separated string' },

    // Single array
    { from: ['bla', 'blu', 'blo'], it: 'an array' },
    { from: ['bla blu ', 'blo '], it: 'a space-separated array' },
    { from: ['bla,blu,', 'blo,'], it: 'a comma-separated array' },
    { from: ['bla, blu, ', 'blo, '], it: 'a comma and space separated array' },
    { from: ['bla\n\tblu\n\t', 'blo\n\t'], it: 'a whitespace-separated array' },

    // Nested
    { from: [['bla', 'blu'], 'blo'], it: 'an array' },
    { from: [['bla blu '], 'blo '], it: 'a space-separated array' },
    { from: [['bla,blu,'], 'blo,'], it: 'a comma-separated array' },
    { from: [['bla, blu, '], 'blo, '], it: 'a comma and space separated array' },
    { from: [['bla\n\tblu\n\t'], 'blo\n\t'], it: 'a whitespace-separated array' },
  ];
}









// Testing the main file
describe("u()", function() {
  it("should be defined", function() {
    expect(!!u).to.equal(true);
  });

  it("should be a function", function() {
    expect(typeof u).to.equal("function");
  });

  it("can accept no argument", function() {
    expect(typeof u()).to.equal('object', typeof u());
    expect(u().length).to.equal(0);
  });

  it("can select by class", function() {
    expect(u('.demo').length).to.equal(1);
  });

  it("can select by tag", function() {
    expect(u('body').length).to.equal(1);
  });

  it("can select by id", function() {
    expect(u('#demo').length).to.equal(1);
  });

  it("can select with CSS", function() {
    expect(u('[id="demo"]').length).to.equal(1);
    expect(u('.demo ul').length).to.equal(1);
  });

  it("can select a NodeList", function() {
    expect(u(document.querySelectorAll('.demo li')).length).to.equal(3);
  });

  it("can select an html element", function() {
    var object = u('.demo li')._[0];
    expect(u(object).length).to.equal(1);
  });

  it("won't select a function", function() {
    expect(u(function(){ return "test"; }).length).to.equal(0);
  });

  it("will select a random object", function() {
    expect(u({ a: 'b', c: 'd' }).length).to.equal(1);
  });

  it("can select an Umbrella instance", function() {
    var inst = u('.demo');
    expect(u(inst).length).to.equal(1);
    expect(u(inst)).to.equal(inst);
  });

  // it("accepts a function", function() {
  //   expect(u(function(){}).first()).to.equal(false);
  // });
  //
  // it("generates some html", function() {
  //   expect(u(function(node, i){
  //     return "<li></li>"; }, 2).first()).to.equal('<li></li>');
  // });

  it("can use a context", function() {
    var context = u('.demo li')._[0];
    expect(u('a', context).length).to.equal(1);
  });

  it("can read the length", function() {
    expect(u('a')._.length).to.equal(u('a').length);
  });

  it("can generate a <tr>", function() {
    expect(u('<tr>')._[0].tagName).to.equal('TR');
    expect(u('<tr >')._[0].tagName).to.equal('TR');
    expect(u('<tr class="hello">')._[0].tagName).to.equal('TR');
  });

  it("can generate a <td>", function() {
    expect(u('<td>')._[0].tagName).to.equal('TD');
    expect(u('<td >')._[0].tagName).to.equal('TD');
    expect(u('<td class="hello">')._[0].tagName).to.equal('TD');
  });

  it("can generate a <th>", function() {
    expect(u('<th>')._[0].tagName).to.equal('TH');
    expect(u('<th >')._[0].tagName).to.equal('TH');
    expect(u('<th class="hello">')._[0].tagName).to.equal('TH');
  });
});

var listOfClasses = getListOfClasses();

describe(".addClass()", function() {

  beforeEach(function(){
    base.removeClass('bla blu blo');
    hasClass('bla blu blo', true);
  });

  afterEach(function(){
    base.removeClass('bla blu blo');
    hasClass('bla blu blo', true);
  });



  it("should be defined", function() {
    isFn(work ? base.addClass : false);
  });

  it("can be called empty", function() {
    base.addClass();
    base.addClass("");
    base.addClass([]);
    base.addClass("","");
    base.addClass(" ");

    if (!work) throw "Forced failure";
  });

  it("can be concatenated", function() {
    if (work) base.addClass('bla').addClass('blu');
    hasClass('bla')('blu');
  });

  it("returns the same instance", function() {
    var inst = false;
    if (work) inst = base.addClass('bla,blu');
    same(base, inst);
  });

  it("adds a single class", function() {
    if (work) base.addClass('bla');
    hasClass('bla');
  });



  describe("single argument", function(){
    listOfClasses.forEach(function(part){
      it("accepts " + part.it, function(){
        if (work) base.addClass(part.from);
        hasClass('bla blu blo');
      });
    });
  });

  describe("single function argument uses the return value", function(){
    listOfClasses.forEach(function(part){
      it("accepts as a return value " + part.it, function(){
        if (work) base.addClass(function() { return part.from; });
        hasClass('bla blu blo');
      });
    });
  });

  describe("multiple functions uses the return value", function(){
    function add(arg){ return function(){ return arg; }; }
    listOfClasses.forEach(function(part){
      it("accepts as a return value " + part.it, function(){
        if (work) base.addClass(add(part.from), add("bli"));
        hasClass('bla blu blo bli');
      });
    });
  });

  describe("several arguments", function(){
    listOfClasses.filter(function(part){
      return Array.isArray(part.from);
    }).forEach(function(part){
      it("used .apply() with " + part.it, function(){
        if (work) base.addClass.apply(base, part.from);
        hasClass('bla blu blo');
      });
    });
  });


  describe("callback uses the arguments", function(){

    // Testing the main file
    function addTest(node, i){
      return 'test' + i;
    }

    it("adds classes with callback", function(){
      if (work) base.addClass(addTest);

      hasClass('test0');

      base.removeClass('test0');
      expect(base.hasClass('test0')).to.equal(false);
    });

    it("adds many classes with callback", function(){
      if (work) base.find('li').addClass(addTest);

      base.find('li').each(function(node, i){
        hasClass('test' + i, false, node);
        u(node).removeClass('test' + i);
      });
    });

  });
});

// Testing the main file
describe(".after(html)", function() {

  //var work = false;

  // Default callback for the tests
  function callback(cl){
    return '<a class="bla ' + cl + '">Link</a>';
  }




  beforeEach(function(){
    expect(u('.bla').length).to.equal(0);
  });

  afterEach(function(){
    u('.bla').remove();
  });



  it("should be a function", function() {
    expect(work ? typeof base.after : false).to.equal('function');
  });

  it("can add content in the right place", function() {
    if (work) base.after('<a class="bla">Link</a>');

    size('.bla', 1)('.base + .bla', 1);
  });

  it("accepts a callback that will be called once", function(){
    if (work) base.after(callback);

    size('.bla', 1)('.base + .bla', 1);
  });

  it("accepts a single parameter", function(){
    if (work) base.after(callback, ['a']);

    size('.base + .bla.a', 1);
  });

  it("can add as many as the array", function(){
    if (work) base.after(callback, ['a', 'b']);

    expect(base.html().match('function')).to.equal(null);
    size('.base ~ .bla', 2)('.base ~ .bla.a', 1)('.base ~ .bla.b', 1);
    size('.base + .bla.a + .bla.b', 1);
  });
});

// Testing the main file
describe(".append(html)", function() {

  // Default callback for the tests
  function callback(cl){
    return '<a class="bla ' + cl + '">Link</a>';
  }

  beforeEach(function(){
    expect(u('.bla, .blu').length).to.equal(0);
  });

  afterEach(function(){

    // Just in case it stringifies the callback
    expect(base.html().match('function')).to.equal(null);
    u('.bla, .blu').remove();
  });



  it("should be a function", function() {
    expect(typeof base.append).to.equal('function');
  });

  it("can be called empty", function() {
    base.append();
  });

  it("can be called with empty string", function() {
    base.append("");
  });

  it("a function looping data has right footprint", function() {
    base.append(function(value, index, node, j){
      if (['a', 'b'].indexOf(value) === -1) throw new Error("Not an element");
      if (value === 'a') same(index, 0);
      if (value === 'b') same(index, 1);
      same(node, base.first());
      same(j, 0)
    }, ['a', 'b']);
  });


  it("a function looping a number has right footprint", function() {
    var iterations = 0;
    base.append(function(value, index, node, j){
      if ([0, 1].indexOf(value) === -1) throw new Error("Not an element");
      if (value === 0) same(index, 0);
      if (value === 1) same(index, 1);
      same(node, base.first());
      same(j, 0);
      iterations++;
    }, 2);
    same(iterations, 2);
  });



  // HTML
  describe("HTML string", function(){
    it("can add a link", function() {
      base.append('<a class="bla">Link</a>');
      size('.base > .bla', 1);
    });

    it("can add sibling links", function() {
      base.append('<a class="bla">Link</a><a class="bla">Link</a>');
      size('.base > .bla', 2);
    });

    it("can add nested content", function() {
      base.append('<strong class="bla"><a>Link</a></strong>');
      size('.base > .bla > a', 1);
    });

    it("can append a table row", function() {
      var table = u('table.tbl').append('<tr><td>Hi</td></tr>');
      var result = '<table class="tbl"><tr><td>Hi</td></tr></table>';
      expect(table._[0].outerHTML).to.equal(result);
    });

    it("can add just text", function() {
      var frag = u('<div>').append('Hello world!\n');
      same(frag.html(), 'Hello world!\n');
    });
  });

  describe("HTML string looped with array", function(){

    it("insert two links", function() {
      base.append('<a class="bla">Link</a>', ['a', 'b']);
      size('.base > .bla', 2)('.base > .bla:last-child', 1);
    });

    it("can add nested content", function() {
      base.append('<strong class="bla"><a>Link</a></strong>', ['a', 'b']);
      size('.base > .bla > a', 2);
    });

    it("can append simple text", function() {
      var frag = u('<div>').append('Hello!\n', ['a', 'b']);
      same(frag.html(), 'Hello!\nHello!\n');
    });
  });



  // Callback
  describe("Callback", function(){
    it("can add a link", function() {
      base.append(function(){ return '<a class="bla">Link</a>'; });
      size('.base > .bla', 1)('.base > .bla:last-child', 1);
    });

    it("can add sibling links", function() {
      base.append(function(){ return '<a class="bla">Link</a><a class="bla">Link</a>'; });
      size('.base > .bla', 2)('.base > .bla:last-child', 1);
    });

    it("can add nested content", function() {
      base.append(function(){ return '<strong class="bla"><a>Link</a></strong>'; });
      size('.base > .bla > a', 1);
    });

    it("can add just text", function() {
      var frag = u('<div>').append(function(){ return 'Hello world!\n'; });
      same(frag.html(), 'Hello world!\n');
    });
  });

  describe("Callback looped with array", function(){

    it("can add sibling links", function() {
      base.append(function(v){ return '<a class="bla">Link</a>'; }, ['a', 'b']);
      size('.base > .bla', 2)('.base > .bla:last-child', 1);
    });

    it("can add nested content", function() {
      base.append(function(){ return '<strong class="bla"><a>Link</a></strong>'; }, ['a', 'b']);
      size('.base > .bla > a', 2);
    });

    it("can add just text", function() {
      var frag = u('<div>').append(function(){ return 'Hello world!\n'; }, ['a', 'b']);
      same(frag.html(), 'Hello world!\nHello world!\n');
    });

    it("can add content with a callback and data", function() {
      base.append(callback, ['a', 'b']);
      size('.base > .bla', 2)('.base > .bla.a', 1)('.base > .bla.b', 1);
      size('.bla.a + .bla.b', 1)('.bla.b + .bla.a', 0)('.base > .bla.b:last-child', 1);
    });
  });



  describe("Umbrella instance", function(){
    it("Accepts a simple one", function(){
      base.append(u('<div class="bla"></div>'));
      size('.base > .bla', 1)('.base > .bla:last-child', 1);
    });

    it("Keeps the events when appending", function(done){
      base.append(u('<div class="bla">').on('click', function(){ done(); }));
      size('.base > .bla', 1)('.base > .bla:last-child', 1);
      u('.base .bla').trigger('click');
    });

    it("Clones multiple events when appending", function(done){
      base.append(u('<div class="bla">').on('click touch', function(){ done(); }));
      size('.base > .bla', 1)('.base > .bla:last-child', 1);
      u('.base .bla').trigger('touch');
    });
  });



  it("can generate some text", function(){
    var list = u("<div>");
    if (work) list.append(function(n){ return n + "\n" }, ['a', 'b']);

    expect(list.children().length).to.equal(0);
    expect(list.html()).to.equal('a\nb\n');
  });

  it("can generate some text with number", function(){
    var list = u("<div>");
    if (work) list.append(function(n){ return n + "\n" }, 2);

    expect(list.children().length).to.equal(0);
    expect(list.html()).to.equal('0\n1\n');
  });

  it("isn't called any time with 0", function(){
    u('<div>').append(function(n){ throw new Error("Shouldn't be called"); }, 0);
  });



  // Node
  it("can append an html node", function() {
    base.append(u('<div class="bla">').first());
    size('.bla', 1);
  });

  it("should append supplied html to each targeted element and not only the last instance", function() {
    base.append(u('<span class="test-span"></span><span class="test-span"></span><span class="test-span"></span><span class="test-span"></span>'));
    base.append(u('<a class="append-me"></a>'));

    u(".test-span").append(u(".append-me"));

    size(".test-span .append-me", 4);
  });
});


describe(".args(arguments)", function() {
  
  it("should be defined", function() {
    expect(typeof u().args).to.equal('function');
  });
  
  it("accepts zero parameters", function(){
    expect(u().args()).to.deep.equal([]);
  });
  
  it("accepts falsy", function(){
    expect(u().args(null)).to.deep.equal([]);
    expect(u().args(false)).to.deep.equal([]);
    expect(u().args(undefined)).to.deep.equal([]);
    expect(u().args("")).to.deep.equal([]);
    expect(u().args([])).to.deep.equal([]);
  });
  
  it("doesn't accept two parameters", function(){
    expect(u().args('a', 'b')).to.deep.equal(['a']);
  });
  
  it("accepts an umbrella instance", function(){
    expect(u().args(u(['a', 'b']))).to.deep.equal(['a', 'b']);
    expect(u().args(u(['a', 'b'])._)).to.deep.equal(['a', 'b']);
  });
  
  
  describe("works with a single string", function(){
    it("single string", function(){
      expect(u().args('a')).to.deep.equal(['a']);
    });
    
    it("splits a string with space", function(){
      expect(u().args('a b ')).to.deep.equal(['a', 'b']);
    });
    
    it("splits a string with comma", function(){
      expect(u().args('a,b,')).to.deep.equal(['a', 'b']);
    });
    
    it("splits a string with space and comma", function(){
      expect(u().args('a, b, ')).to.deep.equal(['a', 'b']);
    });
    
    it("splits a string with enter", function(){
      expect(u().args('a\nb\t')).to.deep.equal(['a', 'b']);
    });
  });
  
  
  describe("works with different arrays", function(){
    
    it("single element", function(){
      expect(u().args(['a'])).to.deep.equal(['a']);
    });
    
    it("single element", function(){
      expect(u().args(['a', 'b', 'c'])).to.deep.equal(['a', 'b', 'c']);
    });
    
    it("splits a string with space", function(){
      expect(u().args(['a b', 'c d'])).to.deep.equal(['a', 'b', 'c', 'd']);
    });
    
    it("splits a string with comma", function(){
      expect(u().args(['a,b', 'c,d'])).to.deep.equal(['a', 'b', 'c', 'd']);
    });
    
    it("splits a string with space and comma", function(){
      expect(u().args(['a, b', 'c, d'])).to.deep.equal(['a', 'b', 'c', 'd']);
    });
    
    it("splits a string with whitespaces", function(){
      expect(u().args(['a\nb', 'c\td'])).to.deep.equal(['a', 'b', 'c', 'd']);
    });
  });
  
  
  describe("works with a function", function(){
    
    it("single element", function(){
      expect(u().args(['a'])).to.deep.equal(['a']);
    });
    
    it("single element", function(){
      expect(u().args(['a', 'b', 'c'])).to.deep.equal(['a', 'b', 'c']);
    });
    
    it("splits a string with space", function(){
      expect(u().args(['a b', 'c d'])).to.deep.equal(['a', 'b', 'c', 'd']);
    });
    
    it("splits a string with comma", function(){
      expect(u().args(['a,b', 'c,d'])).to.deep.equal(['a', 'b', 'c', 'd']);
    });
    
    it("splits a string with space and comma", function(){
      expect(u().args(['a, b', 'c, d'])).to.deep.equal(['a', 'b', 'c', 'd']);
    });
    
    it("splits a string with whitespaces", function(){
      expect(u().args(['a\nb', 'c\td'])).to.deep.equal(['a', 'b', 'c', 'd']);
    });
  });
  
  
});
describe(".array()", function() {

  it("should be defined", function() {
    expect(typeof base.array).to.equal('function');
  });

  it("empty gives an error", function(){
    same(base.array(), [base.html()]);
  });

  it("can loop as each()", function() {
    u([0, 1, 2, 3]).array(function(node, i){
      expect(node).to.equal(i);
    });
  });

  it("can loop a real element", function() {
    base.array(function(node, i){
      expect(u(node).hasClass('base')).to.equal(true);
      expect(i).to.equal(0);
    });
  });

  it("can remove an element", function() {
    var final = u([1, 2, 3, 4]).array(function(node, i){
      if (i !== 0) return node;
    });
    expect(final.length).to.equal(3);
  });

  it("can remove several elements", function() {
    var final = u([1, 2, 3, 4]).array(function(node, i){
      if (i >= 3) return node;
    });
    expect(final.length).to.equal(1);
  });

  it("can add an element", function() {
    var final = u([1, 2, 3, 4]).array(function(node, i){
      return i === 0 ? [node, 'a'] : node;
    });
    expect(final.length).to.equal(5);
  });

  it("can add an many elements", function() {
    var final = u([1, 2, 3, 4]).array(function(node, i){
      return [node + 'a', node + 'b', node + 'c'];
    });
    expect(final.length).to.equal(12);
  });

  it("has the right this", function(){
    u(['a', 'b']).array(function(node, i){
      expect(this instanceof u).to.equal(true);
    });
  });

  it("returns a simple array", function(){
    var ret = u(['a', 'b']).array(function(){});
    expect(Array.isArray(ret)).to.equal(true);
  });
});

// Testing the main file
describe(".attr(name, value)", function() {
  
  
  
  afterEach(function(){
    base.first().removeAttribute('title');
    expect(!base.attr('title')).to.equal(true);
  });
  
  
  it("should be a function", function() {
    expect(typeof base.attr).to.equal('function');
  });

  it("can add an attribute with two params", function() {
    base.attr('title', 'Hello');
    expect(base.attr('title')).to.equal('Hello');
  });

  it("can remove an attribute with two params", function() {
    base.attr('title', 'Hello').attr('title', '');
    expect(base.attr('title')).to.equal('');
  });

  it("can add an attribute with an object", function() {
    base.attr({title: 'Hello'});
    expect(base.attr('title')).to.equal('Hello');
  });

  it("can read the first element attribute", function() {
    base.first().setAttribute('title', 'Hello');
    expect(base.attr('title')).to.equal('Hello');
  });

  it("can be called with no _", function() {
    expect(u('dfsdf').attr('title')).to.equal('');
  });
});

// Testing the main file
describe(".before(html)", function() {

  // Default callback for the tests
  function callback(cl){
    return '<a class="bla ' + cl + '">Link</a>';
  }

  beforeEach(function(){
    expect(u('.bla').length).to.equal(0);
  });

  afterEach(function(){
    u('.bla').remove();
  });

  it("should be a function", function() {
    expect(typeof base.after).to.equal('function');
  });

  it("can add content in the right place", function() {
    base.before('<a class="bla">Link</a>');
    expect(u('.bla').length).to.equal(1);
    expect(base.parent().find('.base, .bla').length).to.equal(2);
    expect(base.parent().find('.bla ~ .base').length).to.equal(1);
  });

  it("second parameter defaults to ''", function(){
    if (work) base.before(callback);

    expect(base.html().match('function')).to.equal(null);
    size('.bla', 1)('.bla + .base', 1);
  });

  it("can add a single one", function(){
    if (work) base.before(callback, ['a']);

    expect(base.html().match('function')).to.equal(null);
    size('.bla', 1)('.bla.a', 1)('.bla.a + .base', 1);
  });

  it("can add as many as the array", function(){
    if (work) base.before(callback, ['a', 'b']);

    expect(base.html().match('function')).to.equal(null);
    size('.bla', 2)('.bla.a', 1)('.bla.b', 1)('.bla.a + .bla.b + .base', 1);
  });
});

// Testing the main file
describe(".children(selector)", function() {
  
  afterEach(function(){
    // A previous bug that would change the inner of the original reference
    expect(base.length).to.equal(1);
  });
  
  it("should be a function", function() {
    expect(typeof base.children).to.equal('function');
  });
  
  it("can select the children of ul", function() {
    expect(base.find('ul').children().length).to.equal(3);
  });
  
  it("can filter the children", function() {
    expect(base.find('ul').children(':first-child').length).to.equal(1);
  });
  
  it("okay with no children", function() {
    expect(base.find('ul').children('.nonexist').length).to.equal(0);
  });
});
  // Testing the main file
describe(".clone(options)", function() {
  afterEach(function(){
    u('.container').remove();
  });

  describe("clone() _ without events", function() {
    beforeEach(function() {
      base.append('<div class="container">\
        <div class="testClone1">Hello</div>\
        <div class="cloneDestination">Goodbye</div>\
      </div>');
    });

    it("should be a function", function() {
      isFn(base.clone);
    });

    it("should clone a single simple node", function() {
      u('.cloneDestination').append(u('.testClone1'));
      size('.container > .testClone1', 1);
      size('.cloneDestination > .testClone1', 1);
      size('.testClone1', 2);
      expect(u('.cloneDestination > .testClone1').text()).to.eq('Hello');
    });

    it("should clone nested _", function() {
      u('.testClone1').append('<div class="testClone2">Hi</div>');

      size('.container > .testClone1 > .testClone2', 1);
      expect(u('.testClone2').text()).to.eq('Hi');
    });
  });



  describe("clone() _ with events", function() {
    beforeEach(function() {
      base.append('<div class="container">\
        <div class="testClone1">Hello</div>\
        <div class="testClone2">\
          <div class="testCloneWithEvents1">\
            click, touch, etc\
          </div>\
        </div>\
        <div class="cloneDestination"></div>\
      </div>');
    });

    it("should clone a node and its events by default", function(done) {
      u('<div>').on('click', function(e){
        u(e.target).off('click');
        done();
      }).clone().trigger('click').trigger('click');
    });

    it("should clone nested _ and their events by default", function(done) {
      u('.testCloneWithEvents1').on('click', function() { done(); });
      u('.cloneDestination').append(u('.testClone2'));
      u('.cloneDestination > .testClone2 > .testCloneWithEvents1').trigger('click');
    });
  });



  describe("clone() form elements", function() {
    before(function() {
      u('form.clone [type=text]').first().value = 'test input';
      u('form.clone [type=checkbox]').first().checked = true;
      u('form.clone [type=radio]').first().checked = true;
      u('form.clone select').first().value = 'b';
      u('form.clone textarea').first().value = 'test textarea';
    });

    afterEach(function(){
      u('.destination').html("");
    });

    it("has the correct values initially", function(){
      expect(u('form.clone [type=text]').first().value).to.equal('test input', 'beforeClone');
      expect(u('form.clone [type=checkbox]').first().checked).to.equal(true, 'beforeClone');
      expect(u('form.clone [type=radio]').first().checked).to.equal(true, 'beforeClone');
      expect(u('form.clone select').first().value).to.equal('b', 'beforeClone');
      expect(u('form.clone textarea').first().value).to.equal('test textarea', 'beforeClone');
    });


    it ("clones a full form correctly", function(){
      u('.destination').append(u('form.clone'));
      expect(u('.destination [type=text]').length).to.equal(1);
      expect(u('.destination [type=text]').first().value).to.equal('test input');
      expect(u('.destination [type=checkbox]').first().checked).to.equal(true);
      expect(u('.destination [type=radio]').first().checked).to.equal(true);
      expect(u('.destination select').first().value).to.equal('b');
      expect(u('.destination textarea').first().value).to.equal('test textarea');
    });

    it ("should clone a text input and its value by default", function() {
      u('.destination').append(u('form.clone [type=text]'));
      expect(u('.destination [type=text]').first().value).to.eq('test input');
    });

    it ("should clone a checkbox input and its value by default", function() {
      u('.destination').append(u('form.clone [type=checkbox]'));
      expect(u('.destination [type=checkbox]').first().checked).to.eq(true);
    });

    it ("should clone a radio input and its value by default", function() {
      u('.destination').append(u('form.clone [type=radio]'));
      expect(u('.destination [type=radio]').first().checked).to.eq(true);
    });


    it ("should clone a textarea input and its value by default", function() {
      u('.destination').append(u('form.clone textarea'));
      expect(u('.destination textarea').first().value).to.eq('test textarea');
    });

    it ("should clone a select input and its value by default", function() {
      u('.destination').append(u('form.clone select'));
      expect(u('.destination select').first().value).to.eq('b');
    });
  });




  describe(".clone() and node data attributes", function() {
    beforeEach(function() {
      base.append('<div class="container"><div class="testCloneData" data-foo="bar"></div><div class="destination"></div></div>');
    });

    it("should clone node data attributes", function() {
      u('.destination').append(u('.testCloneData'));
      expect(u('.destination .testCloneData').data('foo')).to.eq('bar');
    });
  });
});

// Testing the main file
describe(".closest(selector)", function() {

  afterEach(function(){
    // A previous bug that would change the inner of the original reference
    expect(base.length).to.equal(1);
  });

  it("should be a function", function() {
    expect(typeof base.closest).to.equal('function');
  });

  it("can select the children of ul", function() {
    expect(base.find('li').closest('ul').length).to.equal(1);
  });

  it("is okay with no ancestors", function() {
    expect(base.closest('.nonexist').length).to.equal(0);
  });
});

// Testing the main file
describe(".data(name, value)", function() {
  it("should be a function", function() {
    expect(typeof base.data).to.equal('function');
  });

  it("can add an attribute with two params", function() {
    base.data('title', 'Hello');
    expect(base.data('title')).to.equal('Hello');
    base.first().removeAttribute('data-title');
    expect(!base.data('title')).to.equal(true);
  });

  it("can add an attribute with an object", function() {
    base.data({title: 'Hello'});
    expect(base.data('title')).to.equal('Hello');
  });

  it("can read the first element attribute", function() {
    base.first().setAttribute('data-title', 'Hello');
    expect(base.data('title')).to.equal('Hello');
  });

  it("can be called with no _", function() {
    expect(u('dfsdf').data('title')).to.equal('');
  });
});

describe(".each(function(){})", function() {
    
  it("should be defined", function() {
    expect(typeof base.each).to.equal('function');
  });
  
  it("empty gives an error", function(done){
    try {
      u([0, 1, 2]).each();
    } catch (e) {
      return done();
    }
    throw "Shouldn't get here";
  });

  it("can loop", function() {
    u([0, 1, 2, 3]).each(function(node, i){
      expect(node).to.equal(i);
    });
    
    u([3, 4, 5, 6]).each(function(node, i){
      expect(node).to.equal(i + 3);
    });
  });

  it("can loop a real element", function() {
    base.each(function(node, i){
      expect(u(node).hasClass('base')).to.equal(true);
      expect(i).to.equal(0);
    });
  });
  
  it("has the right this", function(){
    u(['a', 'b']).each(function(node, i){
      expect(this instanceof u).to.equal(true);
    });
  });
  
  it("returns an umbrella object", function(){
    var ret = u(['a', 'b']).each(function(){});
    expect(ret instanceof u).to.equal(true);
  });
});
describe(".eacharg([], function(){})", function() {
    
  it("should be defined", function() {
    expect(typeof base.each).to.equal('function');
  });
  
  it("no data, everything is is okay", function(){
    base.eacharg();
    base.eacharg("");
    base.eacharg("", function(){});
    base.eacharg(false);
    base.eacharg(false, function(){});
    base.eacharg(undefined);
    base.eacharg(undefined, function(){});
    base.eacharg(function(){ return false; });
    base.eacharg(function(){ return false; }, function(){});
  });
  
  it("only first arguments gives an error", function(){
    expect(base.eacharg.bind(base, ["a"])).to.throw();
  });
  
  it("has the right this", function(){
    u(['a', 'b']).eacharg(['a'], function(node, arg){
      expect(this instanceof u).to.equal(true);
    });
  });
  
  it("returns an umbrella object", function(){
    var ret = u(['a', 'b']).eacharg(['a'], function(){});
    expect(ret instanceof u).to.equal(true);
  });
  
  
  // STRING
  describe('loops over an string', function(){
    
    it("accepts commas as separation", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg('A,B,', function(node, arg){
        expect(node + arg).to.equal(values.shift());
      });
    });
      
    it("accepts space as separation", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg('A B ', function(node, arg){
        expect(node + arg).to.equal(values.shift());
      });
    });
    
    it("accepts commas and spaces as separation", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg('A, B, ', function(node, arg){
        expect(node + arg).to.equal(values.shift());
      });
    });
    
    it("accepts other whitespace as separation", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg('A\nB\n', function(node, arg){
        expect(node + arg).to.equal(values.shift());
      });
    });
  });
  
  
  // ARRAY
  describe("loops over an array", function(){
    
    it("accepts an array of elements", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg(['A', 'B', ''], function(node, arg){
        expect(node + arg).to.equal(values.shift());
      });
    });

    it("accepts an array with space-separated elements", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg(['A B '], function(node, arg){
        expect(node + arg).to.equal(values.shift());
      });
    });

    it("accepts an array with comma-separated elements", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg(['A,B,'], function(node, arg){
        expect(node + arg).to.equal(values.shift());
      });
    });

    it("accepts an array with comma and space separation", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg(['A, B, '], function(node, arg){
        expect(node + arg).to.equal(values.shift());
      });
    });
    
    it("accepts an array with other whitespace as separation", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg(['A\nB\n'], function(node, arg){
        expect(node + arg).to.equal(values.shift());
      });
    });

    it("accepts an array with a combination", function() {
      var values = ['aA', 'aB', 'aC', 'bA', 'bB', 'bC'];
      u(['a', 'b']).eacharg(['A, B', 'C, '], function(node, arg){
        expect(node + arg).to.equal(values.shift());
      });
    });
  });
  
  
  // FUNCTION
  describe("loops over a function return", function(){
    
    var called = false;
    beforeEach(function(){
      called = false;
    });
    
    it("accepts commas as separation", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg(function(){ return 'A,B,'; }, function(node, arg){
        expect(node + arg).to.equal(values.shift());
        called = true;
      });
      expect(called).to.equal(true);
    });
    
    it("accepts space as separation", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg(function(){ return 'A B '; }, function(node, arg){
        expect(node + arg).to.equal(values.shift());
        called = true;
      });
      expect(called).to.equal(true);
    });
    
    it("accepts commas and spaces as separation", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg(function(){ return 'A, B, '; }, function(node, arg){
        expect(node + arg).to.equal(values.shift());
        called = true;
      });
      expect(called).to.equal(true);
    });
    
    it("accepts other whitespace as separation", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg(function(){ return 'A\nB\n'; }, function(node, arg){
        expect(node + arg).to.equal(values.shift());
        called = true;
      });
      expect(called).to.equal(true);
    });
    
    it("accepts an array of elements", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg(function(){ return ['A', 'B', '']; }, function(node, arg){
        expect(node + arg).to.equal(values.shift());
        called = true;
      });
      expect(called).to.equal(true);
    });

    it("accepts an array with space-separated elements", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg(function(){ return ['A B ']; }, function(node, arg){
        expect(node + arg).to.equal(values.shift());
        called = true;
      });
      expect(called).to.equal(true);
    });

    it("accepts an array with comma-separated elements", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg(function(){ return ['A,B,']; }, function(node, arg){
        expect(node + arg).to.equal(values.shift());
        called = true;
      });
      expect(called).to.equal(true);
    });

    it("accepts an array with comma and space separation", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg(function(){ return ['A, B, ']; }, function(node, arg){
        expect(node + arg).to.equal(values.shift());
        called = true;
      });
      expect(called).to.equal(true);
    });
    
    it("accepts an array with other whitespace as separation", function() {
      var values = ['aA', 'aB', 'bA', 'bB'];
      u(['a', 'b']).eacharg(function(){ return ['A\nB\n']; }, function(node, arg){
        expect(node + arg).to.equal(values.shift());
        called = true;
      });
      expect(called).to.equal(true);
    });

    it("accepts an array with a combination", function() {
      var values = ['aA', 'aB', 'aC', 'bA', 'bB', 'bC'];
      u(['a', 'b']).eacharg(function(){ return ['A, B', 'C, ']; }, function(node, arg){
        expect(node + arg).to.equal(values.shift());
        called = true;
      });
      expect(called).to.equal(true);
    });
  });
});
// Testing the main file
describe(".empty()", function() {

  beforeEach(function() {
    base.append('\
      <div class="empty-test"> \
        <p></p> \
        <p></p> \
      </div> \
    ');

    expect(u('.empty-test').length).to.equal(1);
    expect(u('.empty-test p').length).to.equal(2);
  });

  afterEach(function() {
    u('.empty-test').remove();
  });


  it("should be defined", function() {
    expect(typeof base.empty).to.equal('function');
  });

  it("can be called even without any node", function() {
    expect(u('.empty-test div').length).to.equal(0);
    u('.empty-test div').empty();
  });

  it("will clean text-only _", function() {
    u('.empty-test').html('Hello world');
    expect(u('.empty-test').html()).to.equal('Hello world');
    u('.empty-test').empty();
    expect(u('.empty-test').html()).to.equal('');
  });

  it("will clean mixed _", function() {
    u('.empty-test').html('Hello world!<p>How <strong>are you</strong>?</p>');
    u('.empty-test').empty();
    expect(u('.empty-test').html()).to.equal('');
  });

  it("should return an instance of umbrella with the empty _", function() {
    var result = u('.empty-test').empty();

    expect(result).to.be.instanceof(u);
    expect(result._).to.have.length(1);
    expect(result.attr('class')).to.equal('empty-test');
  });

  it("empty element", function() {
    u('.empty-test').empty();
    expect(u('.empty-test p').length).to.equal(0);
  });
});

// Testing the main file
describe(".filter(selector)", function() {
  
  it("should be defined", function() {
    expect(typeof base.filter).to.equal('function');
  });

  it("can be called empty", function() {
    base.filter();
    base.filter("");
  });

  it("stays the same", function() {
    expect(base.filter('.base').length).to.equal(1);
  });

  it("gets only one", function() {
    expect(base.find('a').filter('#world').length).to.equal(1);
  });

  it("accepts a function", function() {
    expect(base.filter(function(){ return true; }).length).to.equal(1);
    expect(base.filter(function(){ return false; }).length).to.equal(0);
  });

  it("accepts an object", function() {
    expect(base.filter(base).length).to.equal(1);
    expect(base.filter(u('.bla')).length).to.equal(0);
  });
  
  it("returns the same if called empty", function() {
    expect(base.find('.not-test li').filter().length).to.equal(base.find('.not-test li').length);
    expect(base.find('.not-test li').filter('').length).to.equal(base.find('.not-test li').length);
    expect(base.find('.not-test li').filter(null).length).to.equal(base.find('.not-test li').length);
    expect(base.find('.not-test li').filter(undefined).length).to.equal(base.find('.not-test li').length);
    expect(base.find('.not-test li').filter(false).length).to.equal(base.find('.not-test li').length);
  });
});
// Testing the main file
describe(".find(selector)", function() {

  it("should be a function", function() {
    expect(typeof base.find).to.equal('function');
  });

  it("can be empty and it selects all", function() {
    expect(base.find().length).to.equal(base.find('*').length);
  });

  it("can select the list ul", function() {
    expect(base.find('ul').length).to.equal(1);
  });

  it("cannot select body", function() {
    expect(base.find('body').length).to.equal(0);
  });

  it("doesn't select duplicates", function(){
    expect(u("*").find('.brand a').length).to.equal(1);
  });
});

// Testing the main file
describe(".first()", function() {
  
  it("should be a function", function() {
    expect(typeof base.first).to.equal('function');
  });
  
  it("the first element is an HTML element", function() {
    expect(base.find("li").first().nodeType).to.equal(1);
  });
  
  it("can get the first li and it's a LI", function() {
    expect(base.find("li").first().nodeName).to.equal('LI');
  });
});
// Note: node._e['submit'] and other events will appear as [null] in PhantomJS
// but they work as expected
describe(".handle(event, fn)", function() {

  beforeEach(function(){
    base.append('<div class="clickable"><a>Hi</a></div>');
  });

  afterEach(function(){
    u('.clickable').remove();
    base.off('click');
  });

  it("should be defined", function() {
    expect(typeof base.handle).to.equal('function');
  });

  it("triggers the event", function(done) {
    base.find('.clickable').handle('click', function(e){
      expect(e.target).to.equal(this);
      done();
    });
    base.find('.clickable').trigger('click');
  });

  it("triggers the event twice", function(done) {
    var i = 1;
    base.find('.clickable').handle('click submit', function(e){
      expect(e.target).to.equal(this);
      i++;
      if (i === 3) {
        done();
      }
    });
    base.find('.clickable').trigger('click');
    base.find('.clickable').trigger('submit');
  });

  it("can do event delegation", function(done) {
    base.handle('click', '.clickable', function(e){
      expect(e.target.className).to.equal('clickable');
      done();
    });
    base.find('.clickable').trigger('click');
    base.off('click');
  });

  it("event delegation not triggered by others", function() {
    base.handle('click', '.clickable', function(e){
      throw new Error("Should never get here");
    });
    base.find('ul').not('.clickable').trigger('click');
    base.off('click');
  });

  it("triggers the delegated event when child element is target", function(done) {
    base.handle('click', '.clickable', function(e) {
      expect(e.target.tagName).to.equal('A');
      expect(e.target.className).to.not.equal('clickable');
      done();
    });
    base.find('.clickable a').trigger('click');
  });

  it("triggers the event with custom data", function(done) {
    base.find('.clickable').handle('click', function(e, a){
      same(!!e, true);
      same(e.detail, ['a']);
      same(a, 'a');
      done();
    });
    base.find('.clickable').trigger('click', 'a');
  });
    it("triggers the delegated event with custom data", function(done) {
      base.handle('click', '.clickable', function(e, a){
        same(!!e, true);
        same(e.detail, ['a']);
        same(a, 'a');
        done();
      });
      base.find('.clickable').trigger('click', 'a');
    });

  it("triggers the event with custom data object", function(done) {
    base.find('.clickable').handle('click', function(e, a){
      same(!!e, true);
      same(e.detail, [{ a: 'b' }]);
      same(a, { a: 'b' });
      done();
    });
    base.find('.clickable').trigger('click', { a: 'b' });
  });

  it("triggers the event with custom data object", function(done) {
    base.handle('click', '.clickable', function(e, a){
      same(!!e, true);
      same(e.detail, [{ a: 'b' }]);
      same(a, { a: 'b' });
      done();
    });
    base.find('.clickable').trigger('click', { a: 'b' });
  });

  it("triggers the event with custom data values", function(done) {
    base.find('.clickable').handle('click', function(e, a, b){
      same(!!e, true);
      same(e.detail, ['a', 'b']);
      same(a, 'a');
      same(b, 'b');
      done();
    });
    base.find('.clickable').trigger('click', 'a', 'b');
  });

  it("triggers the event with custom data values", function(done) {
    base.handle('click', '.clickable', function(e, a, b){
      same(!!e, true);
      same(e.detail, ['a', 'b']);
      same(a, 'a');
      same(b, 'b');
      done();
    });
    base.find('.clickable').trigger('click', 'a', 'b');
  });
});

// Testing the main file
describe(".hasClass(name)", function() {
  
  it("should be a function", function() {
    expect(typeof base.hasClass).to.equal('function');
  });
  
  it("can check a single class", function() {
    expect(base.find('#world').hasClass('hello')).to.equal(true);
  });
  
  it("works as AND", function() {
    expect(base.find('#world').hasClass('hello nonexisting')).to.equal(false);
  });
  
  it("can check multiple classes with space", function() {
    expect(base.find('#world').hasClass('hello world')).to.equal(true);
  });
  
  it("can check multiple classes with comma", function() {
    expect(base.find('#world').hasClass('hello,world')).to.equal(true);
  });
  
  it("can check multiple classes as arguments", function() {
    expect(base.find('#world').hasClass('hello', 'world')).to.equal(true);
  });
});
// Testing the main file
describe(".html(content)", function() {
  
  it("should be a function", function() {
    expect(typeof base.hasClass).to.equal('function');
  });
  
  it("can get the html content", function() {
    expect(base.find('#world').html()).to.equal('Hello world');
  });
  
  it("can set the html content", function() {
    expect(base.find('#world').html()).not.to.equal('hello');
    base.find('#world').html('hello');
    expect(base.find('#world').html()).to.equal('hello');
    base.find('#world').html('Hello world');
  });
});
// Testing the main file
describe(".is(selector)", function() {

  it("should be defined", function() {
    expect(typeof base.is).to.equal('function');
  });

  it("can be called empty", function() {
    base.is();
    base.is("");
  });

  it("accepts a selector", function() {
    expect(base.is('.base')).to.equal(true);
    expect(base.is('div')).to.equal(true);
  });

  it("accepts a function", function() {
    expect(base.is(function(){ return true; })).to.equal(true);
    expect(base.is(function(){ return false; })).to.equal(false);
    base.is(function(node){
      expect(u(node).is('.base')).to.equal(true);
    });
  });

  it("accepts an object", function() {
    expect(base.is(base)).to.equal(true);
    expect(base.is(u('.bla'))).to.equal(false);
    base.is(function(node){
      expect(u(node).is(base)).to.equal(true);
    });
  });
});

// Testing the main file
describe(".last()", function() {

  it("should be a function", function() {
    expect(typeof base.last).to.equal('function');
  });

  it("the last element is an HTML element", function() {
    expect(base.find("li").last().nodeType).to.equal(1);
  });

  it("can get the last li and it's a LI", function() {
    expect(base.find("li").last().nodeName).to.equal('LI');
  });

  it("returns false for non existing element", function() {
  	expect(u('.non-existing').last()).to.equal(false);
  });

  it("actually returns the last element", function() {
  	base.append('<a class="last-test">Node 1</a> <div class="last-test">Node 2</div>');
  	expect(u('.last-test').last().nodeName).to.equal('DIV');
  });

});

var list = u('<ul>').append(function(i){ return '<li>'+i+'</li>'; }, 10).find('li');

describe(".map(function(){})", function() {

  it("should be defined", function() {
    expect(typeof base.map).to.equal('function');
  });

  it("empty gives an error", function(){
    same(u([0, 1, 2]).map(), u([0, 1, 2]));
  });

  it("can loop as each()", function() {
    u([0, 1, 2, 3]).map(function(node, i){
      expect(node).to.equal(i);
    });

    u([3, 4, 5, 6]).map(function(node, i){
      expect(node).to.equal(i + 3);
    });
  });

  it("can loop a real element", function() {
    base.map(function(node, i){
      expect(u(node).hasClass('base')).to.equal(true);
      expect(i).to.equal(0);
    });
  });

  it("accepts return of single element", function(){
    var els = list.map(function(node){
      return node;
    }).each(function(node, i){
      expect(i).to.equal(parseInt(node.innerHTML));
    });
  });

  it("accepts return of string and parses it", function(){
    list.map(function(node){
      return '<li>' + node.innerHTML + '</li>';
    }).each(function(node, i){
      expect(i).to.equal(parseInt(node.innerHTML));
    });
  });

  it("accepts return of two elements string", function(){
    list.map(function(node, i){
      return '<span>' + (i * 2) + '</span>' +
        '<span>' + (i * 2 + 1) + '</span>';
    }).each(function(node, i){
      expect(i).to.equal(parseInt(node.innerHTML));
    });
  });

  it("accepts return of array of elements", function(){
    var els = list.map(function(node, i){
      return [node];
    }).each(function(node, i){
      expect(i).to.equal(parseInt(node.innerHTML));
    });
  });

  it("accepts return of array of two elements", function(){
    same(list.map(function(node, i){
      var newNode = u('<li>').html('a').first();
      return [node, newNode];
    }).length, 20);
  });

  it("accepts return of umbrella instance", function(){
    var els = list.map(function(node, i){
      return u(node);
    }).each(function(node, i){
      expect(i).to.equal(parseInt(node.innerHTML));
    });
  });

  it("falsy removes them", function(){
    expect(list.map(function(){ return false; }).length).to.equal(0);
    expect(list.map(function(){ return null; }).length).to.equal(0);
    expect(list.map(function(){ return undefined; }).length).to.equal(0);
    expect(list.map(function(){ return ''; }).length).to.equal(0);
    expect(list.map(function(){ return 0; }).length).to.equal(0);
    expect(list.map(function(){}).length).to.equal(0);
  });

  it("can remove a single element", function() {
    var final = u([1, 2, 3, 4]).map(function(node, i){
      return i === 0 ? false : node;
    });
    expect(final.length).to.equal(3);
  });

  it("can remove several elements", function() {
    var final = u([1, 2, 3, 4]).map(function(node, i){
      return i < 3 ? false : node;
    });
    expect(final.length).to.equal(1);
  });

  it("can add an element", function() {
    var final = u([1, 2, 3, 4]).map(function(node, i){
      return i === 0 ? [node, 'a'] : node;
    });
    expect(final.length).to.equal(5);
  });

  it("can add an many elements", function() {
    var final = u([1, 2, 3, 4]).map(function(node, i){
      return [node + 'a', node + 'b', node + 'c'];
    });
    expect(final.length).to.equal(12);
  });

  it("has the right this", function(){
    u(['a', 'b']).map(function(node, i){
      expect(this instanceof u).to.equal(true);
    });
  });

  it("returns an umbrella object", function(){
    var ret = u(['a', 'b']).map(function(){});
    expect(ret instanceof u).to.equal(true);
  });
});

describe(".not(elems)", function() {

  beforeEach(function() {
    base.append('\
      <ul class="not-test"> \
        <li class="filter"></li> \
        <li class="filter"></li> \
        <li></li> \
      </ul>');

    expect(u('.not-test').length).to.equal(1);
    expect(u('.not-test li').length).to.equal(3);
  });

  afterEach(function() {
    u('.not-test').remove();
    expect(u('.not-test').length).to.equal(0);
  });

  it("should be a function", function() {
    expect(typeof base.not).to.equal('function');
  });

  it("can be called empty", function() {
    base.not();
    base.not('');
    base.not(null);
    base.not(undefined);
    base.not(false);
  });

  it("returns same if called empty", function() {
    expect(base.find('.not-test li').not().length).to.equal(base.find('.not-test li').length);
    expect(base.find('.not-test li').not('').length).to.equal(base.find('.not-test li').length);
    expect(base.find('.not-test li').not(null).length).to.equal(base.find('.not-test li').length);
    expect(base.find('.not-test li').not(undefined).length).to.equal(base.find('.not-test li').length);
    expect(base.find('.not-test li').not(false).length).to.equal(base.find('.not-test li').length);
  });

  it("filter single element", function() {
    expect(base.find('.not-test li').not(u(u('.not-test li').first())).length).to.equal(2);
  });

  it("filter multiple elements", function() {
    expect(base.find('.not-test li').not(u('.not-test li.filter')).length).to.equal(1);
  });

  it("filter selector elements", function() {
    expect(base.find('.not-test li').not('.filter').length).to.equal(1);
  });

});

describe('.off()', function() {

  var listener = function() {
    throw 'Shouldn\'t be called';
  };

  beforeEach(function() {
    base.append('<ul class="temp"><li class="off-single-test">1</li>\
    <li class="off-multiple-test">2</li>\
    <li class="off-multiple-test">3</li>\
    </ul>');
  });

  afterEach(function(){
    base.find(".temp").remove();
    expect(u(".temp").length).to.equal(0);
  });

  it('should be defined', function() {
    expect(typeof base.off).to.equal('function');
  });

  it('on works', function(done) {
    u('.off-single-test').on('click', function(){ done(); });
    u('.off-single-test').trigger('click');
  });

  it('removes event from single element', function() {
    u('.off-single-test').on('click', listener);
    u('.off-single-test').off('click');
    u('.off-single-test').trigger('click');
  });

  it('removes event from multiple elements', function() {
    u('.off-multiple-test').on('click', listener);
    u('.off-multiple-test').off('click');
    u('.off-multiple-test').trigger('click');
  });

  it('removes event multiple times', function() {
    u('.off-multiple-test').on('click', listener);
    u('.off-multiple-test').on('click', function(){
      throw "Error";
    });
    u('.off-multiple-test').off('click');
    u('.off-multiple-test').trigger('click');
  });

  it('removes multiple events', function() {
    u('.off-multiple-test').on('click mouseover', listener);
    u('.off-multiple-test').off('click mouseover');
    u('.off-multiple-test').trigger('mouseover');
  });

  it('does not remove manual event', function(done) {
    u('.off-single-test').first().addEventListener('click', function(){
      done();
    });
    u('.off-single-test').off('click');
    u('.off-single-test').trigger('click');
  });
});

// Note: node._e['submit'] and other events will appear as [null] in PhantomJS
// but they work as expected
describe(".on(event, fn)", function() {

  beforeEach(function(){
    base.append('<div class="clickable"><a>Hi</a></div>');
  });

  afterEach(function(){
    u('.clickable').remove();
    base.off('click');
  });

  it("should be defined", function() {
    expect(typeof base.on).to.equal('function');
  });

  it("triggers the event", function(done) {
    base.find('.clickable').on('click', function(e){
      expect(e.target).to.equal(this);
      done();
    });
    base.find('.clickable').trigger('click');
  });

  it("triggers the event twice", function(done) {
    var i = 1;
    base.find('.clickable').on('click submit', function(e){
      expect(e.target).to.equal(this);
      i++;
      if (i === 3) {
        done();
      }
    });
    base.find('.clickable').trigger('click');
    base.find('.clickable').trigger('submit');
  });

  it("can do event delegation", function(done) {
    base.on('click', '.clickable', function(e){
      expect(e.target.className).to.equal('clickable');
      done();
    });
    base.find('.clickable').trigger('click');
    base.off('click');
  });

  it("event delegation has proper parameters", function(done) {
    base.on('click', 'li', function(e){
      expect(e.target.tagName).to.equal('A');

      // This fails on circleci and local because phantomjs's webkit is too old
      if (!mocha || !mocha.env) {
        expect(e.currentTarget.tagName).to.equal('LI');
      } else {
        console.log("Test not run. currentTarget:", e.currentTarget.tagName);
      }
      expect(this.tagName).to.equal('LI');
      done();
    });
    base.find('#world').trigger('click');
    base.off('click');
  });

  it("event delegation not triggered by others", function() {
    base.on('click', '.clickable', function(e){
      throw new Error("Should never get here");
    });
    base.find('ul').not('.clickable').trigger('click');
    base.off('click');
  });

  it("triggers the delegated event when child element is target", function(done) {
    base.on('click', '.clickable', function(e) {
      expect(e.target.tagName).to.equal('A');
      expect(e.target.className).to.not.equal('clickable');
      done();
    });
    base.find('.clickable a').trigger('click');
  });

  it("triggers the event with custom data", function(done) {
    base.find('.clickable').on('click', function(e, a){
      same(!!e, true);
      same(e.detail, ['a']);
      same(a, 'a');
      done();
    });
    base.find('.clickable').trigger('click', 'a');
  });
    it("triggers the delegated event with custom data", function(done) {
      base.on('click', '.clickable', function(e, a){
        same(!!e, true);
        same(e.detail, ['a']);
        same(a, 'a');
        done();
      });
      base.find('.clickable').trigger('click', 'a');
    });

  it("triggers the event with custom data object", function(done) {
    base.find('.clickable').on('click', function(e, a){
      same(!!e, true);
      same(e.detail, [{ a: 'b' }]);
      same(a, { a: 'b' });
      done();
    });
    base.find('.clickable').trigger('click', { a: 'b' });
  });

  it("triggers the event with custom data object", function(done) {
    base.on('click', '.clickable', function(e, a){
      same(!!e, true);
      same(e.detail, [{ a: 'b' }]);
      same(a, { a: 'b' });
      done();
    });
    base.find('.clickable').trigger('click', { a: 'b' });
  });

  it("triggers the event with custom data values", function(done) {
    base.find('.clickable').on('click', function(e, a, b){
      same(!!e, true);
      same(e.detail, ['a', 'b']);
      same(a, 'a');
      same(b, 'b');
      done();
    });
    base.find('.clickable').trigger('click', 'a', 'b');
  });

  it("triggers the event with custom data values", function(done) {
    base.on('click', '.clickable', function(e, a, b){
      same(!!e, true);
      same(e.detail, ['a', 'b']);
      same(a, 'a');
      same(b, 'b');
      done();
    });
    base.find('.clickable').trigger('click', 'a', 'b');
  });
});

describe('.parent()', function() {

  it('should be defined', function() {
    expect(typeof base.parent).to.equal('function');
  });

  it('can loop the li', function() {
    expect(u('li').parent().is('ol, ul')).to.equal(true);
  });

  it('can retrieve the direct parent with a filter', function() {
    expect(base.parent('#demo').is('div')).to.equal(true);
  });

  it('will filter out if none is matched', function() {
    expect(base.parent('#fake').is('div')).to.equal(false);
  });
});

// Testing the main file
describe(".prepend()", function() {

  // Default callback for the tests
  function callback(cl){
    return '<a class="bla ' + cl + '">Link</a>';
  }

  beforeEach(function(){

    // Just in case it stringifies the callback
    expect(base.html().match('function')).to.equal(null);
    expect(u('.bla, .blu').length).to.equal(0);
  });

  afterEach(function(){
    u('.bla, .blu').remove();
  });

  it("should be a function", function() {
    expect(typeof base.prepend).to.equal('function');
  });

  it("can add content in the right place", function() {
    base.prepend('<a class="bla">Link</a>');
    size('.base > .bla', 1);
  });

  it("can add content with a callback", function() {
    base.prepend(callback);
    size('.base > .bla', 1)('.base > .bla:first-child', 1);
  });

  it("is called as many times as data in the second param", function() {
    base.prepend('<a class="bla">Link</a>', ["a", "b"]);
    size('.base > .bla', 2)('.base > .bla:first-child', 1);
  });

  it("can add content inverted with a callback and data", function() {
    base.prepend(callback, ["a", "b"]);
    //throw "Error";
    size('.base > .bla', 2)('.base > .bla.a', 1)('.base > .bla.b', 1);
    size('.bla.a + .bla.b', 1)('.bla.b + .bla.a', 0)('.base > .bla.a:first-child', 1);
  });

  it("can generate some text", function(){
    var list = u("<div>");
    if (work) list.prepend  (function(n){ return n + "\n" }, ['a', 'b']);

    expect(list.children().length).to.equal(0);
    expect(list.html()).to.equal('a\nb\n');
  });
});

// Testing the main file
describe(".remove()", function() {

  beforeEach(function() {
    base.append('\
      <ul class="remove-test"> \
        <li></li> \
        <li></li> \
      </ul> \
    ');

    expect(u('.remove-test').length).to.equal(1);
    expect(u('.remove-test li').length).to.equal(2);
  });

  afterEach(function() {
    u('.remove-test').remove();
  });


  it("should be defined", function() {
    expect(typeof base.remove).to.equal('function');
  });

  it("can be called even without any node", function() {
    expect(u('.remove-test div').length).to.equal(0);
    u('.remove-test div').remove();
  });

  it("can be called even without parentNode", function() {
    var children = u('.remove-test li');
    children.remove();
    expect(children.first().parentNode).to.be.null;
    children.remove(); // Remove them again
  });

  it("should return an instance of umbrella with the removed _", function() {
    var result = u('.remove-test').remove();

    expect(result).to.be.instanceof(u);
    expect(result._).to.have.length(1);
    expect(result.attr('class')).to.equal('remove-test');
    expect(result.children()._).to.have.length(2); // Two li children.
  });

  it("removes a single element", function() {
    u('.remove-test').remove();
    expect(u('.remove-test').length).to.equal(0);
  });

  it("removes several elements", function() {
    u('.remove-test li').remove();
    expect(u('.remove-test li').length).to.equal(0);
  });
});

// Testing the main file
describe(".removeClass()", function() {

  //var work = false;

  beforeEach(function(){
    base.addClass('bla blu blo');
    hasClass('bla blu blo');
  });

  afterEach(function(){
    base.removeClass('bla blu blo');
    hasClass('bla blu blo', true);
  });

  it("should be defined", function() {
    isFn(work ? base.removeClass : false);
  });

  it("can be called empty", function() {
    base.removeClass();
    base.removeClass("");
    base.removeClass([]);
    base.removeClass("","");
    base.removeClass(" ");

    if (!work) throw "Force failure";
  });

  it("removes a single class", function() {
    if (work) base.removeClass('bla');
    hasClass('bla', true);
  });

  it("can be concatenated", function() {
    if (work) base.removeClass('bla').removeClass('blu');
    hasClass('bla blu', true);
  });




  describe("single argument", function(){
    base.addClass('bla blu blo');
    listOfClasses.forEach(function(part){
      it("accepts " + part.it, function(){
        if (work) base.removeClass(part.from);
        hasClass('bla blu blo', true);
      });
    });
  });

  describe("single function argument uses the return value", function(){
    base.addClass('bla blu blo');
    listOfClasses.forEach(function(part){
      it("accepts as a return value " + part.it, function(){
        if (work) base.removeClass(function() { return part.from; });
        hasClass('bla blu blo', true);
      });
    });
  });

  describe("multiple functions uses the return value", function(){
    function add(arg){ return function(){ return arg; }; }
    listOfClasses.forEach(function(part){
      it("accepts as a return value " + part.it, function(){
        if (work) base.removeClass(add(part.from), add("bli"));
        hasClass('bla blu blo bli', true);
      });
    });
  });

  describe("several arguments", function(){
    listOfClasses.filter(function(part){
      return Array.isArray(part.from);
    }).forEach(function(part){
      it("used .apply() with " + part.it, function(){
        if (work) base.removeClass.apply(base, part.from);
        hasClass('bla blu blo', true);
      });
    });
  });
});

// Based on
if(u(document.createDocumentFragment()).append('<div>').children().length == 0) {
  Object.defineProperty(DocumentFragment.prototype, "children", {"get" : function() {
    var arr = [],
      child = this.firstChild;

    while (child) {
      if (child.nodeType == 1) arr.push(child);
      child = child.nextSibling;
    }

    return arr;
  }});
};


// Testing the replace plugin main file
describe(".replace(newValue)", function() {

  afterEach(function(){
    base.find('button.update').remove();
  });

  it("should be a function", function() {
    expect(typeof base.replace).to.equal('function');
  });

  it("replace the single node string case", function() {
    base.append('<a class="save">Save</a>');

    base.find('a.save').replace('<button class="update">Update</button>');
    size('.base > button.update', 1);

    base.find('button.update').remove();
  });

  it("returns the correct values", function(){
    base.append('<a class="save">Save</a>');
    var button = base.find('a.save').replace('<button class="update">Update</button>').first();
    expect(button.nodeName).to.equal('BUTTON');
    expect(u(button).closest('body').length).to.equal(1);


    base.find('button.update').remove();
  });

  it("replace multi _ string case", function() {
    base.append('<a class="save">Save</a><a class="save">Save</a>');

    base.find('a.save').replace('<button class="update">Update</button>');
    size('.base > button.update', 2);

    base.find('button.update').remove();
  });

  it("replace the single node function case", function() {
    base.append('<a class="save">Save</a>');

    base.find('a.save').replace(function(link){
      return '<button class="update">' + link.innerHTML  + '</button>';
    });
    size('.base > button.update', 1);

    base.find('button.update').remove();
  });

  it("replace multi _ function case", function() {
    base.append('<a class="save">Save</a><a class="save">Save</a>');

    base.find('a.save').replace(function(link){
      return '<button class="update">' + link.innerHTML  + '</button>';
    });
    size('.base > button.update', 2);

    base.find('button.update').remove();
  });
});

// insert tall element to test scroll()
var elHeight = window.innerHeight + 100;
var el = '<div style="height:' + elHeight + 'px" id="scrollTest"></div>';
u('body').append(el);


describe('.scroll()', function() {

  it('should be a function', function() {
    expect(typeof base.scroll).to.equal('function');
  });

  it('should return this Umbrella Object', function() {
    size(u('li').scroll(), u('li').length);
  });

  it('can scroll to the element', function(done) {
    expect(u('body').size().top).to.be.above(-10);
    u('#scrollTest').scroll();

    setTimeout(function(){
      expect(u('body').size().top).to.be.below(-10);
      u('#scrollTest').remove();
      u('body').scroll();
      done();
    }, 100);
  });
});

// Testing the main file
describe(".select(selector)", function() {

  it("should be a function", function() {
    expect(typeof base.select).to.equal('function');
  });

  it("can select by class", function(){
    expect(u().select('.base').length).to.equal(1);
    expect(u().select('.base')).to.not.equal(null);
  });

  it("can select by tag", function(){
    expect(u().select('li').length).to.be.above(1);
    expect(u().select('li')[0].nodeName).to.equal('LI');
  });

  it("can select by id", function(){
    expect(u().select('#base')[0]).to.not.equal(null);
    expect(u().select('#base')[0].nodeName).to.equal('DIV');
  });

  it("can select by complex selector", function() {
    expect(u().select('.brand a').length).to.equal(1);
    expect(u().select('.brand a')[0].nodeName).to.equal('A');
  });

  it("can create one element", function(){
    expect(u('<div>').length).to.equal(1);
    expect(u('<div>').first().nodeName).to.equal('DIV');
  });

  it("can create many elements", function(){
    expect(u('<p></p><p></p>').length).to.equal(2);
    expect(u('<p></p><p></p>').first().nodeName).to.equal('P');
  });

  it("can have spaces before or after", function(){
    expect(u(' <p></p><p></p>').length).to.equal(2);
    expect(u('<p></p><p></p>').first().nodeName).to.equal('P');

    expect(u('<p></p><p></p> ').length).to.equal(2);
    expect(u('<p></p><p></p> ').first().nodeName).to.equal('P');
  });

  it("can create table stuff", function() {
    size('<table>Hello</table>', 1);
    size('<th>Hello</th>', 1);
    size('<tr>Hello</tr>', 1);
    size('<td>Hello</td>', 1);
  });

  it("can create list stuff", function() {
    size('<ul><li>A</li></ul>', 1);
    size('<li>B</li>', 1);
  });
});

// Testing the main file
describe(".serialize()", function() {

  afterEach(function() {
    u('.serialize-test').remove();
  });


  it("should be defined", function() {
    expect(typeof u('.serialize-test').serialize).to.equal('function');
  });

  it("can handle arrays", function() {
    base.append('\
      <form class="serialize-test"> \
        <input name="test[]" value="a"> \
        <input name="test[]" value="b"> \
      </form> \
    ');
    expect(u('.serialize-test').serialize()).to.equal('test%5B%5D=a&test%5B%5D=b');
  });



  it("can handle select multiple", function() {
    base.append('\
      <form class="serialize-test"> \
        <select multiple name="select"> \
          <option selected value="a"></option> \
          <option selected value="b"></option> \
          <option value="c"></option> \
        </select> \
      </form> \
    ');
    expect(u('.serialize-test').serialize()).to.equal('select=a&select=b');
  });
});

// Testing the main file
describe(".siblings(selector)", function() {
  
  beforeEach(function() {
    base.append('\
      <ul class="siblings-test"> \
        <li id="siblings-1" class="selected"></li> \
        <li id="siblings-2"></li> \
        <li id="siblings-3"></li> \
      </ul> \
      <ul class="siblings-test"> \
        <li id="siblings-4"></li> \
        <li id="siblings-5" class="selected"></li> \
        <li id="siblings-6"></li> \
      </ul> \
    ');

    expect(u('.siblings-test')._.length).to.equal(2);
    expect(u('.siblings-test li')._.length).to.equal(6);
  });

  afterEach(function() {
    u('.siblings-test').remove();
    expect(u('.siblings-test')._.length).to.equal(0);
  });
  
  it("should be a function", function() {
    expect(typeof base.siblings).to.equal('function');
  });
  
  it("can select multiple siblings", function() {
    expect(base.find('#siblings-2').siblings()._.length).to.equal(2);
  });
  
  it("can filter the siblings", function() {
    expect(base.find('#siblings-1').siblings('#siblings-2')._.length).to.equal(1);
  });
  
  it("can handle non existant siblings ", function() {
    expect(base.find('#siblings-2').siblings('.nonexist')._.length).to.equal(0);
  });

  it("can handle multiple _", function() {
    expect(base.find('.siblings-test').children('.selected').siblings()._.length).to.equal(4);
  });
});
describe('.size()', function() {

  it('should be a function', function() {
    expect(typeof base.size).to.equal('function');
  });

  it('should return this Umbrella Object', function() {
    size(u('li').scroll(), u('li').length);
  });

  it('can get the right size', function() {
    var size = u('body').size();
    expect(size).to.deep.equal(u('body').first().getBoundingClientRect());
  });

  it('can get the height', function() {
    var size = u('body').size();
    expect(Math.round(size.height)).to.equal(u('body').first().clientHeight);
  });
});

describe(".slice()", function() {

  it("should be a function", function() {
    expect(typeof base.slice).to.equal('function');
  });

  it("can be called empty", function() {
    same(base.slice(), []);
    same(base.slice(''), []);
    same(base.slice(null), []);
    same(base.slice(undefined), []);
    same(base.slice(false), []);
  });

  it("can slice an array", function() {
    same(base.slice(['a', 'b']), ['a', 'b']);
  });

  it("ignores a string", function() {
    same(base.slice('Hello world'), []);
  });

  it("ignores a function", function() {
    same(base.slice(function(){}), []);
  });

  it("accepts a simple number", function() {
    same(base.slice(5), [5]);
  });

  it("converts a simple object to array", function() {
    same(base.slice({ a: 'b' }), [{ a: 'b' }]);
  });

  it("accepts an XMLRequest", function() {
    var request = new XMLHttpRequest;
    same(base.slice(request), [request]);
  });

  it("accepts the document", function() {
    same(base.slice(document), [document]);
  });

  it("accepts an argument list", function() {
    (function(){
      same(base.slice(arguments), ['a', 'b']);
    })('a', 'b');
  });
});

// Testing the main file
describe(".text(content)", function() {

  it("should be a function", function() {
    expect(typeof base.hasClass).to.equal('function');
  });

  it("can get the text content", function() {
    expect(base.find('#world').text()).to.equal('Hello world');
  });

  it("can set the text content", function() {
    expect(base.find('#world').text()).not.to.equal('hello!');
    base.find('#world').text('hello!');
    expect(base.find('#world').text()).to.equal('hello!');
  });
});

// Testing the main file
describe(".toggleClass(name1, name2, ...)", function() {
  
  beforeEach(function(){
    base.addClass('blu');
    expect(base.hasClass('bla')).to.equal(false);
    expect(base.hasClass('blu')).to.equal(true);
  });
  
  afterEach(function(){
    base.removeClass('bla');
    base.addClass('blu');
  });
  
  it("should be defined", function() {
    expect(typeof base.toggleClass).to.equal('function');
  });

  it("can be called empty", function() {
    base.toggleClass();
    base.toggleClass("");
    base.toggleClass([]);
    base.toggleClass("","");
    base.toggleClass(" ");
  });

  it("adds a class by toggling", function() {
    base.toggleClass('bla');
    expect(base.hasClass('bla')).to.equal(true);
  });

  it("removes a class by toggling", function() {
    base.toggleClass('blu');
    expect(base.hasClass('blu')).to.equal(false);
  });

  it("can be concatenated", function() {
    base.toggleClass('bla').toggleClass('bla');
    expect(base.hasClass('bla')).to.equal(false);
  });
  
  it("can do double toggle and stays the same", function() {
    base.toggleClass('bla bla');
    expect(base.hasClass('bla')).to.equal(false);
  });
  
  it("toggles several classes separated by comma", function() {
    len = base.toggleClass('bla,blu').length;
    expect(len).to.equal(1);
  });
  
  
  // Second Parameter
  it("can be called with a second parameter to force a addClass", function() {
    base.toggleClass('blu', true);
    expect(base.hasClass('blu')).to.equal(true);
  });

  it("can be called with a second parameter to force a removeClass", function() {
    base.toggleClass('blu', false);
    expect(base.hasClass('blu')).to.equal(false);
  });

  it("ignores the second parameter if string", function() {
    base.toggleClass('blu', 'peter');
    expect(base.hasClass('blu')).to.equal(false);
    expect(base.hasClass('peter')).to.equal(false);
    
    base.toggleClass('blu', 'peter');
    expect(base.hasClass('blu')).to.equal(true);
  });

  it("ignores the second parameter if falsy but not false", function() {
    base.toggleClass('blu', null);
    expect(base.hasClass('blu')).to.equal(false);
    
    base.toggleClass('blu', null);
    expect(base.hasClass('blu')).to.equal(true);
  
    base.toggleClass('blu', undefined);
    expect(base.hasClass('blu')).to.equal(false);
    
    base.toggleClass('blu', undefined);
    expect(base.hasClass('blu')).to.equal(true);
  
    base.toggleClass('blu', 0);
    expect(base.hasClass('blu')).to.equal(false);
    
    base.toggleClass('blu', 0);
    expect(base.hasClass('blu')).to.equal(true);
  
    base.toggleClass('blu', '');
    expect(base.hasClass('blu')).to.equal(false);
    
    base.toggleClass('blu', '');
    expect(base.hasClass('blu')).to.equal(true);
  });
});

// Testing the main file
describe(".trigger()", function() {

  afterEach(function(){
    base.off('click bla');
  });

  it("should be a function", function() {
    isFn(base.trigger);
  });

  it("can trigger a click", function() {
    base.on('click', function(e){
      expect(!!e).to.equal(true);
    });
    base.trigger('click');
  });

  it("can be concatenated", function() {
    base.on('click', function(e){
      expect(!!e).to.equal(true);
    });
    base.trigger('click').trigger('click');
  });

  it("can trigger an event in the wrong element", function() {
    base.on('click', function(e){
      expect(!!e).to.equal(true);
    });
    base.trigger('click');
  });

  it("doesn't trigger all events", function() {
    base.on('click', function(e){
      throw "Shouldn't be called";
    });
    base.trigger('submit');
  });

  it("triggers custom event", function(done) {
    base.on('bla', function(e){
      expect(!!e).to.equal(true);
      done();
    });
    base.trigger('bla');
  });

  it("passes data", function(done) {
    base.on('click', function(e, go){
      expect(!!e).to.equal(true);
      same(e.detail, ["good"]);
      same(go, "good");
      done();
    });
    base.trigger('click', 'good');
  });
});

// Testing the main file
describe(".wrap()", function() {
  beforeEach(function(){
    base.append('<button class="example">Link1</button>');
    size('.base > .example', 1);
  });

  afterEach(function(){
    u('.example, .example-wrapper').remove();
  });

  it("should be a function", function() {
    expect(typeof base.wrap).to.equal('function');
  });

  it("should correctly wrap a single element using a chained umbrella.js function", function() {
    u('.example').wrap('<a>').attr({ href: 'http://google.com/', class: 'example-wrapper' });
    size('.example-wrapper > .example', 1);
  });

  it("should correctly wrap a single formatted selector", function() {
    u('.example').wrap('<a href="http://google.com/" class="example-wrapper">');
    size('.example-wrapper > .example', 1);
  });

  it("should wrap multiple elements using a chained umbrella.js function", function() {
    base.append('<button class="example">Link1</button>');

    u('.example').wrap('<a>').addClass('example-wrapper');
    size('.example-wrapper .example', 2);
  });

  it("when wrapping  multiple elements it should return a copy of the original node", function() {
    base.append('<button class="example">Link2</button>');

    var wrappedNodes = u('.example').wrap('<a>').addClass('example-wrapper');
    expect(wrappedNodes._[0].innerText).to.equal('Link1')
    expect(wrappedNodes._[1].innerText).to.equal('Link2')
  });

  it("should add all specified attributes to the wrapper element using a chained umbrella js function", function() {
    u('.example').wrap('<a>').attr({ href: 'http://google.com/', class: 'example-wrapper' });
    expect(u('.example-wrapper').attr('href')).to.equal('http://google.com/');
  });

  it("should add all specified attributes to the wrapper element using a formatted selector", function() {
    u('.example').wrap('<a href="http://google.com/" class="example-wrapper">');
    expect(u('.example-wrapper').attr('href')).to.equal('http://google.com/');
  });

  it("should support nested selector arguments", function() {
    u('.example').wrap('<div id="one"><div id="two"></div></div>');
    size('#one #two .example', 1);
  });

  it("should support nested selector arguments with more than one nested child", function() {
    u('.example').wrap('<div id="a1"><div id="b1"><div id="c1"></div></div><div id="b2"><div id="c2"><div id="d1"></div></div></div></div>');
    size('#a1 #b1 #c1 .example', 1);
  });

  it("should only append to the last child of the nested selector argument's first child", function() {
    u('.example').wrap('<div id="a1"><div id="b1"><div id="c1"></div></div><div id="b2"><div id="c2"><div id="d1"></div></div></div></div>');
    size('#a2 #b2 #c2 #d1 .example', 0);
  });
});
