import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Professor extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        registration: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        is_coordinator: Sequelize.BOOLEAN,
        availability: Sequelize.JSON,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async professor => {
      if (professor.password) {
        professor.password_hash = await bcrypt.hash(professor.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Department, {
      foreignKey: 'department_id',
      as: 'department',
    });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default Professor;
