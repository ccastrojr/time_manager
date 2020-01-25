import Sequelize, { Model } from 'sequelize';

class Classroom extends Model {
  static init(sequelize) {
    super.init(
      {
        address: Sequelize.STRING,
        name: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Classroom;
