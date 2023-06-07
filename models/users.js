const userModel = (sequelize, DataTypes) => {
  return sequelize.define("users", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: DataTypes.STRING(255),
    email: DataTypes.STRING(255),
    password: DataTypes.STRING(255),
    type: DataTypes.STRING(255),
    otp: {
      type: DataTypes.STRING(255),
      defaultValue: null,
    },
  });
};

export default userModel;
