var generators = require("yeoman-generator");

module.exports = generators.Base.extend({
  prompting() {
    const prompts = [
      // {
      //   type: "confirm",
      //   name: "someAnswer",
      //   message: "Would you like to enable this option?",
      //   default: true
      // },
      {
        type: "confirm",
        name: "tsTemp",
        message: "would you like TS template",
        default: true,
      },
    ];
    return this.prompt(prompts).then((answers) => {
      this.tsTemp = answers.tsTemp;
      this.log(this.tsTemp);
    });
  },
  writing() {
    if (this.tsTemp) {
      this.fs.copy(this.templatePath("ts-template"), this.destinationPath());
    } else {
      this.fs.copy(this.templatePath("js-template"), this.destinationPath(), {
        globOptions: {
          dot: true,
          ignore: ["**/store/**"],
        },
      });
    }
  },
});
