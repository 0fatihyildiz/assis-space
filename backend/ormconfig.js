module.exports = {
  seeds: ['src/seeds/**/*{.ts,.js}'],
  factories: ['src/factories/**/*{.ts,.js}'],
  type: 'better-sqlite3',
  database: '.db/app.db',
  entities: ['src/**/*.entity{.ts,.js}'],
};
