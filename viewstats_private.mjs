import express from "express";
const app = express();
import crypto from "crypto"
app.listen(3482, () => console.log("http://localhost:3482"));
let n = {
    production: !1,
    apiBaseUrl: "https://api.viewstats.com",
    apiStagingUrl: "https://staging-api.viewstats.com",
    bearer: "whhAmDTCauq1oMAx7GQiZd4rrtlA7q3DPuHi6obNvjIyOELD24EGtEq4coHWYa2l",
    iv: "WzcwLCAyNiwgMTE4LCA0LCA3LCAxMjQsIDg0LCAzMiwgMSwgNzAsIDQwLCAzMCwgNDQsIDcxLCA4NiwgOTJd",
    decryptKey: "Wzg3LCAxMDEsIDEwOCwgMTA4LCAzMiwgMTAwLCAxMTEsIDExMCwgMTAxLCAzMywgMzIsIDEwNCwgOTcsIDk5LCAxMDcsIDEwMSwgMTE0LCAxMTUsIDY0LCAxMTgsIDEwNSwgMTAxLCAxMTksIDExNSwgMTE2LCA5NywgMTE2LCAxMTUsIDQ2LCA5OSwgMTExLCAxMDld"
}
var decryptMessageWebsite = async encryptedMessage => JSON.parse(new TextDecoder("utf-8").decode(await crypto.subtle.decrypt({ name: "AES-GCM", iv: new Uint8Array(JSON.parse(atob(n.iv))) }, await crypto.subtle.importKey("raw", new Uint8Array(JSON.parse(atob(n.decryptKey))), { name: "AES-GCM" }, !1, ["decrypt"]), new Uint8Array(await encryptedMessage.arrayBuffer()))));

var decryptMessage = async encryptedMessage => JSON.parse(new TextDecoder("utf-8").decode(await crypto.subtle.decrypt({ name: "AES-GCM", iv: new Uint8Array(JSON.parse(atob("WzEzLCAtMTIsIDEyMiwgLTUwLCA1NywgLTQsIDE0LCAzMSwgLTY0LCAtNzYsIDIyLCAtNTMsIC0zOSwgMTA0LCA1NSwgMjJd"))) }, await crypto.subtle.importKey("raw", new Uint8Array(JSON.parse(atob("Wy0xMTEsIDgxLCA0NywgMTI3LCA2MSwgOTQsIC0xMTIsIC0xMjQsIC01MCwgLTM3LCAtOTUsIDczLCAtMTA1LCAxMDksIC0xMTIsIDc1LCAtMTgsIC00NywgMTIwLCAtMzIsIDE1LCAxMDgsIC0yNCwgLTY2LCAtODIsIDcwLCAzNCwgLTE1LCA5MCwgMTE5LCAtNjEsIDExXQ=="))), { name: "AES-GCM" }, !1, ["decrypt"]), new Uint8Array(await encryptedMessage.arrayBuffer()))));

async function getResponse(url) {
    try {
        var response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer KtkbKnNasqtwjAqz42J3P7EKsuoGQR4382ar6AB2Yuj4XdWUzw7Jzr9XQP6xRE4p"
            }
        }).then(response => response.blob());
        return url.includes("https://api.viewstats.com") == true ? await decryptMessage(response) : await decryptMessageWebsite(response) 
    } catch (error) {
        return console.error("Network Error:", error), null;
    }
}


app.get("/raw", async(req, res) => {
    if (!req.query.url) return res.send("Insert parameter");
    const formatUrl = decodeURIComponent(req.query.url)
    if (formatUrl.includes("https://api.viewstats.com") == false && formatUrl.includes("https://www.viewstats.com") == false) return res.send("Insert true URL");
    return res.send({
        data: await getResponse(formatUrl)
    })
})