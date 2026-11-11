const express = require("express");
const router = express.Router();
const { createSpecialty,listSpecialties,getSpecialtyById, deleteSpecialty, updateSpecialty } = require("../controllers/specialtyController");

router.post("/", createSpecialty);
router.get("/", listSpecialties);
router.get("/:id", getSpecialtyById);
router.delete("/:id", deleteSpecialty);
router.put("/:id", updateSpecialty);

module.exports = router;