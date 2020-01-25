module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'gerenciador_horarios',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
