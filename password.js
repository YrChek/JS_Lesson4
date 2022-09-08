function getPasswordChecker(password) {
    return (values) => password === values
  };
    
  const pass = getPasswordChecker(32);
  
  console.log(pass(32))
  console.log(pass(30))
  console.log(pass(18))
