'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Создание таблицы users
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      gender: {
        type: Sequelize.ENUM('male', 'female'),
        allowNull: false,
      },
      hasProblems: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }
    });

    // Заполнение таблицы users случайными данными
    const users = [];
    const randomGender = () => (Math.random() > 0.5 ? 'male' : 'female');

    for (let i = 0; i < 1000000; i++) {
      users.push({
        firstName: `Имя${i}`,
        lastName: `Фамилия${i}`,
        age: Math.floor(Math.random() * 100),
        gender: randomGender(),
        hasProblems: Math.random() > 0.5
      });
    }

    await queryInterface.bulkInsert('users', users, {});
  },

  down: async (queryInterface) => {
    // Удаление таблицы users
    await queryInterface.dropTable('users');
  }
};