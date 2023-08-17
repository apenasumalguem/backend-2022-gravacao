const {object, string, date} = require("yup");

class Projetos {
    async store(req, res, next) {
        let projetoSchema = object({
            pro_titulo: string().required("Entre com o nome do projeto"),
            pro_inicio: date().required("Entre com a data"),
        })

        try {
            await projetoSchema.validate(req.body);
        } catch (error) {
            return res.status(400).json({error: error.message}).end()
        }

        req.body = {...req.body, created_at: new Date(), updated_at: ""}
        next()
    }

    async update(req, res, next) {
        req.body = {...req.body, updated_at: new Date()}
        next()
    }
}

module.exports = new Projetos();