'use strict';
const crypto = require('crypto');

module.exports = {
    up: async queryInterface => {
        const now = new Date();
        await queryInterface.bulkInsert('user', [
            {
                phone: '+79998887766',
                email: 'example@exaple.com',
                password: crypto.createHmac('sha256', 'pass').digest('hex'),
                isActive: true,
                createdAt: now,
                updatedAt: now,
            },
        ], {});
    },

    down: async queryInterface => {
        await queryInterface.bulkDelete('user', {
            phone: '+79998887766',
            email: 'example@exaple.com',
        }, {});
    },
};
