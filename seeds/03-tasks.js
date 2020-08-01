exports.seed = function (knex) {
  return knex("tasks")
    .truncate()
    .then(function () {
      return knex("tasks").insert([
        {
          task_description: "type it out",
          task_notes: "these are the notes for this task",
          completed: "false",
        },
      ]);
    });
};
