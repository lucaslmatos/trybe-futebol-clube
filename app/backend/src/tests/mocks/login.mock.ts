const validBody = {
  "email": "admin@admin.com",
  "password": "secret_admin"
};


const validBodyResp = {
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkhhZ2FyIn0sImlhdCI6MTY4OTE5MDI2NX0.sW2n4M1PB-rd5KpKM97XqOP9D73uBHD_4LgywCvI3zA"
};

const validLoginResp = {
  responseMessage:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkhhZ2FyIn0sImlhdCI6MTY4OTE5MDI2NX0.sW2n4M1PB-rd5KpKM97XqOP9D73uBHD_4LgywCvI3zA",
  statusCode: 200,
};
const findOne:any = {
  id:1,
  userName: 'Hagar',
  vocation: 'Guerreiro',
  level:10,
  password: '$2a$10$P6mkXXZhrTmW4tn2U2zREeDAYLtgebZFs4Pq.pjYtKBEy1DOyRfz.',
};

export default {
  validBody,
  validBodyResp,
  validLoginResp,
  findOne,
};