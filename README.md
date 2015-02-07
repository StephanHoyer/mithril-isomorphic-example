# mithril-isomorphic-example
Example of an isomorphic mithril application architecture

It utilizes the architecture descibed in [this](https://gist.github.com/StephanHoyer/bddccd9e159828867d2a) post. It can be used as a starting point for you isomorphic mithril-based application.

# components

## frontend

It's a pretty standard mithril application. For packaging und dependencies we use [browserify]. The routes are defined in the `routes.js`. We added two routes for demonstration.

There is one speciality you have to take care: If the page requires asyncronous data in order to be rendered completely and/or the rendering relies on url-based parameters you have to add to paramters to the controller signature, as demonstrated in the `second`-controller:

```javascript
function controller(params, done) {
  var scope = {};
  store.load('dog', 123).then(function(dog) {
    scope.myDog = dog;
    done && done(null, scope);
  });
  return scope;
}
```

The `params`-object contains the request parameters when run on server side. So if your url looks like `/user/:id' there will be a `params.id` that contains the parameter. The second argument is a callback function that has to be invoked, if all data is successfully fetched. Beware that you check the presence of the callback before calling it since it's only available in server environment.

## backend

WIP
