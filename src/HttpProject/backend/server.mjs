import fs from 'node:fs/promises';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 4000;

// __dirname은 현재 파일의 디렉토리 경로를 나타냅니다.
const __dirname = path.resolve();

// "images" 폴더를 정적 파일로 제공
app.use(express.static(path.join(__dirname, 'src', 'HttpProject', 'backend', 'images')));
app.use(cors());
app.use(bodyParser.json());

// CORS 설정
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/places', async (req, res) => {
  try {
    const fileContent = await fs.readFile(path.join(__dirname, 'src', 'HttpProject', 'backend', 'data', 'places.json'), 'utf8');
    const placesData = JSON.parse(fileContent);
    res.status(200).json({ places: placesData });
  } catch (err) {
    console.error('Error reading places.json:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/user-places', async (req, res) => {
  try {
    const fileContent = await fs.readFile(path.join(__dirname, 'src', 'HttpProject', 'backend', 'data', 'user-places.json'), 'utf8');
    const places = JSON.parse(fileContent);
    res.status(200).json({ places });
  } catch (err) {
    console.error('Error reading user-places.json:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.put('/user-places', async (req, res) => {
  const places = req.body.places;
  try {
    await fs.writeFile(path.join(__dirname, 'src', 'HttpProject', 'backend', 'data', 'user-places.json'), JSON.stringify(places));
    res.status(200).json({ message: 'User places updated!' });
  } catch (err) {
    console.error('Error writing to user-places.json:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// 404 처리
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  res.status(404).json({ message: '404 - Not Found' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
