exports.seed = function (knex) {
  return knex("projects")
    .truncate()
    .then(function () {
      return knex("projects").insert([
        {
          project_name: "do a sprint",
          description: "go really fast",
          completed: "false",
        },
      ]);
    });
};
