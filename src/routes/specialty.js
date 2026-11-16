const express = require("express");
const router = express.Router();
const { 
    createSpecialty,
    listSpecialties,
    getSpecialtyById, 
    deleteSpecialty, 
    updateSpecialty, 
    deleteByArea 
} = require("../controllers/specialtyController");

router.post("/", createSpecialty);
router.get("/", listSpecialties);
router.get("/:id", getSpecialtyById);
router.delete("/:id", deleteSpecialty);
router.patch("/:id", updateSpecialty);
router.delete("/area/:area", deleteByArea);

module.exports = router;