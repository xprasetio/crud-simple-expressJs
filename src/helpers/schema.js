const z = require("zod");

const postSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(3),
  published: z.boolean(),
});

module.exports = { postSchema };
