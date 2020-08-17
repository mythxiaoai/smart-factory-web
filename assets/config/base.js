

const BASEURL ={
    dev:"http://yapi.demo.qunar.com/mock/85361/api",
    build:"http://yapi.demo.qunar.com/mock/85361/api"
}
export default BASEURL[process.env.NUXT_ENV_MODE];