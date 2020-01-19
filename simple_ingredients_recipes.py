import sys
stopwords = [
'cup',
'teaspoon',
'teaspoons',
'cups',
'tablespoon',
'tablespoons',
'chopped',
'and',
'or',
'fresh',
'ground',
'ounce',
'ounce)',
'ounces',
'sliced',
'to',
'large',
'minced',
'water',
'can',
'cut',
'red',
'black',
'juice',
'powder',
'into',
'sauce',
'finely',
'whole',
'of',
'c.',
'white',
'lb',
'green',
'diced',
'grated',
'1/2',
'1/4',
'1/3',
'grated',
'tsp',
'tbsp',
'dried',
'baking',
'for',
'medium',
'small',
'taste',
'brown',
'(optional)',
'peeled',
'all-purpose',
'shredded',
'slices',
'cloves',
'vegetable',
'in',
'freshly',
'pound',
'leaves',
'dry',
'extract',
'drained',
'thinly',
'crushed',
'(or)',
'package',
'unsalted',
'cooked',
'pieces',
'g',
'cloves',
'(about',
'lbs',
'frozen',
'tsp.',
'softened',
'plus',
'(8',
'soda',
'bell',
'melted',
'the',
'divided',
'sour',
'x',
'pinch',
'grams',
'beaten',
'a',
'as',
'with',
'(1',
'hot',
'pounds',
'soy',
'each',
'mix',
'tbsp.',
'packed',
'sweet',
'light',
'boneless',
'coarsely',
'yellow',
'cans',
'stock',
'use',
'extra',
'seeds',
'For',
'&',
'(10',
'Italian',
'italian',
'heavy',
'(15',
'inch',
'And',
'clove',
'kosher',
'ml',
'more',
'toasted',
'(I',
'dash',
'mayonnaise',
'virgin',
'flakes',
'halved',
'Or',
'cayenne',
'granulated',
'Fresh',
'cubes',
'cubed',
'ounces',
'zest',
'seeded',
'ml)',
'if',
'pkg.',
'paste',
'skinless',
'thin',
'(14',
'1-',
'peeled',
'thawed',
'room',
'bay',
'garnish',
'canned',
'oz.',
'(16',
'crumbled',
'weight',
'cubed',
'(6',
'cold',
'extra-virgin',
'rinsed',
'possibly',
'strips',
'dark',
'leaf',
'powdered',
'bunch',
'temperature',
'(4',
'(2',
'clove',
'taste)',
'Powder',
'thru',
'plain',
'unsweetened',
'ripe',
'removed',
'KRAFT',
'thick',
'1/8',
'Sauce',
'half',
'(to',
'packages',
'(12',
'cooking',
'sea',
'trimmed',
'you',
'2/3',
'Large',
'pie',
'at',
'about',
'oz',
'lightly',
'1/2-inch',
'quartered',
'bacon',
'instant',
'red',
'fine',
'leaves',
'crumbs',
'cake',
'baby',
'cups)',
'whipping',
'uncooked',
'-2',
'breast',
'mixed',
'diced',
'1-1/2',
'oz.',
'head',
'grated',
'1-inch',
'To',
'your',
'prepared',
'lb.',
'stick',
'jar',
'box',
'black',
'roasted',
'chunks',
'low-fat',
'on',
'02/09',
'spray',
'-',
'ounces)',
'fat',
'from',
'recipe',
'dill',
'pitted',
'other',
'lean',
'condensed',
'g)',
'smoked',
'brown',
'liquid',
'shortening',
'warm',
'boiling',
'whites',
'fluid',
'whipped',
'lengthwise',
'is',
'green',
'needed',
'coarse',
'make',
'makes',
'Note',
'note'
]

stopwords.extend([',' , '(' , ')' , '/' , '-',  '+',  '%' , '#' , '~'])
bad_words = stopwords

import json, time
from google.cloud import language_v1
from google.cloud.language import enums
from google.cloud.language import types

#client = pymongo.MongoClient("ority")
#db = client.test
#collection = db['recipes']

# Instantiates a client
nlp_client = language_v1.LanguageServiceClient()

read_file = sys.argv[1]
write_file = sys.argv[2]
uploaded_count = 800000

with open(read_file, 'r') as f_read:
    with open(write_file, 'w+') as output:
        data = json.load(f_read)
        new_data = []
        i = 0
        for recipe in data:
            simple_ingredients = []
            ok = True
            for ingredient in recipe['ingredients']:

                if i <= uploaded_count:
                    break

                text = ingredient['text']
                text = text.split(' ')
                text = list(filter(lambda word: (word not in bad_words) and (not word.isnumeric()), text))
                text = " ".join(text)

                # nlp upload
                document = types.Document(
                    content=text,
                    type=enums.Document.Type.PLAIN_TEXT)

                # nlp response
                try:
                    response = nlp_client.analyze_syntax(document)
                except:
                    ok = False
                    break

                root_word = ''
                # ROOT is 54 , NOUN is 6
                for token in response.tokens:
                    label = token.dependency_edge.label
                    if label == 54 and token.part_of_speech.tag == 6:
                        root_word = token.text.content

                # if root_word: print("root: ", root_word, '\n')

                simple_ingredients.append(root_word.lower())

                time.sleep(0.12)

            i = i + 1
            print(i, "th recipe..")
            # remove empty
            simple_ingredients = list(filter(None, simple_ingredients))
            # remove duplicate
            simple_ingredients = list(dict.fromkeys(simple_ingredients))

            recipe['simple_ingredients'] = simple_ingredients
            if i > uploaded_count and ok:
                line = json.dumps(recipe)
                output.write(line+'\n')
                #collection.insert_one(recipe)
                #print(".uploaded")
