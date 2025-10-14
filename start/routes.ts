import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('/users', 'UsersController').apiOnly().middleware({
    destroy: ['auth']
  })
  Route.post('/login', 'AuthController.login')
  Route.post('/logout', 'AuthController.logout')

  Route.resource('/tasks', 'TasksController')
    .only(['index', 'store', 'update', 'destroy'])
    .middleware({ '*': 'auth' })
}).prefix('api')
