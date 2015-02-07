# mithril-isomorphic-example
This is an example of an express-based isomorphic mithril application.

It utilizes the architecture descibed in [this](https://gist.github.com/StephanHoyer/bddccd9e159828867d2a) post. It can be used as a starting point for you isomorphic mithril-based application.

# components

## frontend

It's a pretty standard mithril application. For packaging und dependencies we use [browserify]. The routes are defined in the `routes.js`. We added two routes for demonstration.

There are two specialities you have to take care: 

### controllers 

If the page requires asyncronous data in order to be rendered completely and/or the rendering relies on url-based parameters you have to add to paramters to the controller signature, as demonstrated in the `second`-controller:

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

The `params`-object contains the request parameters when run on server side. So if your url looks like `/user/:id` there will be a `params.id` that contains the parameter. The second argument is a callback function that has to be invoked, if all data is successfully fetched. Beware that you check the presence of the callback before calling it since it's only available in server environment.

### store

The app sets up an REST-server for providing the data. For conveniance we set up a `store`-module that wraps the `m.request` and talks to the REST-API. Currently only GET-by-id is implemented on server side. There are already routes for the other actions. For more info on this refer to the backend section.

The store supports four actions:

* `store.load(type, id)` - fetches one model of given type by id - results in `GET`-request
* `store.loadWhere(type, options)` - fetches a collection of models of given type - results in `GET`-request
* `store.save(model)` - saves (creates/updatea) a model - results in `POST/PUT`-request
* `store.destroy(model)` - deletes a model - results in `DELETE`-request

models should have a `type` property to use the correct route.

## backend

## REST-API

The app contains a basic REST-API based on `express`. It talks to the backend version of the `store`. The API of the backend and frontend `store` should be identical at any time.

The API is bound to the base route `api/v1/`. This can of cause be changed in the `server/web.js`. The routes of the models are related to the `type`-property of the models:

e. G. `/api/v1/user/123` fetches and returns the user with `id = 123`.

## store

The server version of `store` has the same API as the client version. However, it requires resources to fetch from. These are defined in the `/server/resources.js`. Currently there is only one resource defined. For this resource currently only the `get-by-id` is defined. The resources should be an object where the keys refert to the appropriate `model.type`-property. 

In a real application you should add your ORM/ODM in this place. As you might spot the store requires promises in order to work.

# conclusion

This project should give you a basic idea how to build a isomorphic app with express and mithril. We try to extract as much as possible to modules but stopped at this point, since more abstraction would result in more complicated code. This project is there to be adapted to your special use case. The code-base is pretty small and hopefully understandable.

Fell free to drop us a line in the gitter chat if you have any questions.
