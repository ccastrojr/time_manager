import * as Yup from 'yup';

import Class from '../models/Class';
import Professor from '../models/Professor';
import AcademicSubjects from '../models/AcademicSubjects';
import Classroom from '../models/Classroom';

class ClassController {
  async store(req, res) {
    const schema = Yup.object().shape({
      professor_id: Yup.number()
        .required()
        .positive(),
      academic_subject_id: Yup.number()
        .required()
        .positive(),
      classroom_id: Yup.number()
        .required()
        .positive(),
      day_of_week: Yup.string().required(),
      hour_class_begin: Yup.string().required(),
      hour_class_end: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Fields validations fails.' });
    }

    const professorExists = await Professor.findByPk(req.body.professor_id);
    const academicSubjectExists = await AcademicSubjects.findByPk(
      req.body.academic_subject_id
    );
    const classroomExists = await Classroom.findByPk(req.body.classroom_id);

    if (!professorExists || !academicSubjectExists || !classroomExists) {
      return res.status(400).json({ error: 'Check the input data.' });
    }

    const classConflict = await Class.findOne({
      where: {
        day_of_week: req.body.day_of_week,
        hour_class_begin: req.body.hour_class_begin,
        classroom_id: req.body.classroom_id,
      },
    });

    // Será necessário fazer várias outras validações depois
    if (classConflict) {
      return res.status(400).json({
        error: 'This classroom is already be using in this day and hour.',
      });
    }

    const {
      day_of_week,
      hour_class_begin,
      hour_class_end,
    } = await Class.create(req.body);

    return res.status(200).json({
      message: 'Class successfully created',
      data: { day_of_week, hour_class_begin, hour_class_end },
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      professor_id: Yup.number().positive(),
      classroom_id: Yup.number().positive(),
      day_of_week: Yup.string(),
      hour_class_begin: Yup.string(),
      hour_class_end: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Fields validations fails.' });
    }

    const { id } = req.params;

    const classRequested = await Class.findByPk(id);

    const classConflict = await Class.findOne({
      where: {
        day_of_week: req.body.day_of_week,
        hour_class_begin: req.body.hour_class_begin,
        classroom_id: req.body.classroom_id,
      },
    });

    // Tal como no store, falta algumas validações.
    if (classConflict) {
      return res.status(400).json({
        error: 'This classroom is already be using in this day and hour.',
      });
    }

    await classRequested.update(req.body);

    const {
      day_of_week,
      hour_class_begin,
      hour_class_end,
      professor,
      academic_subject,
      classroom,
    } = await Class.findByPk(id, {
      include: [
        {
          model: Professor,
          as: 'professor',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: AcademicSubjects,
          as: 'academic_subject',
          attributes: ['id', 'name', 'workload'],
        },
        {
          model: Classroom,
          as: 'classroom',
          attributes: ['id', 'address', 'name'],
        },
      ],
    });

    return res.status(200).json({
      message: 'Class successfully updated.',
      data: {
        day_of_week,
        hour_class_begin,
        hour_class_end,
        professor,
        academic_subject,
        classroom,
      },
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const classTarget = await Class.findByPk(id);

    if (!classTarget) {
      return res.status(400).json({ error: 'There is no class with this id.' });
    }

    await classTarget.destroy({
      where: { id },
    });

    return res.status(200).json({ message: 'Class successfully deleted.' });
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    // Falta fazer um join em departamento
    const classes = await Class.findAll({
      attributes: ['id', 'day_of_week', 'hour_class_begin', 'hour_class_end'],
      order: [['day_of_week', 'DESC']],
      include: [
        {
          model: Professor,
          as: 'professor',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: AcademicSubjects,
          as: 'academic_subject',
          attributes: ['id', 'name', 'workload'],
        },
        {
          model: Classroom,
          as: 'classroom',
          attributes: ['id', 'address', 'name'],
        },
      ],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.status(200).json(classes);
  }
}

export default new ClassController();
