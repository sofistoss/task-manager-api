const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);

const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

const welcomeEmail = (name) => {
  mg.messages.create("sandbox65077ffba0ca4791b7f5e736f32d1b92.mailgun.org", {
    from: "Sofiane <iansof87@gmail.com>",
    to: ["sofiano.a@hotmail.fr"],
    subject: "Welcome Email",
    html: `<h2>Hello Mr ${name}, Welcome to my website</h2>`,
  });
};

const cencelationEmail = (name) => {
  mg.messages.create("sandbox65077ffba0ca4791b7f5e736f32d1b92.mailgun.org", {
    from: "Sofiane <iansof87@gmail.com>",
    to: ["sofiano.a@hotmail.fr"],
    subject: "Concelation Email",
    html: `<h2>Goodbye ${name}</h2>`,
  });
};

module.exports = {
  welcomeEmail,
  cencelationEmail,
};

// const welcomeEmail = async (name) => {
//   try {
//     await mg.messages.create(
//       "sandbox65077ffba0ca4791b7f5e736f32d1b92.mailgun.org",
//       {
//         from: "Sofiane <iansof87@gmail.com>",
//         to: ["sofiano.a@hotmail.fr"],
//         subject: "Welcome",
//         text: `Hello ${name}, Welcome to our website`,
//       }
//     );
//   } catch (err) {
//     console.log(err); // logs any error
//   }
// };
// module.exports = {
//   welcomeEmail,
// };
