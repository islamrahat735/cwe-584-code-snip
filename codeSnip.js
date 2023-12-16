const process = require('process'); 

// secret info of ppl that would normally be hidden in a secure file
const secretData = {
    rahat: 'illegal material',
    khaled: 'confidential, enjoy ;)',
    redwan: 'call me sheikh mujeeb'
}

// keeps control of which users have access to which persons data
const accessControl = {
    // user doesnt have access to khaleds data
    2071: ['rahat', 'redwan']
}


function getSecretDataForPerson() {
    const person = process.argv[2];
    const user = process.getuid();
    bucket = {};
    try{
        if(accessControl[user]){
            // gets data and stores it in bucket before checking access permissions
            if (secretData[person]){
                bucket.info = secretData[person];
            }

            // throws error if user didn't have access to persons data
            if (!accessControl[user].includes(person)){
                console.log('user is trying to access information he doesnt have access to')
                throw new Error(`user with uid ${user} doesn't have access to ${person}`);
            }
        }
    } finally {
        // CWE-584
        return bucket;

        //an extension to the program could be to read data from and file and then close it
        // in the finally loop to show it has a purpose
    }

    //return bucket -> if the return statement was here,
    //                  The error would be thrown before data is returned
}

function main() {
    try{
        console.log(getSecretDataForPerson());
    } catch (err) {
        console.log(err)
    }
}

main();

