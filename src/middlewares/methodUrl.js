
export default function methodUrl(req, res, next) {
  console.log(`${req.method} ${req.originalUrl}`)
  
  next()
}

