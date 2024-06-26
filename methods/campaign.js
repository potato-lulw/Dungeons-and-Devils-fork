import fs from "fs";
import path from 'path';

const filePath = "./methods/";

async function writeJSON(campaign, file){
    await fs.promises.writeFile(path.join(filePath, file), JSON.stringify(user, null, 2, 'utf8'));
}


async function createCampaign(uid, campaignData){
    const user = JSON.parse(await fs.promises.readFile(path.join(filePath,`${uid}.json`), 'utf8'));
    if((user.created_campaign).length < 2){
        cid = ((user.created_campaign).length) + 1
        campaignData["cid"] = cid
        try{
            await writeJSON(campaignData, `${uid}_${cid}.json`);
            console.log(`New Campaign created by user : ${uid}`);
        } catch (e){
            console.error("Error writing JSON : ",error);
        }
    }
}