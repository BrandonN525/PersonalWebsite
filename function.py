
from __future__ import print_function
import boto3
import json

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('resumecounter')

def handler(event, context):
    """AWS Lambda handler to update and return the visit counter."""
    try:
        response = table.update_item(
            Key={'Site': 0},
            UpdateExpression='SET Visits = if_not_exists(Visits, :start) + :val',
            ExpressionAttributeValues={
                ':start': 0,
                ':val': 1
            },
            ReturnValues='UPDATED_NEW'
        )

        responseBody = json.dumps({"counter": int(response["Attributes"]["Visits"])})
        return {
            "isBase64Encoded": False,
            "statusCode": 200,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            "body": responseBody
        }

    except Exception as e:
        print(f"Error updating visit counter: {e}")
        return {
            "statusCode": 500,
            "body": json.dumps({"error": "Failed to update visit counter"})
        }
