import express, { Request, Response } from 'express'
import 'dotenv/config'

const app = express()
const port = process.env.PORT || 8000

app.get('/', (req: Request, res: Response) => {
  res.json({ greeting: 'Hello world!' })
})

app.listen(port, () => {
  console.log(`🚀 server started at http://localhost:${port}`)
})
