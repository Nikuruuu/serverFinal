const postmark = require("postmark");

const client = new postmark.ServerClient(process.env.POSTMARK_SERVER_TOKEN);

const sendEmail = async (to, subject, htmlBody) => {
  try {
    const response = await client.sendEmail({
      From: process.env.EMAIL_SENDER_ADDRESS,
      To: to,
      Subject: subject,
      HtmlBody: htmlBody,
    });
    console.log("Email sent:", response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const sendEmailWithTemplate = async (to, templateId, templateModel) => {
  try {
    await client.sendEmailWithTemplate({
      From: process.env.EMAIL_SENDER_ADDRESS,
      To: to,
      TemplateId: templateId,
      TemplateModel: templateModel,
    });
  } catch (error) {
    console.error("Error sending email with template:", error);
  }
};

const sendResetPasswordEmail = async (to, resetUrl) => {
  try {
    await client.sendEmailWithTemplate({
      From: process.env.EMAIL_SENDER_ADDRESS,
      To: to,
      TemplateAlias: "code-your-own-2",
      TemplateModel: {
        reset_password_url: resetUrl,
      },
    });
  } catch (error) {
    console.error("Error sending password reset email with template:", error);
  }
};

const sendOtpEmail = async (to, otpCode) => {
  try {
    await client.sendEmailWithTemplate({
      From: process.env.EMAIL_SENDER_ADDRESS,
      To: to,
      TemplateAlias: "code-your-own-1",
      TemplateModel: {
        otp: otpCode,
      },
    });
  } catch (error) {
    console.error("Error sending password reset email with template:", error);
  }
};

module.exports = {
  sendEmail,
  sendResetPasswordEmail,
  sendOtpEmail,
  sendEmailWithTemplate, // Add this line to export the new function
};
