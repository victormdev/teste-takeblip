const express = require('express');
const api = require("./api");
const server = express();
const app = express();
server.use(express.json());

server.get("/", async (req, res) => {

    try{
        let count = 0
        let response = []
        const { data } = await api.get("/repos?per_page=100&type=owner");

        for (let i = 0; i < data.length; i++) {

            if (data[i].language == 'C#') {

                if (count < 5) {

                    response[count + 1] = {
                        linguagem: data[i].language,
                        tituloCard: data[i].name,
                        subTituloCard: data[i].description,
                        imagemCard: data[i].owner.avatar_url,
                        created_at: data[i].created_at               
                    }
                    
                    count++
                }
            }
        }

        response = Object.assign({}, response);


        if (response) {
            return res.status(200).send(response)
        } 

    } catch (error){
        res.send({ error: error.message });
    }
})

server.listen(3001);