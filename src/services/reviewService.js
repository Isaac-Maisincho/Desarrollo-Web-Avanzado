const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { isValidObjectId } = require("mongoose");
const Review = require("../models/review");
const Specialty = require("../models/specialty");

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const UPDATABLE_FIELDS = ["rating", "comment"];

// Crear reseña validando User en PostgreSQL y Specialty en MongoDB
const createReviewService = async ({ userId, specialtyId, rating, comment }) => {
  // 1. Validar formato y existencia de la especialidad en MongoDB
  if (!isValidObjectId(specialtyId) || !(await Specialty.exists({ _id: specialtyId }))) {
    const error = new Error("La especialidad indicada no existe en MongoDB");
    error.status = 404;
    throw error;
  }

  // 2. Validar que el paciente exista en PostgreSQL
  const userExists = await prisma.user.findUnique({
    where: { id: Number(userId) },
  });
  if (!userExists) {
    const error = new Error("El paciente indicado no existe en PostgreSQL");
    error.status = 404;
    throw error;
  }

  // 3. Crear documento en MongoDB
  return Review.create({
    userId: Number(userId),
    specialtyId,
    rating,
    comment,
  });
};

// Listar reseñas (?specialtyId=...&rating=...) con populate de Specialty y cruce con User
const listReviewsService = async ({ specialtyId, rating }) => {
  const filter = {};
  if (specialtyId) filter.specialtyId = specialtyId;
  if (rating) filter.rating = Number(rating);

  const reviews = await Review.find(filter)
    .populate("specialtyId", "name code area durationMinutes")
    .sort({ createdAt: -1 })
    .lean();

  // Cruzar datos del paciente desde PostgreSQL en una sola consulta
  const userIds = [...new Set(reviews.map((r) => r.userId))];
  const users = await prisma.user.findMany({
    where: { id: { in: userIds } },
    select: { id: true, name: true, email: true },
  });
  const userMap = new Map(users.map((u) => [u.id, u]));

  return reviews.map((review) => ({
    ...review,
    patient: userMap.get(review.userId) || null,
  }));
};

// Buscar reseña por ID
const getReviewByIdService = async (id) => {
  return Review.findById(id).populate("specialtyId", "name code area durationMinutes");
};

// Actualizar reseña (solo el autor puede editarla)
const updateReviewService = async (id, userId, data = {}) => {
  const review = await Review.findById(id);
  if (!review) return null;

  if (review.userId !== Number(userId)) {
    const error = new Error("No tienes permiso para editar esta reseña");
    error.status = 403;
    throw error;
  }

  for (const field of UPDATABLE_FIELDS) {
    if (data[field] !== undefined) {
      review.set(field, data[field]);
    }
  }

  return review.save();
};

// Eliminar reseña (solo el autor puede eliminarla)
const deleteReviewService = async (id, userId) => {
  const review = await Review.findById(id);
  if (!review) return null;

  if (review.userId !== Number(userId)) {
    const error = new Error("No tienes permiso para eliminar esta reseña");
    error.status = 403;
    throw error;
  }

  await review.deleteOne();
  return review;
};

module.exports = {
  createReviewService,
  listReviewsService,
  getReviewByIdService,
  updateReviewService,
  deleteReviewService,
};