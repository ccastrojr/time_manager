import * as Yup from 'yup';

// import validate from './AvailabilityValidationController';

import Professor from '../models/Professor';
import Department from '../models/Department';

class ProfessorController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      registration: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
      department_id: Yup.number()
        .required()
        .positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Fields validations fails.' });
    }

    const professorExists = await Professor.findOne({
      where: {
        registration: req.body.registration,
      },
    });

    // Verificando se o professor com aquela matricula ja existe
    if (!professorExists) {
      const departmentExists = await Department.findByPk(
        req.body.department_id
      );

      // Verificando se aquele departamento existe
      if (departmentExists) {
        const {
          id,
          name,
          registration,
          email,
          availability,
          is_coordinator,
        } = await Professor.create(req.body);

        return res.status(200).json({
          message: 'Professor succesfully created',
          dataRes: {
            id,
            name,
            registration,
            email,
            availability,
            is_coordinator,
          },
        });
      }

      return res
        .status(400)
        .json({ error: 'There is no department with this id.' });
    }

    return res
      .status(400)
      .json({ error: 'This professor is already registred.' });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      registration: Yup.string(),
      // availability: Yup.string(),
      currentPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('currentPassword', (currentPassword, field) =>
          currentPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Fields validation error.' });
    }

    const { registration, currentPassword } = req.body;

    const professor = await Professor.findByPk(req.professorId);

    if (currentPassword && !(await professor.checkPassword(currentPassword))) {
      return res.status(401).json({ unauthorized: 'Password does not match.' });
    }

    // req.body.availability = validate(req.body.availability);

    await professor.update(req.body);

    const {
      id,
      name,
      email,
      // availability,
      department,
    } = await Professor.findByPk(req.professorId, {
      include: [
        {
          model: Department,
          as: 'department',
          attributes: ['id', 'name', 'abbreviation'],
        },
      ],
    });

    return res.status(200).json({
      message: 'Professor succesfully updated.',
      dataRes: { id, registration, name, email, department },
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const professorTarget = await Professor.findByPk(id);

    if (!professorTarget) {
      return res
        .status(400)
        .json({ error: 'Not exists a professor with this id.' });
    }

    if (professorTarget.is_coordinator) {
      return res
        .status(401)
        .json({ error: 'You can not delete the coordinator.' });
    }

    await Professor.destroy({
      where: { id },
    });

    return res.status(200).json({
      message: 'Professor succesfully deleted.',
    });
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    const professorLogged = await Professor.findByPk(req.professorId);

    const professors = await Professor.findAll({
      where: { department_id: professorLogged.department_id },
      order: ['name'],
      attributes: ['name', 'email', 'availability'],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.status(200).json({ professors });
  }
}

export default new ProfessorController();
