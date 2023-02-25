const Client = require('../models/Clients');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const colors = require('colors');

/* colors.setTheme({
    new_request:'magenta',
    success_request:'rainbow',
    failed_request:'red',
    step_done:'blue'
}); */


module.exports = {

    registerClient: async (req, res) => {


        console.log("API request : POST register Client".new_request);

        try {

            const {
                client_name,
                client_email,
                client_password,
                client_password_confirm,

            } = req.body;

            const client_permission = req.body.client_permission || 1

            if (!client_name || !client_email || !client_password || !client_password_confirm) {
                throw new Error('all fields required');
            };

            console.log("all fields are good".step_done);

            if (client_password !== client_password_confirm) {
                throw new Error('client passowrds not match');
            };

            console.log("passwords match".step_done);

            const hash = await bcrypt.hash(client_password, 5);

            console.log("password hashed".step_done);

            const client = new Client({
                client_name: client_name,
                client_email: client_email,
                client_password: hash,
                client_permission: client_permission
            });



            await client.save();

            console.log("client successfully register".success_request);

            return res.status(200).json({
                success: true,
                message: "client registered successfully",
                client
            })


        } catch (error) {

            console.log("error in register request".failed_request);
            return res.status(500).json({
                message: "error in register request",
                error: error.message
            });
        }
    },
    loginClient: async (req, res) => {

        try {


            // get values from request body
            const {
                client_email,
                client_password
            } = req.body;

            // values from request body validation
            if (!client_email || !client_password) {
                throw new Error('all fields are required');
            }

            // try to find client in DB with client_email
            const client = await Client.findOne({ client_email });

            // in case no exist client
            if (!client) {
                throw new Error('client not exists');
            }

            // true or false
            const is_match = await bcrypt.compare(client_password, client.client_password);


            // check if password correct
            if (!is_match) {
                throw new Error('bad credentials');
            }

            let { client_name } = client;

            let payload = {
                client_name,
                client_email
            }

            const token = await jwt.sign(payload, process.env.JWT_SECRET, {expiresIn : '24h'})

            res.cookie("token", token);



            return res.status(201).json({
                success: true,
                message: "client login seccessfully",
                client
            });


        } catch (error) {
            return res.status(401).json({
                message: "error in login client request",
                error: error.message
            })
        }

    },
    logoutClient: async (req, res) => {

        try {




        }
        catch (error) {
            return res.status(500).json({
                message: "error in logout request",
                error: error.message
            })
        }
    },
    authToken: (req,res)=>{

        try {

            const token = req.cookies.token;

            if(!token) {
                throw new Error('no token provided');
            }

            const decode = jwt.verify(token, process.env.JWT_SECRET);

            return res.status(201).json({
                success:true,
                message:"user authorized",
                user_name:decode.user_name,
                user_email:decode.user_email
            })


        } catch (error) {
            return res.status(401).json({
                message:"unauthorized",
                error:error.message
            })
        }
    }
}