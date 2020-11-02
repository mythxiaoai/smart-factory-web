import app from '@/api/app.js'
import login from '@/api/login.js'
import diction from '@/api/sys/diction.js'
import menu from '@/api/sys/menu.js'

export default {
  app,
  login,
  sys: {
    diction,
    menu
  }
}
