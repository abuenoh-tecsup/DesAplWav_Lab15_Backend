const User = require('./User');
const Role = require('./Role');
const Product = require('./Product');
const Category = require('./Category');

// User <-> Role (M:N)
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

// Product <-> Category (M:N)
Product.belongsToMany(Category, {
    through: 'product_categories',
    foreignKey: 'productId',
    as: 'categories'
});

Category.belongsToMany(Product, {
    through: 'product_categories',
    foreignKey: 'categoryId',
    as: 'products'
});

module.exports = { User, Role, Product, Category };
