import sys,json, pymongo
import operator

client = pymongo.MongoClient("")
db = client.test
recipe_collection = db['recipes']
read_file = sys.argv[1]

with open(read_file, 'r') as f_read:
    data = json.load(f_read)
    i = 0
    for recipe in data:
        i = i + 1
        print(i)
        mongo_recipe = recipe_collection.find_one({"id":recipe['id']})
        if mongo_recipe != None:
            id = mongo_recipe['_id']
            if len(recipe['images']) != 0:
                mongo_recipe['image'] = recipe['images'][0]['url']
                recipe_collection.update_one({'_id': mongo_recipe['_id']}, { "$set": { "image": mongo_recipe['image'] }})
