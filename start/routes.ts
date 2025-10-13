import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('/users', 'UsersController').apiOnly()
  Route.post('/login', 'AuthController.login')

  Route.resource('/tasks', 'TasksController')
    .only(['index', 'store', 'update', 'destroy'])
    .middleware({ '*': 'auth' })
}).prefix('api')
