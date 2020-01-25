import Sequelize, { Model } from 'sequelize';

class AcademicSubjects extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        workload: Sequelize.INTEGER,
        semester: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Department, {
      foreignKey: 'department_id',
      as: 'department',
    });
  }
}

export default AcademicSubjects;
