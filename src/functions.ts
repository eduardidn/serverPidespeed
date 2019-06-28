const bcrypt = require('bcryptjs');
const jwt =  require('jsonwebtoken');

const func: any = {};

func.encryptPassword = async (password:string) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

func.matchPassword = async (password:string, savedPassword:string) => {
  try {
    return await bcrypt.compare(password, savedPassword);
  } catch (e) {
    console.log(e)
  }
};

func.getToken = async (data:object) => {
    return await jwt.sign(data, 'estoessecreto', { expiresIn: '48h' });
  };

func.verifyToken = async (req:any, res:any, next:any) => {

  const bearerHeader = req.headers['authorization'];

  if(typeof bearerHeader !== 'undefined') {

    const bearer = bearerHeader.split(' ');

    const bearerToken = bearer[1];

    jwt.verify(bearerToken, 'estoessecreto', (err:any, authData:any) => {
      if(err) {
        res.json({message: "error"});
      } else {
        req.data = authData
        next();
      }
    });
  } else {
    res.json({message: "undefined"});
  }

}

export default func;