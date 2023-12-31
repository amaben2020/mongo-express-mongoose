// extends,  implements, private, public

// using dependency injection pattern DIP

// docs: https://mongoosejs.com/docs/queries.html

class MongoDBFactory {
  // any model could be passed here and the operations would work accordingly
  constructor(model) {
    this.model = model;
  }

  // create or insert
  async createItem(item) {
    try {
      // item would be an object
      const insertItem = await this.model(item).save();
      // Insert the article in our MongoDB database
      console.log("insertItem", insertItem);
      return insertItem;
    } catch (error) {
      console.log("Error", error);
    }
  }

  async getById(id) {
    // Find a single item in db
    try {
      const item = await this.model.findById(String(id)).exec();
      return item;
    } catch (error) {
      console.log("error", error);
    }
  }

  async getAll() {
    try {
      const item = await this.model.find({}).exec();
      return item;
    } catch (error) {
      console.log("error", error);
    }
  }

  async findByFields(id, ...fields) {
    // Find a single item in db
    try {
      const item = await new this.model()
        .findById(
          id,
          String((fields += "")), // my eureka wizardry 🧙🏾‍♂️ moment
        )
        .exec();
      console.log("item", item);
      return "Success";
    } catch (error) {
      console.log("error");
    }
  }

  // read: log what is currently in the database, useless
  async findItems(queries) {
    // Find a single item in db
    try {
      const item = this.model.find(queries);

      return item;
    } catch (error) {
      console.log("error");
    }
  }

  // read: log what is currently in the database, useless
  async findOneItemAndUpdate(id, name) {
    // Find a single item in db
    try {
      const item = await new this.model.findOneAndUpdate(
        {
          _id: id,
        },
        ...(name ? { name } : {}),
      );
      console.log("item", item);
      return "Success";
    } catch (error) {
      console.log("error");
    }
  }

  // update
  async updateItem(id, key, propertyToUpdate) {
    try {
      // what do you wanna update?
      let itemToUpdate = await this.model.findById(id);

      // update a property in the object or model
      itemToUpdate[key] = propertyToUpdate;

      await itemToUpdate.save();

      // Load the document to see the updated value
      const doc = await this.model.findOne();
      return `${doc.title} updated successfully ✅`;
    } catch (error) {
      console.log(error);
    }
  }
  // delete: we are using id to delete stuff
  async deleteItem(id) {
    try {
      // Under the hood, the findByIdAndDelete(id) method is a shorthand for findOneAndDelete({ _id: id })
      const doc = await this.model.findByIdAndDelete(id);

      return `${doc?._id} successfully deleted ❌`;
    } catch (error) {
      console.log(error);
    }
  }
}

export default MongoDBFactory;
