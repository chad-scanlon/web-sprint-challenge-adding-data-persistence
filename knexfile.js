module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/projects.db3",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations",
    },

    seed: {
      directory: "./seeds/01-projects.js",
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      },
    },
  },
};
