// const express = require('express')

// import express from "express"

// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

import express, { Request, Response } from 'express';

const app = express();

// root route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'Welcome To Digital Wallet API' });
});
