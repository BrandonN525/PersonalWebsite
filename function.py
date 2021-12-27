from __future__ import print_function

import boto3
import json
import decimal

dynamodb = boto3.resource('dynamodb')

table = dynamodb.Table('resumecounter')

def handler(event, context):
    #when get request is received update 'visits' variable in dynamodb table
    
    response = table.update_item(
        Key = {'Site': 0},
        UpdateExpression = 'SET Visits = Visits + :val',
        ExpressionAttributeValues={
            ":val": 1
        },
        ReturnValues = "UPDATED_NEW"
    )

    print(response)
    return response