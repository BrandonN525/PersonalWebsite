from __future__ import print_function

import boto3
import json

table = boto3.resource('dynamodb').Table('resumecounter')

def handler(event, context):
    #when get request is received (which is done everytime this function runs, it runs on get events) by website
    #update 'visits' variable in dynamodb table
    #VisitCount = table.get_item(Key = {'Site'}, ProjectionExpression = 'Visits')
    
    table.updateitem(
        Key = {'Site'},
        UpdateExpression = "SET Visits = Visits + 1",
        #UpdateExpression = "ADD Visits: 1"
        #UpdateExpression = "Set Visits = :r"
        #ExpressionAttributeValues={
        #    ':r': VisitCount.value + 1
        #},
        ReturnValues = "UPDATED_NEW"
    )