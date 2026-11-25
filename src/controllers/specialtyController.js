const {createSpecialtyService} = require("../services/specialtyService");
const {listSpecialtiesService} = require("../services/specialtyService");
const {SpecialtyIdService} = require("../services/specialtyService");
const {deleteSpecialtyService} = require("../services/specialtyService"); 
const {updateSpecialtyService} = require("../services/specialtyService");  
const {deleteByAreaService} = require("../services/specialtyService");

const handlerError = (res,error)=>{
    if(error.name === "ValidationError"){
        const errors = Object.values(error.errors)
        .map((err) => err.message);
        return res.status(400).json({ error: "Datos invalidos",errors
      });
    }
    if(error.name === "CastError"){
        return res.status(400).json
        ({error: `Valor invalido para ${error.path}:${error.value}`});
    }
    return res.status(500).json({error:"Error interno servidor"});
};

const createSpecialty = async (req,res)=>{
    try{
        const specialty = await createSpecialtyService(req.body);
        res.status(201).json(specialty)
    }catch(error){
        handlerError(res,error);
    }
};

const listSpecialties = async (req,res)=>{
    try{
        const specialties = await listSpecialtiesService(req.query);
        res.json(specialties)
    }catch(error){
        handlerError(res,error);
    }
};

const getSpecialtyById = async (req,res)=>{
    try{
        const specialty = await SpecialtyIdService(req.params.id);
        if(!specialty){
            return res.status(404).json({error:"Specialty no encontrada"});
        }
        res.json(specialty.toJSON({virtual:true}));
    }catch(error){
        handlerError(res,error);
    }
};

const deleteSpecialty = async (req,res)=>{
    try{
        const specialty = await deleteSpecialtyService(req.params.id);
        if(!specialty){
            return res.status(404).json({error:"Specialty no encontrada"});
        }
        res.json({message:"Specialty eliminada correctamente"});
    }catch(error){
        handlerError(res,error);
    }
};

const updateSpecialty = async (req,res)=>{
    try{
        const specialty = await updateSpecialtyService(req.params.id,req.body);
        if(!specialty){
            return res.status(404).json({error:"Specialty no encontrada"});
        }
        res.json(specialty.toJSON({virtual:true}));
    }catch(error){
        handlerError(res,error);
    }
};

const deleteByArea = async (req,res)=>{
    try{
        const result = await deleteByAreaService(req.params.area);
        res.json({message:`Se eliminaron ${result.deletedCount} specialties del area ${req.params.area}`});
    }catch(error){
        handlerError(res,error);
    }
}
module.exports = {
    createSpecialty,
    listSpecialties,
    getSpecialtyById,
    deleteSpecialty,
    updateSpecialty,
    deleteByArea,
};
