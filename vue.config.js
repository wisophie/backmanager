module.exports = {
  chainwebpack: config => {
    config.when(process.env.NODE_ENV === 'production', config => {
      config.entry('app').clear().add('./src/main.js')
      config.set("externals", {

      })

    })
  }




}