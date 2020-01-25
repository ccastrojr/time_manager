import * as Yup from 'yup';

import Classroom from '../models/Classroom';

class ClassroomController {
  async store(req, res) {
    const schema = Yup.object().shape({
      address: Yup.string().required(),
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Fields validation fails.' });
    }

    const classroomExists = await Classroom.findOne({
      where: { address: req.body.address, name: req.body.name },
    });

    if (classroomExists) {
      return res
        .status(400)
        .json({ error: 'This classroom is already registered.' });
    }

    const { id, address, name } = await Classroom.create(req.body);

    return res.status(200).json({
      message: 'Clasroom succesfully created',
      data: { id, address, name },
    });
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    const classroom = await Classroom.findAll({
      order: ['name'],
      attributes: ['id', 'address', 'name'],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.status(200).json({
      message: 'Search successfully finished.',
      data: classroom,
    });
  }
}

export default new ClassroomController();
