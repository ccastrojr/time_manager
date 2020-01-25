import Sequelize from 'sequelize';

import Department from '../app/models/Department';
import Professor from '../app/models/Professor';
import Classroom from '../app/models/Classroom';
import AcademicSubjects from '../app/models/AcademicSubjects';

import databaseConfig from '../config/database';

const models = [Department, Professor, Classroom, AcademicSubjects];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
