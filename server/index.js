const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();

const rpio = require('rpio');
const fs = require('fs');

router.get('/', (ctx, next) => {
  ctx.body = 'hello world';
});

router.get('/temperature', (ctx, next) => {
  const temp = fs.readFileSync('/sys/class/thermal/thermal_zone0/temp', 'utf8');
  ctx.body = temp;
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3010);
