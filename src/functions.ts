const bcrypt = require('bcryptjs');
const jwt =  require('jsonwebtoken');

const func = {};

func.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

func.matchPassword = async (password, savedPassword) => {
  try {
    return await bcrypt.compare(password, savedPassword);
  } catch (e) {
    console.log(e)
  }
};

func.getToken = async (data) => {
    return await jwt.sign(data, 'estoessecreto', { expiresIn: '48h' });
  };

func.verifyToken = async (req, res, next) => {

  const bearerHeader = req.headers['authorization'];

  if(typeof bearerHeader !== 'undefined') {

    const bearer = bearerHeader.split(' ');

    const bearerToken = bearer[1];

    jwt.verify(bearerToken, 'estoessecreto', (err, authData) => {
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