import * as Yup from 'yup';

import Department from '../models/Department';

class DepartmentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      abbreviation: Yup.string()
        .required()
        .min(3),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Fields validation fails.' });
    }

    const departmentExists = await Department.findOne({
      where: { abbreviation: req.body.abbreviation },
    });

    if (departmentExists) {
      return res.status(400).json({
        error: 'A department with this abbreviation was already created.',
      });
    }

    const { id, name, abbreviation } = await Department.create(req.body);

    return res.status(200).json({
      message: 'Department successfully created.',
      dataRes: { id, name, abbreviation },
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      abbreviation: Yup.string().min(3),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Fields validation fails' });
    }

    const department = await Department.findByPk(req.params.id);

    if (req.body.abbreviation !== department.abbreviation) {
      const departmentWithAbbreviationExists = await Department.findOne({
        where: { abbreviation: req.body.abbreviation },
      });

      if (departmentWithAbbreviationExists) {
        return res.status(400).json({
          error: 'A department with this abbreviation was already in use.',
        });
      }
    }

    await department.update(req.body);

    const { id, name, abbreviation } = await Department.findByPk(req.params.id);

    return res.status(200).json({
      message: 'Department successfully updated.',
      dataRes: { id, name, abbreviation },
    });
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    const departments = await Department.findAll({
      order: ['name'],
      attributes: ['id', 'name', 'abbreviation'],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.status(200).json({ departments });
  }
}

export default new DepartmentController();
