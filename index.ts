import express, { Express, Request, Response } from 'express';
import { randomUUID } from 'crypto'
import { ColorPalette, ColorRequest } from './types/types';

const app: Express = express();

app.use(express.static('./public'));
app.use(express.urlencoded());

const colors: ColorPalette[] = [];

app.get('/', (req, res) => {
  res.sendFile('./public/index.html')
})

app.get('/getAll', (req, res) => {
  res.json(colors);
})

app.post('/register', (req: Request, res: Response) => {
  const { title, color1, color2, color3, color4 }: ColorRequest = req.body;
  const values = [color1, color2, color3, color4]
  const map: Map<string, number> = new Map();

  values.forEach(value => {
    if (map.has(value)) {
      const ref = map.get(value)
      ref && map.set(value, ref + 1)
    } else {
      map.set(value, 1);
    }
  });

  let repeated = false;
  map.forEach(value => {
    if (value > 1) repeated = true;
  })
  if (repeated) {
    res.send('Some colors are repeated, please give a different colors').redirect('/error')
  } else {
    colors.push({
      id: randomUUID(),
      title: title,
      color1,
      color2,
      color3,
      color4,
    });
    res.redirect('/')
  }
})

app.get('/error', (req, res) => {
  res.redirect('/error')
})

app.listen(3000, () => {
  console.log('server started');
})