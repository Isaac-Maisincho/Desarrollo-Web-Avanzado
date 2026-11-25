const Specialty = require("../models/specialty");
const UPDATABLE_FIELDS = [
  "name",
  "code",
  "description",
  "durationMinutes",
  "area",
  "contactEmail",
  "internalNotes",
];

const createSpecialtyService = async (data)=>{
    return await Specialty.create(data);
};

const listSpecialtiesService = async ({q,area})=>{
    const filter = {};
    if(q) filter.name = {$regex: q, $options: "i"};
    if(area) filter.area = area;
    return await Specialty.find(filter);
}

const SpecialtyIdService = async (id)=>{
    return await Specialty.findById(id);
}

const deleteSpecialtyService = async (id)=>{
    return await Specialty.findByIdAndDelete(id);
}

const updateSpecialtyService = async (id,data={})=>{
    const specialty = await Specialty.findById(id);
    if(!specialty)
        return null;
        for(const field of UPDATABLE_FIELDS){
            if(data[field] !== undefined) specialty.set(field,data[field]);
        }
        return specialty.save();
};

const deleteByAreaService = async (area)=>{
    return Specialty.deleteMany({area});
}

module.exports = {
    createSpecialtyService,
    listSpecialtiesService,
    SpecialtyIdService,
    deleteSpecialtyService,
    updateSpecialtyService,
    deleteByAreaService,
};