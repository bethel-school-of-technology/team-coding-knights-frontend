/**
 * Primary key remapping
 * Using put, delete routes requires objects to have a "id" prop
 * however in our database models do not have a "id" prop rather a "user_id" or "quote_id"
 * currently json-server does not have a way to define custom primary keys, this makes it hard to test 
 * delete/put/patch operation without the use of a "id" prop
 * 
 * This is a work around that runs on delete/put/patch methods by 
 * translating the provide "user_id" or "quote_id" to the given index so the operation can be made 
 * @param req {import("express").Request}
 * @param res {import("express").Response}
 */
module.exports = (req,res,next) => {
    const url = new URL(req.url,"http://localhost:3000");
    const db = req.app.db;
    switch (req.method) {
        case "DELETE": {
            // @see https://github.com/typicode/json-server/blob/1759c986b57302be89742375525d238b3af66039/src/server/router/plural.js#L307
            
            if(url.pathname === "/quotes") {
                db._.id = "quote_id"
              
                const remove = url.searchParams.get("quote_id");
                if(!remove) return res.sendStatus(500);
          
                const data = db.get("quotes").removeById(Number(remove)).value();

                db._.id = "id";
                if(!data) {
                    return res.sendStatus(404);
                }

                res.locals.data = {};
                db.write();
                return res.sendStatus(204);
            } else{
                next();
            }
            break;
        }
        case "PUT": {

            if(url.pathname === "/user") {
                db._.id = "user_id";

                const user_id = url.searchParams.get("user_id");
                if(!user_id) return res.sendStatus(500);

                const og = db.get("user").getById(user_id).value();
                if(!og) {
                    db._.id = "id";
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

                db._.id = "id";
                if(!data) return res.sendStatus(404);

                db.write();
                return res.jsonp(data);
            }

            next();
            break;
        }
        case "POST": {

            if(url.pathname === "/login") {
                const data = db.get("user").values();

                if(!(req.body?.email && req.body?.password)) return res.sendStatus(400);

                const user = data.find(user=> user.user_email === req.body.email);

                if(!user) return res.sendStatus(401);

                return res.jsonp({
                    access_token: `THIS_IS_A_JWT_TOKEN`,
                    profile: user
                });
            } else if(url.pathname === "/register") {
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

                db.get("user").insert(profile);

                db.write();
                res.status(201).jsonp({
                    access_token: `THIS_IS_A_JWT_TOKEN`,
                    profile
                });
            } else {
                next();
            }
            break;
        }
        default:
            next();
            break;
    }
}