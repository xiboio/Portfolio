// Content checked against public GitHub repositories. No client work or results are claimed.
export const profile = {
  name: 'Murilo Freitas', email: 'murilodaniel02@gmail.com',
  github: 'https://github.com/xiboio',
  linkedin: 'https://www.linkedin.com/in/murilo-freitas-ba961a295/',
};
// Keep stable category keys for filtering. Add a demo URL only when deployed.
export const projects = [
  { id: '01', category: 'web', visual: 'web', title: 'Car Detail',
    tags: ['React', 'JavaScript', 'Express', 'MySQL'],
    source: 'https://github.com/xiboio/car_detail', backend: 'https://github.com/xiboio/backend_car_detail', demo: '',
    en: { description: 'A car detailing service application, with a React interface and a separate Express/MySQL backend.', details: 'The frontend includes routes for creating and finding service records. The backend implements record creation and lookup by vehicle license plate, using parameterized SQL queries.', status: 'Source available' },
    pt: { description: 'Uma aplicação para atendimentos de estética automotiva, com interface em React e backend separado em Express/MySQL.', details: 'O frontend inclui rotas para criar e buscar atendimentos. O backend implementa o cadastro e a consulta por placa do veículo com consultas SQL parametrizadas.', status: 'Código disponível' },
  },
  { id: '02', category: 'other', visual: 'desktop', title: 'Electronic Voting Machine',
    tags: ['C#', 'SQL'], source: 'https://github.com/xiboio/Eletronic_voting_machine', backend: '', demo: '',
    en: { title: 'Electronic Voting Machine', description: 'An electronic voting machine project written in C#, with an accompanying SQL file.', details: 'The public repository contains the C# application under the urna directory and an SQL file. This is a programming project, with no claim of use in real elections.', status: 'Source available' },
    pt: { title: 'Urna eletrônica', description: 'Um projeto de urna eletrônica escrito em C#, acompanhado de um arquivo SQL.', details: 'O repositório público contém a aplicação C# na pasta urna e um arquivo SQL. É um projeto de programação, sem alegação de uso em eleições reais.', status: 'Código disponível' },
  },
];
