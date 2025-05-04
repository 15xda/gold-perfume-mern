const returnSafeUserData = (user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    telephone: user.telephone,
    addresses: user.addresses,
    orders: user.orders,
    favourites: user.favourites,
    cart: user.cart,
    isVerified: user.isVerified,
});

module.exports = returnSafeUserData;