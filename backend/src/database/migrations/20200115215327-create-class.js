module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('class', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },

      professor_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'professors',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },

      academic_subject_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'academic_subjects',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },

      classroom_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'classrooms',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },

      day_of_week: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      hour_class_begin: {
        type: Sequelize.TIME,
        allowNull: false,
      },

      hour_class_end: {
        type: Sequelize.TIME,
        allowNull: false,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('class');
  },
};
