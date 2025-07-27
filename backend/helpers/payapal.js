import paypal from "paypal-rest-sdk"
paypal.configure({
    mode:"sandbox",
    client_id: "AXzGJBN8y3cXyYx5eTBm7K3XNpZCHHg2r5dvTs7VSbOSzxEKOWdkgQLN7s0EFOmTgloZ_DpMhLa5dPwP",
    client_secret: "EIlIGsWeruD8z6bGRQ08vlt2j36FprVM7nRqKcT6E7Mj1Si2PccxNkCyXX9Fi09RLg00joFOZa8wsVQy",
})

export default paypal