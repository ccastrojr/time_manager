import Professor from '../models/Professor';

export default async (req, res, next) => {
  const professor = await Professor.findOne({
    where: { id: req.professorId, is_coordinator: true },
  });

  if (!professor) {
    return res.status(401).json({
      error: 'Professor must be the coordinator to access this route.',
    });
  }

  return next();
};
