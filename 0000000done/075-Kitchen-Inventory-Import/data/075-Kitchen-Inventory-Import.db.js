//The Data Access Layer (DAL) for secure inventory queries.

class inventoryimportdb{
    static async findbyname(name){
        return await inventoryimportdb.findone({ingredientname:name});

    }
    static async cretenewingredient(data){
        return await inventoryimportdb.create(data);
    }
    static async pushbatch(ingedientname,batchdata,quantityincrease){
        return await inventoryimportdb.findoneandupdate(
            ingredientid,
            {
                $push:{batches:batchdata},
                $inc:{totalquantity:quantityincrease}
            },
            {new:true  , runvalidator:true}
            
        );
    }
}
module.exports = inventoryimportdb;
