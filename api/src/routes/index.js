const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios').default;
const { Character, Occupation, character_occupation } = require('../db');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async()=>{
    const apiUrl = await axios.get('https://breakingbadapi.com/api/characters');
    const apiInfo = await apiUrl.data.map(e =>{
        return{
            name: e.name,
            image: e.img,
            nickname: e.nickname,
            status: e.status,
            id: e.char_id,
            occupation: e.occupation.map(e => e),
            birthday: e.birthday,
            appearance: e.appearance.map(e => e)
        };
    });
    return apiInfo;
};

const getDbInfo = async()=>{
    return await Character.findAll({ //Aca dice que no lo encuentra !!
        include:{
            model: Occupation,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })
}

const getAllCharacters = async()=>{
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const allInfo = apiInfo.concat(dbInfo);
    return allInfo;
}

router.get('/characters', async (req, res)=>{
    const name = req.query.name
    let charactersTotal = await getAllCharacters();
    if(name){
        let characterName = await charactersTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
        characterName.length ?
        res.status(200).send(characterName) :
        res.status(404).send('No se encontro el personaje');
    }else{
        res.status(200).send(charactersTotal)
    }
})

router.get('/characters/:id', async(req, res) => {
    const {id} = req.params;
    const {data} = await axios.get(`https://breakingbadapi.com/api/characters/${id}`)
    if(id) {
        try {
        if(id.length > 10) {
            const idDb = await Character.findOne({
                where: {
                    id: id
                },
                include: [{
                    model: Occupation,
                    through: character_occupation
                }]
            })
            console.log(idDb)
            const all = idDb.dataValues
            return res.status(200).send(all) 
        }
        for(var i = 0; i < data.length; i++) {
            const info = {
            id: data[i].char_id,
            name: data[i].name,
            image: data[i].img,
            nickName: data[i].nickname,
            status: data[i].status,
            occupation: data[i].occupation,
            birthday: data[i].birthday
        }
        console.log(info);
        return res.status(200).send(info)
        }
        } catch (err) {
            console.log(err)
        }
        
    } else {
        res.status(404).send("No hay personaje")
    }
    
})

router.get('/occupations', async (req, res)=>{
    const occupationsApi = await axios.get('https://breakingbadapi.com/api/characters')
    const occupations = occupationsApi.data.map(e => e.occupation)
    const occEach = occupations.flat()
    //console.log(occEach)
    occEach.forEach(e => {
        Occupation.findOrCreate({
            where: { name: e }
        })
    })
    const allOccupations = await Occupation.findAll();
    res.send(allOccupations);
})

router.post('/character', async (req, res)=>{
    let{
        name,
        nickname,
        birthday,
        image,
        status,
        createdInDb,
        occupation
    } = req.body
    console.log("Holu")

    let characterCreated = await Character.create({
        name,
        nickname,
        birthday,
        image,
        status,
        createdInDb
    })

    let occupationDb = await Occupation.findAll({
        where: {name : occupation}
    })
    characterCreated.addOccupation(occupationDb)
    res.send('Personaje creado con exito!')
})

module.exports = router;
