import app from '@/api/app.js'
import login from '@/api/login.js'
import diction from '@/api/sys/diction.js'
import menu from '@/api/sys/menu.js'
import role from '@/api/sys/role.js'
import user from '@/api/sys/user.js'
import application from '@/api/sys/application.js'

export default {
  app,
  login,
  sys: {
    diction,
    menu,
    role,
    user,
    application
  }
}
