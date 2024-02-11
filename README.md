# lek-literal-values

lek-literal-values is a package that receives values and makes them explicit in a winery.js file... the bodaga allows to store data in the most literal and silly way possible. This allows you to persist data when you change application lifecycle without complications. it is useful if you want to gaurd functions for example, or objects but not in json format.

to use it first install it with npm lek-literal-values, then import it with require... it is a object with set, get and remove methods.

```bash
npm install lek-literal-values
```

```javascript
const { set, get, remove } = require('lek-literal-values');
```

## set

to this method you can set a key in string format and a value as a second parameter. another way to use it is to pass only one object, this second way allows you to set more than one value at the same time.

it is an asynchronous method, so before calling the data with get you must be sure to use await or then with set.

```javascript
const { set, get, remove } = require('lek-literal-values');

await set('my_string', 'my string');
await set('my_number', 27);
```
or

```javascript
const { set, get, remove } = require('lek-literal-values');

await set({ my_string : 'my string', my_number : 27 });
```

add functions, boolean objects and arrays freely. objects can have any value inside including functions, just be careful with circular references as they are not supported by the system. Objects will only store the properties of the object, not its proptotype.

```javascript
const { set, get, remove } = require('lek-literal-values');

const my_object = {
    run : () => { console.log("I'm so tired") },
    name : 'John'
}

await set('my_object_1', my_object);
/*will save: 
{
    run : () => { console.log("I'm so tired") },
    name : 'John'
}
*/

class My_class{
    constructor(){
        this.name = 'John';
    }
    run(){ console.log("I'm so tired") }
}

await set('my_object_2', new My_class());
/*will save: 
{
    name : 'John'
}
*/

```

## get

this method receives a string with the key you want to fetch and returns it synchronously. if you don't pass value for key, the method will return an object with all the data set.

if you pass an array with strings as parameter the method will return an object with the requested keys. remember that if you don't use array it will return just the value, and with array it will return the value inside an object.

```javascript
const { set, get, remove } = require('lek-literal-values');

await set({ my_string : 'my string', my_number : 27, my_bool : true });

const my_lek_value = get('my string'); // 27
const all = get(); // { my_string : 'my string', my_number : 27, my_bool : true }
const bool_and_string = get(['my_string', 'my_bool']); // { my_string : 'my string', my_bool : true }
```

## remove

receives a key and removes it from the system, it is asynchronous so make sure it is already finished with await or then.

function the same as get but deleting.

```javascript
const { set, get, remove } = require('lek-literal-values');

await set({ my_string : 'my string', my_number : 27, my_bool : true });

const all_1 = get(); // { my_string : 'my string', my_number : 27, my_bool : true }

await remove('my_string');

const all_2 = get(); // { my_number : 27, my_bool : true }

await remove()

const all_3 = get(); // {}

await set({ my_string : 'my string', my_number : 27, my_bool : true });

await remove(['my_bool', 'my_number']);

const all_4 = get(); // { my_string : 'my string' }
```

## considerations

set is an asynchronous method that back processes the data and overwrites a winery.js file, so if you want to overwrite more than one value use one object as a set parameter instead of several sets. this way the file will be overwritten only once, which is more efficient.

What you save in the system through the set method will stay there... as a database... if you want the data not to persist at the end of the lifecycle of your application use remove

## License

lek-literal-values is MIT licensed.