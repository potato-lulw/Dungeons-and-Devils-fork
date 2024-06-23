import bcrypt from "bcrypt";
import fs from "fs";
import path from 'path';

const filePath = "./methods/";
const saltRounds = 10;

async function writeJSON(user, file){
    await fs.promises.writeFile(path.join(filePath, file), JSON.stringify(user, null, 2, 'utf8'));
}

async function login(uname, pass){
    try {
        const users = JSON.parse(await fs.promises.readFile(path.join(filePath,'users.json'), 'utf8'));
        const userIndex = users.findIndex(user => user.uname === uname);

        if(userIndex !== -1){
            const isMatched = await bcrypt.compare(pass, users[userIndex].pass);
            if (isMatched) {
                //users[userIndex].ip = clientIp;
                //await writeJSON(users)
                return { msg: 'success' };
            } else {
                return { msg: 'fail' };
            }
        } else {
            const hash = await bcrypt.hash(pass, saltRounds);
            const index = users.length;
            const newUser = {"uid": index+1, "uname": uname, "pass": hash};
            users.push(newUser);

            await writeJSON(users, 'users.json');
            console.log("User Registered Successfully");

            const newUserData = {"uname": uname, 
                                 "total_chars":0,
                                 "max_chars":4,
                                 "characters":{},
                                 "created_campaign":{},
                                 "joined_capaign":[]
                                }
            
            await writeJSON(newUserData, `${index+1}.json`);
            console.log("New User JSON created successfully");

            return { msg: "success" };
        }
    } catch (err) {
        console.error('Error reading or parsing the file:', err);
    }
}

export {login};