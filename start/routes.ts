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

  Route.get('/tasks/:id', 'TasksController.getTaskInfo').middleware('auth')

  Route.post('/tasks/:id/share', 'TasksController.share').middleware('auth')
  Route.get('/shared-tasks', 'TasksController.sharedTasks').middleware('auth')
}).prefix('api')
