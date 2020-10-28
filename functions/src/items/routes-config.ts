import { Application } from "express";
import {all, create, get, patch, remove} from "./controller";

export function routesConfig(app: Application) {

    // creates an 'item'
    app.post('/items',
        create
    );

    // get all items
    app.get('/items', [

        all
    ]);

    // get :id item
    app.get('/items/:id', [
        get
    ]);

    // updates :id item
    app.patch('/items', [
        patch
    ]);

    // deletes :id item
    app.delete('/itens/:id', [

        remove
    ]);
}
