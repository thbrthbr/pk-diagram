const imageContext = require.context(
  '../Default',
  false,
  /\.(jpg|jpeg|png|webp)$/,
);
const categoryData = imageContext.keys().map(imageContext);

let db = [
  {
    name: 'Egg',
    nameKo: '알',
    code: '0000',
    type: [],
    url: '',
  },
  {
    name: 'Bulbasaur',
    nameKo: '이상해씨',
    code: '0001',
    type: ['grass', 'poison'],
    url: '',
  },
  {
    name: 'Ivysaur',
    nameKo: '이상해풀',
    code: '0002',
    type: ['grass', 'poison'],
    url: '',
  },
  {
    name: 'Venusaur',
    nameKo: '이상해꽃',
    code: '0003',
    type: ['grass', 'poison'],
    url: '',
  },
  {
    name: 'Venusaur-Mega',
    nameKo: '메가이상해꽃',
    code: '0003-m',
    type: ['grass', 'poison'],
    url: '',
  },
  {
    name: 'Charmander',
    nameKo: '파이리',
    code: '0004',
    type: ['fire'],
    url: '',
  },
  {
    name: 'Charmeleon',
    nameKo: '리자드',
    code: '0005',
    type: ['fire'],
    url: '',
  },
  {
    name: 'Charizard',
    nameKo: '리자몽',
    code: '0006',
    type: ['fire', 'flying'],
    url: '',
  },
  {
    name: 'Charizard-Mega-X',
    nameKo: '메가리자몽-X',
    code: '0006-m1',
    type: ['fire', 'dragon'],
    url: '',
  },
  {
    name: 'Charizard-Mega-Y',
    nameKo: '메가리자몽-Y',
    code: '0006-m2',
    type: ['fire', 'flying'],
    url: '',
  },
  {
    name: 'Squirtle',
    nameKo: '꼬부기',
    code: '0007',
    type: ['water'],
    url: '',
  },
  {
    name: 'Wartortle',
    nameKo: '어니부기',
    code: '0008',
    type: ['water'],
    url: '',
  },
  {
    name: 'Blastoise',
    nameKo: '거북왕',
    code: '0009',
    type: ['water'],
    url: '',
  },
  {
    name: 'Blastoise-Mega',
    nameKo: '메가거북왕',
    code: '0009-m',
    type: ['water'],
    url: '',
  },
];

for (let i = 0; i < db.length; i++) {
  db[i].url = categoryData[i];
}

// const PKDB = () => {
//   let db = [
//     {
//       name: 'Bulbasaur',
//       code: '0001',
//       type: ['grass', 'poison'],
//       pos: [0, 128],
//       url: 'https://archives.bulbagarden.net/media/upload/7/70/Menu_HOME_0001.png',
//     },
//     {
//       name: 'Ivysaur',
//       code: '0002',
//       type: ['grass', 'posion'],
//       pos: [0, 256],
//       url: 'https://archives.bulbagarden.net/media/upload/b/b7/Menu_HOME_0002.png',
//     },
//     {
//       name: 'Venusaur',
//       code: '0003',
//       type: ['grass', 'poison'],
//       pos: [0, 384],
//       url: 'https://archives.bulbagarden.net/media/upload/9/99/Menu_HOME_0003.png',
//     },
//     {
//       name: 'Venusaur-Mega',
//       code: '0003-m',
//       type: ['grass', 'posion'],
//       pos: [0, 512],
//       url: 'https://archives.bulbagarden.net/media/upload/0/0a/Menu_HOME_0003-Mega.png',
//     },
//     {
//       name: 'Charmander',
//       code: '0004',
//       type: ['fire'],
//       pos: [0, 640],
//       url: 'https://archives.bulbagarden.net/media/upload/9/9c/Menu_HOME_0004.png',
//     },
//   ];
//   // for(let i = 0; i < )
//   return db;
// };

export default db;
