exports.up = function (knex, Promise) {
  return knex.schema
    .createTable("projects", (tbl) => {
      tbl.increments();
      tbl.string("project_name").unique().notNullable();
      tbl.string("project_description");
      tbl.boolean("completed").notNullable();
    })
    .createTable("resources", (tbl) => {
      tbl.increments();
      tbl.string("resource_name").notNullable();
      tbl.string("resource_description");
      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("tasks", (tbl) => {
      tbl.increments();
      tbl.string("task_description").notNullable();
      tbl.string("task_notes");
      tbl.boolean("completed").notNullable();
      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("resources")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function (knex, Promise) {
  return knex.schema
    .dropTableIfExists("tasks")
    .dropTableIfExists("resources")
    .dropTableIfExists("projects");
};
