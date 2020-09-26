const bcrypt = require('bcryptjs');
const jwt =  require('jsonwebtoken');

const func: any = {};

/**
* FUNCIONES DE PASSWORD
*/

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

/**
* GENERAR TOKENS
*/
func.getToken = async (data:object) => {
  return await jwt.sign(data, "estoessecreto", { expiresIn: '48h' });
};

func.getTokenAdmin = async (data:object) => {
  return await jwt.sign(data, "tokenParaElAdmiiin", { expiresIn: '48h' });
};

func.getTokenEmpresa = async (data:object) => {
  return await jwt.sign(data, "tokenParaLasEmpresaaas", { expiresIn: '48h' });
};

/**
 * VERIFICAR TOKENS
*/

func.verifyToken = async (req:any, res:any, next:any) => {
  
  const bearerHeader = req.headers['authorization'];
  
  if(typeof bearerHeader !== 'undefined') {
    
    const bearer = bearerHeader.split(' ');
    
    const bearerToken = bearer[1];
    
    jwt.verify(bearerToken, "estoessecreto", (err:any, authData:any) => {
      if(err) {
        res.json({message: "error token"});
      } else {
        req.data = authData
        next();
      }
    });
  } else {
    res.json({message: "undefined"});
  }
}

func.verifyTokenAdmin = async (req:any, res:any, next:any) => {
  
  const bearerHeader = req.headers['authorization'];
  
  if(typeof bearerHeader !== 'undefined') {
    
    const bearer = bearerHeader.split(' ');
    
    const bearerToken = bearer[1];
    
    jwt.verify(bearerToken, "tokenParaElAdmiiin", (err:any, authData:any) => {
      if(err) {
        res.json({message: "error token admin"});
      } else {
        req.data = authData
        next();
      }
    });
  } else {
    res.json({message: "undefined"});
  }
}

func.verifyTokenEmpresa = async (req:any, res:any, next:any) => {
  
  const bearerHeader = req.headers['authorization'];
  
  if(typeof bearerHeader !== 'undefined') {
    
    const bearer = bearerHeader.split(' ');
    
    const bearerToken = bearer[1];
    
    jwt.verify(bearerToken, "tokenParaLasEmpresaaas", (err:any, authData:any) => {
      if(err) {
        res.json({message: "error token empresas"});
      } else {
        req.data = authData
        next();
      }
    });
  } else {
    res.json({message: "undefined"});
  } 
}

func.verifyCodigo = async (req:any, res:any, next:any) => {
  
  const codigo = req.headers['verificacion'];
  
  if(typeof codigo !== 'undefined'){
    if(codigo != "%Pidespeed2020$PidespeedSecurityCode%") {
      res.json({message: "error"});
    } else {
      next();
    }
  } else {
    res.json({message: "undefined"});
  } 
}

export default func;