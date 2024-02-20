"use server";
import * as dynamoose from "dynamoose";
import {AnyItem} from "dynamoose/dist/Item";
import XXH from "xxhashjs";
import {createHash} from "crypto";

const User = dynamoose.model<{id: string, email: string, phone: string, code: string} & AnyItem>("Emp-User", new dynamoose.Schema({
    id: {
        type: String,
        hashKey: true,
    },
    email: String,
    phone: String,
    code: String,
}));

export type ItemType = {id: string, name: string, owner: string, public: boolean};

const Item = dynamoose.model<ItemType & AnyItem>("Emp-Item", new dynamoose.Schema({
    id: {
        type: String,
        hashKey: true,
    },
    owner: {
        type: String,
        index: {
            project: true,

        },
    },
    name: String,
    public: Boolean,
}));

export async function registerUser(email: string, password: string) {
    console.log(email);
    console.log(password);

    const id = XXH.h64(email, 0xABCD).toString(16);
    const hash = createHash('sha256').update(password + "#" + id).digest('base64');

    console.log(id, hash);

    await User.create({
        id,
        email,
        password: hash,
    });
}

export async function loginUser(email: string, password: string): Promise<string> {
    console.log(email);
    console.log(password);

    const id = XXH.h64(email, 0xABCD).toString(16);
    const hash = createHash('sha256').update(password + "#" + id).digest('base64');

    console.log(id, hash);

    const user = await User.query("id").eq(id).exec();

    if (user.length < 1) {
        console.log("No user!");
        return "-1";
    }

    if (user[0].password !== hash) {
        console.log("Wrong password!");
        return "-2";
    }

    return XXH.h64(id, 0xDCBA).toString(16);
}

export async function initiateUserAuthentication(email?: string, phone?: string): Promise<string | null> {
    if (!email && !phone) {
        return null;
    }

    const x = (email || phone)!;
    const id = XXH.h64(x, 0xABCD).toString(16);
    const code = Math.floor(100000 + Math.random() * 900000);
    console.log(code);
    const hash = XXH.h64(String(code), 0xABCD).toString(16);

    const user = await User.query("id").eq(id).exec();

    if (user.length === 0) {
        await User.create({
            id,
            email: email || "",
            phone: phone || "",
            code: hash,
        });
        return id;
    }

    user[0].code = hash;
    user[0].email = email || "";
    user[0].phone = phone || "";

    await User.update(user[0]);

    return id;
}

export async function verifyUser(id: string, code: string): Promise<string | null> {
    const user = await User.query("id").eq(id).exec();

    if (user.length === 0) {
        return null;
    }

    if (XXH.h64(String(code), 0xABCD).toString(16) !== user[0].code) {
        return null;
    }

    return XXH.h64(String(id), 0xABCD).toString(16);
}

export async function getItems(userId: string): Promise<ItemType[]> {
    return (await Item.query("owner").eq(userId).exec()).toJSON() as ItemType[];
}

export async function createItem(name: string, uid: string): Promise<string> {
    const id = crypto.randomUUID();

    await Item.create({
        id,
        owner: uid,
        name,
        public: false,
    });

    return id;
}
