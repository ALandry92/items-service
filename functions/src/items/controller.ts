import { Request, Response } from 'express';

import * as admin from "firebase-admin";

const db = admin.firestore();

//Name collection based on what object is
const  itemsCollection = 'items';

export async function create(req: Request, res: Response) {

    try {
        const item = {
            name: req.body.document,
            field2: req.body.field2,
            field3: req.body.field3,
            field4: req.body.field4
        }

        const newDoc = await db.collection(itemsCollection).doc(name).set(item);
        return res.status(201).send(`created new item: ${ newDoc }`);
    } catch (err) {
        res.status(400).send(`This is not a valid item ${err}`);
        return handleError(res, err)
    }

}

export async function all(req: Request, res: Response) {

    try {
        const productQuerySnapshot = await db.collection(itemsCollection).get();
        const items: any[] = [];
        productQuerySnapshot.forEach(
            (doc)=>{
               items.push({
                   id: doc.id,
                   data: doc.data()
               })
        }
        )
        return res.status(200).send({ items })
    } catch (err) {
        res.status(500).send(err);
        return handleError(res, err)
    }
}

export async function get(req: Request, res: Response) {
    const id = req.params.id;

    db.collection('products').doc(id).get()
        .then(i =>{
            if(!i.exists) throw new Error('product does not exist')
            console.log('value of p.data()', i.data());
            res.status(200).json({id: i.id, data: i.data()})

        }).catch(e => res.status(500).send(e))
}

export async function patch(req: Request, res: Response) {
    try {
        console.log('request body =', req.body)
        const { id } = req.body.name;
        if (!id ) {
            return res.status(400).send({ message: 'Missing fields id' })
        }

        const product = await db.collection(itemsCollection).doc(req.body.id).set(req.body,{merge:true})
            .then(() =>{
                res.json({id: res})
            }).catch((e)=> res.status(500).send(e))

        return res.status(204).send({product})
    } catch (err) {
        return handleError(res, err)
    }
}

export async function remove() {

}

function handleError(res: Response, err: any) {
    return res.status(500).send({ message: `${err.code} - ${err.message}` });
}
