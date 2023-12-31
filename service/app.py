from flask import Flask, request
import json, os, requests

app = Flask(__name__)
fruits_inventory = { 'apple': 1000, 'banana': 1000 }
base_url = os.getenv('BASE_URL', 'http://localhost') + ':' + os.getenv('DAPR_HTTP_PORT', '8000')
headers = {'dapr-app-id': 'webbackend', 'content-type': 'application/json'}

@app.route('/orders', methods=['POST'])
def getOrder():
    order_data = request.json
    print('Order received : ' + json.dumps(order_data), flush=True)
    reduceFruitInventory(order_data)
    sendFruitInventory(fruits_inventory)
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}
    
def reduceFruitInventory(order_data):
    for key, n in order_data.items():
        fruits_inventory[key] -= n
    return fruits_inventory

def sendFruitInventory(fruits_inventory):
    requests.post(
        url='%s/dapr/subscribe' % (base_url),
        data=json.dumps(fruits_inventory),
        headers=headers
    )
    print('Order passed: ' + json.dumps(fruits_inventory), flush=True)

app.run(port=8080, host="0.0.0.0")
