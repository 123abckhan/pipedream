const validate = require("validate.js");
const common = require("../common");

module.exports = {
  ...common,
  key: "sendgrid-delete-global-supression",
  name: "Delete Global Supression",
  description: "Allows you to remove an email address from the global suppressions group.",
  version: "0.0.1",
  type: "action",
  props: {
    ...common.props,
    email: {
      type: "string",
      label: "Email",
      description: "The email address you want to remove from the global suppressions group",
    },
  },
  async run({ $ }) {
    const constraints = {
      email: {
        email: true,
      },
    };
    const validationResult = validate({
      email: this.email,
    }, constraints);
    this.checkValidationResults(validationResult);
    const resp = await this.sendgrid.deleteGlobalSupression(this.email);
    $.export("$summary", `Successfully removed ${this.email} from global supression group.`);
    return resp;
  },
};
