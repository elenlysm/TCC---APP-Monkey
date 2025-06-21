const { resetPassword } = require('./authService');

function getSettings() {
    return {
        Notifications: {
            Email: true,
            SMS: false,
            Push: true
        },
        Privacy: {
            ProfileVisibility: 'Public',
            DataSharing: false
        },
        Security: {
            TwoFactorAuth: true,
            PasswordStrength: 'High'
        },
        language: 'pt-BR',
        fontsize: 'medium',
        resetPassword: resetPassword,
        updateEmail: async (newEmail) => {
            //Simula uma chamada para atualizar o email
            return new Promise((resolve, reject) => {
                if (newEmail && typeof newEmail === 'string') {
                    resolve({ success: true, message: 'Email atualizado com sucesso.' });
                } else {
                    reject(new Error('Email inválido.'));
                }
            });
        }
    };
}

module.exports = {
    resetPassword,
    getSettings
};