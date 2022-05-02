
const jwt = require('jsonwebtoken')

const db = require('./db')


database = {


    1000: { acno: 1000, uname: "Aleena", password: 1000, balance: 750, transaction: [] },
    1001: { acno: 1001, uname: "Mariya", password: 1001, balance: 1500, transaction: [] },
    1002: { acno: 1002, uname: "Augustine", password: 1002, balance: 50000, transaction: [] }

}

const register = (uname, acno, password) => {


    db.User.findOne({acno}).then(user=>{

        if (acno in database) {
            return {
                statusCode: 401,
                status: false,
                message: 'Account already existing'
    
            }
        }
        else{
            const newUser=newUser({
                    acno,
                    uname,
                    password,
                    balance:0,
                    transaction:[]
            })

            newUser.save()

            return {
                statusCode: 200,
                status: true,
                message: 'Successfully Registered'
        }}

    })


    // if (acno in database) {
    //     return {
    //         statusCode: 401,
    //         status: false,
    //         message: 'Account already existing'

    //     }
    // }
    // else {
    //     database[acno] = {
    //         acno,
    //         uname,
    //         password,
    //         balance: 0,
    //         transaction: []
    //     }
    //     console.log(database);
    //     return {
    //         statusCode: 200,
    //         status: true,
    //         message: 'Successfully Registered'

    //     }
    // }
}

// resolving login API

const login = (acno, pswd) => {

    if (acno in database) {

        if (pswd == database[acno]["password"]) {
            currentUser = database[acno]["uname"]
            currentAcno = acno
            // login succesfull

            const token=jwt.sign({

                currentAcno : acno

            },'supersecret12345678')

            return {
                statusCode: 200,
                status: true,
                message: 'Login Succesfull',
                token:token,
                currentUser,
                currentAcno
            }
        }
        else {

            return {
                statusCode: 422,
                status: false,
                message: 'Invalid password'

            }
        }

    }
    else {
        return {
            statusCode: 422,
            status: false,
            message: 'Invalid User'

        }
    }

}

// resolving deposit API

const deposit = (acno, pswd, amt) => {
    var amount = parseInt(amt);

    if (acno in database) {
        if (pswd == database[acno]["password"]) {
            database[acno]["balance"] += amount;

            database[acno]["transaction"].push({
                type: "CREDIT",
                amount: amount
            })

            return {
                statusCode: 200,
                status: true,
                message: 'balance is ' + database[acno]["balance"]
            }
        }
        else {
            return {
                statusCode: 422,
                status: false,
                message: 'Invalid password'

            }
        }
    }
    else {
        return {
            statusCode: 422,
            status: false,
            message: "Wrong Accont Number"
        }
    }

}

// resolve withdraw API

const withdraw = (req,acno, pswd, amt) => {
    var amount = parseInt(amt);

    if (acno in database) {
        if (pswd == database[acno]["password"]) {
            if(req.currentAcno!=acno){
                return{
                    statusCode: 422,
                    status: false,
                    message: " operation denied"
                }
            }
            if (database[acno]["balance"] > amount) {
                database[acno]["balance"] -= amount;
                database[acno]["transaction"].push({
                    type: "DEBIT",
                    amount: amount

                })

                return {
                    statusCode: 200,
                    status: true,
                    message: 'balance is ' + database[acno]["balance"]
                }
            }


            else {

                return {
                    statusCode: 422,
                    status: false,
                    message: "Insuffient balance"
                }

            }
        }
        else {
            return {
                statusCode: 422,
                status: false,
                message: "Wrong Password"
            }
        }
    }
    else {
        return {
            statusCode: 422,
            status: false,
            message: "Wrong Accont Number"
        }
    }

}

//transaction

const transaction = (acno)=>{

    if(acno in database){
        return{
            statusCode: 200,
            status: true,
            transaction:database[acno].transaction
        }
    }
    else{
        return{
            statusCode: 422,
            status: false,
            message:"User doesnot exit"
        }
    }

  }

// export module

module.exports = {
    register,
    login,
    deposit,
    withdraw,
    transaction
}

