import json
import time
import logging
import requests
import os
import random

logging.basicConfig(level=logging.INFO)

base_url = os.getenv('BASE_URL', 'http://localhost') + ':' + os.getenv('DAPR_HTTP_PORT', '8000')
headers = {'dapr-app-id': 'service', 'content-type': 'application/json'}

def sendOrder(order_data):
  requests.post(
    url='%s/orders' % (base_url),
    data=json.dumps(order_data),
    headers=headers
  )
  print('Order passed: ' + json.dumps(order_data), flush=True)

while(True):
  n_apple = random.randint(1, 10)
  order_data = {'apple': n_apple}
  sendOrder(order_data)
  time.sleep(1)
