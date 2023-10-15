import { Request, Response } from 'express';
import Encuesta from '../models/encuesta'; //import Encuesta from '../models/encuesta';

//SE OBTIENEN TODAS LAS ENCUESTAS
export const getEncuestas = async (req: Request, res: Response) => {
    const listEncuestas = await Encuesta.findAll()

    res.json(listEncuestas)
}

//SE OBTIENE SOLO UNA ENCUESTA POR SU ID
export const getEncuesta = async (req: Request, res: Response) => {
    const { id } = req.params;
    const encuesta = await Encuesta.findByPk(id);

    if (encuesta) {
        res.json(encuesta)
    } else {
        res.status(404).json({
            msg: `No existe una Encuesta con el id ${id}`
        })
    }
}

//SE ELIMINA UNA ENCUESTA CON ID ESPECIFICO
export const deleteEncuesta = async (req: Request, res: Response) => {
    const { id } = req.params;
    const encuesta = await Encuesta.findByPk(id);

    if (!encuesta) {
        res.status(404).json({
            msg: `No existe un Encuesta con el id ${id}`
        })
    } else {
        await encuesta.destroy();
        res.json({
            msg: 'El Encuesta fue eliminado con exito!'
        })
    }

}

//AGREGACION DE UN Encuesta (SE INDICA CON UN MSJ QUE SE AGREGO)
export const postEncuesta = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        await Encuesta.create(body);

        res.json({
            msg: `El Encuesta fue agregado con exito!`
        })
    } catch (error) {
        console.log(error);
        res.json({
            msg: `Upps ocurrio un error, comuniquese con soporte`
        })
    }
}

//SE ACTUALIZA UNA ENCUESTA CON ID ESPECIFICA
export const updateEncuesta = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    try {

        const encuesta = await Encuesta.findByPk(id);

    if(encuesta) {
        await encuesta.update(body);
        res.json({
            msg: 'La encuesta fue actualizada con exito'
        })

    } else {
        res.status(404).json({
            msg: `No existe una encuesta con el id ${id}`
        })
    }
        
    } catch (error) {
        console.log(error);
        res.json({
            msg: `Upps ocurrio un error, comuniquese con soporte`
        })
    }

    
}