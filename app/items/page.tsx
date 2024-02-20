"use client";

import {useEffect, useState} from "react";
import {createItem, getItems, ItemType} from "@/app/auth/actions";
import {useRouter} from "next/navigation";
import {QrCodeIcon, Cog6ToothIcon, TrashIcon} from "@heroicons/react/24/outline";

export default function Items() {
    const router = useRouter();

    const [items, setItems] = useState<ItemType[]>([]);
    const [name, setName] = useState("");

    useEffect(() => {
        if (!localStorage.uid || !localStorage.session) {
            router.push("/");
            return;
        }

        getItems(localStorage.uid!).then(x => {
            setItems(x);
        });
    }, []);

    const addItem = async () => {
        setName("");
        setItems([{id: "pending", name, owner: localStorage.uid!, public: false}, ...items]);
        const id = await createItem(name, localStorage.uid!);
        setItems([{id, name, owner: localStorage.uid!, public: false}, ...items]);
    }

    return <>
        <style jsx global>{`
          :root {
            background-color: white !important;
          }
        `}</style>

        <nav className="py-2.5 bg-[#eb6864] flex justify-center mb-6">
            <div className="flex justify-between max-w-4xl w-full">
                <p className="font-dm font-semibold text-white text-lg">TagIt</p>
                <p className="font-dm font-semibold text-white text-lg">Sign out</p>
            </div>
        </nav>

        <div className="max-w-4xl mx-auto">
            <p className="font-dm font-semibold mb-2">Add an item</p>
            <div className="flex mb-6">
                <input value={name} onChange={e => setName(e.target.value)} type="text" className="flex-1 w-full p-2 ring-[#eb6864] focus:ring-[#c85855] ring-2 rounded-l-md shadow-sm focus:outline-none" placeholder="Item name"/>
                <button disabled={name.length < 2} onClick={addItem} className="py-2 px-5 text-lg font-semibold text-white font-dm bg-[#eb6864] hover:bg-[#c85855] rounded-r-md ring-2 ring-[#eb6864]">Add</button>
            </div>

            {items.map(item => <div key={item.id} className="flex shadow-md">
                <button className="bg-[#eb6864] hover:bg-[#c85855] rounded-l-md p-3"><QrCodeIcon className="w-6 h-6 text-white"/></button>
{/*
                <button className="bg-[#aaa] p-3"><Cog6ToothIcon className="w-6 h-6 text-white"/></button>
*/}
                <div className="flex-1 flex pl-3 items-center py-3">
                    {item.name}
                </div>
                <button className="bg-[#eb6864] hover:bg-[#c85855] rounded-r-md p-3"><TrashIcon className="w-6 h-6 text-white"/></button>
            </div>)}
        </div>
    </>
}
