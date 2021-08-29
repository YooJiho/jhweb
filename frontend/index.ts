import { appendToMemberExpression } from '@babel/types'
import express from 'express'
import path from 'path'

const app = express()
const port = process.env.PORT || 5000

app.use(express.static('dist'))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})

app.listen(port, () => console.log('Server is running on: http://localhost:${port}'))