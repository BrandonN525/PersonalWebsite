from __future__ import print_function

import boto3
import json

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

    responseBody = json.dumps({"counter": int(response["Attributes"]["Visits"])})

    apiResponse = {
        "isBase64Encoded": False,
        "statusCode": 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        "body": responseBody
    }

    return apiResponse