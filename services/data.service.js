database={

    1000:{acno:1000,uname:"Aleena",password:1000,balance:750,transaction:[]},
    1001:{acno:1001,uname:"Mariya",password:1001,balance:1500,transaction:[]},
    1002:{acno:1002,uname:"Augustine",password:1002,balance:50000,transaction:[]}

}

const register = (uname, acno, password)=> {

   
    if (acno in database) {
      return false //already a user
    }
    else {
      database[acno] = {
        acno,
        uname,
        password,
        balance: 0,
        transaction:[]
      }
      console.log(database);
      return true
    }
  }

// export module

module.exports={
    register
}
