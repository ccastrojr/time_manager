import * as Yup from 'yup';

import AcademicSubjects from '../models/AcademicSubjects';
import Department from '../models/Department';
import Professor from '../models/Professor';

class AcademicSubjectsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      workload: Yup.number()
        .required()
        .positive(),
      semester: Yup.number()
        .required()
        .max(8)
        .positive(),
      department_id: Yup.number()
        .required()
        .positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Fields validation fails.' });
    }

    // Validando se a matéria já está cadastrada no banco
    const academicSubjectsExists = await AcademicSubjects.findOne({
      where: { name: req.body.name },
    });

    if (academicSubjectsExists) {
      return res
        .status(400)
        .json({ error: 'This academic subject is already registered.' });
    }

    // Validando se o departamento com esse id existe
    const departmentExists = await Department.findByPk(req.body.department_id);

    if (departmentExists) {
      // Gravando dados no banco após a validação
      if (req.body.workload > 90) {
        return res.status(401).json({
          error:
            'You cannot register an academic subject with a workload higher than 90h.',
        });
      }

      const { name, workload, semester } = await AcademicSubjects.create(
        req.body
      );

      return res.status(200).json({
        message: 'Academic Subject successfully created.',
        data: { name, workload, semester },
      });
    }

    return res
      .status(400)
      .json({ error: 'There is no department with this id.' });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      workload: Yup.number().positive(),
      semester: Yup.number().positive(),
      department_id: Yup.number()
        .positive()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Fields validation fails.' });
    }

    const departmentExists = await Department.findByPk(req.body.department_id);

    if (!departmentExists) {
      return res
        .status(400)
        .json({ error: 'There is no department with this id.' });
    }

    const { id } = req.params;
    const academicSubject = await AcademicSubjects.findByPk(id);

    if (academicSubject) {
      const academicSubjectExists = await AcademicSubjects.findOne({
        where: { name: req.body.name },
      });

      if (!academicSubjectExists) {
        await academicSubject.update(req.body);

        const {
          name,
          workload,
          semester,
          department,
        } = await AcademicSubjects.findByPk(id, {
          include: [
            {
              model: Department,
              as: 'department',
              attributes: ['id', 'name', 'abbreviation'],
            },
          ],
        });

        return res.status(200).json({
          message: 'Academic Subject successfully updated',
          data: { name, workload, semester, department },
        });
      }

      return res.status(400).json({
        error: 'An academic subject is already registered with this name.',
      });
    }

    return res
      .status(400)
      .json({ error: 'There is no academic subject with this id' });
  }

  async delete(req, res) {
    const { id } = req.params;

    const academicSubjectTarget = await AcademicSubjects.findByPk(id);

    if (!academicSubjectTarget) {
      return res
        .status(400)
        .json({ error: 'Not exists a academic subject with this id.' });
    }

    await academicSubjectTarget.destroy({
      where: { id },
    });

    return res
      .status(200)
      .json({ message: 'Academic Subject successfully deleted' });
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    const professorLogged = await Professor.findByPk(req.professorId);

    const academicSubjects = await AcademicSubjects.findAll({
      where: { department_id: professorLogged.department_id },
      order: ['semester'],
      attributes: ['name', 'workload', 'semester'],
      include: [
        {
          model: Department,
          as: 'department',
          attributes: ['id', 'name', 'abbreviation'],
        },
      ],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.status(200).json({ academicSubjects });
  }
}

export default new AcademicSubjectsController();
