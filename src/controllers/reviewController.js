const {
  createReviewService,
  listReviewsService,
  getReviewByIdService,
  updateReviewService,
  deleteReviewService,
} = require("../services/reviewService");

const handleError = (res, error) => {
  if (error.status) {
    return res.status(error.status).json({ error: error.message });
  }
  if (error.name === "ValidationError") {
    const messages = Object.values(error.errors).map((e) => e.message);
    return res.status(400).json({ error: "Error de validación", details: messages });
  }
  if (error.name === "CastError") {
    return res.status(400).json({ error: "Formato de ID inválido" });
  }
  return res.status(500).json({ error: error.message || "Error interno del servidor" });
};

const createReview = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userId;
    const { specialtyId, rating, comment } = req.body;

    const newReview = await createReviewService({
      userId,
      specialtyId,
      rating,
      comment,
    });

    return res.status(201).json(newReview);
  } catch (error) {
    return handleError(res, error);
  }
};

const getReviews = async (req, res) => {
  try {
    const { specialtyId, rating } = req.query;
    const reviews = await listReviewsService({ specialtyId, rating });
    return res.status(200).json(reviews);
  } catch (error) {
    return handleError(res, error);
  }
};

const getReviewById = async (req, res) => {
  try {
    const review = await getReviewByIdService(req.params.id);
    if (!review) {
      return res.status(404).json({ error: "Reseña no encontrada" });
    }
    return res.status(200).json(review);
  } catch (error) {
    return handleError(res, error);
  }
};

const updateReview = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userId;
    const updated = await updateReviewService(req.params.id, userId, req.body);
    if (!updated) {
      return res.status(404).json({ error: "Reseña no encontrada" });
    }
    return res.status(200).json(updated);
  } catch (error) {
    return handleError(res, error);
  }
};

const deleteReview = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userId;
    const deleted = await deleteReviewService(req.params.id, userId);
    if (!deleted) {
      return res.status(404).json({ error: "Reseña no encontrada" });
    }
    return res.status(200).json({ message: "Reseña eliminada correctamente", deleted });
  } catch (error) {
    return handleError(res, error);
  }
};

module.exports = {
  createReview,
  getReviews,
  getReviewById,
  updateReview,
  deleteReview,
};