const jwt = require("jsonwebtoken");

const SECRET = "JWT_PSD"

const generate_token = (user) => {
    const token = jwt.sign({  
        user_id: user 
    },
    SECRET, {
        expiresIn: "5h"
    });
    return token;
}
const vaild_token = (token) => {
    try {
        const value = token.split("Bearer ");

        const decoded = jwt.verify(value[1],SECRET);
        return decoded;
    } catch (error) {
        console.error(error);
        return null;
    }
}

/**
 * Primary key remapping
 * Using put, delete routes requires objects to have a "id" prop
 * however in our database models we do not have a "id" prop rather a "user_id" or "quote_id"
 * currently json-server does not have a way to define custom primary keys, this makes it hard to test 
 * delete/put/patch operation without the use of a "id" prop
 * 
 * This is a work around that runs on delete/put/patch methods by 
 * translating the provide "user_id" or "quote_id" to the given index so the operation can be made 
 * Also routes for /login and /register. 
 * 
 * @see https://www.npmjs.com/package/jsonwebtoken
 * @see https://www.npmjs.com/package/lodash-id
 * @see https://github.com/typicode/json-server/blob/1759c986b57302be89742375525d238b3af66039/src/server/router/plural.js#L307
 * @see https://expressjs.com/en/guide/using-middleware.html#using-middleware
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses
 * @param req {import("express").Request}
 * @param res {import("express").Response}
 */
module.exports = (req,res,next) => {
    const url = new URL(req.url,"http://localhost:3000");
    const db = req.app.db;
    // override the default primary key with a new primary key
    const override_pk = (pk = "id") => {
        db._.id = pk;
    }
    switch (req.method) {
        case "DELETE": {
        
            if(url.pathname === "/quotes") {
                override_pk("quote_id");
              
                const remove = url.searchParams.get("quote_id");
                if(!remove || !req.headers?.authorization) return res.sendStatus(400);

                const user = vaild_token(req.headers.authorization);
                 
                if(!user) return res.sendStatus(401);
          
                const data = db.get("quotes").removeById(Number(remove)).value();

                // check that the quote is owned by the user
                if(data.user_id !== user.user_id) return res.sendStatus(401);

                override_pk();
                if(!data) return res.sendStatus(404);

                res.locals.data = {};
                db.write();

                return res.sendStatus(204);
            } 

            // pass
            next();
            break;
        }
        case "PUT": {

            if(url.pathname === "/user") {
                override_pk("user_id");

                const user_id = url.searchParams.get("user_id");
                // check for authorization header
                if(!user_id || !req.headers?.authorization) return res.sendStatus(400);

                const user = vaild_token(req.headers.authorization);
                 
                if(!user || (user.user_id !== Number(user_id))) return res.sendStatus(401);

                const og = db.get("user").getById(user_id).value();
                if(!og) {
                    override_pk();
                    return res.sendStatus(404);
                }

                const { zip, phone, first_name, last_name, email } = req.body;

                const update = {
                    user_email: email,
                    user_zip_code: zip,
                    user_phone_number: phone,
                    user_first_name: first_name,
                    user_last_name: last_name
                }
                const data = db.get("user").updateById(Number(user_id), update).value();

                override_pk();
                if(!data) return res.sendStatus(404);

                db.write();
                return res.jsonp(data);
            }

            next();
            break;
        }
        case "POST": {
            switch(url.pathname) {
                case "/login": {
                    const data = db.get("user").values();

                    if(!(req.body?.email && req.body?.password)) return res.sendStatus(400);
                    // just going to find the email
                    const user = data.find(user => user.user_email === req.body.email).value();
    
                    if(!user) return res.sendStatus(401);

                    const token = generate_token(user.user_id);
    
                    return res.jsonp({
                        access_token: token,
                        profile: user
                    });
                }
                case "/register": {
                    const {email,first_name,last_name,zip_code,phone_number,password} = req.body;
                    if(!(email && first_name && last_name && zip_code && phone_number && password)) return res.sendStatus(400);

                    const profile = {
                        user_id: Number((Math.random() * 100000000000).toFixed(0)),
                        user_email: email,
                        user_first_name: first_name,
                        user_last_name: last_name,
                        user_zip_code: zip_code,
                        user_phone_number: phone_number
                    }
                
                    override_pk("user_id");
                    try {
                        const data = db.get("user").insert(profile).value();
                        res.locals.data = data;
                    } catch (error) {
                        console.error(error);
                        override_pk();
                        return res.sendStatus(409);
                    }
                    
                    db.write();

                    override_pk();

                    const token = generate_token(profile.user_id);

                    res.status(201).jsonp({
                        access_token: token,
                        profile
                    });
                }
                case "/quote": {
                    const {user_comments,quote_material,quote_price,quote_measurement,material_name} = req.body;

                    if(!("user_comments" in req.body && "quote_material" in req.body  && "quote_price" in req.body  && "quote_measurement" in req.body ) || !req.headers?.authorization) return res.sendStatus(400);

                    const user = vaild_token(req.headers.authorization);
                 
                    if(!user) return res.sendStatus(401);

                    const quote = {
                        user_comments,
                        quote_material,
                        quote_price,
                        quote_measurement,
                        material_name,
                        user_id: user.user_id, // i guess that this would come from the JWT
                        quote_id: Number((Math.random() * 100000000000).toFixed(0))
                    }

                    override_pk("quote_id");
                    try {
                        const data = db.get("quotes").insert(quote).value();
                        res.locals.data = data;
                    } catch (error) {
                        console.error(error);
                        override_pk();
                        return res.sendStatus(409);
                    }
                   
                    override_pk();
                    db.write();
                  
                    return res.status(201).jsonp({});
                }
                default:
                    next();
                    break;
            }
            break;
        }
        case "PATCH": {
            if(url.pathname === "/quotes") {
                const quote_id = url.searchParams.get("quote_id");
                // check for authorization header
                if(!quote_id || !req.headers?.authorization) return res.sendStatus(400);

                override_pk("quote_id");
                const og = db.get("quotes").getById(quote_id).value();
                if(!og) {
                    override_pk();
                    return res.sendStatus(404);
                }

                const { user_comments, quote_price, quote_material } = req.body;


                const update = {
                    user_comments,
                    quote_material,
                    quote_price,
                }

                const data = db.get("quotes").updateById(og.quote_id, update).value();
                override_pk();
                if(!data) return res.sendStatus(500);

                db.write();
                return res.jsonp(data);
            }
            // pass
            next();
            break;
        }
        case "GET" :{
            if(url.pathname === "/quotes") {
                const user_id = url.searchParams.get("user_id");
                if(user_id) return next();

                const quote_id = url.searchParams.get("quote_id");

                // check for authorization header
                if(!quote_id || !req.headers?.authorization) return res.sendStatus(400);

                // check JWT
                override_pk("quote_id");
                const data = db.get("quotes").getById(Number(quote_id)).value();

                if(!data) {
                    override_pk();
                    return res.sendStatus(404);
                }
                override_pk();
                return res.jsonp(data);
    

            } 
            //pass
            next();
            break;
        }
        default:
            next();
            break;
    }
}