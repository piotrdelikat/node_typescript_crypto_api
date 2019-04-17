import app from './app';

try {
  app.listen(process.env.PORT || 5500, () => {
    console.log(`✓ HTTP Server (${process.env.PORT || 5500})`)
  })
} catch (err) {
  console.log(err)
}
