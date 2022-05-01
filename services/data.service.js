database = {

    1000: { acno: 1000, uname: "Aleena", password: 1000, balance: 750, transaction: [] },
    1001: { acno: 1001, uname: "Mariya", password: 1001, balance: 1500, transaction: [] },
    1002: { acno: 1002, uname: "Augustine", password: 1002, balance: 50000, transaction: [] }

}

const register = (uname, acno, password) => {


    if (acno in database) {
        return {
            statusCode: 401,
            status: false,
            message: 'Account already existing'

        }
    }
    else {
        database[acno] = {
            acno,
            uname,
            password,
            balance: 0,
            transaction: []
        }
        console.log(database);
        return {
            statusCode: 200,
            status: true,
            message: 'Successfully Registered'

        }
    }
}

// resolving login API

const login = (acno, pswd) => {

    if (acno in database) {

        if (pswd == database[acno]["password"]) {
            currentUser = database[acno]["uname"]
            return {
                statusCode: 200,
                status: true,
                message: 'Login Succesfull'

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

const withdraw = (acno, pswd, amt) => {
    var amount = parseInt(amt);

    if (acno in database) {
        if (pswd == database[acno]["password"]) {
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

// export module

module.exports = {
    register,
    login,
    deposit,
    withdraw
}

