var generators = require("yeoman-generator");

module.exports = generators.Base.extend({
  writing() {
    this.fs.copy(this.templatePath(), this.destinationPath(), {
      globOptions: {
        dot: true,
        ignore: ["**/store/**"],
      },
    });
  },
});
