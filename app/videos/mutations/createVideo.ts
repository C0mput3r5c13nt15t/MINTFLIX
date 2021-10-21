import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateVideo = z.object({
  name: z.string(),
  description: z.string(),
  text: z.string(),
  title: z.string(),
  projectId: z.number(),
})

export default resolver.pipe(resolver.zod(CreateVideo), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const video = await db.video.create({ data: input })

  return video
})
