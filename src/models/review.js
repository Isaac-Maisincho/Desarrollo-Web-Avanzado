const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      required: [true, "El userId del paciente (PostgreSQL) es obligatorio"],
    },
    specialtyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Specialty",
      required: [true, "El specialtyId de la especialidad es obligatorio"],
    },
    rating: {
      type: Number,
      required: [true, "La calificación es obligatoria"],
      min: [1, "La calificación mínima es 1"],
      max: [5, "La calificación máxima es 5"],
    },
    comment: {
      type: String,
      required: [true, "El comentario es obligatorio"],
      trim: true,
      minlength: [5, "El comentario debe tener al menos 5 caracteres"],
      maxlength: [500, "El comentario no puede superar los 500 caracteres"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", reviewSchema);