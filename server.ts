import Fastify from 'fastify'

const app = Fastify({ logger: true })

app.get("/", async(request, reply)=>{
return reply.send("Api is running")
})

app.listen({ port: 3000 })
