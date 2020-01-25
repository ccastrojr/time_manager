import Sequelize, { Model } from 'sequelize';

class Class extends Model {
  static init(sequelize) {
    super.init(
      {
        day_of_week: Sequelize.STRING,
        hour_class_begin: Sequelize.TIME,
        hour_class_end: Sequelize.TIME,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Professor, {
      foreignKey: 'professor_id',
      as: 'professor',
    });

    this.belongsTo(models.AcademicSubjects, {
      foreignKey: 'academic_subject_id',
      as: 'academic_subject',
    });

    this.belongsTo(models.Classroom, {
      foreignKey: 'classroom_id',
      as: 'classroom',
    });
  }
}

export default Class;
