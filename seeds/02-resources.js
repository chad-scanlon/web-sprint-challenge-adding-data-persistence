exports.seed = function (knex) {
  return knex("resources")
    .truncate()
    .then(function () {
      return knex("resources").insert([
        { resource_name: "laptop", resource_description: "little computer" },
      ]);
    });
};
