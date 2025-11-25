// role -> resource -> permission

module.exports = {
  admin: [
    "create_user",
    "read_user",
    "update_user",
    "delete_user",
    "create_image",
    "read_image",
    "update_image",
    "delete_image",
    "create_property",
    "read_property",
    "update_property",
    "delete_property",
  ],
  agent: [
    "create_image",
    "read_property",
    "create_property",
    "update_own_property",
    "delete_own_property",
  ],
  guest: [
    "read_property",
    "read_own_user",
    "update_own_user",
    "delete_own_user",
  ],
};
