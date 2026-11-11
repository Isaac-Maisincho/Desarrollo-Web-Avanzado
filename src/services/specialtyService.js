const Specialty = require("../models/specialty");

const createSpecialtyService = async (data)=>{
    return await Specialty.create(data);
};

const listSpecialtiesService = async ()=>{
    return await Specialty.find();
}

const SpecialtyIdService = async (id)=>{
    return await Specialty.findById(id);
}

const deleteSpecialtyService = async (id)=>{
    return await Specialty.findByIdAndDelete(id);
}

const updateSpecialtyService = async (id,data)=>{
    return await Specialty.findByIdAndUpdate(id,data,{new:true,runValidators:true});
}

module.exports = {
    createSpecialtyService,
    listSpecialtiesService,
    SpecialtyIdService,
    deleteSpecialtyService,
    updateSpecialtyService,
};