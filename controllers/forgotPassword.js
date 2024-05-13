const User = require('../models/user');
const Sib = require('sib-api-v3-sdk');
const client = Sib.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.API_KEY;

const transEmailApi = new Sib.TransactionalEmailsApi();

exports.forgotpassword = async (req, res) => {
    const { email } = req.body;
    try {
        const sender = { email: 'dummy@gmail.com' };
        const receivers = [{ email: email }];
        const response = await transEmailApi.sendTransacEmail({
            sender,
            to: receivers,
            subject: 'Hi there!!',
            textContent: 'Its me Najiya...'
        });
        console.log(response);
        res.status(200).json({ message: 'Reset email sent successfully' });
    } catch (error) {
        console.error('Failed to send reset email:', error);
        res.status(500).json({ error: 'Failed to send reset email' });
    }
};
