const sessionModel = (sequelize, DataTypes) => {
  return sequelize.define("Sessions", {
    sid: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    expires: DataTypes.DATE,
    data: DataTypes.TEXT,
  });
};

export default sessionModel;
