const User = require('./User');
const Role = require('./Role');

// Many-To-Many
User.belongsToMany(Role, {
    through: 'user_roles',
    foreignKey: 'userId',
    as: 'roles'
});

Role.belongsToMany(User, {
    through: 'user_roles',
    foreignKey: 'roleId',
    as: 'users'
});

module.exports = { User, Role };
