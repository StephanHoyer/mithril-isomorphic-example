[![Join the chat at https://gitter.im/StephanHoyer/mithril-isomorphic-example](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/StephanHoyer/mithril-isomorphic-example?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# mithril-isomorphic-example

This is an example of an express-based isomorphic mithril application.

It utilizes the architecture descibed in
[this](https://gist.github.com/StephanHoyer/bddccd9e159828867d2a) post. It can
be used as a starting point for your isomorphic mithril-based application.

# usage

1. Clone the repo
2. `cd` into it
3. run `npm install`
4. run `npm start`

If you want to run it in production mode (JS minification) just run `NODE_ENV=production node server`

# components

## frontend

It's a pretty standard mithril application. For packaging and dependencies we use
[browserify](http://browserify.org/). The routes are defined in the `routes.js`.
We added two routes for demonstration.

### async data for rendering

Rendering async data is demonstrated in the second page. As you can see the
route parameters come as `vnode.attrs` just like in browser mithril app. In order
to render async you have to return a promise in the `oninit`. If this is 
resolved for all `oninit`s, the response will be sent to the client.

```javascript
function oninit(vnode) {
  return m.request(apiUrl + 'dog/' + 123).then(function(dog) {
    vnode.state.myDog = dog
  })
}
```

You can also use route resolver for this. We will add a third route that
demonstrates this any time soon.

## backend

### REST-API

The app contains a basic REST-API based on `express`.

The API is bound to the base route `api/v1/`. This can of cause be changed in
the `server/web.js` (also change it on the client side). It's currently just one
possible route ('/dog/:id'). In a real application you probably make a config
variable with your API-base URL so you can change it in one point.

# conclusion

This project should give you a basic idea how to build a isomorphic app with
express and mithril. We try to extract as much as possible to modules but stopped
at this point, since more abstraction would result in more complicated code. This
project is there to be adapted to your special use case. The code-base is pretty
small and hopefully understandable.

Fell free to drop us a line in the gitter chat if you have any questions.
