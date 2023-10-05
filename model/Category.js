const  EntitySchema = require('typeorm').EntitySchema;

const CategoryEntity = new EntitySchema({
  name: "Category",
  target: "Category",
  columns:{
    id:{
      primary: true,
      type: "int",
      generated: true
    },
    name:{
      type: "varchar"
    }
  }
});

module.exports = {CategoryEntity}