import sys,json, pymongo
import operator

client = pymongo.MongoClient("mongodb+srv://admin:admin@cluster0-4bghh.mongodb.net/test?retryWrites=true&w=majority")
db = client.test
recipe_collection = db['recipes']
grocery_collection = db['groceries']
i = 0
for recipe in recipe_collection.find({"score":None}):
    i = i + 1
    print(i)
    id = recipe['_id']
    ingredients = recipe['simple_ingredients']
    cheapest_ingredients = []
    cheapest_chosen_store_ingredients = []
    cheapest_ingredients_price = 0
    cheapest_chosen_store_ingredients_price = 0
    stores_count = {}

    if len(ingredients) != 0:
        for item in ingredients:
            groceries = grocery_collection.find({'simple_name': item})
            stores = groceries.distinct('store')
            for store in stores:
                if store not in stores_count:
                    stores_count[store] = 1
                else:
                    stores_count[store] = stores_count[store] + 1
        chosen_store = ''
        amount = 0
        for store in stores_count:
            if amount < stores_count[store]:
                amount = stores_count[store]
                chosen_store = store
        #print(chosen_store)
        final_simple_ingredients = []
        for item in ingredients:
            groceries = grocery_collection.find({'simple_name': item})
            found = False
            cheapest_price = 99999
            cheapest_grocery = None
            cheapest_chosen_store_price = 99999
            cheapest_chosen_store_item = None
            for grocery_item in groceries:
                found = True
                price = grocery_item['totalprice']
                if grocery_item['totalprice'] == 0:
                    price = grocery_item['price']
                if grocery_item['totalprice'] != 0 and grocery_item['price'] != 0 and grocery_item['totalprice'] > grocery_item['price']:
                    price = grocery_item['price']
                if price < cheapest_price:
                    cheapest_price = price
                    cheapest_grocery = grocery_item
                if grocery_item['store'] == chosen_store:
                    if price < cheapest_chosen_store_price:
                        cheapest_chosen_store_price = price
                        cheapest_chosen_store_item = grocery_item
            if found:
                final_simple_ingredients.append(item)
                cheapest_ingredients.append(cheapest_grocery)
                cheapest_ingredients_price += cheapest_price
                if cheapest_chosen_store_item != None:
                    cheapest_chosen_store_ingredients.append(cheapest_chosen_store_item)
                    cheapest_chosen_store_ingredients_price += cheapest_chosen_store_price
                else:
                    cheapest_chosen_store_ingredients.append(cheapest_grocery)
                    cheapest_chosen_store_ingredients_price += cheapest_price
        recipe['simple_ingredients'] = final_simple_ingredients
        #print(cheapest_ingredients)
        coverage = float(len(cheapest_ingredients)) / len(ingredients)
        #print(coverage)
        total_ingredients_score = 5
        if total_ingredients_score < len(final_simple_ingredients):
            total_ingredients_score = len(final_simple_ingredients)
        score = coverage * cheapest_ingredients_price * total_ingredients_score
        recipe['score'] = score
        recipe['coverage'] = coverage
        recipe['price'] = cheapest_ingredients_price
        recipe['cheapest_ingredients'] = cheapest_ingredients
        recipe['chosen_store_price'] = cheapest_chosen_store_ingredients_price
        recipe['chosen_store_cheapest_ingredients'] = cheapest_chosen_store_ingredients
        recipe['num_instructions'] = len(recipe['instructions'])
        recipe['num_ingredients'] = len(cheapest_ingredients)
        recipe['store'] = chosen_store
        #print(recipe)
        recipe_collection.update_one({'_id':recipe['_id']}, { "$set": {
        "score": recipe['score'],
        "coverage": recipe['coverage'],
        "price": recipe['price'],
        "cheapest_ingredients": recipe['cheapest_ingredients'],
        "chosen_store_price": recipe['chosen_store_price'],
        "chosen_store_cheapest_ingredients": recipe['chosen_store_cheapest_ingredients'],
        "num_instructions": recipe['num_instructions'],
        "num_ingredients": recipe['num_ingredients'],
        "store": recipe['store']
        }})
