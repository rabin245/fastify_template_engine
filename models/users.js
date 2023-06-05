const userModel = (sequelize, DataTypes) => {
  return sequelize.define("users", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    type: DataTypes.STRING(255),
    username: DataTypes.STRING(255),
    password: DataTypes.STRING(255),
  });
};

export default userModel;
