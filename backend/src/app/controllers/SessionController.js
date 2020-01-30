import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import Professor from '../models/Professor';
import Department from '../models/Department';

import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      registration: Yup.string().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json('Field validations fails');
    }

    const { registration, password } = req.body;

    const professor = await Professor.findOne({
      where: { registration },
      include: [
        {
          model: Department,
          as: 'department',
          attributes: ['id', 'name', 'abbreviation'],
        },
      ],
    });

    if (!professor) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!(await professor.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name, is_coordinator, department, email } = professor;

    return res.json({
      professor: {
        id,
        name,
        email,
        registration,
        is_coordinator,
        department,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
