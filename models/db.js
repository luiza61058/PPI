const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("escola", "root", "", {
  host:"localhost",
  dialect: "mysql",
});
async function connectDatabase(){
  try {
    await sequelize.authenticate();
    console.log("Deu bom");
  } catch (error){
throw new Error("Deu ruim", error);
  }
}
connectDatabase();
module.exports = sequelize;