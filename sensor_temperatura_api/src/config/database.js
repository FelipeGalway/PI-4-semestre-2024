const { Sequelize } = require("sequelize");
const environment = require("./environment");

const sequelize = new Sequelize(
	environment.DB_NAME,
	environment.DB_USER,
	environment.DB_PASSWORD,
	{
		host: environment.DB_HOST,
		port: environment.DB_PORT,
		dialect: "postgres",
		logging: false, // Set to console.log to see the raw SQL queries
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000,
		},
		timezone: "-03:00", // Define o fuso horário para -03:00
		dialectOptions: {
			useUTC: false,
			dateStrings: true,
			typeCast: true,
		},
		// Configurações adicionais do Sequelize
		define: {
			timestamps: false, // Desativa timestamps automáticos
			underscored: true, // Use snake_case em vez de camelCase para nomes de colunas
		},
	}
);

// Teste a conexão
sequelize
	.authenticate()
	.then(() => {
		console.log("Conexão com o banco de dados estabelecida com sucesso.");
	})
	.catch((err) => {
		console.error("Não foi possível conectar ao banco de dados:", err);
	});

module.exports = sequelize;
